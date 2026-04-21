<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import {
  Expand,
  Flag,
  Minimize,
  MousePointerClick,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import BrandWordmark from './BrandWordmark.vue'
import EmbedFallbackBadge from './EmbedFallbackBadge.vue'
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
const playerDockContainerElement = ref<HTMLDivElement | null>(null)
const playerViewportMountHost = ref<HTMLDivElement | null>(null)
const playerMaxiContentElement = ref<HTMLDivElement | null>(null)
const playerMaxiMediaStackElement = ref<HTMLDivElement | null>(null)
const playerMaxiActionRowElement = ref<HTMLDivElement | null>(null)
const isReportModalOpen = ref(false)
const isDesktopFullscreen = ref(false)
const maxiPlayerViewportStyle = ref<Record<string, string>>({})
const isTinyViewport = useMediaQuery('(max-width: 839px)')
const PLAYER_FULLSCREEN_TOGGLE_EVENT = 'player-fullscreen-toggle'
const PLAYER_FULLSCREEN_OPEN_EVENT = 'player-fullscreen-open'
const PLAYER_FULLSCREEN_CLOSE_EVENT = 'player-fullscreen-close'
const getElementDebug = (el: Element | null | undefined) => {
  if (!(el instanceof Element)) return null
  return {
    tagName: el.tagName,
    className: el.className,
    childElementCount: el.childElementCount,
    isConnected: el.isConnected,
    clientWidth: el instanceof HTMLElement ? el.clientWidth : undefined,
    clientHeight: el instanceof HTMLElement ? el.clientHeight : undefined,
  }
}
const logJukeboxDebug = (
  eventLabel: string,
  details: Record<string, unknown> = {},
) =>
  console.info('[jukebox]', eventLabel, {
    playingVideoId: player.playingSong?.youtubeVideoId ?? null,
    playingYear: player.playingYear,
    playerState: player.playerState,
    hasMountedPlayer: player.hasMountedPlayer,
    isAwaitingPlaybackStart: player.isAwaitingPlaybackStart,
    shouldBootstrapPlaybackFromShell: player.shouldBootstrapPlaybackFromShell,
    isDesktopFullscreen: isDesktopFullscreen.value,
    shouldUseMaxiPlayer: shouldUseMaxiPlayer.value,
    mountHost: getElementDebug(playerViewportMountHost.value),
    ...details,
  })

const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'
const playerButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-transparent text-text/70 transition-colors hover:border-white/70 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const playerFullscreenButtonClass =
  'inline-flex h-[clamp(2.85rem,7.8vw,4.2rem)] w-[clamp(2.85rem,7.8vw,4.2rem)] items-center justify-center rounded-full border border-black/5 bg-transparent text-text/70 transition-colors hover:border-white/70 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const playerFullscreenSubtleButtonClass =
  'inline-flex h-[clamp(2.85rem,7.8vw,4.2rem)] w-[clamp(2.85rem,7.8vw,4.2rem)] items-center justify-center rounded-full bg-transparent text-text/45 transition-colors hover:bg-white/12 hover:text-text/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
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
const shouldUseDesktopFullscreenLayout = computed(
  () => shouldUseMaxiPlayer.value && !isTinyViewport.value,
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
    ? 'mx-auto flex h-full w-full min-h-0 flex-col'
    : '',
)
const playerDockContainerClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? shouldUseDesktopFullscreenLayout.value
      ? 'mx-auto h-full w-full overflow-hidden px-6 pt-3 pb-4 xl:px-8 xl:pt-4 xl:pb-5'
      : 'mx-auto h-full w-full overflow-hidden px-4 pt-4 pb-24 sm:px-6 sm:pt-6 sm:pb-28'
    : 'px-3 pt-3 pb-3',
)
const playerMaxiBodyClass = computed(() =>
  shouldUseMaxiPlayer.value ? 'flex min-h-0 flex-1 flex-col' : '',
)
const playerMaxiMediaStackClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? shouldUseDesktopFullscreenLayout.value
      ? 'mx-auto flex min-h-0 w-full max-w-[1300px] flex-1 flex-col justify-center'
      : 'mx-auto flex min-h-0 w-full flex-1 flex-col'
    : '',
)
const playerFrameWrapClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? shouldUseDesktopFullscreenLayout.value
      ? 'flex min-h-0 flex-1 items-center justify-center'
      : 'flex items-center justify-center'
    : 'mb-1.5',
)
const playerDockContainerStyle = computed(() =>
  shouldUseMaxiPlayer.value ? { paddingTop: '0.5rem' } : undefined,
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
    ? 'mx-auto overflow-hidden rounded-[1.4rem] border border-white/10 bg-black shadow-[0_30px_90px_rgb(0_0_0_/_0.32)]'
    : 'overflow-hidden border border-white/10 bg-black shadow-lg',
)
const playerViewportClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? 'player-viewport-fullscreen bg-black'
    : 'player-viewport w-full min-h-[200px] bg-black',
)
const playerActionRowClass = computed(() =>
  shouldUseMaxiPlayer.value
    ? shouldUseDesktopFullscreenLayout.value
      ? 'relative mt-2.5 flex items-center justify-center'
      : 'relative mt-4 flex items-center justify-center'
    : 'flex items-center gap-1',
)
const playerBottomSpacerClass = computed(() =>
  shouldUseMaxiPlayer.value ? 'hidden' : 'hidden',
)
const playerViewportStyle = computed(() =>
  shouldUseMaxiPlayer.value ? maxiPlayerViewportStyle.value : undefined,
)
const fullscreenToggleTitle = computed(() =>
  shouldUseMaxiPlayer.value && !isTinyViewport.value
    ? 'Exit full-screen player (F)'
    : 'Open full-screen player (F)',
)
const maxiPlayerCloseTitle = computed(() =>
  isTinyViewport.value ? 'Close player' : 'Exit full-screen player (F)',
)
const volumeButtonTitle = computed(() =>
  player.isMuted ? 'Unmute playback' : 'Mute playback',
)
const volumeTooltipLabel = computed(() => `Volume: ${player.volumePercent}%`)
const handleVolumeInteraction = () => {
  if (!player.isMuted) return
  player.setMuted(false)
}
const handleVolumeInput = (event: Event) => {
  const nextVolume = Number((event.target as HTMLInputElement).value)
  if (Number.isNaN(nextVolume)) return
  player.setVolume(nextVolume)
}
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
const waitForNextFrame = () =>
  new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()))
