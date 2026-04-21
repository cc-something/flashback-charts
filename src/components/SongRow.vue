<script setup lang="ts">
import { computed, ref } from 'vue'
import { Disc3, Flag } from 'lucide-vue-next'
import EmbedFallbackBadge from './EmbedFallbackBadge.vue'
import PlaybackSeekBar from './PlaybackSeekBar.vue'
import ReportIssueModal from './ReportIssueModal.vue'
import type { Song } from '@/types/song'
import { usePlayerStore } from '@/stores/player'
import {
  useRickRollMode,
  RICK_ASTLEY_SONG,
  RICK_ASTLEY_YEAR,
} from '@/composables/useRickRollMode'

const props = withDefaults(
  defineProps<{
    song: Song
    year: number
    showEmbedWarning?: boolean
    variant?: 'card' | 'maxi'
  }>(),
  {
    showEmbedWarning: false,
    variant: 'card',
  },
)

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
const showSeekBar = computed(
  () =>
    isThisSongActive.value &&
    player.showSeekBar &&
    (!isRickRollActive.value ||
      props.song.youtubeVideoId === RICK_ASTLEY_SONG.youtubeVideoId),
)
const isTemporarilyHighlighted = computed(() =>
  player.isSongHighlighted(props.year, props.song.rank),
)
const rootClass = computed(() =>
  props.variant === 'maxi'
    ? [
        'group relative flex items-center gap-3 overflow-visible bg-surface px-3.5 py-3 transition-[background-color,box-shadow] duration-150 hover:bg-surface/80',
        isTemporarilyHighlighted.value && 'song-card-highlight',
      ]
    : [
        'group relative flex items-center gap-3 overflow-visible bg-surface px-3.5 py-3 transition-[background-color,box-shadow] duration-150 first:rounded-t-xl last:rounded-b-xl hover:bg-surface/80',
        isTemporarilyHighlighted.value && 'song-card-highlight',
      ],
)
const reportClass = computed(() =>
  props.variant === 'maxi'
    ? 'absolute top-1.5 right-1.5 z-20 flex flex-row gap-0.5 opacity-100 transition-opacity duration-150'
    : 'absolute top-1.5 right-1.5 z-20 flex flex-row gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100',
)
const textStackClass = computed(() =>
  showSeekBar.value
    ? 'theme-body pointer-events-none relative z-10 flex min-w-0 flex-1 flex-col pr-20 sm:pr-24'
    : 'theme-body pointer-events-none relative z-10 flex min-w-0 flex-1 flex-col pr-12 sm:pr-16',
)

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallbackApplied) return
  img.dataset.fallbackApplied = 'true'
  hasThumbnailError.value = true
}
const handleClick = () =>
  isRickRollActive.value
    ? player.play(RICK_ASTLEY_SONG, RICK_ASTLEY_YEAR, 'rickroll')
    : player.play(props.song, props.year, 'direct')
const primePlayback = () =>
  isRickRollActive.value
    ? void player.primePlayback(RICK_ASTLEY_SONG, RICK_ASTLEY_YEAR)
    : void player.primePlayback(props.song, props.year)
</script>

<template>
  <article
    :id="variant === 'card' ? `song-${year}-${song.rank}` : undefined"
    :data-song-rank="song.rank"
    :data-song-id="song.youtubeVideoId"
    :class="rootClass"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button
      type="button"
      :aria-label="`Play ${displaySong.title} by ${displaySong.artist}`"
      class="absolute inset-0 z-0 cursor-pointer"
      @pointerdown="primePlayback"
      @click="handleClick"
    />
    <span
      class="flex w-10 flex-shrink-0 items-baseline justify-center gap-0.5 text-center text-xl font-bold leading-none text-primary sm:w-11 sm:text-2xl"
    >
      <span class="text-[0.72em] opacity-50">#</span>
      <span>{{ displaySong.rank }}</span>
    </span>

    <button
      type="button"
      :aria-label="`Toggle playback for ${displaySong.title} by ${displaySong.artist}`"
      class="relative z-10 h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded bg-white shadow-md touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-20 sm:w-20"
      @pointerdown="primePlayback"
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
          class="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black via-black/40 to-transparent"
        >
          <svg
            v-if="thisPlayerState === 'loading'"
            class="h-7 w-7 animate-spin text-white"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
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

          <svg
            v-else-if="thisPlayerState === 'playing'"
            class="h-7 w-7 text-white drop-shadow"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>

          <svg
            v-else
            class="h-7 w-7 text-white drop-shadow"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </Transition>
    </button>

    <div :class="textStackClass">
      <h2 class="text-base font-bold leading-snug text-text sm:text-lg">
        <span>{{ displaySong.title }}</span>
        <EmbedFallbackBadge
          v-if="showEmbedWarning"
          :song="displaySong"
          class="ml-1.5"
          size="md"
        />
      </h2>
      <p class="text-sm leading-snug text-text-muted sm:text-base">
        {{ displaySong.artist }}
      </p>
      <p
        v-if="displaySong.album"
        class="text-sm leading-snug italic text-text-muted/75 sm:text-base"
      >
        {{ displaySong.album }}
      </p>
    </div>

    <div :class="reportClass">
      <div class="group/action relative">
        <span
          class="pointer-events-none absolute right-full top-1/2 mr-1 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 text-[0.65rem] font-medium text-white opacity-0 transition-opacity duration-75 group-hover/action:opacity-100 group-focus-within/action:opacity-100"
        >
          Report issue
        </span>
        <button
          type="button"
          :aria-label="`Report an issue with ${displaySong.title} by ${displaySong.artist}`"
          class="flex h-8 w-8 items-center justify-center rounded text-text-muted transition-colors duration-150 hover:bg-black/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          @click.stop="isReportModalOpen = true"
        >
          <Flag class="h-5 w-5" aria-hidden="true" />
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
        <PlaybackSeekBar
          root-class="pointer-events-auto relative z-10"
          :track-rounded="false"
          track-class="rounded-none"
        />
        <p
          class="pointer-events-none absolute right-3 bottom-2 min-w-fit font-mono text-[0.65rem] font-medium tabular-nums text-text-muted"
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

.song-card-highlight {
  box-shadow: inset 0 0 0 2px
    color-mix(in srgb, var(--color-primary) 78%, transparent);
}
</style>
