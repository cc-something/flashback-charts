import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { chromium } from 'playwright'
import type { Browser, BrowserContext, Page } from 'playwright'
import { createServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { getYearData } from '@/data'
import type { Song } from '@/types/song'

type ProbeCandidate = {
  id: string
  title: string
  uploader: string
  source: 'current' | 'search' | 'manual'
}

type ProbeResult = {
  candidate: ProbeCandidate
  result: {
    status: 'passed' | 'failed'
    reason: string
    errorCode: number | null
    message: string
    durationMs: number
    stateSequence: number[]
  }
}

const execFileAsync = promisify(execFile)
const playbackHarnessPath = '/__integrity/playback'
const playbackAttemptTimeoutMs = 20_000
const playbackHarnessResultTimeoutBufferMs = 10_000
const playbackHarnessResultTimeoutMs =
  playbackAttemptTimeoutMs + playbackHarnessResultTimeoutBufferMs
const browserLaunchArgs = ['--autoplay-policy=no-user-gesture-required']
const browserUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
const defaultSearchCount = 25
const defaultServerOrigin = 'http://127.0.0.1:4719'

const formatDurationMs = (durationMs: number) =>
  `${(durationMs / 1000).toFixed(2)}s`

const formatStateSequence = (stateSequence: number[]) =>
  stateSequence.length > 0 ? stateSequence.join(',') : '-'

const getRequiredNumberArg = (name: string) => {
  const arg = process.argv
    .slice(2)
    .find((entry) => entry.startsWith(`--${name}=`))
  if (!arg) throw new Error(`Expected --${name}=...`)
  const value = Number(arg.slice(name.length + 3))
  if (!Number.isInteger(value) || value <= 0)
    throw new Error(`Expected --${name}=... to be a positive integer.`)
  return value
}

const getOptionalStringArg = (name: string) => {
  const arg = process.argv
    .slice(2)
    .find((entry) => entry.startsWith(`--${name}=`))
  return arg ? arg.slice(name.length + 3).trim() : null
}

const getManualIds = () => {
  const value = getOptionalStringArg('video-id')
  if (!value) return []
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getDefaultQueries = (song: Song) => {
  const baseQuery = `${song.title} ${song.artist.replace(/;/g, ' ')}`
  return [
    baseQuery,
    `${baseQuery} official audio`,
    `${baseQuery} official video`,
    `${baseQuery} topic`,
    `${baseQuery} live`,
    `${baseQuery} lyrics`,
  ]
}

const searchCandidates = async (
  song: Song,
  searchCount: number,
  query: string | null,
) => {
  const searchQueries = query ? [query] : getDefaultQueries(song)
  const candidatesById = new Map<string, ProbeCandidate>()

  for (const searchQuery of searchQueries) {
    const { stdout } = await execFileAsync('/opt/homebrew/bin/yt-dlp', [
      '--flat-playlist',
      `ytsearch${searchCount}:${searchQuery}`,
      '--print',
      '%(id)s\t%(title)s\t%(uploader)s',
      '--skip-download',
      '--no-warnings',
    ])
    for (const line of stdout.split('\n').map((entry) => entry.trim())) {
      if (!line) continue
      const [id, title = '', uploader = ''] = line.split('\t')
      if (!id || candidatesById.has(id)) continue
      candidatesById.set(id, { id, title, uploader, source: 'search' })
    }
  }

  return [...candidatesById.values()]
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
    viteServer.resolvedUrls?.local[0]?.replace(/\/$/, '') ?? defaultServerOrigin
  return { viteServer, serverOrigin }
}

const initializeHarness = async (page: Page, serverOrigin: string) => {
  await page.goto(`${serverOrigin}${playbackHarnessPath}`, {
    waitUntil: 'domcontentloaded',
  })
  await page.waitForFunction(
    () => Boolean(window.__FLASHBACK_PLAYBACK_INTEGRITY__),
    undefined,
    { timeout: 10_000 },
  )
  await page.evaluate(() =>
    window.__FLASHBACK_PLAYBACK_INTEGRITY__!.initialize(),
  )
}

const createHarnessPage = async (browser: Browser, serverOrigin: string) => {
  const browserContext = await browser.newContext({
    viewport: { width: 1440, height: 1024 },
    userAgent: browserUserAgent,
  })
  const page = await browserContext.newPage()
  await initializeHarness(page, serverOrigin)
  return { browserContext, page }
}

const runHarnessAttempt = async (page: Page, year: number, song: Song) => {
  const attemptPromise = withAttemptTimeout(
    page.evaluate(
      ({ attemptYear, attemptSong, timeoutMs }) =>
        window.__FLASHBACK_PLAYBACK_INTEGRITY__!.runAttempt({
          year: attemptYear,
          song: attemptSong,
          timeoutMs,
        }),
      {
        attemptYear: year,
        attemptSong: song,
        timeoutMs: playbackAttemptTimeoutMs,
      },
    ),
    () => ({
      status: 'failed' as const,
      reason: 'timeout',
      errorCode: null,
      message: `Playback integrity harness stalled before returning a result for ${year} #${song.rank} "${song.title}" by ${song.artist} [${song.youtubeVideoId ?? 'missing-video-id'}].`,
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

const getSong = (year: number, rank: number) => {
  const song = (getYearData(year) ?? []).find((entry) => entry.rank === rank)
  if (!song) throw new Error(`Could not find ${year} #${rank}.`)
  return song
}

const getCandidates = async (song: Song) => {
  const searchCount = Number(
    getOptionalStringArg('search-count') ?? defaultSearchCount,
  )
  const manualCandidates = getManualIds().map((id) => ({
    id,
    title: 'manual candidate',
    uploader: 'manual',
    source: 'manual' as const,
  }))
  const searchCandidatesList =
    searchCount > 0
      ? await searchCandidates(song, searchCount, getOptionalStringArg('query'))
      : []
  const currentCandidate = song.youtubeVideoId
    ? [
        {
          id: song.youtubeVideoId,
          title: 'current song id',
          uploader: 'current-data',
          source: 'current' as const,
        },
      ]
    : []
  const candidatesById = new Map<string, ProbeCandidate>()
  for (const candidate of [
    ...currentCandidate,
    ...manualCandidates,
    ...searchCandidatesList,
  ])
    if (!candidatesById.has(candidate.id))
      candidatesById.set(candidate.id, candidate)
  return [...candidatesById.values()]
}

const logResult = (probeResult: ProbeResult) => {
  const { candidate, result } = probeResult
  console.log(
    `${result.status === 'passed' ? 'PASS ' : 'FAIL '} id=${candidate.id} source=${candidate.source} uploader=${candidate.uploader} title=${candidate.title} duration=${formatDurationMs(result.durationMs)} reason=${result.reason} errorCode=${result.errorCode ?? '-'} states=${formatStateSequence(result.stateSequence)} message=${result.message}`,
  )
}

const closePage = async (
  page: Page | null,
  browserContext: BrowserContext | null,
) => {
  await page?.close()
  await browserContext?.close()
}

const closeViteServer = async (viteServer: ViteDevServer | null) => {
  if (!viteServer) return
  await viteServer.close()
}

const main = async () => {
  const year = getRequiredNumberArg('year')
  const rank = getRequiredNumberArg('rank')
  const song = getSong(year, rank)
  const candidates = await getCandidates(song)
  let browser: Browser | null = null
  let browserContext: BrowserContext | null = null
  let page: Page | null = null
  let viteServer: ViteDevServer | null = null

  console.log(
    `Probing ${year} #${rank} "${song.title}" by ${song.artist} candidates=${candidates.length}`,
  )

  try {
    const serverSetup = await startViteServer()
    viteServer = serverSetup.viteServer
    browser = await chromium.launch({
      headless: true,
      args: browserLaunchArgs,
    })

    for (const candidate of candidates) {
      const harness = await createHarnessPage(browser, serverSetup.serverOrigin)
      browserContext = harness.browserContext
      page = harness.page
      const result = await runHarnessAttempt(page, year, {
        ...song,
        youtubeVideoId: candidate.id,
      })
      logResult({ candidate, result })
      await closePage(page, browserContext)
      page = null
      browserContext = null
    }
  } finally {
    await closePage(page, browserContext)
    await browser?.close()
    await closeViteServer(viteServer)
  }
}

void main()
