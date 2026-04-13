<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import {
  Expand,
  Flag,
  Info,
  Minimize,
  MousePointerClick,
  X,
} from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import BrandWordmark from './BrandWordmark.vue'
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
const isReportModalOpen = ref(false)
const isDesktopFullscreen = ref(false)
const isTinyViewport = useMediaQuery('(max-width: 839px)')
const PLAYER_FULLSCREEN_TOGGLE_EVENT = 'player-fullscreen-toggle'
const PLAYER_FULLSCREEN_OPEN_EVENT = 'player-fullscreen-open'
const PLAYER_FULLSCREEN_CLOSE_EVENT = 'player-fullscreen-close'

const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'
const playerButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-transparent text-text/70 transition-colors hover:border-white/70 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const playerFullscreenButtonClass =
  'inline-flex h-[clamp(3.25rem,9vw,4.75rem)] w-[clamp(3.25rem,9vw,4.75rem)] items-center justify-center rounded-full border border-black/5 bg-transparent text-text/70 transition-colors hover:border-white/70 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const playerFullscreenSubtleButtonClass =
  'inline-flex h-[clamp(3.25rem,9vw,4.75rem)] w-[clamp(3.25rem,9vw,4.75rem)] items-center justify-center rounded-full bg-transparent text-text/45 transition-colors hover:bg-white/12 hover:text-text/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const playerFullscreenCloseButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface/88 text-text-muted shadow-lg shadow-black/10 ring-1 ring-primary/20 transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-10 sm:w-10'
