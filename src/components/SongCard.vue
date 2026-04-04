<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import type { Song } from '@/types/song'
import { useYouTubeApi } from '@/composables/useYouTubeApi'

const props = defineProps<{ song: Song }>()

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused'

const getFallbackImageUrl = (rank: number) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="#333"/><text x="40" y="44" fill="#aaa" font-size="28" text-anchor="middle" font-family="system-ui, sans-serif">${rank}</text></svg>`,
  )}`

const isHovered = ref(false)
const playerState = ref<PlayerState>('idle')
const playerContainer = ref<HTMLDivElement>()
const currentTimeSeconds = ref(0)
const durationSeconds = ref(0)
const progressTimerId = ref<number | null>(null)
let ytPlayer: YTPlayer | null = null

const { ensureLoaded, registerActive, clearActive } = useYouTubeApi()

const showOverlay = computed(
  () => isHovered.value || playerState.value !== 'idle',
)
const showSeekBar = computed(
  () => playerState.value !== 'idle' && durationSeconds.value > 0,
)
const seekProgressWidth = computed(() => {
  if (durationSeconds.value <= 0) return '0%'

  return `${Math.min((currentTimeSeconds.value / durationSeconds.value) * 100, 100)}%`
})

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallbackApplied) return
  img.dataset.fallbackApplied = 'true'
  img.src = getFallbackImageUrl(props.song.rank)
}

const clearProgressTimer = () => {
  if (progressTimerId.value === null) return
  window.clearInterval(progressTimerId.value)
  progressTimerId.value = null
}

const syncPlaybackProgress = () => {
  if (!ytPlayer) return

  const nextDurationSeconds = ytPlayer.getDuration()
  const nextCurrentTimeSeconds = ytPlayer.getCurrentTime()

  if (nextDurationSeconds > 0) durationSeconds.value = nextDurationSeconds
  if (durationSeconds.value <= 0) return

  currentTimeSeconds.value = Math.min(
    nextCurrentTimeSeconds,
    durationSeconds.value,
  )
}

const startProgressTimer = () => {
  clearProgressTimer()
  syncPlaybackProgress()
  progressTimerId.value = window.setInterval(syncPlaybackProgress, 250)
}

const stopPlayback = () => {
  clearProgressTimer()
  ytPlayer?.destroy()
  ytPlayer = null
  playerState.value = 'idle'
  currentTimeSeconds.value = 0
  durationSeconds.value = 0
  clearActive()
}

const handleSeekInput = (event: Event) => {
  if (!ytPlayer) return

  const input = event.target as HTMLInputElement
  const nextCurrentTimeSeconds = Number(input.value)

  if (Number.isNaN(nextCurrentTimeSeconds)) return

  currentTimeSeconds.value = nextCurrentTimeSeconds
  ytPlayer.seekTo(nextCurrentTimeSeconds, true)
  syncPlaybackProgress()
}

const handleAlbumClick = async () => {
  if (!props.song.youtubeVideoId) return

  if (playerState.value === 'playing') {
    ytPlayer?.pauseVideo()
    return
  }
  if (playerState.value === 'paused') {
    ytPlayer?.playVideo()
    return
  }
  if (playerState.value === 'loading') {
    stopPlayback()
    return
  }

  playerState.value = 'loading'
  registerActive(stopPlayback)

  try {
    await ensureLoaded()
  } catch {
    stopPlayback()
    return
  }

  if (playerState.value !== 'loading') return
  if (!playerContainer.value) {
    stopPlayback()
    return
  }

  ytPlayer = new window.YT!.Player(playerContainer.value, {
    width: '480',
    height: '270',
    videoId: props.song.youtubeVideoId,
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      autoplay: 1,
      controls: 0,
      playsinline: 1,
      rel: 0,
      origin: window.location.origin,
    },
    events: {
      onReady: (event) => {
        startProgressTimer()
        event.target.playVideo()
      },
      onStateChange: (event: YTPlayerEvent) => {
        if (event.data === 1) playerState.value = 'playing'
        else if (event.data === 2) playerState.value = 'paused'
        else if (event.data === 3) playerState.value = 'loading'
        else if (event.data === 0) stopPlayback()

        syncPlaybackProgress()
      },
      onError: () => stopPlayback(),
    },
  })
}

