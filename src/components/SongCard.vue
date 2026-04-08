<script setup lang="ts">
import { ref, computed } from 'vue'
import { Disc3 } from 'lucide-vue-next'
import PlaybackSeekBar from './PlaybackSeekBar.vue'
import type { Song } from '@/types/song'
import { usePlayerStore } from '@/stores/player'
import {
  useRickRollMode,
  RICK_ASTLEY_SONG,
  RICK_ASTLEY_YEAR,
} from '@/composables/useRickRollMode'

const props = defineProps<{ song: Song; year: number }>()

const player = usePlayerStore()
const { isRickRollActive } = useRickRollMode()
const isHovered = ref(false)
const hasThumbnailError = ref(false)

const displaySong = computed(
  (): Song =>
    isRickRollActive.value
      ? { ...RICK_ASTLEY_SONG, rank: props.song.rank }
      : props.song,
)

const isThisSongActive = computed(() =>
  isRickRollActive.value
    ? player.isSongActive(RICK_ASTLEY_SONG, RICK_ASTLEY_YEAR)
    : player.isSongActive(props.song, props.year),
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

const handleClick = () =>
  isRickRollActive.value
    ? player.play(RICK_ASTLEY_SONG, RICK_ASTLEY_YEAR)
    : player.play(props.song, props.year)
const youtubeVideoUrl = computed(() =>
  displaySong.value.youtubeVideoId
    ? `https://www.youtube.com/watch?v=${displaySong.value.youtubeVideoId}`
    : '',
)
</script>

<template>
  <article
    :id="`song-${year}-${song.rank}`"
    :data-song-rank="song.rank"
    :data-song-id="song.youtubeVideoId"
    class="group relative flex items-center gap-3 overflow-visible bg-surface px-3.5 py-3 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg hover:bg-surface/80"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button
      type="button"
      :aria-label="`Play ${displaySong.title} by ${displaySong.artist}`"
      class="absolute inset-0 z-0 cursor-pointer"
      @click="handleClick"
    />
    <span
      class="w-6 flex-shrink-0 text-center text-base sm:text-lg font-bold text-primary"
    >
      {{ displaySong.rank }}
    </span>

    <button
      type="button"
      :aria-label="`Toggle playback for ${displaySong.title} by ${displaySong.artist}`"
      class="relative z-10 h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      @click.stop="handleClick"
    >
      <img
        v-if="!hasThumbnailError"
        :src="displaySong.thumbnailPath"
        :alt="`${displaySong.title} by ${displaySong.artist}`"
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
      class="theme-body pointer-events-none relative z-10 min-w-0 flex-1 flex flex-col"
    >
      <h2 class="text-base sm:text-lg font-bold leading-snug text-text">
        {{ displaySong.title }}
      </h2>
      <p class="text-sm sm:text-base leading-snug text-text-muted">
        {{ displaySong.artist }}
      </p>
      <p
        v-if="displaySong.album"
        class="text-sm sm:text-base leading-snug italic text-text-muted/75"
      >
        {{ displaySong.album }}
      </p>
    </div>

    <a
      v-if="displaySong.youtubeVideoId"
      :aria-label="`Open ${displaySong.title} by ${displaySong.artist} on YouTube`"
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
        class="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-visible"
      >
        <PlaybackSeekBar root-class="pointer-events-auto relative z-10" />
        <p
          class="pointer-events-none absolute bottom-3.5 right-3.5 min-w-fit font-mono text-[0.65rem] font-medium tabular-nums text-text-muted"
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
</style>
