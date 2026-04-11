<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { Expand, Flag, Minimize, X } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import PlaybackSeekBar from './PlaybackSeekBar.vue'
import ReportIssueModal from './ReportIssueModal.vue'
import SongRow from './SongRow.vue'
import { usePlayerStore } from '@/stores/player'
import { getThemeForYear } from '@/themes'
import { getYearPath } from '@/utils/url'

const player = usePlayerStore()
const route = useRoute()
const router = useRouter()
const themeVars = ref<Record<string, string>>({})
const playerViewportMountHost = ref<HTMLDivElement | null>(null)
const playerDockContainerHost = ref<HTMLDivElement | null>(null)
const maxiPlayerHeaderHost = ref<HTMLDivElement | null>(null)
const maxiPlayerControlsHost = ref<HTMLDivElement | null>(null)
const isReportModalOpen = ref(false)
const isDesktopFullscreen = ref(false)
const isTinyViewport = useMediaQuery('(max-width: 839px)')
const playerFrameWidth = ref<number | null>(null)
const PLAYER_FULLSCREEN_TOGGLE_EVENT = 'player-fullscreen-toggle'
const PLAYER_FULLSCREEN_CLOSE_EVENT = 'player-fullscreen-close'

const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'
const playerButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-transparent text-text/70 transition-colors hover:border-white/70 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const playerFullscreenButtonClass =
  'inline-flex h-[clamp(2.5rem,8vw,5rem)] w-[clamp(2.5rem,8vw,5rem)] items-center justify-center rounded-full border border-black/5 bg-transparent text-text/70 transition-colors hover:border-white/70 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const shouldShowPlayerDock = computed(
  () => player.playingSong !== null && player.playerState !== 'idle',
)
const shouldShowRestoredPoster = computed(
  () => player.playingSong !== null && !player.hasMountedPlayer,
)
const shouldUseMaxiPlayer = computed(
  () => isTinyViewport.value || isDesktopFullscreen.value,
)
const shouldShowPlaybackStartCta = computed(
  () => player.isAwaitingPlaybackStart,
)
const playerDockContainerClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'mx-auto flex h-full max-h-full w-full max-w-[1200px] flex-col px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-14'
    : 'px-3 pt-3 pb-3',
)
const playerDockClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? [
        'fixed inset-x-0 bottom-0 z-30 bg-[color:var(--color-player)]',
        shouldShowPlayerDock.value
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
      ].join(' ')
    : [
        'fixed right-4 bottom-4 z-30 w-[calc(200px*16/9+2px)] rounded-xl border border-white/12 bg-[color:var(--color-player)] shadow-[0_12px_40px_rgb(0_0_0_/_0.16)]',
        shouldShowPlayerDock.value
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
      ].join(' '),
)
const playerDockStyle = computed(() =>
  shouldUseMaxiPlayer.value ? { top: 'var(--sticky-bar-height)' } : undefined,
)
const playerFrameClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'mx-auto w-full max-w-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-black shadow-[0_30px_90px_rgb(0_0_0_/_0.32)]'
    : 'overflow-hidden border border-white/10 bg-black shadow-lg',
)
const playerViewportClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'player-viewport-fullscreen w-full bg-black'
    : 'player-viewport w-full min-h-[200px] bg-black',
)
const playerFrameStyle = computed(() =>
  shouldUseMaxiPlayer.value && playerFrameWidth.value
    ? { width: `${playerFrameWidth.value}px` }
    : undefined,
)
const playerMaxiContentStyle = computed(() =>
  shouldUseMaxiPlayer.value && playerFrameWidth.value
    ? { width: `${playerFrameWidth.value}px` }
    : undefined,
)
const playerActionRowClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'relative mt-4 mb-12 flex items-center justify-center sm:mb-14'
    : 'flex items-center gap-1',
)
const fullscreenToggleTitle = computed(() =>
  shouldUseMaxiPlayer.value && !isTinyViewport.value
    ? 'Exit full-screen player (F)'
    : 'Open full-screen player (F)',
)
const maxiPlayerCloseTitle = computed(() =>
  isTinyViewport.value ? 'Close player' : 'Exit full-screen player (F)',
)
const updateThemeVars = (year: number | null) => {
  if (year === null) return
  const theme = getThemeForYear(year)
  themeVars.value = {
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-player': theme.colors.player,
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
  if (!playerViewportMountHost.value) {
    player.setPlayerContainer(null)
    return
  }
  await nextTick()
  player.setPlayerContainer(playerViewportMountHost.value)
}
const syncMaxiPlayerFrameWidth = () => {
  if (
    !shouldUseMaxiPlayer.value ||
    !playerDockContainerHost.value ||
    !maxiPlayerHeaderHost.value ||
    !maxiPlayerControlsHost.value
  ) {
    playerFrameWidth.value = null
    return
  }
  const containerRect = playerDockContainerHost.value.getBoundingClientRect()
  const headerRect = maxiPlayerHeaderHost.value.getBoundingClientRect()
  const controlsRect = maxiPlayerControlsHost.value.getBoundingClientRect()
  const availableHeight = Math.max(controlsRect.top - headerRect.bottom - 16, 0)
  const nextFrameWidth = Math.min(
    containerRect.width,
    1200,
    availableHeight * (16 / 9),
  )
  playerFrameWidth.value = nextFrameWidth > 0 ? nextFrameWidth : null
}
const queueMaxiPlayerFrameSync = async () => {
  await nextTick()
  requestAnimationFrame(syncMaxiPlayerFrameWidth)
}
watch(() => player.playingYear, updateThemeVars, { immediate: true })
watch(playerViewportMountHost, () => {
  void syncPlayerContainer()
})
watch(
  [
    shouldUseMaxiPlayer,
    () => player.playingSong,
    () => player.playingYear,
    shouldShowPlaybackStartCta,
  ],
  () => {
    void queueMaxiPlayerFrameSync()
  },
  { flush: 'post' },
)
watch(shouldShowPlayerDock, (shouldShow) => {
  if (shouldShow) return
  isDesktopFullscreen.value = false
})
watch(shouldUseMaxiPlayer, (shouldShowMaxiPlayer) => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.playerFullscreen = shouldShowMaxiPlayer
    ? 'true'
    : 'false'
  document.body.style.overflow = shouldShowMaxiPlayer ? 'hidden' : ''
})
const handleFullscreenToggle = () => {
  if (!player.playingSong || shouldShowPlaybackStartCta.value) return
  if (isTinyViewport.value) {
    closeMaxiPlayer()
    return
  }
  if (isDesktopFullscreen.value) {
    closeMaxiPlayer()
    return
  }
  openMaxiPlayer()
}
const closeFullscreen = () => {
  if (isTinyViewport.value) {
    player.stop()
    return
  }
  if (!isDesktopFullscreen.value) return
  isDesktopFullscreen.value = false
}
onMounted(() =>
  window.addEventListener(
    PLAYER_FULLSCREEN_TOGGLE_EVENT,
    handleFullscreenToggle,
  ),
)
onMounted(() => window.addEventListener('resize', syncMaxiPlayerFrameWidth))
onUnmounted(() => player.setPlayerContainer(null))
onUnmounted(() => {
  if (typeof document === 'undefined') return
  delete document.documentElement.dataset.playerFullscreen
  document.body.style.overflow = ''
})
onUnmounted(() =>
  window.removeEventListener('resize', syncMaxiPlayerFrameWidth),
)
onUnmounted(() =>
  window.removeEventListener(
    PLAYER_FULLSCREEN_TOGGLE_EVENT,
    handleFullscreenToggle,
  ),
)
onMounted(() =>
  window.addEventListener(PLAYER_FULLSCREEN_CLOSE_EVENT, closeFullscreen),
)
onUnmounted(() =>
  window.removeEventListener(PLAYER_FULLSCREEN_CLOSE_EVENT, closeFullscreen),
)

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
const resumePlayback = () => {
  if (!player.playingSong || player.playingYear === null) return
  void player.play(player.playingSong, player.playingYear, 'player-btn')
}
const openReportModal = () => {
  if (!player.playingSong || player.playingYear === null) return
  isReportModalOpen.value = true
}
const openMaxiPlayer = () => {
  if (!player.playingSong) return
  isDesktopFullscreen.value = true
}
const closeMaxiPlayer = () => {
  if (!player.playingSong) return
  if (isTinyViewport.value) {
    player.stop()
    return
  }
  isDesktopFullscreen.value = false
}
</script>

