import { chromium } from 'playwright'
import type { Browser, BrowserContext, Page } from 'playwright'
import { createServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { getYearData } from '@/data'
import type { Song } from '@/types/song'
import {
  resolvePlaybackIntegritySelection,
  type PlaybackIntegritySelection,
} from './playback-integrity-lib'

interface PlaybackIntegritySummary {
  total: number
  passed: number
  failed: number
}

type PlaybackIntegrityAttemptReason =
  | 'playing'
  | 'embed-blocked'
  | 'youtube-error'
  | 'timeout'
  | 'api-load-failed'
  | 'player-load-failed'
  | 'aborted'

interface PlaybackIntegrityAttemptResult {
  status: 'passed' | 'failed'
  reason: PlaybackIntegrityAttemptReason
  errorCode: number | null
  message: string
  durationMs: number
  stateSequence: number[]
}

const browserLaunchArgs = ['--autoplay-policy=no-user-gesture-required']
const browserUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
const playbackHarnessPath = '/__integrity/playback'
const playbackAttemptTimeoutMs = 20_000
const playbackHarnessResultTimeoutBufferMs = 10_000
const playbackHarnessResultTimeoutMs =
  playbackAttemptTimeoutMs + playbackHarnessResultTimeoutBufferMs
const defaultServerOrigin = 'http://127.0.0.1:4719'

const formatSongLabel = (year: number, song: Song) =>
  `${year} #${song.rank} "${song.title}" by ${song.artist} [${song.youtubeVideoId ?? 'missing-video-id'}]`

const formatDurationMs = (durationMs: number) =>
  `${(durationMs / 1000).toFixed(2)}s`

const formatStateSequence = (stateSequence: number[]) =>
  stateSequence.length > 0 ? stateSequence.join(',') : '-'

const logDivider = () =>
  console.log('------------------------------------------------------------')

const getRankFilter = (args: string[]) => {
  const rankArg = args.find((arg) => arg.startsWith('--rank='))
  if (!rankArg) return null
  const rank = Number(rankArg.slice('--rank='.length))
  if (!Number.isInteger(rank) || rank <= 0)
    throw new Error('Expected --rank=1-style input.')
  return rank
}

const getSummaryExitCode = (summary: PlaybackIntegritySummary) =>
  summary.failed > 0 ? 1 : 0

const createFailureResult = (
  reason: PlaybackIntegrityAttemptReason,
  message: string,
  errorCode: number | null = null,
): PlaybackIntegrityAttemptResult => ({
  status: 'failed',
  reason,
  errorCode,
  message,
  durationMs: 0,
  stateSequence: [],
})

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

const getAttempts = ({ years }: PlaybackIntegritySelection) =>
  years.flatMap((year) =>
    (getYearData(year) ?? []).map((song) => ({ year, song })),
  )

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

const closeViteServer = async (viteServer: ViteDevServer | null) => {
  if (!viteServer) return
  await viteServer.close()
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

const runHarnessAttempt = async (
  page: Page,
  year: number,
  song: Song,
): Promise<PlaybackIntegrityAttemptResult> => {
  if (!song.youtubeVideoId)
    return createFailureResult(
      'player-load-failed',
      `"${song.title}" by ${song.artist} is missing a YouTube video ID.`,
    )
  try {
    const attemptPromise = withAttemptTimeout(
      page.evaluate(
        ({ timeoutMs, year, song }) =>
          window.__FLASHBACK_PLAYBACK_INTEGRITY__!.runAttempt({
            song,
            timeoutMs,
            year,
          }),
        {
          song,
          timeoutMs: playbackAttemptTimeoutMs,
          year,
        },
      ),
      () =>
        createFailureResult(
          'timeout',
          `Playback integrity harness stalled before returning a result for ${formatSongLabel(year, song)}.`,
        ),
      playbackHarnessResultTimeoutMs,
    )
    await page.waitForFunction(() =>
      window.__FLASHBACK_PLAYBACK_INTEGRITY__?.hasQueuedAttempt(),
    )
    await page.locator('[data-playback-start]').click({ force: true })
    return await attemptPromise
  } catch (error) {
    return createFailureResult(
      'player-load-failed',
      error instanceof Error
        ? error.message
        : `Playback integrity harness failed for ${formatSongLabel(year, song)}.`,
    )
  }
}

const logAttemptStart = (
  attemptIndex: number,
  total: number,
  year: number,
  song: Song,
) =>
  console.log(`START ${attemptIndex}/${total} ${formatSongLabel(year, song)}`)

const logAttemptResult = (
  year: number,
  song: Song,
  result: PlaybackIntegrityAttemptResult,
) =>
  console.log(
    `${result.status === 'passed' ? 'PASS ' : 'FAIL '} ${formatSongLabel(
      year,
      song,
    )} duration=${formatDurationMs(result.durationMs)} reason=${result.reason} errorCode=${
      result.errorCode ?? '-'
    } states=${formatStateSequence(result.stateSequence)} message=${result.message}`,
  )

const runPlaybackIntegrity = async () => {
  const cliArgs = process.argv.slice(2)
  const selection = resolvePlaybackIntegritySelection(cliArgs)
  const rankFilter = getRankFilter(cliArgs)
  const attempts = getAttempts(selection).filter((attempt) =>
    rankFilter === null ? true : attempt.song.rank === rankFilter,
  )
  const summary: PlaybackIntegritySummary = {
    total: attempts.length,
    passed: 0,
    failed: 0,
  }
  let browser: Browser | null = null
  let browserContext: BrowserContext | null = null
  let page: Page | null = null
  let viteServer: ViteDevServer | null = null

  console.log(
    `Playback integrity selection years=${selection.years.join(',')} songs=${attempts.length} timeoutMs=${playbackAttemptTimeoutMs}`,
  )
  logDivider()

  try {
    const serverSetup = await startViteServer()
    viteServer = serverSetup.viteServer
    browser = await chromium.launch({
      headless: true,
      args: browserLaunchArgs,
    })

    let attemptIndex = 0
    for (const attempt of attempts) {
      if (!browser)
        throw new Error('Playback integrity browser was not created.')
      attemptIndex += 1
      const attemptHarness = await createHarnessPage(
        browser,
        serverSetup.serverOrigin,
      )
      browserContext = attemptHarness.browserContext
      page = attemptHarness.page
      logAttemptStart(attemptIndex, attempts.length, attempt.year, attempt.song)
      const result = await runHarnessAttempt(page, attempt.year, attempt.song)
      await page.close()
      await browserContext.close()
      page = null
      browserContext = null
      if (result.status === 'passed') summary.passed += 1
      else summary.failed += 1
      logAttemptResult(attempt.year, attempt.song, result)
    }
  } finally {
    await page?.close()
    await browserContext?.close()
    await browser?.close()
    await closeViteServer(viteServer)
  }

  logDivider()
  console.log(
    `SUMMARY years=${selection.years.join(',')} total=${summary.total} passed=${summary.passed} failed=${summary.failed}`,
  )
  process.exitCode = getSummaryExitCode(summary)
}

runPlaybackIntegrity().catch((error) => {
  console.error(
    error instanceof Error
      ? error.message
      : 'Playback integrity runner failed unexpectedly.',
  )
  if (
    error instanceof Error &&
    error.message.includes('Executable does not exist')
  )
    console.error(
      'Install Playwright Chromium with `pnpm exec playwright install chromium`.',
    )
  process.exitCode = 1
})
