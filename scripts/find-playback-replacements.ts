import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { chromium } from 'playwright'
import type { Browser, Page } from 'playwright'
import { createServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { getYearData } from '@/data'
import type { Song } from '@/types/song'

type Candidate = {
  id: string
  title: string
  uploader: string
  score: number
}

type Replacement = {
  year: number
  rank: number
  title: string
  artist: string
  oldId: string | null
  newId: string
  candidateTitle: string
  uploader: string
  score: number
}

const execFileAsync = promisify(execFile)
const playbackHarnessPath = '/__integrity/playback'
const playbackAttemptTimeoutMs = 15000
const browserLaunchArgs = ['--autoplay-policy=no-user-gesture-required']
const maxCandidatesPerSong = 6
const minimumCandidateScore = 80

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getArtistTokens = (artist: string) => [
  ...new Set(
    normalizeText(artist)
      .split(' ')
      .filter((token) => token.length >= 4),
  ),
]

const scoreCandidate = (
  song: Song,
  candidate: Pick<Candidate, 'title' | 'uploader'>,
) => {
  const songTitle = normalizeText(song.title)
  const candidateHaystack = `${normalizeText(candidate.title)} ${normalizeText(candidate.uploader)}`
  let score = 0
  if (candidateHaystack.includes(songTitle)) score += 80
  for (const token of songTitle.split(' ').filter((entry) => entry.length >= 3))
    if (candidateHaystack.includes(token)) score += 5
  for (const token of getArtistTokens(song.artist))
    if (candidateHaystack.includes(token)) score += 7
  return score
}

const getYears = () => {
  const yearArg = process.argv.slice(2).find((arg) => arg.startsWith('--year='))
  if (!yearArg) throw new Error('Expected --year=1940,1941 style input.')
  return yearArg
    .slice('--year='.length)
    .split(',')
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isInteger(entry))
}

const searchCandidates = async (song: Song) => {
  const query = `${song.title} ${song.artist.replace(/;/g, ' ')}`
  const { stdout } = await execFileAsync('/opt/homebrew/bin/yt-dlp', [
    '--flat-playlist',
    `ytsearch12:${query}`,
    '--print',
    '%(id)s\t%(title)s\t%(uploader)s',
    '--skip-download',
    '--no-warnings',
  ])
  return stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, title = '', uploader = ''] = line.split('\t')
      return {
        id,
        title,
        uploader,
        score: scoreCandidate(song, { title, uploader }),
      }
    })
    .filter((candidate) => candidate.id && candidate.id !== song.youtubeVideoId)
    .sort((left, right) => right.score - left.score)
    .slice(0, maxCandidatesPerSong)
}

const startViteServer = async () => {
  const viteServer = await createServer({
    clearScreen: false,
    server: {
      host: '127.0.0.1',
      port: 0,
      strictPort: false,
      hmr: false,
    },
  })
  await viteServer.listen()
  const serverOrigin =
    viteServer.resolvedUrls?.local[0]?.replace(/\/$/, '') ??
    'http://127.0.0.1:5173'
  return { viteServer, serverOrigin }
}

const initializeHarness = async (page: Page, serverOrigin: string) => {
  await page.goto(`${serverOrigin}${playbackHarnessPath}`, {
    waitUntil: 'domcontentloaded',
  })
  await page.waitForFunction(
    () => Boolean(window.__FLASHBACK_PLAYBACK_INTEGRITY__),
    undefined,
    { timeout: 10000 },
  )
  await page.evaluate(() =>
    window.__FLASHBACK_PLAYBACK_INTEGRITY__!.initialize(),
  )
}

const runHarnessAttempt = async (page: Page, year: number, song: Song) => {
  const attemptPromise = page.evaluate(
    ({ currentYear, currentSong, timeoutMs }) =>
      window.__FLASHBACK_PLAYBACK_INTEGRITY__!.runAttempt({
        year: currentYear,
        song: currentSong,
        timeoutMs,
      }),
    {
      currentYear: year,
      currentSong: song,
      timeoutMs: playbackAttemptTimeoutMs,
    },
  )
  await page.waitForFunction(() =>
    window.__FLASHBACK_PLAYBACK_INTEGRITY__?.hasQueuedAttempt(),
  )
  await page.locator('[data-playback-start]').click({ force: true })
  return attemptPromise
}

const resetHarness = async (page: Page) =>
  page.evaluate(() => window.__FLASHBACK_PLAYBACK_INTEGRITY__!.reset())

const runHarnessAttemptSafe = async (
  page: Page,
  serverOrigin: string,
  year: number,
  song: Song,
) => {
  try {
    return await runHarnessAttempt(page, year, song)
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !error.message.includes('Execution context was destroyed')
    )
      throw error
    await initializeHarness(page, serverOrigin)
    return runHarnessAttempt(page, year, song)
  }
}

const resetHarnessSafe = async (page: Page, serverOrigin: string) => {
  try {
    await resetHarness(page)
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !error.message.includes('Execution context was destroyed')
    )
      throw error
    await initializeHarness(page, serverOrigin)
  }
}

const findReplacements = async (
  page: Page,
  serverOrigin: string,
  year: number,
) => {
  const songs = getYearData(year) ?? []
  const replacements: Replacement[] = []

  for (const song of songs) {
    console.error(`checking ${year} #${song.rank} ${song.title}`)
    const currentResult = await runHarnessAttemptSafe(
      page,
      serverOrigin,
      year,
      song,
    )
    await resetHarnessSafe(page, serverOrigin)
    if (currentResult.status === 'passed') continue
    const candidates = await searchCandidates(song)
    for (const candidate of candidates) {
      if (candidate.score < minimumCandidateScore) continue
      const nextSong = { ...song, youtubeVideoId: candidate.id }
      const candidateResult = await runHarnessAttemptSafe(
        page,
        serverOrigin,
        year,
        nextSong,
      )
      await resetHarnessSafe(page, serverOrigin)
      if (candidateResult.status !== 'passed') continue
      replacements.push({
        year,
        rank: song.rank,
        title: song.title,
        artist: song.artist,
        oldId: song.youtubeVideoId,
        newId: candidate.id,
        candidateTitle: candidate.title,
        uploader: candidate.uploader,
        score: candidate.score,
      })
      break
    }
  }

  return replacements
}

const main = async () => {
  const years = getYears()
  let browser: Browser | null = null
  let page: Page | null = null
  let viteServer: ViteDevServer | null = null

  try {
    const serverSetup = await startViteServer()
    viteServer = serverSetup.viteServer
    browser = await chromium.launch({
      headless: true,
      args: browserLaunchArgs,
    })
    page = await browser.newPage({ viewport: { width: 1440, height: 1024 } })
    await initializeHarness(page, serverSetup.serverOrigin)

    const replacements: Replacement[] = []
    for (const year of years)
      replacements.push(
        ...(await findReplacements(page, serverSetup.serverOrigin, year)),
      )

    console.log(JSON.stringify(replacements, null, 2))
  } finally {
    await page?.close()
    await browser?.close()
    await viteServer?.close()
  }
}

void main()
