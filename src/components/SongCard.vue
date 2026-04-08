<script setup lang="ts">
import { ref, computed } from 'vue'
import { Disc3, Flag, MonitorPlay } from 'lucide-vue-next'
import PlaybackSeekBar from './PlaybackSeekBar.vue'
import ReportIssueModal from './ReportIssueModal.vue'
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
const isReportModalOpen = ref(false)

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
    class="group relative flex items-center gap-3 overflow-visible bg-surface px-3.5 py-3 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl hover:bg-surface/80"
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
      class="relative z-10 h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
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

    <div class="relative z-20 flex flex-shrink-0 flex-col gap-1">
      <div v-if="displaySong.youtubeVideoId" class="group/action relative">
        <span
          class="pointer-events-none absolute right-full top-1/2 mr-1 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-white opacity-0 transition-opacity duration-75 group-hover/action:opacity-100 group-focus-within/action:opacity-100"
        >
          YouTube
        </span>
        <a
          :aria-label="`Open ${displaySong.title} by ${displaySong.artist} on YouTube`"
          :href="youtubeVideoUrl"
          class="flex h-11 w-11 items-center justify-center rounded-full text-text-muted opacity-0 transition-all duration-150 group-hover:opacity-45 hover:bg-black/8 hover:opacity-70 hover:text-primary focus-visible:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          rel="noreferrer"
          target="_blank"
        >
          <MonitorPlay class="h-4.5 w-4.5" aria-hidden="true" />
        </a>
      </div>

      <div class="group/action relative">
        <span
          class="pointer-events-none absolute right-full top-1/2 mr-1 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-white opacity-0 transition-opacity duration-75 group-hover/action:opacity-100 group-focus-within/action:opacity-100"
        >
          Report an issue
        </span>
        <button
          type="button"
          :aria-label="`Report an issue with ${displaySong.title} by ${displaySong.artist}`"
          class="flex h-11 w-11 items-center justify-center rounded-full text-text-muted opacity-0 transition-all duration-150 group-hover:opacity-45 hover:bg-black/8 hover:opacity-70 hover:text-primary focus-visible:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          @click.stop="isReportModalOpen = true"
        >
          <Flag class="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <ReportIssueModal
        v-if="isReportModalOpen"
        :song="displaySong"
        :year="year"
        @dismiss="isReportModalOpen = false"
      />
    </Teleport>

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
