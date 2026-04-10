<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useYouTubeApi } from '@/composables/useYouTubeApi'

const EMBED_BLOCKED_ERROR_CODES = new Set([101, 150])
const playerViewportEl = ref<HTMLDivElement | null>(null)
const statusMessage = ref('Waiting for initialization')
const lastAttempt = ref<PlaybackIntegrityAttemptResult | null>(null)
const { ensureLoaded } = useYouTubeApi()

let activeAttemptId = 0
let attemptStartedAt = 0
let attemptStateSequence: number[] = []
let attemptTimeoutId: number | null = null
let playerReadyPromise: Promise<YTPlayer> | null = null
let resolveAttempt: ((result: PlaybackIntegrityAttemptResult) => void) | null =
  null
let ytPlayer: YTPlayer | null = null

const clearAttemptTimeout = () => {
  if (attemptTimeoutId === null) return
  clearTimeout(attemptTimeoutId)
  attemptTimeoutId = null
}

const stopPlayer = () => {
  try {
    ytPlayer?.stopVideo()
  } catch {
    /* noop */
  }
}

const getDurationMs = () =>
  attemptStartedAt > 0 ? Math.max(0, Date.now() - attemptStartedAt) : 0

const createAttemptResult = (
  status: PlaybackIntegrityAttemptStatus,
  reason: PlaybackIntegrityAttemptReason,
  message: string,
  errorCode: number | null = null,
): PlaybackIntegrityAttemptResult => ({
  status,
  reason,
  errorCode,
  message,
  durationMs: getDurationMs(),
  stateSequence: [...attemptStateSequence],
})

const settleAttempt = (
  attemptId: number,
  result: PlaybackIntegrityAttemptResult,
) => {
  if (attemptId !== activeAttemptId || !resolveAttempt) return
  const resolveCurrentAttempt = resolveAttempt
  resolveAttempt = null
  clearAttemptTimeout()
  lastAttempt.value = result
  statusMessage.value = result.message
  stopPlayer()
  resolveCurrentAttempt(result)
}

const getErrorReason = (errorCode?: number): PlaybackIntegrityAttemptReason =>
  errorCode !== undefined && EMBED_BLOCKED_ERROR_CODES.has(errorCode)
    ? 'embed-blocked'
    : 'youtube-error'

const getErrorMessage = (
  errorCode?: number,
  title?: string,
  artist?: string,
) => {
  const songLabel =
    title && artist ? `"${title}" by ${artist}` : 'Requested video'
  if (errorCode !== undefined && EMBED_BLOCKED_ERROR_CODES.has(errorCode))
    return `${songLabel} is blocked from embedded playback (${errorCode}).`
  return `${songLabel} failed during YouTube playback${
    errorCode !== undefined ? ` (${errorCode}).` : '.'
  }`
}

const getPlayerSetupReason = (
  error: unknown,
): Extract<
  PlaybackIntegrityAttemptReason,
  'api-load-failed' | 'player-load-failed'
> =>
  error instanceof Error &&
  error.message === 'YouTube API script failed to load'
    ? 'api-load-failed'
    : 'player-load-failed'

const handlePlayerStateChange = (event: YTPlayerEvent) => {
  if (!resolveAttempt) return
  attemptStateSequence = [...attemptStateSequence, event.data]
  if (event.data !== 1) return
  settleAttempt(
    activeAttemptId,
    createAttemptResult('passed', 'playing', 'Playback reached playing state.'),
  )
}

const handlePlayerError = (event: YTPlayerEvent) => {
  if (!resolveAttempt) return
  attemptStateSequence = [...attemptStateSequence, event.data]
  settleAttempt(
    activeAttemptId,
    createAttemptResult(
      'failed',
      getErrorReason(event.data),
      getErrorMessage(event.data),
      event.data,
    ),
  )
}

