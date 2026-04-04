<script setup lang="ts">
import { ref, computed } from 'vue'
import { Disc3 } from 'lucide-vue-next'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import type { Song } from '@/types/song'
import { usePlayerStore } from '@/stores/player'

const props = defineProps<{ song: Song; year: number }>()

const player = usePlayerStore()
const isHovered = ref(false)
const hasThumbnailError = ref(false)

const isThisSongActive = computed(() =>
  player.isSongActive(props.song, props.year),
)
const thisPlayerState = computed(() =>
  isThisSongActive.value ? player.playerState : 'idle',
)
const showOverlay = computed(
  () => isHovered.value || thisPlayerState.value !== 'idle',
)
const showSeekBar = computed(() => isThisSongActive.value && player.showSeekBar)

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallbackApplied) return
  img.dataset.fallbackApplied = 'true'
  hasThumbnailError.value = true
}

const handleClick = () => player.play(props.song, props.year)
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
      @click="handleClick"
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
            v-if="thisPlayerState === 'loading'"
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
            v-else-if="thisPlayerState === 'playing'"
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
          :max="player.durationSeconds"
          :min="0"
          :model-value="player.seekSliderValue"
          :step="0.1"
          aria-label="Seek playback"
          class="seek-slider pointer-events-auto relative z-10 flex w-full touch-manipulation items-center"
          @update:model-value="player.handleSeekInput"
          @value-commit="player.handleSeekCommit"
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
          class="pointer-events-none absolute bottom-1.5 left-2 min-w-fit bg-surface/85 px-1 text-[0.55rem] font-medium tabular-nums text-text-muted"
        >
          {{ player.formattedCurrentTime }}/{{ player.formattedDuration }}
        </p>
      </div>
    </Transition>
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
