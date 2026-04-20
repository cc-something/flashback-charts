<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import type { Song } from '@/types/song'
import {
  createYouTubePlayerAdapter,
  getIsEmbedBlockedError,
} from '@/utils/youtubePlayer'

const playerViewportEl = ref<HTMLDivElement | null>(null)
const statusMessage = ref('Waiting for initialization')
const lastAttempt = ref<PlaybackIntegrityAttemptResult | null>(null)

let activeAttemptId = 0
let attemptStartedAt = 0
let attemptStateSequence: number[] = []
let attemptTimeoutId: number | null = null
let attemptPollId: number | null = null
let queuedAttemptOptions: PlaybackIntegrityAttemptOptions | null = null
let queuedAttemptResolver:
  | ((result: PlaybackIntegrityAttemptResult) => void)
  | null = null
let queuedAttemptCleanup: (() => void) | null = null
let localPlayer: ReturnType<typeof createYouTubePlayerAdapter> | null = null
let lastKnownPlayerState: number | null = null
let lastObservedTimeSeconds = 0
let observedProgressTicks = 0

const clearAttemptTimeout = () => {
  if (attemptTimeoutId === null) return
  clearTimeout(attemptTimeoutId)
  attemptTimeoutId = null
}

const clearAttemptPoll = () => {
  if (attemptPollId === null) return
  clearInterval(attemptPollId)
  attemptPollId = null
}

const clearAttemptTracking = () => {
  clearAttemptTimeout()
  clearAttemptPoll()
  queuedAttemptCleanup?.()
  queuedAttemptCleanup = null
  queuedAttemptResolver = null
  queuedAttemptOptions = null
  lastKnownPlayerState = null
  lastObservedTimeSeconds = 0
  observedProgressTicks = 0
}

const getDurationMs = () =>
  attemptStartedAt > 0 ? Math.max(0, Date.now() - attemptStartedAt) : 0

const createAttemptResult = (
  status: PlaybackIntegrityAttemptStatus,
  reason: PlaybackIntegrityAttemptReason,
  message: string,
  errorCode: number | null = null,
): PlaybackIntegrityAttemptResult => ({
  durationMs: getDurationMs(),
  errorCode,
  message,
  reason,
  stateSequence: [...attemptStateSequence],
  status,
})

const stopLocalPlayer = () => {
  if (!localPlayer) return
  void localPlayer.stopVideo()
}

const finalizeAttempt = (
  status: PlaybackIntegrityAttemptStatus,
  reason: PlaybackIntegrityAttemptReason,
  message: string,
  errorCode: number | null = null,
) => {
  const result = createAttemptResult(status, reason, message, errorCode)
  lastAttempt.value = result
  statusMessage.value = result.message
  stopLocalPlayer()
  const resolveAttempt = queuedAttemptResolver
  clearAttemptTracking()
  resolveAttempt?.(result)
  return result
}

const ensureLocalPlayer = async () => {
  if (typeof window === 'undefined') return null
  if (localPlayer) return localPlayer
  const mountHost = playerViewportEl.value
  if (!mountHost) return null
  const mountEl = document.createElement('div')
  mountEl.className = 'h-full w-full'
  mountHost.replaceChildren(mountEl)
  localPlayer = createYouTubePlayerAdapter(mountEl, {
    onError: (errorCode) => {
      if (!queuedAttemptResolver) return
      finalizeAttempt(
        'failed',
        getIsEmbedBlockedError(errorCode) ? 'embed-blocked' : 'youtube-error',
        getIsEmbedBlockedError(errorCode)
          ? "This upload can't play in the embedded player."
          : 'YouTube returned an error while playback was starting.',
        errorCode,
      )
    },
    onReady: () => {
      if (!localPlayer) return
      void localPlayer.mute()
      void localPlayer.setVolume(0)
    },
    onStateChange: (stateCode) => {
      if (!queuedAttemptResolver) return
      lastKnownPlayerState = stateCode
      attemptStateSequence = [...attemptStateSequence, stateCode]
    },
  })
  await localPlayer.mute()
  await localPlayer.setVolume(0)
  return localPlayer
}

