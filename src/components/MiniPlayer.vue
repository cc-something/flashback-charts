<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import PlaybackSeekBar from './PlaybackSeekBar.vue'
import { usePlayerStore } from '@/stores/player'
import { getThemeForYear } from '@/themes'

const player = usePlayerStore()
const marqueeViewport = ref<HTMLElement | null>(null)
const marqueeContent = ref<HTMLElement | null>(null)
const isMarqueeActive = ref(false)
const marqueeDurationSeconds = ref(12)
const themeVars = ref<Record<string, string>>({})

const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'
const miniPlayerButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full text-text/55 transition-colors hover:bg-black/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const songLineLabel = computed(() => {
  const song = player.playingSong
  return song ? `${song.title} / ${song.artist}` : ''
})
const updateThemeVars = (year: number | null) => {
  if (year === null) return
  const theme = getThemeForYear(year)
  themeVars.value = {
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--color-accent': theme.colors.accent,
    '--color-tab-active': theme.colors.tabActive,
    '--color-tab-inactive': theme.colors.tabInactive,
    'font-family': theme.bodyFontFamily ?? theme.fontFamily,
  }
}
const updateMarqueeState = () => {
  const viewportElement = marqueeViewport.value
  const contentElement = marqueeContent.value
  if (!viewportElement || !contentElement) {
    isMarqueeActive.value = false
    return
  }
  const overflowWidth = contentElement.scrollWidth - viewportElement.clientWidth
  isMarqueeActive.value = overflowWidth > 1
  marqueeDurationSeconds.value = Math.max(12, contentElement.scrollWidth / 28)
}

watch(() => player.playingYear, updateThemeVars, { immediate: true })
watch(
  () => [
    player.playingSong?.youtubeVideoId,
    player.playingSong?.title,
    player.playingSong?.artist,
    player.playingYear,
  ],
  async () => {
    await nextTick()
    updateMarqueeState()
  },
  { immediate: true },
)

useResizeObserver(marqueeViewport, updateMarqueeState)
useResizeObserver(marqueeContent, updateMarqueeState)
</script>

<template>
  <Transition name="mini-player">
    <aside
      v-if="player.isActive && player.playingSong"
      aria-label="Music player"
      :style="themeVars"
      class="border-b border-primary/15 bg-surface/95 px-4 py-2.5 backdrop-blur-sm"
    >
      <div class="flex flex-col gap-2.5">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div class="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              :aria-label="`Toggle playback for ${player.playingSong.title}`"
              class="relative h-11 w-11 shrink-0 overflow-hidden rounded-md shadow-md ring-1 ring-black/10"
              @click="player.togglePlayback"
            >
              <img
                :src="player.playingSong.thumbnailPath"
                :alt="player.playingSong.title"
                class="block h-full w-full object-cover"
              />
              <div
                class="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity hover:opacity-100"
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
              <div ref="marqueeViewport" class="mini-player-marquee">
                <div
                  :class="
                    isMarqueeActive
                      ? 'mini-player-marquee-track'
                      : 'truncate text-sm sm:text-base'
                  "
                  :style="{
                    '--mini-player-marquee-duration': `${marqueeDurationSeconds}s`,
                  }"
                >
                  <span
                    ref="marqueeContent"
                    class="inline-flex min-w-max items-center whitespace-nowrap text-sm font-bold leading-tight text-text sm:text-base"
                  >
                    {{ songLineLabel }}
                  </span>
                  <span
                    v-if="isMarqueeActive"
                    aria-hidden="true"
                    class="inline-flex min-w-max items-center pl-10 whitespace-nowrap text-sm font-bold leading-tight text-text sm:text-base"
                  >
                    {{ songLineLabel }}
                  </span>
                </div>
              </div>

              <div
                class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.68rem] uppercase tracking-[0.18em] text-text-muted/75 sm:text-[0.72rem]"
              >
                <span>Now playing</span>
                <span>{{ player.playingYear }}</span>
                <span>#{{ player.playingSong.rank }}</span>
                <span v-if="player.showSeekBar">
                  {{ player.formattedCurrentTime }}/{{
                    player.formattedDuration
                  }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1 sm:shrink-0">
            <button
              type="button"
              :title="`Previous song (${mod}+←)`"
              aria-label="Previous song"
              :class="miniPlayerButtonClass"
              @click="player.playPrev()"
            >
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button
              type="button"
              title="Play / pause (Space or K)"
              aria-label="Toggle playback"
              :class="miniPlayerButtonClass"
              @click="player.togglePlayback"
            >
              <svg
                v-if="player.playerState === 'loading'"
                class="h-4 w-4 animate-spin"
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
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <svg
                v-else
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              type="button"
              :title="`Next song (${mod}+→)`"
              aria-label="Next song"
              :class="miniPlayerButtonClass"
              @click="player.playNext()"
            >
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            <button
              type="button"
              title="Go to song (G)"
              aria-label="Go to song"
              :class="miniPlayerButtonClass"
              @click="player.goToSong"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                />
              </svg>
            </button>

            <button
              type="button"
              title="Stop playback (Esc)"
              aria-label="Stop playback"
              :class="miniPlayerButtonClass"
              @click="player.stop"
            >
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="relative h-1.5 overflow-hidden rounded-full">
          <PlaybackSeekBar
            v-if="player.showSeekBar"
            root-class="absolute inset-0"
          />
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.mini-player-enter-active,
.mini-player-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.mini-player-enter-from,
.mini-player-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}

.mini-player-marquee {
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 1rem,
    black calc(100% - 1rem),
    transparent
  );
}

.mini-player-marquee-track {
  display: flex;
  width: max-content;
  animation: mini-player-marquee var(--mini-player-marquee-duration) linear
    infinite;
}

@keyframes mini-player-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 1.25rem));
  }
}
</style>
