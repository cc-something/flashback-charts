<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { useMediaQuery, useStorage } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import PlaybackSeekBar from './PlaybackSeekBar.vue'
import { usePlayerStore } from '@/stores/player'
import { getThemeForYear } from '@/themes'
import { getYearPath } from '@/utils/url'

const player = usePlayerStore()
const route = useRoute()
const router = useRouter()
const themeVars = ref<Record<string, string>>({})
const playerViewportHost = ref<HTMLDivElement | null>(null)
const isMobileViewport = useMediaQuery('(max-width: 839px)')

const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'
const playerButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 text-text/70 transition-colors hover:bg-black/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const mobilePlayerButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/5 text-text/70 transition-colors hover:bg-black/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const isMobilePlayerCollapsed = useStorage(
  'flashback-mobile-player-collapsed',
  true,
)
const shouldRenderPlayerDock = computed(
  () =>
    isMobileViewport.value ||
    (player.playingSong !== null && player.playerState !== 'idle'),
)
const shouldShowIdleDock = computed(
  () => isMobileViewport.value && player.playingSong === null,
)
const shouldShowRestoredPoster = computed(
  () => player.playingSong !== null && !player.hasMountedPlayer,
)
const shouldShowExpandedPlayerDetails = computed(
  () => !isMobileViewport.value || !isMobilePlayerCollapsed.value,
)
const playerDockContainerClass = computed(() =>
  isMobileViewport.value
    ? 'mx-auto w-full max-w-[16.75rem] px-3 pt-3 pb-3'
    : route.name === 'year'
      ? 'mx-auto max-w-[50.4rem] px-4 pt-3 pb-4 min-[840px]:mx-0 min-[840px]:max-w-none min-[840px]:px-3 min-[840px]:pt-3 min-[840px]:pb-3'
      : 'mx-auto max-w-[1300px] px-4 pt-3 pb-4 min-[840px]:mx-0 min-[840px]:max-w-none min-[840px]:px-3 min-[840px]:pt-3 min-[840px]:pb-3',
)
const playerDockClass = computed(() =>
  isMobileViewport.value
    ? 'relative z-30 mx-3 mt-3 rounded-xl border border-white/12 bg-surface/95 shadow-[0_12px_40px_rgb(0_0_0_/_0.16)] backdrop-blur-sm transition-colors duration-150'
    : 'relative z-30 border border-white/12 bg-surface/95 shadow-[0_12px_40px_rgb(0_0_0_/_0.16)] transition-colors duration-150 min-[840px]:fixed min-[840px]:right-4 min-[840px]:bottom-4 min-[840px]:w-[calc(200px*16/9)] min-[840px]:rounded-xl',
)
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
const waitForScrollSettle = () =>
  new Promise<void>((resolve) => window.setTimeout(resolve, 450))