const syncAttemptHealth = async (attemptId: number, song: Song) => {
  if (attemptId !== activeAttemptId || !localPlayer) return
  try {
    const nextCurrentTime = await localPlayer.getCurrentTime()
    if (attemptId !== activeAttemptId) return
    if (
      lastKnownPlayerState === 1 &&
      nextCurrentTime - lastObservedTimeSeconds >= 0.35
    )
      observedProgressTicks += 1
    lastObservedTimeSeconds = nextCurrentTime
    if (lastKnownPlayerState === 1 && observedProgressTicks >= 2) {
      finalizeAttempt('passed', 'playing', 'Playback reached stable progress.')
      return
    }
    if (lastKnownPlayerState === 0)
      finalizeAttempt(
        'failed',
        'stalled',
        `"${song.title}" by ${song.artist} ended before playback stabilised.`,
      )
  } catch {
    if (attemptId !== activeAttemptId) return
    finalizeAttempt(
      'failed',
      'player-load-failed',
      'Playback integrity player failed while polling progress.',
    )
  }
}

const initialize = async () => {
  await nextTick()
  await ensureLocalPlayer()
  statusMessage.value = 'Playback integrity harness ready'
}

const reset = () => {
  activeAttemptId += 1
  clearAttemptTracking()
  attemptStartedAt = 0
  attemptStateSequence = []
  lastAttempt.value = null
  statusMessage.value = 'Playback integrity harness ready'
  stopLocalPlayer()
}

const startQueuedAttempt = async () => {
  if (!queuedAttemptOptions) return
  const player = await ensureLocalPlayer()
  if (!player)
    return finalizeAttempt(
      'failed',
      'player-load-failed',
      'Playback integrity player failed to initialise.',
    )
  const attemptId = activeAttemptId
  const options = queuedAttemptOptions
  statusMessage.value = `Starting "${options.song.title}" by ${options.song.artist}"`
  clearAttemptTimeout()
  clearAttemptPoll()
  await player.loadVideoById({
    videoId: options.song.youtubeVideoId!,
  })
  attemptPollId = window.setInterval(
    () => void syncAttemptHealth(attemptId, options.song),
    250,
  )
  attemptTimeoutId = window.setTimeout(() => {
    if (attemptId !== activeAttemptId || !queuedAttemptOptions) return
    finalizeAttempt(
      'failed',
      lastKnownPlayerState === 1 ? 'stalled' : 'timeout',
      lastKnownPlayerState === 1
        ? `"${options.song.title}" by ${options.song.artist} stalled before playback became stable.`
        : `"${options.song.title}" by ${options.song.artist} timed out before playback started.`,
    )
  }, options.timeoutMs)
}

const runAttempt = async (options: PlaybackIntegrityAttemptOptions) => {
  reset()
  activeAttemptId += 1
  attemptStartedAt = Date.now()
  attemptStateSequence = []
  statusMessage.value = `Testing "${options.song.title}" by ${options.song.artist}"`
  return await new Promise<PlaybackIntegrityAttemptResult>((resolve) => {
    queuedAttemptOptions = options
    queuedAttemptResolver = resolve
    queuedAttemptCleanup = () => {
      queuedAttemptResolver = null
      queuedAttemptOptions = null
    }
  })
}

const queueAttempt = (options: PlaybackIntegrityAttemptOptions) => {
  queuedAttemptOptions = options
}

onMounted(() => {
  window.__FLASHBACK_PLAYBACK_INTEGRITY__ = {
    getLastAttempt: () => lastAttempt.value,
    hasQueuedAttempt: () => Boolean(queuedAttemptOptions),
    initialize,
    queueAttempt,
    reset,
    runAttempt,
    startQueuedAttempt,
  }
})

onUnmounted(() => {
  window.__FLASHBACK_PLAYBACK_INTEGRITY__ = undefined
  clearAttemptTracking()
  stopLocalPlayer()
  if (localPlayer) void localPlayer.destroy()
  localPlayer = null
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
      <button
        type="button"
        data-playback-start
        data-testid="playback-integrity-start"
        class="mb-3 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white"
        @click="startQueuedAttempt"
      >
        Start queued attempt
      </button>
      <div class="overflow-hidden rounded-xl bg-black shadow-lg">
        <div
          ref="playerViewportEl"
          class="h-[360px] w-full min-w-[640px] bg-black"
        />
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
