<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { Disc3 } from 'lucide-vue-next'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import type { Song } from '@/types/song'
import { useYouTubeApi } from '@/composables/useYouTubeApi'

const props = defineProps<{ song: Song }>()
const emit = defineEmits<{ ended: [] }>()

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused'

const isHovered = ref(false)
const hasThumbnailError = ref(false)
const playerState = ref<PlayerState>('idle')
const playerContainer = ref<HTMLDivElement>()
const currentTimeSeconds = ref(0)
const durationSeconds = ref(0)
const progressTimerId = ref<number | null>(null)
const isSeekDragging = ref(false)
const seekPreviewSeconds = ref<number | null>(null)
let ytPlayer: YTPlayer | null = null

const { ensureLoaded, registerActive, clearActive } = useYouTubeApi()

const showOverlay = computed(
  () => isHovered.value || playerState.value !== 'idle',
)
const showSeekBar = computed(
  () => playerState.value !== 'idle' && durationSeconds.value > 0,
)
const seekSliderValue = computed(() => [displayedTimeSeconds.value])
const displayedTimeSeconds = computed(
  () => seekPreviewSeconds.value ?? currentTimeSeconds.value,
)
const formatPlaybackTime = (timeSeconds: number) => {
  if (!Number.isFinite(timeSeconds) || timeSeconds <= 0) return '0:00'

  const wholeSeconds = Math.floor(timeSeconds)
  const minutes = Math.floor(wholeSeconds / 60)
  const seconds = wholeSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
const formattedCurrentTime = computed(() =>
  formatPlaybackTime(displayedTimeSeconds.value),
)
const formattedDuration = computed(() =>
  formatPlaybackTime(durationSeconds.value),
)

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallbackApplied) return
  img.dataset.fallbackApplied = 'true'
  hasThumbnailError.value = true
}

const clearProgressTimer = () => {
  if (progressTimerId.value === null) return
  window.clearInterval(progressTimerId.value)
  progressTimerId.value = null
}

const clearSeekPreview = () => {
  isSeekDragging.value = false
  seekPreviewSeconds.value = null
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

  if (!isSeekDragging.value && seekPreviewSeconds.value !== null) {
    const seekDelta = Math.abs(
      currentTimeSeconds.value - seekPreviewSeconds.value,
    )

    if (seekDelta < 0.75 || playerState.value !== 'loading') {
      seekPreviewSeconds.value = null
    }
  }
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
  clearSeekPreview()
  clearActive()
}

const getSeekValue = (nextValue: number[]) => {
  const [nextCurrentTimeSeconds] = nextValue

  if (nextCurrentTimeSeconds === undefined) return null
  return Number.isNaN(nextCurrentTimeSeconds) ? null : nextCurrentTimeSeconds
}

const handleSeekInput = (nextValue: number[]) => {
  const nextCurrentTimeSeconds = getSeekValue(nextValue)

  if (nextCurrentTimeSeconds === null) return

  isSeekDragging.value = true
  seekPreviewSeconds.value = nextCurrentTimeSeconds
}

const handleSeekCommit = (nextValue: number[]) => {
  if (!ytPlayer) {
    clearSeekPreview()
    return
  }

  const nextCurrentTimeSeconds = getSeekValue(nextValue)

  if (nextCurrentTimeSeconds === null) {
    clearSeekPreview()
    return
  }

  isSeekDragging.value = false
  seekPreviewSeconds.value = nextCurrentTimeSeconds
  playerState.value = 'loading'
  ytPlayer.seekTo(nextCurrentTimeSeconds, true)
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
        else if (event.data === 0) {
          stopPlayback()
          emit('ended')
        }

        syncPlaybackProgress()
      },
      onError: () => stopPlayback(),
    },
  })
}

onUnmounted(() => {
  stopPlayback()
})

defineExpose({ play: handleAlbumClick })
</script>

<template>
  <article
    class="relative flex items-center gap-4 overflow-visible rounded-lg bg-surface p-4 transition-colors duration-150 hover:bg-surface/80"
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
        v-if="!hasThumbnailError"
        :src="song.thumbnailPath"
        :alt="`${song.title} by ${song.artist}`"
        class="block h-full w-full object-cover"
        @error="handleImageError"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-[#333]"
      >
        <Disc3 class="h-10 w-10 text-[#aaa]" />
      </div>

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
      <h2 class="text-base font-bold leading-tight text-text">
        {{ song.title }}
      </h2>
      <p class="text-sm text-text-muted">{{ song.artist }}</p>
      <p v-if="song.album" class="text-xs italic text-text-muted/60">
        {{ song.album }}
      </p>
    </div>

    <Transition name="seek">
      <div
        v-if="showSeekBar"
        class="pointer-events-none absolute inset-x-0 bottom-0"
      >
        <SliderRoot
          :max="durationSeconds"
          :min="0"
          :model-value="seekSliderValue"
          :step="0.1"
          aria-label="Seek playback"
          class="seek-slider pointer-events-auto relative z-10 flex w-full touch-manipulation items-center"
          @update:model-value="handleSeekInput"
          @value-commit="handleSeekCommit"
        >
          <SliderTrack
            class="seek-track relative h-1.5 w-full overflow-hidden rounded-bl-lg rounded-br-lg bg-black/10"
          >
            <SliderRange
              class="seek-range absolute h-full rounded-bl-lg bg-primary"
            />
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
            />
          </SliderTrack>
          <SliderThumb
            class="seek-thumb block h-4 w-4 rounded-full border-2 border-white/90 bg-primary shadow-[0_1px_3px_rgb(0_0_0_/_0.25)] outline-none"
          />
        </SliderRoot>
        <p
          class="pointer-events-none absolute bottom-3.5 left-2 min-w-fit bg-surface/85 px-1 text-[0.55rem] font-medium tabular-nums text-text-muted"
        >
          {{ formattedCurrentTime }}/{{ formattedDuration }}
        </p>
      </div>
    </Transition>

    <!-- Kept on-screen so mobile browsers don't block playback -->
    <div
      ref="playerContainer"
      style="
        position: fixed;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 1px;
        opacity: 0.01;
        overflow: hidden;
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

.seek-slider[data-orientation='horizontal'] {
  display: flex;
}

.seek-track[data-orientation='horizontal'] {
  flex: 1;
}

.seek-range[data-orientation='horizontal'] {
  left: 0;
}

.seek-thumb {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.seek-thumb:hover {
  transform: scale(1.08);
}

.seek-thumb:focus-visible {
  box-shadow:
    0 0 0 2px rgb(255 255 255 / 90%),
    0 0 0 4px rgb(0 0 0 / 18%);
}
</style>
