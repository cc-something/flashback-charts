import { chromium } from 'playwright'
import type { Browser, Page } from 'playwright'
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
const playbackHarnessPath = '/__integrity/playback'
const playbackAttemptTimeoutMs = 20_000
const defaultServerOrigin = 'http://127.0.0.1:4719'

const formatSongLabel = (year: number, song: Song) =>
  `${year} #${song.rank} "${song.title}" by ${song.artist} [${song.youtubeVideoId ?? 'missing-video-id'}]`

const formatDurationMs = (durationMs: number) =>
  `${(durationMs / 1000).toFixed(2)}s`

const formatStateSequence = (stateSequence: number[]) =>
  stateSequence.length > 0 ? stateSequence.join(',') : '-'

const logDivider = () =>
  console.log('------------------------------------------------------------')

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
    const attemptPromise = page.evaluate(
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
  const selection = resolvePlaybackIntegritySelection(process.argv.slice(2))
  const attempts = getAttempts(selection)
  const summary: PlaybackIntegritySummary = {
    total: attempts.length,
    passed: 0,
    failed: 0,
  }
  let browser: Browser | null = null
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
    page = await browser.newPage({ viewport: { width: 1440, height: 1024 } })
    await initializeHarness(page, serverSetup.serverOrigin)

    let attemptIndex = 0
    for (const attempt of attempts) {
      attemptIndex += 1
      logAttemptStart(attemptIndex, attempts.length, attempt.year, attempt.song)
      const result = await runHarnessAttempt(page, attempt.year, attempt.song)
      if (result.status === 'passed') summary.passed += 1
      else summary.failed += 1
      logAttemptResult(attempt.year, attempt.song, result)
      await page.evaluate(() =>
        window.__FLASHBACK_PLAYBACK_INTEGRITY__!.reset(),
      )
    }
  } finally {
    await page?.close()
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