const ensurePlayer = async () => {
  if (ytPlayer) return ytPlayer
  if (playerReadyPromise) return playerReadyPromise
  const playerViewport = playerViewportEl.value
  if (!playerViewport)
    throw new Error('Playback integrity player viewport missing')
  statusMessage.value = 'Loading YouTube iframe API'
  await ensureLoaded()
  playerReadyPromise = new Promise<YTPlayer>((resolve) => {
    ytPlayer = new window.YT!.Player(playerViewport, {
      width: '640',
      height: '360',
      playerVars: {
        autoplay: 0,
        controls: 0,
        playsinline: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          event.target.mute()
          statusMessage.value = 'Playback integrity harness ready'
          resolve(event.target)
        },
        onStateChange: handlePlayerStateChange,
        onError: handlePlayerError,
      },
    })
  })
  return playerReadyPromise
}

const initialize = async () => {
  await ensurePlayer()
}

const reset = () => {
  activeAttemptId += 1
  resolveAttempt = null
  clearAttemptTimeout()
  attemptStartedAt = 0
  attemptStateSequence = []
  lastAttempt.value = null
  statusMessage.value = 'Playback integrity harness ready'
  stopPlayer()
}

const runAttempt = async (options: PlaybackIntegrityAttemptOptions) => {
  reset()
  activeAttemptId += 1
  const attemptId = activeAttemptId
  attemptStartedAt = Date.now()
  attemptStateSequence = []
  statusMessage.value = `Testing "${options.title}" by ${options.artist}`
  try {
    const player = await ensurePlayer()
    return await new Promise<PlaybackIntegrityAttemptResult>((resolve) => {
      resolveAttempt = resolve
      attemptTimeoutId = window.setTimeout(
        () =>
          settleAttempt(
            attemptId,
            createAttemptResult(
              'failed',
              'timeout',
              `"${options.title}" by ${options.artist} timed out before playback started.`,
            ),
          ),
        options.timeoutMs,
      )
      player.mute()
      player.loadVideoById(options.videoId)
      player.playVideo()
    })
  } catch (error) {
    const result = createAttemptResult(
      'failed',
      getPlayerSetupReason(error),
      error instanceof Error
        ? error.message
        : 'Playback integrity player failed',
    )
    lastAttempt.value = result
    statusMessage.value = result.message
    return result
  }
}

onMounted(() => {
  window.__FLASHBACK_PLAYBACK_INTEGRITY__ = {
    initialize,
    runAttempt,
    reset,
    getLastAttempt: () => lastAttempt.value,
  }
})

onUnmounted(() => {
  window.__FLASHBACK_PLAYBACK_INTEGRITY__ = undefined
  clearAttemptTimeout()
  stopPlayer()
  ytPlayer?.destroy()
  ytPlayer = null
  playerReadyPromise = null
})
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-8">
    <section
      class="rounded-2xl border border-black/10 bg-surface p-5 shadow-sm"
    >
      <h1 class="mb-2 text-2xl font-bold text-text">
        Playback Integrity Harness
      </h1>
      <p class="mb-4 text-sm text-text-muted">
        This page is used by the `playback-integrity` CLI to validate YouTube
        iframe playback.
      </p>
      <p class="font-mono text-sm text-text">{{ statusMessage }}</p>
    </section>

    <section
      class="rounded-2xl border border-black/10 bg-surface p-5 shadow-sm"
    >
      <div class="overflow-hidden rounded-xl bg-black shadow-lg">
        <div ref="playerViewportEl" class="aspect-video w-full bg-black" />
      </div>
    </section>

    <section
      class="rounded-2xl border border-black/10 bg-surface p-5 shadow-sm"
    >
      <h2 class="mb-3 text-lg font-bold text-text">Last Attempt</h2>
      <pre
        class="overflow-x-auto rounded-xl bg-black px-4 py-3 font-mono text-xs leading-6 text-white"
        >{{ JSON.stringify(lastAttempt, null, 2) }}</pre
      >
    </section>
  </main>
</template>
