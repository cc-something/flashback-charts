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
const youtubeVideoUrl = computed(() =>
  props.song.youtubeVideoId
    ? `https://www.youtube.com/watch?v=${props.song.youtubeVideoId}`
    : '',
)
</script>

<template>
  <article
    :id="`song-${year}-${song.rank}`"
    :data-song-rank="song.rank"
    :data-song-id="song.youtubeVideoId"
    class="group relative flex items-center gap-3 overflow-visible rounded-lg bg-surface px-3.5 py-3 transition-colors duration-150 hover:bg-surface/80"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button
      type="button"
      :aria-label="`Play ${song.title} by ${song.artist}`"
      class="absolute inset-0 z-0 cursor-pointer rounded-lg"
      @click="handleClick"
    />
    <span class="w-6 flex-shrink-0 text-center text-lg font-bold text-primary">
      {{ song.rank }}
    </span>

    <button
      type="button"
      :aria-label="`Toggle playback for ${song.title} by ${song.artist}`"
      class="relative z-10 h-14 w-14 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      @click.stop="handleClick"
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
        <Disc3 class="h-7 w-7 text-[#aaa]" />
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

    <div
      class="theme-body pointer-events-none relative z-10 min-w-0 flex-1 flex flex-col gap-0.5"
    >
      <h2 class="text-base font-bold leading-snug text-text">
        {{ song.title }}
      </h2>
      <p class="text-sm leading-snug text-text-muted">{{ song.artist }}</p>
      <p
        v-if="song.album"
        class="text-sm leading-snug italic text-text-muted/75"
      >
        {{ song.album }}
      </p>
    </div>

    <a
      v-if="song.youtubeVideoId"
      :aria-label="`Open ${song.title} by ${song.artist} on YouTube`"
      :href="youtubeVideoUrl"
      class="relative z-20 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-text-muted opacity-0 transition-all duration-150 group-hover:opacity-45 hover:bg-black/8 hover:opacity-70 hover:text-primary focus-visible:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      rel="noreferrer"
      target="_blank"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.4 3.7-6.4 3.7Z"
        />
      </svg>
    </a>

    <Transition name="seek">
      <div
        v-if="showSeekBar"
        class="pointer-events-none absolute inset-x-0 -bottom-1 z-20 overflow-visible"
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
            class="seek-track relative h-1.5 w-full bg-black/10"
            style="
              overflow: hidden;
              border-bottom-left-radius: 0.5rem;
              border-bottom-right-radius: 0.5rem;
            "
          >
            <SliderRange class="seek-range absolute h-full bg-primary" />
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
            />
          </SliderTrack>
          <SliderThumb
            class="seek-thumb block h-3 w-3 rounded-full border border-white/90 bg-primary shadow-[0_1px_3px_rgb(0_0_0_/_0.25)] outline-none"
          />
        </SliderRoot>
        <p
          class="pointer-events-none absolute bottom-3.5 left-1 min-w-fit bg-surface/85 px-1 py-0.5 font-mono text-[0.65rem] font-medium tabular-nums text-text-muted"
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