<template>
  <aside
    aria-label="Music player"
    :style="[themeVars, playerDockStyle]"
    :class="playerDockClass"
  >
    <button
      v-if="player.playingSong"
      type="button"
      title="Stop playback (Esc)"
      aria-label="Stop playback"
      :class="
        shouldUseMaxiPlayer
          ? 'absolute top-4 right-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-surface/90 text-text/70 shadow-[0_12px_28px_rgb(0_0_0_/_0.16)] backdrop-blur-sm transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
          : 'absolute top-0 right-0 z-30 inline-flex h-6 w-6 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full border-1 border-white/25 bg-surface text-text/70 shadow-[0_8px_18px_rgb(0_0_0_/_0.16)] ring-1 ring-black/10 transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
      "
      @click="player.stop"
    >
      <X :class="shouldUseMaxiPlayer ? 'h-4 w-4' : 'h-3.5 w-3.5'" />
    </button>

    <div ref="playerDockContainerHost" :class="playerDockContainerClass">
      <div
        v-if="
          shouldUseMaxiPlayer &&
          player.playingSong &&
          player.playingYear !== null &&
          !shouldShowPlaybackStartCta
        "
        ref="maxiPlayerHeaderHost"
        :style="playerMaxiContentStyle"
        class="mb-4 mx-auto"
      >
        <SongRow
          :song="player.playingSong"
          :year="player.playingYear"
          variant="maxi"
        />
      </div>

      <div
        :class="
          shouldUseMaxiPlayer ? 'flex min-h-0 flex-1 flex-col' : undefined
        "
      >
        <div
          :class="
            shouldUseMaxiPlayer
              ? 'flex min-h-0 flex-1 items-start justify-center'
              : undefined
          "
        >
          <div :class="playerFrameClass" :style="playerFrameStyle">
            <div :class="playerViewportClass">
              <div
                ref="playerViewportMountHost"
                class="absolute inset-0"
                aria-hidden="true"
              />
              <button
                v-if="shouldShowRestoredPoster && player.playingSong"
                type="button"
                aria-label="Play playback"
                class="absolute inset-0 cursor-pointer"
                @click="resumePlayback"
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
                      'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 3%, rgba(0, 0, 0, 0.94) 100%)',
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
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="
            player.playingSong &&
            !shouldShowPlaybackStartCta &&
            shouldUseMaxiPlayer
          "
          ref="maxiPlayerControlsHost"
          :style="playerMaxiContentStyle"
          :class="playerActionRowClass"
          class="mx-auto"
        >
          <div class="flex items-center justify-center gap-1">
            <button
              type="button"
              :title="`Previous song (${mod}+←)`"
              aria-label="Previous song"
              :class="playerFullscreenButtonClass"
              @click="player.playPrev('player-btn')"
            >
              <svg
                class="h-[clamp(1.25rem,4vw,2.5rem)] w-[clamp(1.25rem,4vw,2.5rem)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button
              type="button"
              title="Play / pause (Space or K)"
              aria-label="Toggle playback"
              :class="playerFullscreenButtonClass"
              @click="player.togglePlayback('player-btn')"
            >
              <svg
                v-if="player.playerState === 'loading'"
                class="h-[clamp(1.25rem,4vw,2.5rem)] w-[clamp(1.25rem,4vw,2.5rem)] animate-spin"
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
                class="h-[clamp(1.25rem,4vw,2.5rem)] w-[clamp(1.25rem,4vw,2.5rem)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <svg
                v-else
                class="h-[clamp(1.25rem,4vw,2.5rem)] w-[clamp(1.25rem,4vw,2.5rem)]"
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
              :class="playerFullscreenButtonClass"
              @click="player.playNext(undefined, undefined, 'player-btn')"
            >
              <svg
                class="h-[clamp(1.25rem,4vw,2.5rem)] w-[clamp(1.25rem,4vw,2.5rem)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          <div class="absolute right-0">
            <button
              type="button"
              :title="maxiPlayerCloseTitle"
              :aria-label="maxiPlayerCloseTitle"
              :class="playerFullscreenButtonClass"
              @click="closeMaxiPlayer"
            >
              <Minimize
                class="h-[clamp(1.125rem,3.6vw,2.25rem)] w-[clamp(1.125rem,3.6vw,2.25rem)]"
              />
            </button>
          </div>
        </div>
      </div>

      <p
        v-if="shouldShowPlaybackStartCta && player.playingSong"
        class="mt-3 px-1 text-sm leading-snug text-text-muted"
      >
        Tap the play button in the video above to start
        {{ ` ${player.playingSong.title}` }}.
      </p>

      <div
        v-if="
          player.playingSong &&
          !shouldShowPlaybackStartCta &&
          !shouldUseMaxiPlayer
        "
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

        <div class="min-w-0 flex-1">
          <div class="flex items-start gap-1.5">
            <button
              type="button"
              title="Go to song (G)"
              aria-label="Go to song"
              class="min-w-0 flex-1 cursor-pointer rounded-xl px-1.5 py-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              @click="goToPlayingSong"
            >
              <div class="flex items-center justify-between gap-1.5">
                <p
                  class="text-xs font-bold uppercase tracking-[0.04em] text-primary/80"
                >
                  {{ player.playingYear }} #{{ player.playingSong.rank }}
                </p>
              </div>
              <p class="break-words text-base font-bold leading-snug text-text">
                {{ player.playingSong.title }}
              </p>
              <p class="break-words text-sm leading-snug text-text-muted">
                {{ player.playingSong.artist }}
              </p>
            </button>

            <button
              type="button"
              title="Report issue"
              aria-label="Report issue"
              class="mt-[0.1rem] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-black/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              @click.stop="openReportModal"
            >
              <Flag class="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="
          player.playingSong &&
          !shouldShowPlaybackStartCta &&
          !shouldUseMaxiPlayer
        "
        class="mt-1.5 flex items-center gap-1"
      >
        <div class="flex flex-1 items-center gap-1">
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
            <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
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

        <div class="-mr-1 flex items-center justify-end">
          <button
            type="button"
            :title="fullscreenToggleTitle"
            :aria-label="fullscreenToggleTitle"
            :class="playerButtonClass"
            @click="openMaxiPlayer"
          >
            <Expand class="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div
        v-if="
          player.playingSong &&
          !shouldShowPlaybackStartCta &&
          !shouldUseMaxiPlayer
        "
        class="mt-0.5 flex justify-end pr-0.5"
      >
        <p
          class="font-mono text-[0.62rem] tabular-nums text-text-muted"
          :class="!player.showSeekBar && 'opacity-50 grayscale-[0.5]'"
        >
          <template v-if="player.showSeekBar">
            {{ player.formattedCurrentTime }}/{{ player.formattedDuration }}
          </template>
          <template v-else>0:00/0:00</template>
        </p>
      </div>

      <div
        v-if="
          player.playingSong &&
          !shouldShowPlaybackStartCta &&
          !shouldUseMaxiPlayer
        "
        class="relative mt-0.5 -mx-0.5 px-0.5"
      >
        <PlaybackSeekBar
          :disabled="!player.showSeekBar"
          root-class="pointer-events-auto h-4 cursor-pointer"
          track-class="h-1.5"
        />
      </div>
    </div>
  </aside>

  <Teleport to="body">
    <ReportIssueModal
      v-if="
        isReportModalOpen && player.playingSong && player.playingYear !== null
      "
      :song="player.playingSong"
      :year="player.playingYear"
      @dismiss="isReportModalOpen = false"
    />
  </Teleport>
</template>

<style scoped>
.player-viewport {
  aspect-ratio: 16 / 9;
  position: relative;
}

.player-viewport-fullscreen {
  aspect-ratio: 16 / 9;
  position: relative;
  height: auto;
  max-height: 100%;
}

.player-viewport :deep(iframe) {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.player-viewport-fullscreen :deep(iframe) {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