const shouldShowPlayerDock = computed(
  () => player.playingSong !== null && player.playerState !== 'idle',
)
const shouldShowRestoredPoster = computed(
  () =>
    !shouldUseMaxiPlayer.value &&
    player.playingSong !== null &&
    !player.hasMountedPlayer,
)
const shouldUseMaxiPlayer = computed(
  () => isTinyViewport.value || isDesktopFullscreen.value,
)
const shouldShowPlaybackStartCta = computed(
  () => player.isAwaitingPlaybackStart,
)
const jukeboxYearStyle = computed(() => {
  const currentPlayingYear = player.playingYear
  if (currentPlayingYear === null) return {}
  const currentTheme = getThemeForYear(currentPlayingYear)
  return {
    color: currentTheme.colors.primary,
    fontFamily: currentTheme.fontFamily,
  }
})
const jukeboxYearLabel = computed(() => {
  const currentPlayingYear = player.playingYear
  if (currentPlayingYear === null) return ''
  return String(currentPlayingYear)
})
const playerContentClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'mx-auto flex w-full max-w-[1200px] flex-col'
    : '',
)
const playerDockContainerClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'mx-auto flex h-full max-h-full w-full max-w-[1200px] flex-col justify-center px-4 pt-4 pb-28 sm:px-6 sm:pt-6 sm:pb-32'
    : 'px-3 pt-3 pb-3',
)
const playerDockContainerStyle = computed(() =>
  shouldUseMaxiPlayer.value
    ? {
        paddingTop: 'calc(var(--sticky-bar-height) + 0.5rem)',
      }
    : undefined,
)
const playerDockClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? [
        'fixed inset-x-0 z-30 bg-[color:var(--color-player)]',
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
  shouldUseMaxiPlayer.value
    ? {
        top: '0',
        height: '100dvh',
      }
    : undefined,
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
const playerActionRowClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'relative mt-4 flex items-center justify-center'
    : 'flex items-center gap-1',
)
const playerBottomSpacerClass = computed(() =>
  shouldUseMaxiPlayer.value ? 'hidden' : 'hidden',
)
const fullscreenToggleTitle = computed(() =>
  shouldUseMaxiPlayer.value && !isTinyViewport.value
    ? 'Exit full-screen player (F)'
    : 'Open full-screen player (F)',
)
const embedWarningTooltipLabel =
  'The music video for this song does not support being embedded on other sites, so we used this one instead'
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
watch(() => player.playingYear, updateThemeVars, { immediate: true })
watch(playerViewportMountHost, () => void syncPlayerContainer(), {
  flush: 'post',
})
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
  void nextTick(() => player.refreshPlayerAfterViewportChange())
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
const handleFullscreenOpen = () => {
  if (!player.playingSong || isTinyViewport.value) return
  isDesktopFullscreen.value = true
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
onMounted(() =>
  window.addEventListener(PLAYER_FULLSCREEN_OPEN_EVENT, handleFullscreenOpen),
)
onUnmounted(() => player.setPlayerContainer(null))
onUnmounted(() => {
  if (typeof document === 'undefined') return
  delete document.documentElement.dataset.playerFullscreen
  document.body.style.overflow = ''
})
onUnmounted(() =>
  window.removeEventListener(
    PLAYER_FULLSCREEN_TOGGLE_EVENT,
    handleFullscreenToggle,
  ),
)
onUnmounted(() =>
  window.removeEventListener(
    PLAYER_FULLSCREEN_OPEN_EVENT,
    handleFullscreenOpen,
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
    aria-label="Jukebox"
    :style="[themeVars, playerDockStyle]"
    :class="playerDockClass"
  >
    <button
      v-if="player.playingSong && !shouldUseMaxiPlayer"
      type="button"
      title="Stop playback (Esc)"
      aria-label="Stop playback"
      class="absolute top-0 right-0 z-30 inline-flex h-6 w-6 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full border-1 border-white/25 bg-surface text-text/70 shadow-[0_8px_18px_rgb(0_0_0_/_0.16)] ring-1 ring-black/10 transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      @click="player.stop"
    >
      <X class="h-3.5 w-3.5" />
    </button>

    <div :class="playerDockContainerClass" :style="playerDockContainerStyle">
      <div v-if="player.playingSong" :class="playerContentClass">
        <div
          v-if="shouldUseMaxiPlayer"
          class="mt-4 mb-3 flex w-full items-start justify-end gap-3 sm:mt-5 sm:mb-4 sm:grid sm:items-center sm:[grid-template-columns:1fr_auto_1fr]"
        >
          <div
            v-if="player.playingYear !== null"
            class="hidden text-left text-lg font-medium tracking-[0.12em] sm:flex sm:items-center sm:gap-2 sm:self-end sm:justify-self-start sm:text-xl"
          >
            <span :style="jukeboxYearStyle">{{ jukeboxYearLabel }}</span>
            <div class="group relative inline-flex align-middle">
              <span
                :aria-label="embedWarningTooltipLabel"
                role="img"
                tabindex="0"
                class="inline-flex h-5.5 w-5.5 cursor-help items-center justify-center rounded-full bg-amber-400 text-amber-950 outline-none transition-colors hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300/70"
              >
                <Info class="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div
                class="pointer-events-none absolute left-full top-1/2 z-40 ml-2 w-56 -translate-y-1/2 rounded-md bg-black/88 px-2.5 py-2 text-[0.7rem] font-medium leading-snug tracking-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {{ embedWarningTooltipLabel }}
              </div>
            </div>
          </div>

          <div class="min-w-0 flex-1 sm:hidden">
            <div class="min-w-0 text-left">
              <BrandWordmark
                class="min-w-0 justify-start"
                :is-spinning="player.playerState === 'playing'"
                label="Flashback Charts Australia"
                size="jukebox"
              />
              <div
                v-if="player.playingYear !== null"
                class="mt-1 flex items-center gap-2 text-base font-medium tracking-[0.12em]"
              >
                <span :style="jukeboxYearStyle">{{ jukeboxYearLabel }}</span>
                <div class="group relative inline-flex align-middle">
                  <span
                    :aria-label="embedWarningTooltipLabel"
                    role="img"
                    tabindex="0"
                    class="inline-flex h-5.5 w-5.5 cursor-help items-center justify-center rounded-full bg-amber-400 text-amber-950 outline-none transition-colors hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300/70"
                  >
                    <Info class="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div
                    class="pointer-events-none absolute left-full top-1/2 z-40 ml-2 w-56 -translate-y-1/2 rounded-md bg-black/88 px-2.5 py-2 text-[0.7rem] font-medium leading-snug tracking-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    {{ embedWarningTooltipLabel }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BrandWordmark
            class="hidden min-w-0 justify-self-center sm:flex"
            :is-spinning="player.playerState === 'playing'"
            label="Flashback Charts Australia"
            size="jukebox"
          />

          <button
            type="button"
            title="Stop playback (Esc)"
            aria-label="Stop playback"
            :class="playerFullscreenCloseButtonClass"
            class="justify-self-end"
            @click="player.stop"
          >
            <X class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>

        <div v-if="shouldUseMaxiPlayer" class="mb-3 w-full">
          <div class="min-w-0">
            <SongRow
              v-if="player.playingYear !== null"
              :song="player.playingSong"
              :year="player.playingYear"
              variant="maxi"
            />
          </div>
        </div>

        <div :class="shouldUseMaxiPlayer ? 'w-full' : 'mb-1.5'">
          <div
            v-if="!shouldUseMaxiPlayer && player.playingYear !== null"
            class="mb-1.5 flex items-center gap-1.5 px-0.5 text-left text-[0.96rem] font-medium tracking-[0.12em]"
          >
            <span
              v-if="player.playingSong"
              class="text-text"
              :style="jukeboxYearStyle"
            >
              <span>{{ jukeboxYearLabel }}</span>
              <span class="ml-1">#{{ player.playingSong.rank }}</span>
            </span>
            <div class="group relative inline-flex align-middle">
              <span
                :aria-label="embedWarningTooltipLabel"
                role="img"
                tabindex="0"
                class="inline-flex h-[1.2rem] w-[1.2rem] cursor-help items-center justify-center rounded-full bg-amber-400 text-amber-950 outline-none transition-colors hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300/70"
              >
                <Info class="h-[0.8rem] w-[0.8rem]" aria-hidden="true" />
              </span>
              <div
                class="pointer-events-none absolute left-full top-1/2 z-40 ml-2 w-56 -translate-y-1/2 rounded-md bg-black/88 px-2.5 py-2 text-[0.68rem] font-medium leading-snug tracking-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {{ embedWarningTooltipLabel }}
              </div>
            </div>
          </div>

          <div :class="playerFrameClass">
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

        <template v-if="!shouldUseMaxiPlayer">
          <div class="mt-1.5 flex items-start gap-2.5">
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
                  class="min-w-0 flex-1 cursor-pointer rounded-xl px-1.5 py-0.5 pr-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  @click="goToPlayingSong"
                >
                  <p
                    class="break-words text-base font-bold leading-snug text-text"
                  >
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
            v-if="!shouldShowPlaybackStartCta"
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
            v-if="!shouldShowPlaybackStartCta"
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
            v-if="!shouldShowPlaybackStartCta"
            class="relative mt-0.5 -mx-0.5 px-0.5"
          >
            <PlaybackSeekBar
              :disabled="!player.showSeekBar"
              root-class="pointer-events-auto h-4 cursor-pointer"
              track-class="h-1.5"
            />
          </div>
        </template>

        <div
          v-else-if="!shouldShowPlaybackStartCta"
          :class="playerActionRowClass"
          class="relative mt-4 w-full"
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
                class="h-[clamp(1.6rem,4.5vw,2.35rem)] w-[clamp(1.6rem,4.5vw,2.35rem)]"
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
                class="h-[clamp(1.6rem,4.5vw,2.35rem)] w-[clamp(1.6rem,4.5vw,2.35rem)] animate-spin"
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
                class="h-[clamp(1.6rem,4.5vw,2.35rem)] w-[clamp(1.6rem,4.5vw,2.35rem)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <svg
                v-else
                class="h-[clamp(1.6rem,4.5vw,2.35rem)] w-[clamp(1.6rem,4.5vw,2.35rem)]"
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
                class="h-[clamp(1.6rem,4.5vw,2.35rem)] w-[clamp(1.6rem,4.5vw,2.35rem)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          <div class="absolute right-0 top-0">
            <button
              type="button"
              :title="maxiPlayerCloseTitle"
              :aria-label="maxiPlayerCloseTitle"
              :class="playerFullscreenSubtleButtonClass"
              @click="closeMaxiPlayer"
            >
              <Minimize
                class="h-[clamp(1.35rem,4vw,2.1rem)] w-[clamp(1.35rem,4vw,2.1rem)]"
              />
            </button>
          </div>
        </div>

        <div :class="playerBottomSpacerClass" aria-hidden="true" />
      </div>

      <p
        v-if="shouldShowPlaybackStartCta && player.playingSong"
        class="mt-3 flex items-center justify-center gap-1.5 px-1 text-center text-sm leading-snug text-text-muted"
      >
        <MousePointerClick class="h-4 w-4 shrink-0" />
        <span>Tap the play button above to start listening</span>
      </p>
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
