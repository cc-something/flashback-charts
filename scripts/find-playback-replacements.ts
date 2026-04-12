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
const playbackAttemptTimeoutMs = 8000
const playbackHarnessResultTimeoutBufferMs = 10000
const playbackHarnessResultTimeoutMs =
  playbackAttemptTimeoutMs + playbackHarnessResultTimeoutBufferMs
const browserLaunchArgs = ['--autoplay-policy=no-user-gesture-required']
const browserUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
const maxCandidatesPerSong = 12
const minimumCandidateScore = 40

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

const getRankFilter = () => {
  const rankArg = process.argv.slice(2).find((arg) => arg.startsWith('--rank='))
  if (!rankArg) return null
  const rank = Number(rankArg.slice('--rank='.length))
  if (!Number.isInteger(rank) || rank <= 0)
    throw new Error('Expected --rank=1-style input.')
  return rank
}

const searchCandidates = async (song: Song) => {
  const query = `${song.title} ${song.artist.replace(/;/g, ' ')}`
  const searchQueries = [
    query,
    `${query} official audio`,
    `${query} official video`,
  ]
  const searchResults = await Promise.all(
    searchQueries.map(async (searchQuery) => {
      const { stdout } = await execFileAsync('/opt/homebrew/bin/yt-dlp', [
        '--flat-playlist',
        `ytsearch12:${searchQuery}`,
        '--print',
        '%(id)s\t%(title)s\t%(uploader)s',
        '--skip-download',
        '--no-warnings',
      ])
      return stdout
    }),
  )
  const candidatesById = new Map<string, Candidate>()
  for (const stdout of searchResults)
    for (const line of stdout.split('\n').map((entry) => entry.trim())) {
      if (!line) continue
      const [id, title = '', uploader = ''] = line.split('\t')
      if (!id || id === song.youtubeVideoId || candidatesById.has(id)) continue
      candidatesById.set(id, {
        id,
        title,
        uploader,
        score: scoreCandidate(song, { title, uploader }),
      })
    }
  return [...candidatesById.values()]
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

const withAttemptTimeout = async <Result>(
  attemptPromise: Promise<Result>,
  getTimeoutResult: () => Result,
  timeoutMs: number,
) =>
  new Promise<Result>((resolve, reject) => {
    const timeoutId = setTimeout(() => resolve(getTimeoutResult()), timeoutMs)
    void attemptPromise
      .then((result) => {
        clearTimeout(timeoutId)
        resolve(result)
      })
      .catch((error) => {
        clearTimeout(timeoutId)
        reject(error)
      })
  })

const runHarnessAttempt = async (page: Page, year: number, song: Song) => {
  const attemptPromise = withAttemptTimeout(
    page.evaluate(
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
    ),
    () => ({
      status: 'failed',
      reason: 'timeout',
      errorCode: null,
      message: `Playback integrity harness stalled before returning a result for ${year} #${song.rank} "${song.title}" by ${song.artist}.`,
      durationMs: 0,
      stateSequence: [],
    }),
    playbackHarnessResultTimeoutMs,
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
    const errorMessage = error instanceof Error ? error.message : String(error)
    const shouldReinitialize =
      page.isClosed() ||
      errorMessage.includes('Execution context was destroyed') ||
      errorMessage.includes('Cannot read properties of undefined') ||
      errorMessage.includes('Target page, context or browser has been closed')
    if (shouldReinitialize) {
      await initializeHarness(page, serverOrigin)
      try {
        return await runHarnessAttempt(page, year, song)
      } catch (retryError) {
        const retryMessage =
          retryError instanceof Error ? retryError.message : String(retryError)
        return {
          status: 'failed',
          reason: 'player-load-failed',
          errorCode: null,
          message: retryMessage,
          durationMs: 0,
          stateSequence: [],
        }
      }
    }
    return {
      status: 'failed',
      reason: 'player-load-failed',
      errorCode: null,
      message: errorMessage,
      durationMs: 0,
      stateSequence: [],
    }
  }
}

const resetHarnessSafe = async (page: Page, serverOrigin: string) => {
  try {
    await resetHarness(page)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (
      page.isClosed() ||
      errorMessage.includes('Execution context was destroyed') ||
      errorMessage.includes('Cannot read properties of undefined') ||
      errorMessage.includes('Target page, context or browser has been closed')
    ) {
      await initializeHarness(page, serverOrigin)
      return
    }
    throw error
  }
}

const findReplacements = async (
  page: Page,
  serverOrigin: string,
  year: number,
  rankFilter: number | null,
) => {
  const songs = (getYearData(year) ?? []).filter((song) =>
    rankFilter === null ? true : song.rank === rankFilter,
  )
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
  const rankFilter = getRankFilter()
  let browser: Browser | null = null
  let browserContext: import('playwright').BrowserContext | null = null
  let page: Page | null = null
  let viteServer: ViteDevServer | null = null

  try {
    const serverSetup = await startViteServer()
    viteServer = serverSetup.viteServer
    browser = await chromium.launch({
      headless: true,
      args: browserLaunchArgs,
    })
    browserContext = await browser.newContext({
      viewport: { width: 1440, height: 1024 },
      userAgent: browserUserAgent,
    })
    page = await browserContext.newPage()
    await initializeHarness(page, serverSetup.serverOrigin)

    const replacements: Replacement[] = []
    for (const year of years)
      replacements.push(
        ...(await findReplacements(
          page,
          serverSetup.serverOrigin,
          year,
          rankFilter,
        )),
      )

    console.log(JSON.stringify(replacements, null, 2))
  } finally {
    await page?.close()
    await browserContext?.close()
    await browser?.close()
    await viteServer?.close()
  }
}

void main()
