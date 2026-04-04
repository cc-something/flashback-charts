<script setup lang="ts">
import { computed } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'

const store = useChartStore()
const player = usePlayerStore()

const isVisible = computed(
  () => player.isActive && player.playingYear !== store.selectedYear,
)

const goToPlayingYear = () => {
  if (player.playingYear !== null) store.selectYear(player.playingYear)
}
</script>

<template>
  <Transition name="mini-player">
    <aside
      v-if="isVisible && player.playingSong"
      class="fixed bottom-4 right-4 z-50 flex w-72 flex-col overflow-hidden rounded-lg bg-surface shadow-2xl shadow-black/40 ring-1 ring-white/10"
    >
      <div class="flex items-center gap-3 p-3">
        <button
          type="button"
          class="relative h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md touch-manipulation"
          @click="player.togglePlayback"
        >
          <img
            :src="player.playingSong.thumbnailPath"
            :alt="player.playingSong.title"
            class="block h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <!-- spinner -->
            <svg
              v-if="player.playerState === 'loading'"
              class="h-5 w-5 animate-spin text-white"
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
            <!-- pause -->
            <svg
              v-else-if="player.playerState === 'playing'"
              class="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            <!-- play -->
            <svg
              v-else
              class="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>

        <button
          class="min-w-0 flex-1 cursor-pointer text-left"
          @click="goToPlayingYear"
        >
          <p class="truncate text-sm font-bold leading-tight text-text">
            {{ player.playingSong.title }}
          </p>
          <p class="truncate text-xs text-text-muted">
            {{ player.playingSong.artist }}
          </p>
          <p class="text-[0.6rem] text-primary/70">
            {{ player.playingYear }}
          </p>
        </button>

        <button
          class="flex-shrink-0 cursor-pointer p-1 text-text-muted hover:text-text"
          @click="player.stop"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>

      <div v-if="player.showSeekBar" class="relative">
        <SliderRoot
          :max="player.durationSeconds"
          :min="0"
          :model-value="player.seekSliderValue"
          :step="0.1"
          aria-label="Seek playback"
          class="mini-seek relative flex w-full touch-manipulation items-center"
          @update:model-value="player.handleSeekInput"
          @value-commit="player.handleSeekCommit"
        >
          <SliderTrack
            class="mini-track relative h-1 w-full overflow-hidden bg-black/20"
          >
            <SliderRange class="mini-range absolute h-full bg-primary" />
          </SliderTrack>
          <SliderThumb
            class="mini-thumb block h-2.5 w-2.5 rounded-full bg-primary shadow outline-none"
          />
        </SliderRoot>
        <p
          class="pointer-events-none absolute -top-4 right-2 text-[0.5rem] tabular-nums text-text-muted"
        >
          {{ player.formattedCurrentTime }}/{{ player.formattedDuration }}
        </p>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.mini-player-enter-active,
.mini-player-leave-active {
  transition: all 0.25s ease;
}

.mini-player-enter-from,
.mini-player-leave-to {
  opacity: 0;
  transform: translateY(1rem) scale(0.95);
}

.mini-seek[data-orientation='horizontal'] {
  display: flex;
}

.mini-track[data-orientation='horizontal'] {
  flex: 1;
}

.mini-range[data-orientation='horizontal'] {
  left: 0;
}
</style>