const scrollToPlayingSongRow = async () => {
  const year = player.playingYear
  const song = player.playingSong
  if (typeof window === 'undefined' || year === null || !song) return
  await nextTick()
  requestAnimationFrame(async () => {
    document
      .getElementById(`song-${year}-${song.rank}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    await waitForScrollSettle()
    player.flashSongHighlight(year, song.rank)
  })
}
const syncPlayerContainer = async () => {
  if (!shouldRenderPlayerDock.value) {
    player.setPlayerContainer(null)
    return
  }
  await nextTick()
  player.setPlayerContainer(playerViewportHost.value)
}
watch(() => player.playingYear, updateThemeVars, { immediate: true })
watch([shouldRenderPlayerDock, playerViewportHost], () => {
  void syncPlayerContainer()
})
watch(isMobileViewport, (isMobile) => {
  if (!isMobile) isMobilePlayerCollapsed.value = false
})
onUnmounted(() => player.setPlayerContainer(null))

const goToPlayingSong = async () => {
  const year = player.playingYear
  const song = player.playingSong
  if (year === null || !song) return
  const routeSong = Array.isArray(route.query.song)
    ? route.query.song[0]
    : route.query.song
  if (
    route.name === 'year' &&
    Number(route.params.year) === year &&
    Number(routeSong) === song.rank
  ) {
    await scrollToPlayingSongRow()
    return
  }
  player.queueSongHighlight(year, song.rank)
  await router.push({
    path: getYearPath(year),
    query: { song: String(song.rank) },
  })
}
const toggleMobilePlayerCollapsed = () => {
  if (!isMobileViewport.value) return
  isMobilePlayerCollapsed.value = !isMobilePlayerCollapsed.value
}
</script>

<template>
  <Transition name="player-dock">
    <aside
      v-if="shouldRenderPlayerDock"
      aria-label="Music player"
      :style="themeVars"
      :class="playerDockClass"
    >
      <button
        v-if="player.playingSong && shouldShowExpandedPlayerDetails"
        type="button"
        title="Stop playback (Esc)"
        aria-label="Stop playback"
        class="absolute top-0 right-0 z-30 inline-flex h-6 w-6 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full border-1 border-white/25 bg-surface text-text/70 shadow-[0_8px_18px_rgb(0_0_0_/_0.16)] ring-1 ring-black/10 transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        @click="player.stop"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>

      <div :class="playerDockContainerClass">
        <div
          v-if="isMobileViewport"
          class="mb-2 flex items-center justify-between gap-2"
        >
          <div class="min-w-0 flex items-center gap-2">
            <button
              v-if="player.playingSong"
              type="button"
              aria-label="Go to song"
              class="h-10 w-10 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              @click="goToPlayingSong"
            >
              <img
                :src="player.playingSong.thumbnailPath"
                :alt="player.playingSong.title"
                class="block h-full w-full object-cover"
              />
            </button>
            <div class="min-w-0">
              <p
                v-if="player.playingSong"
                class="truncate text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary/80"
              >
                {{ player.playingYear }} #{{ player.playingSong.rank }}
              </p>
              <p class="truncate text-sm font-bold leading-snug text-text">
                {{
                  player.playingSong ? player.playingSong.title : 'Mini Player'
                }}
              </p>
              <p class="truncate text-xs leading-snug text-text-muted">
                {{
                  player.playingSong
                    ? player.playingSong.artist
                    : 'Tap any song to start playback.'
                }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <button
              v-if="player.playingSong"
              type="button"
              title="Play / pause"
              aria-label="Toggle playback"
              :class="mobilePlayerButtonClass"
              @click="player.togglePlayback('player-btn')"
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
              :title="
                isMobilePlayerCollapsed
                  ? 'Expand mini player'
                  : 'Collapse mini player'
              "
              :aria-label="
                isMobilePlayerCollapsed
                  ? 'Expand mini player'
                  : 'Collapse mini player'
              "
              :class="mobilePlayerButtonClass"
              @click="toggleMobilePlayerCollapsed"
            >
              <ChevronDown v-if="isMobilePlayerCollapsed" class="h-4 w-4" />
              <ChevronUp v-else class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          :class="
            isMobileViewport
              ? 'mx-auto overflow-hidden border border-white/10 bg-black shadow-lg'
              : 'overflow-hidden border border-white/10 bg-black shadow-lg'
          "
          :style="
            isMobileViewport
              ? { width: '200px', minHeight: '200px' }
              : undefined
          "
        >
          <div
            ref="playerViewportHost"
            :class="
              isMobileViewport
                ? 'player-viewport-mobile w-full min-h-[200px] bg-black'
                : 'player-viewport w-full min-h-[200px] bg-black'
            "
          >
            <div
              v-if="shouldShowIdleDock"
              class="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#3f175f,transparent_58%),linear-gradient(180deg,#160324,#05010a)] px-6 text-center"
            >
              <div>
                <p
                  class="text-xs font-bold uppercase tracking-[0.16em] text-primary/80"
                >
                  Ready To Play
                </p>
                <p class="mt-2 text-sm leading-snug text-white/92">
                  Tap any song to start inline playback.
                </p>
              </div>
            </div>

            <div
              v-else-if="shouldShowRestoredPoster && player.playingSong"
              class="absolute inset-0"
            >
              <img
                :src="player.playingSong.thumbnailPath"
                :alt="player.playingSong.title"
                class="h-full w-full object-cover"
              />
              <div
                class="absolute inset-0"
                :style="{
                  background:
                    'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 6%, rgba(0, 0, 0, 0.94) 100%)',
                }"
              />
              <div class="absolute inset-x-0 bottom-0 flex justify-end p-3.5">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/30 ring-2 ring-white/25"
                >
                  <svg
                    class="h-6 w-6 translate-x-[0.5px] text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="player.playingSong && shouldShowExpandedPlayerDetails"
          class="mt-1.5 flex items-start gap-2.5"
        >
          <button
            type="button"
            title="Go to song (G)"
            aria-label="Go to song"
            class="relative h-[4.2rem] w-[4.2rem] shrink-0 overflow-hidden rounded-xl ring-1 ring-black/10 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            @click="goToPlayingSong"
          >
            <img
              :src="player.playingSong.thumbnailPath"
              :alt="player.playingSong.title"
              class="block h-full w-full object-cover"
            />
          </button>

          <button
            type="button"
            title="Go to song (G)"
            aria-label="Go to song"
            class="min-w-0 flex-1 rounded-xl px-1.5 py-0.5 text-left transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            @click="goToPlayingSong"
          >
            <p
              class="text-xs font-bold uppercase tracking-[0.16em] text-primary/80"
            >
              {{ player.playingYear }} #{{ player.playingSong.rank }}
            </p>
            <p class="truncate text-base font-bold leading-snug text-text">
              {{ player.playingSong.title }}
            </p>
            <p class="truncate text-sm leading-snug text-text-muted">
              {{ player.playingSong.artist }}
            </p>
          </button>
        </div>

        <div
          v-if="player.playingSong && shouldShowExpandedPlayerDetails"
          class="mt-1 flex items-center justify-between gap-1.5"
        >
          <div class="flex items-center gap-1">
            <button
              type="button"
              :title="`Previous song (${mod}+←)`"
              aria-label="Previous song"
              :class="playerButtonClass"
              @click="player.playPrev('player-btn')"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button
              type="button"
              title="Play / pause (Space or K)"
              aria-label="Toggle playback"
              :class="playerButtonClass"
              @click="player.togglePlayback('player-btn')"
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
              <svg
                v-else
                class="h-5 w-5"
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
              :class="playerButtonClass"
              @click="player.playNext(undefined, undefined, 'player-btn')"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            <button
              type="button"
              title="Go to song (G)"
              aria-label="Go to song"
              :class="playerButtonClass"
              @click="goToPlayingSong"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 10.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-1">
            <p
              class="mr-1 font-mono text-[0.72rem] tabular-nums text-text-muted"
              :class="!player.showSeekBar && 'opacity-50 grayscale-[0.5]'"
            >
              <template v-if="player.showSeekBar">
                {{ player.formattedCurrentTime }}/{{ player.formattedDuration }}
              </template>
              <template v-else>0:00/0:00</template>
            </p>
          </div>
        </div>

        <div
          v-if="player.playingSong && shouldShowExpandedPlayerDetails"
          class="relative mt-1 h-1.5"
        >
          <PlaybackSeekBar
            :disabled="!player.showSeekBar"
            root-class="pointer-events-auto absolute inset-x-0 bottom-0 h-1.5"
          />
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.player-dock-enter-active,
.player-dock-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.player-dock-enter-from,
.player-dock-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}

.player-viewport {
  aspect-ratio: 16 / 9;
  position: relative;
}

.player-viewport-mobile {
  aspect-ratio: 1 / 1;
  position: relative;
}

.player-viewport :deep(iframe) {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.player-viewport-mobile :deep(iframe) {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