onUnmounted(() => {
  stopPlayback()
})
</script>

<template>
  <article
    class="relative flex items-center gap-4 overflow-hidden rounded-lg bg-surface p-4 transition-colors duration-150 hover:bg-surface/80"
  >
    <span class="w-8 flex-shrink-0 text-center text-2xl font-bold text-primary">
      {{ song.rank }}
    </span>

    <button
      type="button"
      :aria-label="`Toggle playback for ${song.title} by ${song.artist}`"
      class="relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="handleAlbumClick"
    >
      <img
        :src="song.thumbnailPath"
        :alt="`${song.title} by ${song.artist}`"
        class="block h-full w-full object-cover"
        @error="handleImageError"
      />

      <Transition name="overlay">
        <div
          v-if="showOverlay"
          class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <!-- spinner -->
          <svg
            v-if="playerState === 'loading'"
            class="h-7 w-7 animate-spin text-white"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>

          <!-- pause icon -->
          <svg
            v-else-if="playerState === 'playing'"
            class="h-7 w-7 text-white drop-shadow"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>

          <!-- play icon -->
          <svg
            v-else
            class="h-7 w-7 text-white drop-shadow"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </Transition>
    </button>

    <div class="min-w-0 flex-1 flex flex-col gap-1">
      <h2 class="truncate text-base font-bold leading-tight text-text">
        {{ song.title }}
      </h2>
      <p class="truncate text-sm text-text-muted">{{ song.artist }}</p>
      <p v-if="song.album" class="truncate text-xs italic text-text-muted/60">
        {{ song.album }}
      </p>
    </div>

    <Transition name="seek">
      <div
        v-if="showSeekBar"
        class="pointer-events-none absolute inset-x-0 bottom-0 h-4"
      >
        <div class="absolute inset-x-0 bottom-0 h-1 bg-black/10" />
        <div
          class="absolute bottom-0 left-0 h-1 bg-primary"
          :style="{ width: seekProgressWidth }"
        />
        <input
          :value="currentTimeSeconds"
          :max="durationSeconds"
          aria-label="Seek playback"
          class="seek-slider pointer-events-auto absolute inset-x-0 bottom-0 h-4 w-full"
          min="0"
          step="0.1"
          type="range"
          @input="handleSeekInput"
        />
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
        />
      </div>
    </Transition>

    <div
      ref="playerContainer"
      style="
        position: fixed;
        top: -9999px;
        left: -9999px;
        width: 480px;
        height: 270px;
        pointer-events: none;
      "
    />
  </article>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.15s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.seek-enter-active,
.seek-leave-active {
  transition: opacity 0.15s ease;
}

.seek-enter-from,
.seek-leave-to {
  opacity: 0;
}

.seek-slider {
  appearance: none;
  background: transparent;
  cursor: pointer;
  touch-action: none;
}

.seek-slider::-webkit-slider-runnable-track {
  appearance: none;
  background: transparent;
  height: 16px;
}

.seek-slider::-webkit-slider-thumb {
  appearance: none;
  background: var(--color-primary);
  border: 2px solid rgb(255 255 255 / 90%);
  border-radius: 9999px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  height: 12px;
  margin-top: 2px;
  width: 12px;
}

.seek-slider::-moz-range-track {
  background: transparent;
  border: 0;
  height: 16px;
}

.seek-slider::-moz-range-progress {
  background: transparent;
}

.seek-slider::-moz-range-thumb {
  background: var(--color-primary);
  border: 2px solid rgb(255 255 255 / 90%);
  border-radius: 9999px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  height: 12px;
  width: 12px;
}

.seek-slider:focus-visible {
  outline: none;
}

.seek-slider:focus-visible::-webkit-slider-thumb {
  box-shadow:
    0 0 0 2px rgb(255 255 255 / 90%),
    0 0 0 4px rgb(0 0 0 / 18%);
}

.seek-slider:focus-visible::-moz-range-thumb {
  box-shadow:
    0 0 0 2px rgb(255 255 255 / 90%),
    0 0 0 4px rgb(0 0 0 / 18%);
}
</style>
