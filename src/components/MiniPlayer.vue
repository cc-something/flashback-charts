<script setup lang="ts">
import { ref, watch } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { usePlayerStore } from '@/stores/player'
import { getThemeForYear } from '@/themes'

const player = usePlayerStore()

// Keep last valid theme — never cleared on null so leave-animation retains its decade theme
const themeVars = ref<Record<string, string>>({})

watch(
  () => player.playingYear,
  (year) => {
    if (year === null) return
    const t = getThemeForYear(year)
    themeVars.value = {
      '--color-background': t.colors.background,
      '--color-surface': t.colors.surface,
      '--color-primary': t.colors.primary,
      '--color-secondary': t.colors.secondary,
      '--color-text': t.colors.text,
      '--color-text-muted': t.colors.textMuted,
      '--color-accent': t.colors.accent,
      '--color-tab-active': t.colors.tabActive,
      '--color-tab-inactive': t.colors.tabInactive,
      'font-family': t.bodyFontFamily ?? t.fontFamily,
    }
  },
  { immediate: true },
)
</script>

<template>
  <Transition name="mini-player">
    <aside
      v-if="player.isActive && player.playingSong"
      :style="themeVars"
      class="fixed bottom-4 right-4 z-50 flex w-80 flex-col overflow-visible rounded-lg bg-surface shadow-2xl shadow-black/40 ring-1 ring-white/10"
    >
      <!-- Controls row -->
      <div
        class="flex items-center gap-1 rounded-t-lg border-b border-white/5 bg-surface px-2 py-1.5"
      >
        <!-- Prev -->
        <button
          type="button"
          aria-label="Previous song"
          class="cursor-pointer p-2 text-text-muted transition-colors hover:text-text"
          @click="player.playPrev()"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <!-- Play/Pause -->
        <button
          type="button"
          aria-label="Toggle playback"
          class="cursor-pointer p-2 text-text transition-colors hover:text-primary"
          @click="player.togglePlayback"
        >
          <svg
            v-if="player.playerState === 'loading'"
            class="h-5 w-5 animate-spin"
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
          <svg
            v-else-if="player.playerState === 'playing'"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <!-- Next -->
        <button
          type="button"
          aria-label="Next song"
          class="cursor-pointer p-2 text-text-muted transition-colors hover:text-text"
          @click="player.playNext()"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        <div class="mx-1 h-4 w-px bg-white/10" />

        <!-- Go to song -->
        <button
          type="button"
          aria-label="Go to song"
          class="cursor-pointer p-1 text-text-muted transition-colors hover:text-text"
          @click="player.goToSong"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
        </button>

        <div class="flex-1" />

        <!-- Time -->
        <p
          v-if="player.showSeekBar"
          class="font-mono text-[0.7rem] tabular-nums text-text-muted"
        >
          {{ player.formattedCurrentTime }}/{{ player.formattedDuration }}
        </p>

        <div class="mx-1 h-4 w-px bg-white/10" />

        <!-- Close -->
        <button
          type="button"
          aria-label="Stop playback"
          class="cursor-pointer p-1 text-text-muted transition-colors hover:text-text"
          @click="player.stop"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>

      <!-- Song info row -->
      <div class="flex items-center gap-3 p-2.5">
        <!-- Thumbnail with play/pause overlay -->
        <button
          type="button"
          class="relative h-10 w-10 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md touch-manipulation"
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
            <svg
              v-if="player.playerState === 'playing'"
              class="h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            <svg
              v-else
              class="h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>

        <div class="min-w-0 flex-1">
          <p class="truncate text-base font-bold leading-snug text-text">
            {{ player.playingSong.title }}
          </p>
          <p class="truncate text-sm leading-snug text-text-muted">
            {{ player.playingSong.artist }}
            <span class="text-primary/60">· {{ player.playingYear }}</span>
          </p>
        </div>
      </div>

      <!-- Seek bar -->
      <div v-if="player.showSeekBar" class="overflow-visible">
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
            class="mini-track relative h-1.5 w-full overflow-hidden rounded-bl-lg rounded-br-lg bg-black/10"
          >
            <SliderRange
              class="mini-range absolute h-full rounded-bl-lg bg-primary"
            />
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
            />
          </SliderTrack>
          <SliderThumb
            class="mini-thumb block h-3 w-3 rounded-full border border-white/90 bg-primary shadow-[0_1px_3px_rgb(0_0_0_/_0.25)] outline-none"
          />
        </SliderRoot>
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