const scrollToPlayingSongRow = async () => {
  const year = player.playingYear
  const song = player.playingSong
  if (typeof window === 'undefined' || year === null || !song) return
  logJukeboxDebug('scroll-to-playing-song:start', {
    targetVideoId: song.youtubeVideoId,
    targetYear: year,
  })
  await nextTick()
  requestAnimationFrame(async () => {
    document
      .getElementById(`song-${year}-${song.rank}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    await waitForScrollSettle()
    logJukeboxDebug('scroll-to-playing-song:highlight', {
      targetVideoId: song.youtubeVideoId,
      targetYear: year,
    })
    player.flashSongHighlight(year, song.rank)
  })
}
const syncPlayerContainer = async () => {
  logJukeboxDebug('container-sync:start')
  if (!playerViewportMountHost.value) {
    logJukeboxDebug('container-sync:clear')
    player.setPlayerContainer(null)
    return
  }
  await nextTick()
  logJukeboxDebug('container-sync:set', {
    mountHost: getElementDebug(playerViewportMountHost.value),
  })
  player.setPlayerContainer(playerViewportMountHost.value)
}
const syncMaxiPlayerViewport = () => {
  if (typeof window === 'undefined') return
  if (!shouldUseMaxiPlayer.value) {
    maxiPlayerViewportStyle.value = {}
    return
  }
  const mediaStackElement = playerMaxiMediaStackElement.value
  if (!mediaStackElement) return
  const mediaStackRect = mediaStackElement.getBoundingClientRect()
  const actionRowHeight = Math.max(
    playerMaxiActionRowElement.value?.getBoundingClientRect().height ?? 0,
    0,
  )
  const viewportWidth = Math.max(mediaStackRect.width, 0)
  const viewportHeight = Math.max(mediaStackRect.height - actionRowHeight, 0)
  if (!viewportWidth || !viewportHeight) {
    maxiPlayerViewportStyle.value = { width: '0px', height: '0px' }
    return
  }
  const targetWidth = Math.min(viewportWidth, (viewportHeight * 16) / 9)
  const targetHeight = targetWidth * (9 / 16)
  maxiPlayerViewportStyle.value = {
    width: `${targetWidth}px`,
    height: `${targetHeight}px`,
  }
}
const scheduleMaxiPlayerViewportSync = () =>
  typeof window === 'undefined'
    ? undefined
    : window.requestAnimationFrame(() => syncMaxiPlayerViewport())
let maxiPlayerResizeObserver: ResizeObserver | null = null
watch(() => player.playingYear, updateThemeVars, { immediate: true })
watch(playerDockContainerElement, (nextElement, previousElement) => {
  if (previousElement) maxiPlayerResizeObserver?.unobserve(previousElement)
  if (nextElement) maxiPlayerResizeObserver?.observe(nextElement)
  void nextTick(() => scheduleMaxiPlayerViewportSync())
})
watch(playerMaxiContentElement, (nextElement, previousElement) => {
  if (previousElement) maxiPlayerResizeObserver?.unobserve(previousElement)
  if (nextElement) maxiPlayerResizeObserver?.observe(nextElement)
  void nextTick(() => scheduleMaxiPlayerViewportSync())
})
watch(playerMaxiMediaStackElement, (nextElement, previousElement) => {
  if (previousElement) maxiPlayerResizeObserver?.unobserve(previousElement)
  if (nextElement) maxiPlayerResizeObserver?.observe(nextElement)
  void nextTick(() => scheduleMaxiPlayerViewportSync())
})
watch(playerMaxiActionRowElement, (nextElement, previousElement) => {
  if (previousElement) maxiPlayerResizeObserver?.unobserve(previousElement)
  if (nextElement) maxiPlayerResizeObserver?.observe(nextElement)
  void nextTick(() => scheduleMaxiPlayerViewportSync())
})
watch(playerViewportMountHost, () => void syncPlayerContainer(), {
  flush: 'post',
})
watch(playerViewportMountHost, (mountHost, previousMountHost) => {
  logJukeboxDebug('mount-host:changed', {
    previousMountHost: getElementDebug(previousMountHost),
    nextMountHost: getElementDebug(mountHost),
  })
})
watch(
  [
    () => player.shouldBootstrapPlaybackFromShell,
    () => player.playingSong?.youtubeVideoId,
    playerViewportMountHost,
  ],
  async ([shouldBootstrapPlaybackFromShell, playingSongVideoId, mountHost]) => {
    logJukeboxDebug('shell-bootstrap:watch', {
      shouldBootstrapPlaybackFromShell,
      playingSongVideoId: playingSongVideoId ?? null,
      mountHost: getElementDebug(mountHost),
    })
    if (!shouldBootstrapPlaybackFromShell || !playingSongVideoId || !mountHost)
      return
    await nextTick()
    await waitForNextFrame()
    await waitForNextFrame()
    logJukeboxDebug('shell-bootstrap:complete')
    void player.completeShellPlaybackBootstrap()
  },
  { flush: 'post' },
)
watch(shouldShowPlayerDock, (shouldShow) => {
  logJukeboxDebug('dock:visibility', { shouldShow })
  if (shouldShow) return
  isDesktopFullscreen.value = false
})
watch(shouldUseMaxiPlayer, (shouldShowMaxiPlayer) => {
  logJukeboxDebug('viewport:maxi-toggle', { shouldShowMaxiPlayer })
  if (typeof document === 'undefined') return
  document.documentElement.dataset.playerFullscreen = shouldShowMaxiPlayer
    ? 'true'
    : 'false'
  document.body.style.overflow = shouldShowMaxiPlayer ? 'hidden' : ''
  void nextTick(() => scheduleMaxiPlayerViewportSync())
  void nextTick(() => player.refreshPlayerAfterViewportChange())
})
watch(
  [
    () => player.playingSong?.youtubeVideoId,
    () => player.playingYear,
    shouldShowPlaybackStartCta,
    isTinyViewport,
  ],
  () => void nextTick(() => scheduleMaxiPlayerViewportSync()),
  { flush: 'post' },
)
const handleFullscreenToggle = () => {
  logJukeboxDebug('fullscreen:toggle')
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
  logJukeboxDebug('fullscreen:open')
  if (!player.playingSong || isTinyViewport.value) return
  isDesktopFullscreen.value = true
}
const closeFullscreen = () => {
  logJukeboxDebug('fullscreen:close')
  if (isTinyViewport.value) {
    player.stop()
    return
  }
  if (!isDesktopFullscreen.value) return
  isDesktopFullscreen.value = false
}
onMounted(() => {
  logJukeboxDebug('mounted')
  window.addEventListener(
    PLAYER_FULLSCREEN_TOGGLE_EVENT,
    handleFullscreenToggle,
  )
  window.visualViewport?.addEventListener(
    'resize',
    scheduleMaxiPlayerViewportSync,
  )
  window.addEventListener('resize', scheduleMaxiPlayerViewportSync)
  maxiPlayerResizeObserver = new ResizeObserver(() =>
    scheduleMaxiPlayerViewportSync(),
  )
  if (playerDockContainerElement.value)
    maxiPlayerResizeObserver.observe(playerDockContainerElement.value)
  if (playerMaxiContentElement.value)
    maxiPlayerResizeObserver.observe(playerMaxiContentElement.value)
  if (playerMaxiMediaStackElement.value)
    maxiPlayerResizeObserver.observe(playerMaxiMediaStackElement.value)
  if (playerMaxiActionRowElement.value)
    maxiPlayerResizeObserver.observe(playerMaxiActionRowElement.value)
  void nextTick(() => scheduleMaxiPlayerViewportSync())
})
onMounted(() =>
  window.addEventListener(PLAYER_FULLSCREEN_OPEN_EVENT, handleFullscreenOpen),
)
onUnmounted(() => {
  logJukeboxDebug('unmounted')
  player.setPlayerContainer(null)
  maxiPlayerResizeObserver?.disconnect()
  maxiPlayerResizeObserver = null
})
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
  window.visualViewport?.removeEventListener(
    'resize',
    scheduleMaxiPlayerViewportSync,
  ),
)
onUnmounted(() =>
  window.removeEventListener('resize', scheduleMaxiPlayerViewportSync),
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
  logJukeboxDebug('go-to-playing-song:start', {
    targetVideoId: song.youtubeVideoId,
    targetYear: year,
  })
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
  logJukeboxDebug('resume-playback')
  void player.play(player.playingSong, player.playingYear, 'player-btn')
}
const openReportModal = () => {
  if (!player.playingSong || player.playingYear === null) return
  logJukeboxDebug('report-modal:open')
  isReportModalOpen.value = true
}
const openMaxiPlayer = () => {
  if (!player.playingSong) return
  logJukeboxDebug('maxi-player:open')
  isDesktopFullscreen.value = true
}
const closeMaxiPlayer = () => {
  if (!player.playingSong) return
  logJukeboxDebug('maxi-player:close')
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

    <div
      ref="playerDockContainerElement"
      :class="playerDockContainerClass"
      :style="playerDockContainerStyle"
    >
      <div ref="playerMaxiContentElement" :class="playerContentClass">
        <div
          v-if="shouldUseMaxiPlayer && player.playingSong"
          class="mx-auto mt-2 mb-2 flex w-full max-w-[1300px] items-start justify-end gap-3 sm:mt-3 sm:mb-3 sm:grid sm:items-center sm:[grid-template-columns:1fr_auto_1fr]"
        >
          <div
            v-if="player.playingYear !== null"
            class="hidden text-left text-lg font-medium tracking-[0.12em] sm:block sm:self-end sm:justify-self-start sm:text-xl"
          >
            <span :style="jukeboxYearStyle">{{ jukeboxYearLabel }}</span>
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
                class="mt-1 text-base font-medium tracking-[0.12em]"
              >
                <span :style="jukeboxYearStyle">{{ jukeboxYearLabel }}</span>
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

        <div :class="playerMaxiBodyClass">
          <div
            v-if="shouldUseMaxiPlayer && player.playingSong"
            class="mb-2 w-full"
          >
            <div class="mx-auto min-w-0 max-w-[1300px]">
              <SongRow
                v-if="player.playingYear !== null"
                :song="player.playingSong"
                :year="player.playingYear"
                :show-embed-warning="true"
                variant="maxi"
              />
            </div>
          </div>

          <div
            ref="playerMaxiMediaStackElement"
            :class="playerMaxiMediaStackClass"
          >
            <div :class="playerFrameWrapClass">
              <div
                v-if="
                  !shouldUseMaxiPlayer &&
                  player.playingSong &&
                  player.playingYear !== null
                "
                class="mb-1.5 px-0.5 text-left text-[0.96rem] font-medium tracking-[0.12em]"
              >
                <span class="text-text" :style="jukeboxYearStyle">
                  <span>{{ jukeboxYearLabel }}</span>
                  <span class="ml-1">#{{ player.playingSong?.rank }}</span>
                </span>
              </div>

              <div :class="playerFrameClass">
                <div :class="playerViewportClass" :style="playerViewportStyle">
                  <div
                    ref="playerViewportMountHost"
                    class="absolute inset-0"
                    aria-hidden="true"
                  />
                  <button
                    v-if="shouldShowRestoredPoster && player.playingSong"
                    type="button"
                    aria-label="Play playback"
                    class="absolute inset-0 cursor-pointer bg-white"
                    @click="resumePlayback"
                  >
                    <img
                      :src="player.playingSong.thumbnailPath"
                      :alt="player.playingSong.title"
                      class="h-full w-full object-cover object-top"
                    />
                    <div
                      class="absolute inset-0"
                      :style="{
                        background:
                          'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 3%, rgba(0, 0, 0, 0.94) 100%)',
                      }"
                    />
                    <div
                      class="absolute inset-x-0 bottom-0 flex justify-end p-3.5"
                    >
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
                shouldUseMaxiPlayer &&
                player.playingSong &&
                !shouldShowPlaybackStartCta
              "
              ref="playerMaxiActionRowElement"
              :class="playerActionRowClass"
              class="relative mx-auto mt-4 w-full max-w-[1300px]"
            >
              <div class="flex items-center justify-center gap-3.5">
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
                <div class="flex items-center gap-2">
                  <div
                    class="group/volume relative flex items-center before:absolute before:bottom-full before:left-1/2 before:z-10 before:h-3 before:w-10 before:-translate-x-1/2 before:content-['']"
                  >
                    <div
                      class="pointer-events-none absolute right-1/2 bottom-full z-20 mb-3 flex w-10 translate-x-1/2 translate-y-1 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-surface/95 px-0.5 py-3 opacity-0 shadow-[0_18px_45px_rgb(0_0_0_/_0.28)] backdrop-blur-sm transition duration-150 group-hover/volume:pointer-events-auto group-hover/volume:translate-y-0 group-hover/volume:opacity-100 group-focus-within/volume:pointer-events-auto group-focus-within/volume:translate-y-0 group-focus-within/volume:opacity-100"
                    >
                      <input
                        :value="player.volumePercent"
                        class="volume-slider accent-[color:var(--color-primary)]"
                        :class="player.isMuted && 'opacity-60'"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        aria-label="Volume"
                        :title="volumeTooltipLabel"
                        @keydown="handleVolumeInteraction"
                        @pointerdown="handleVolumeInteraction"
                        @input="handleVolumeInput"
                      />
                    </div>

                    <button
                      type="button"
                      :title="volumeButtonTitle"
                      :aria-label="volumeButtonTitle"
                      :class="playerFullscreenSubtleButtonClass"
                      @click="player.toggleMute"
                    >
                      <VolumeX
                        v-if="player.isMuted || player.volumePercent === 0"
                        class="h-[clamp(1.2rem,3.4vw,1.8rem)] w-[clamp(1.2rem,3.4vw,1.8rem)]"
                      />
                      <Volume1
                        v-else-if="player.volumePercent < 50"
                        class="h-[clamp(1.2rem,3.4vw,1.8rem)] w-[clamp(1.2rem,3.4vw,1.8rem)]"
                      />
                      <Volume2
                        v-else
                        class="h-[clamp(1.2rem,3.4vw,1.8rem)] w-[clamp(1.2rem,3.4vw,1.8rem)]"
                      />
                    </button>
                  </div>

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
            </div>
          </div>

          <template v-if="!shouldUseMaxiPlayer">
            <div
              v-if="player.playingSong"
              class="mt-1.5 flex items-start gap-2.5"
            >
              <button
                type="button"
                title="Go to song (G)"
                aria-label="Go to song"
                class="relative h-[4.2rem] w-[4.2rem] shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/10 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                @click="goToPlayingSong"
              >
                <img
                  :src="player.playingSong?.thumbnailPath"
                  :alt="player.playingSong?.title"
                  class="block h-full w-full object-cover"
                />
              </button>

              <div class="min-w-0 flex-1">
                <div class="flex items-start gap-1.5">
                  <button
                    type="button"
                    aria-label="Go to song"
                    class="min-w-0 flex-1 cursor-pointer rounded-xl px-1.5 py-0.5 pr-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    @click="goToPlayingSong"
                  >
                    <p
                      class="break-words text-base font-bold leading-snug text-text"
                    >
                      <span>{{ player.playingSong?.title }}</span>
                      <EmbedFallbackBadge
                        :song="player.playingSong"
                        class="ml-1.5"
                        size="sm"
                      />
                    </p>
                    <p class="break-words text-sm leading-snug text-text-muted">
                      {{ player.playingSong?.artist }}
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
              v-if="player.playingSong && !shouldShowPlaybackStartCta"
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

                <div
                  class="group/volume relative flex items-center before:absolute before:bottom-full before:left-1/2 before:z-10 before:h-3 before:w-10 before:-translate-x-1/2 before:content-['']"
                >
                  <div
                    class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 flex w-10 -translate-x-1/2 translate-y-1 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-surface/95 px-0.5 py-3 opacity-0 shadow-[0_18px_45px_rgb(0_0_0_/_0.28)] backdrop-blur-sm transition duration-150 group-hover/volume:pointer-events-auto group-hover/volume:translate-y-0 group-hover/volume:opacity-100 group-focus-within/volume:pointer-events-auto group-focus-within/volume:translate-y-0 group-focus-within/volume:opacity-100"
                  >
                    <input
                      :value="player.volumePercent"
                      class="volume-slider accent-[color:var(--color-primary)]"
                      :class="player.isMuted && 'opacity-60'"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      aria-label="Volume"
                      :title="volumeTooltipLabel"
                      @keydown="handleVolumeInteraction"
                      @pointerdown="handleVolumeInteraction"
                      @input="handleVolumeInput"
                    />
                  </div>

                  <button
                    type="button"
                    :title="volumeButtonTitle"
                    :aria-label="volumeButtonTitle"
                    :class="playerButtonClass"
                    @click="player.toggleMute"
                  >
                    <VolumeX
                      v-if="player.isMuted || player.volumePercent === 0"
                      class="h-4.5 w-4.5"
                    />
                    <Volume1
                      v-else-if="player.volumePercent < 50"
                      class="h-4.5 w-4.5"
                    />
                    <Volume2 v-else class="h-4.5 w-4.5" />
                  </button>
                </div>

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
              v-if="player.playingSong && !shouldShowPlaybackStartCta"
              class="mt-0.5 flex justify-end pr-0.5"
            >
              <p
                class="font-mono text-[0.62rem] tabular-nums text-text-muted"
                :class="!player.showSeekBar && 'opacity-50 grayscale-[0.5]'"
              >
                <template v-if="player.showSeekBar">
                  {{ player.formattedCurrentTime }}/{{
                    player.formattedDuration
                  }}
                </template>
                <template v-else>0:00/0:00</template>
              </p>
            </div>

            <div
              v-if="player.playingSong && !shouldShowPlaybackStartCta"
              class="relative mt-0.5 -mx-0.5 px-0.5"
            >
              <PlaybackSeekBar
                :disabled="!player.showSeekBar"
                root-class="pointer-events-auto h-4 cursor-pointer"
                track-class="h-1.5"
              />
            </div>
          </template>
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

.volume-slider {
  width: 0.7rem;
  height: 6rem;
  writing-mode: vertical-lr;
  direction: rtl;
}
</style>
