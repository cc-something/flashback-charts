<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import ErrorToast from '@/components/ErrorToast.vue'
import { usePlayerStore } from '@/stores/player'
import { useToastStore } from '@/stores/toast'

const playerViewportEl = ref<HTMLDivElement | null>(null)
const statusMessage = ref('Waiting for initialization')
const lastAttempt = ref<PlaybackIntegrityAttemptResult | null>(null)
const previousMutedState = ref<boolean | null>(null)
const player = usePlayerStore()
const toast = useToastStore()

let activeAttemptId = 0
let attemptStartedAt = 0
let attemptStateSequence: number[] = []
let attemptTimeoutId: number | null = null
let queuedAttemptOptions: PlaybackIntegrityAttemptOptions | null = null

const clearAttemptTimeout = () => {
  if (attemptTimeoutId === null) return
  clearTimeout(attemptTimeoutId)
  attemptTimeoutId = null
}

const clearToasts = () => {
  for (const currentToast of toast.toasts) toast.dismiss(currentToast.id)
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

const initialize = async () => {
  await nextTick()
  player.setPlayerContainer(playerViewportEl.value)
  if (previousMutedState.value === null)
    previousMutedState.value = player.isMuted
  player.setMuted(true)
  await player.preload()
  statusMessage.value = 'Playback integrity harness ready'
}

const reset = () => {
  activeAttemptId += 1
  clearAttemptTimeout()
  attemptStartedAt = 0
  attemptStateSequence = []
  queuedAttemptOptions = null
  lastAttempt.value = null
  clearToasts()
  player.stop()
  statusMessage.value = 'Playback integrity harness ready'
}

const startQueuedAttempt = () => {
  if (!queuedAttemptOptions) return
  const options = queuedAttemptOptions
  queuedAttemptOptions = null
  player.setMuted(true)
  void player.preload().then(() => {
    void player.play(options.song, options.year, 'direct')
  })
}

const runAttempt = async (options: PlaybackIntegrityAttemptOptions) => {
  reset()
  activeAttemptId += 1
  const attemptId = activeAttemptId
  attemptStartedAt = Date.now()
  attemptStateSequence = []
  statusMessage.value = `Testing "${options.song.title}" by ${options.song.artist}`
  try {
    return await new Promise<PlaybackIntegrityAttemptResult>((resolve) => {
      const stopStateWatch = watch(
        () => player.playerState,
        (playerState) => {
          const nextStateCode =
            playerState === 'playing'
              ? 1
              : playerState === 'paused'
                ? 2
                : playerState === 'loading'
                  ? 3
                  : -1
          attemptStateSequence = [...attemptStateSequence, nextStateCode]
          if (playerState !== 'playing') return
          clearAttemptTimeout()
          stopStateWatch()
          stopToastWatch()
          const result = createAttemptResult(
            'passed',
            'playing',
            'Playback reached playing state.',
          )
          lastAttempt.value = result
          statusMessage.value = result.message
          player.stop()
          resolve(result)
        },
      )
      const stopToastWatch = watch(
        () => [...toast.toasts],
        (toasts) => {
          const latestErrorToast = [...toasts]
            .reverse()
            .find((currentToast) => currentToast.variant === 'error')
          if (!latestErrorToast) return
          clearAttemptTimeout()
          stopStateWatch()
          stopToastWatch()
          const isEmbedBlocked = latestErrorToast.message.includes(
            "can't play in the embedded player",
          )
          const result = createAttemptResult(
            'failed',
            isEmbedBlocked ? 'embed-blocked' : 'youtube-error',
            latestErrorToast.message,
          )
          lastAttempt.value = result
          statusMessage.value = result.message
          player.stop()
          resolve(result)
        },
      )
      attemptTimeoutId = window.setTimeout(() => {
        if (attemptId !== activeAttemptId) return
        stopStateWatch()
        stopToastWatch()
        const result = createAttemptResult(
          'failed',
          'timeout',
          `"${options.song.title}" by ${options.song.artist} timed out before playback started.`,
        )
        lastAttempt.value = result
        statusMessage.value = result.message
        player.stop()
        resolve(result)
      }, options.timeoutMs)
      queuedAttemptOptions = options
    })
  } catch (error) {
    const result = createAttemptResult(
      'failed',
      error instanceof Error &&
        error.message === 'YouTube API script failed to load'
        ? 'api-load-failed'
        : 'player-load-failed',
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
  player.setPlayerContainer(playerViewportEl.value)
  window.__FLASHBACK_PLAYBACK_INTEGRITY__ = {
    initialize,
    runAttempt,
    reset,
    startQueuedAttempt,
    hasQueuedAttempt: () => Boolean(queuedAttemptOptions),
    getLastAttempt: () => lastAttempt.value,
  }
})

onUnmounted(() => {
  window.__FLASHBACK_PLAYBACK_INTEGRITY__ = undefined
  clearAttemptTimeout()
  clearToasts()
  player.stop()
  if (previousMutedState.value !== null)
    player.setMuted(previousMutedState.value)
  player.setPlayerContainer(null)
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

    <button
      data-testid="playback-integrity-start"
      class="fixed left-4 top-4 z-50 rounded bg-black px-2 py-1 font-mono text-[10px] text-white shadow-lg"
      type="button"
      @click="startQueuedAttempt"
    >
      Start playback integrity attempt
    </button>

    <section
      class="rounded-2xl border border-black/10 bg-surface p-5 shadow-sm"
    >
      <h2 class="mb-3 text-lg font-bold text-text">Last Attempt</h2>
      <pre
        class="overflow-x-auto rounded-xl bg-black px-4 py-3 font-mono text-xs leading-6 text-white"
        >{{ JSON.stringify(lastAttempt, null, 2) }}</pre
      >
    </section>

    <ErrorToast />
  </main>
</template>
