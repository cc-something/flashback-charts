import { ref, computed, nextTick, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Song } from '@/types/song'
import { useYouTubeApi } from '@/composables/useYouTubeApi'
import { useRickRollMode } from '@/composables/useRickRollMode'
import { useChartStore } from '@/stores/chart'
import { useToastStore } from '@/stores/toast'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'
import { getSongsForSortOrder } from '@/utils/chartOrder'
import { getYearData } from '@/data'

const STORAGE_KEY = 'flashback-miniplayer'
const MUTE_STORAGE_KEY = 'flashback-player-muted'
const SAVE_INTERVAL_MS = 3_000
const CONNECTIVITY_CHECK_TIMEOUT_MS = 1_500
const MIN_ERROR_LOADING_MS = 1_000
const OFFLINE_PLAYBACK_MESSAGE = 'No internet connection. Cannot play.'
const OFFLINE_PLAYBACK_STOPPED_MESSAGE =
  'No internet connection. Playback stopped.'
const PLAYER_LOAD_FAILED_MESSAGE =
  'Failed to load player. Check your connection.'
const SONG_ROW_HIGHLIGHT_DURATION_MS = 1_000
const SONG_ROW_LOOKUP_ATTEMPTS = 24
const SONG_ROW_SCROLL_SETTLE_MS = 350
const SONG_PLAY_EVENT_DELAY_MS = 5_000
const TINY_VIEWPORT_MEDIA_QUERY = '(max-width: 839px)'
const MAX_STARTUP_RECOVERY_ATTEMPTS = 1
const PLAYER_SKIP_FAILED_MESSAGE =
  'Playback failed to start. Skipping to the next song.'

interface SavedPlayerState {
  year: number
  videoId: string
  timeSeconds: number
}

const loadSavedState = (): SavedPlayerState | null => {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      parsed?.year &&
      parsed?.videoId &&
      typeof parsed.timeSeconds === 'number'
    )
      return parsed as SavedPlayerState
    return null
  } catch {
    return null
  }
}

const saveToDisk = (state: SavedPlayerState) => {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* quota exceeded — ignore */
  }
}

const clearSavedState = () => {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

const loadMutedPreference = () => {
  if (typeof localStorage === 'undefined') return false
  try {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

const saveMutedPreference = (nextMuted: boolean) => {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(MUTE_STORAGE_KEY, String(nextMuted))
  } catch {
    /* quota exceeded — ignore */
  }
}

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused'

export type PlayTrigger =
  | 'direct'
  | 'autoplay'
  | 'hotkey'
  | 'player-btn'
  | 'home-btn'
  | 'decade-btn'
  | 'search'
  | 'rickroll'
  | 'skip'

const MAX_RETRIES = 2
const STALL_TIMEOUT_MS = 4_000
const EMBED_BLOCKED_ERROR_CODES = new Set([101, 150])
const YOUTUBE_STATE_LABELS: Record<number, string> = {
  [-1]: 'unstarted',
  0: 'ended',
  1: 'playing',
  2: 'paused',
  3: 'buffering',
  5: 'video-cued',
}
const isEmbedBlockedError = (errorCode?: number) =>
  errorCode !== undefined && EMBED_BLOCKED_ERROR_CODES.has(errorCode)
const getYearSongs = async (year: number) => getYearData(year) ?? null

export const usePlayerStore = defineStore('player', () => {
  const { ensureLoaded, registerActive, clearActive } = useYouTubeApi()
  const { deactivate, isRickRollActive } = useRickRollMode()

  const playingSong = ref<Song | null>(null)
  const playingYear = ref<number | null>(null)
  const playerState = ref<PlayerState>('idle')
  const currentTimeSeconds = ref(0)
  const durationSeconds = ref(0)
  const isSeekDragging = ref(false)
  const seekPreviewSeconds = ref<number | null>(null)
  const isMuted = ref(loadMutedPreference())
  const hasMountedPlayer = ref(false)
  const isAwaitingPlaybackStart = ref(false)
  const highlightedSongKey = ref<string | null>(null)
  const pendingHighlightedSongKey = ref<string | null>(null)
  const shouldBootstrapPlaybackFromShell = ref(false)

  let ytPlayer: YTPlayer | null = null
  let progressTimerId: number | null = null
  let saveTimerId: number | null = null
  let playerContainerEl: HTMLDivElement | null = null
  let retryCount = 0
  let currentPlaySong: Song | null = null
  let currentStartAtSeconds: number | undefined
  let offlineHandler: (() => void) | null = null
  let stallTimerId: ReturnType<typeof setTimeout> | null = null
  let connectivityCheckPromise: Promise<boolean> | null = null
  let playerInitPromise: Promise<YTPlayer | null> | null = null
  let isPlayerReady = false
  let loadedPlayerVideoId: string | null = null
  let loadingAttemptId = 0
  let loadingStartedAt = 0
  let clearSongHighlightTimerId: ReturnType<typeof setTimeout> | null = null
  let shouldRestorePlayerOnContainerReady = false
  let pendingPlayerMountEl: HTMLElement | null = null
  let destroyPlayerOnContainerLossTimerId: ReturnType<
    typeof setTimeout
  > | null = null
  let activePlayerGeneration = 0
  let pendingSongPlayEventTimerId: ReturnType<typeof setTimeout> | null = null
  let pendingSongPlayEventPayload: {
    artist: string
    title: string
    year: string
    source: PlayTrigger
  } | null = null
  let hasTrackedCurrentSongPlayEvent = false
  let startupRecoveryCount = 0
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
  const getPlayerDebugSnapshot = () => ({
    playingVideoId: playingSong.value?.youtubeVideoId ?? null,
    playingYear: playingYear.value,
    playerState: playerState.value,
    currentPlayVideoId: currentPlaySong?.youtubeVideoId ?? null,
    currentStartAtSeconds,
    currentTimeSeconds: currentTimeSeconds.value,
    durationSeconds: durationSeconds.value,
    isPlayerReady,
    loadedPlayerVideoId,
    hasYtPlayer: !!ytPlayer,
    hasPlayerInitPromise: !!playerInitPromise,
    hasMountedPlayer: hasMountedPlayer.value,
    isAwaitingPlaybackStart: isAwaitingPlaybackStart.value,
    shouldBootstrapPlaybackFromShell: shouldBootstrapPlaybackFromShell.value,
    shouldRestorePlayerOnContainerReady,
    hasPendingPlayerMountEl: !!pendingPlayerMountEl,
    retryCount,
    startupRecoveryCount,
    loadingAttemptId,
    playerContainer: getElementDebug(playerContainerEl),
    pendingPlayerMount: getElementDebug(pendingPlayerMountEl),
  })
  const logPlayerDebug = (
    eventLabel: string,
    details: Record<string, unknown> = {},
  ) =>
    console.info('[player]', eventLabel, {
      ...getPlayerDebugSnapshot(),
      ...details,
    })

  const isActive = computed(() => playerState.value !== 'idle')
  const displayedTimeSeconds = computed(
    () => seekPreviewSeconds.value ?? currentTimeSeconds.value,
  )
  const getReadyYtPlayer = () => {
    if (!ytPlayer || !isPlayerReady) return null
    if (
      typeof ytPlayer.loadVideoById !== 'function' ||
      typeof ytPlayer.cueVideoById !== 'function'
    )
      return null
    return ytPlayer
  }
  const getHasLoadedCurrentSongInPlayer = (song: Song) =>
    loadedPlayerVideoId === song.youtubeVideoId
  const showOfflinePlaybackStoppedToast = () =>
    useToastStore().show(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
  const getSongHighlightKey = (year: number, rank: number) => `${year}-${rank}`
  const deactivateRickRollIfNeeded = () => {
    if (!isRickRollActive.value) return
    deactivate()
  }

  const getConnectivityCheckUrl = () => {
    const connectivityCheckUrl = new URL('/favicon.svg', window.location.origin)
    connectivityCheckUrl.searchParams.set('t', String(Date.now()))
    return connectivityCheckUrl.toString()
  }

  const getHasNetworkConnection = async () => {
    if (typeof window === 'undefined') return false
    if (!navigator.onLine) return false
    if (connectivityCheckPromise) return connectivityCheckPromise

    connectivityCheckPromise = new Promise<boolean>((resolve) => {
      const abortController = new AbortController()
      const timeoutId = window.setTimeout(
        () => abortController.abort(),
        CONNECTIVITY_CHECK_TIMEOUT_MS,
      )

      void fetch(getConnectivityCheckUrl(), {
        cache: 'no-store',
        credentials: 'same-origin',
        signal: abortController.signal,
      })
        .then((response) => resolve(response.ok))
        .catch(() => resolve(false))
        .finally(() => {
          clearTimeout(timeoutId)
          connectivityCheckPromise = null
        })
    })

    return connectivityCheckPromise
  }

  const preload = async () => {
    if (typeof window === 'undefined') return
    logPlayerDebug('preload:start')
    try {
      await ensureLoaded()
      logPlayerDebug('preload:ready')
    } catch {
      logPlayerDebug('preload:error')
      /* noop */
    }
  }
  const getHasImmediateNetworkConnection = () => {
    if (typeof window === 'undefined') return false
    return navigator.onLine
  }
  const getIsTinyViewport = () => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    )
      return false
    return window.matchMedia(TINY_VIEWPORT_MEDIA_QUERY).matches
  }
  const clearLoadingTracking = () => {
    loadingStartedAt = 0
  }
  const startLoadingAttempt = () => {
    loadingAttemptId += 1
    loadingStartedAt = Date.now()
    playerState.value = 'loading'
    logPlayerDebug('loading-attempt:start')
    return loadingAttemptId
  }
  const getErrorLoadingDelay = () =>
    Math.max(0, MIN_ERROR_LOADING_MS - (Date.now() - loadingStartedAt))
  const waitForMinimumErrorLoading = async (attemptId: number) => {
    const errorLoadingDelay = getErrorLoadingDelay()
    if (errorLoadingDelay > 0)
      await new Promise((resolve) => setTimeout(resolve, errorLoadingDelay))
    return attemptId === loadingAttemptId && playerState.value === 'loading'
  }
  const failLoadingAttempt = async (
    message: string,
    onFail: () => void = stop,
  ) => {
    const activeLoadingAttemptId = loadingAttemptId
    logPlayerDebug('loading-attempt:fail-pending', {
      message,
      activeLoadingAttemptId,
    })
    if (!(await waitForMinimumErrorLoading(activeLoadingAttemptId))) return
    logPlayerDebug('loading-attempt:fail', { message, activeLoadingAttemptId })
    useToastStore().show(message)
    onFail()
  }

  const formatPlaybackTime = (timeSeconds: number) => {
    if (!Number.isFinite(timeSeconds) || timeSeconds <= 0) return '0:00'
    const wholeSeconds = Math.floor(timeSeconds)
    const minutes = Math.floor(wholeSeconds / 60)
    const seconds = wholeSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formattedCurrentTime = computed(() =>
    formatPlaybackTime(displayedTimeSeconds.value),
  )
  const formattedDuration = computed(() =>
    formatPlaybackTime(durationSeconds.value),
  )
  const showSeekBar = computed(
    () => playerState.value !== 'idle' && durationSeconds.value > 0,
  )
  const seekSliderValue = computed(() => [displayedTimeSeconds.value])
  const clearDestroyPlayerOnContainerLossTimer = () => {
    if (destroyPlayerOnContainerLossTimerId === null) return
    clearTimeout(destroyPlayerOnContainerLossTimerId)
    destroyPlayerOnContainerLossTimerId = null
  }
  const clearPendingSongPlayEventTimer = () => {
    if (pendingSongPlayEventTimerId === null) return
    clearTimeout(pendingSongPlayEventTimerId)
    pendingSongPlayEventTimerId = null
  }
  const scheduleSongPlayEvent = () => {
    if (
      hasTrackedCurrentSongPlayEvent ||
      !pendingSongPlayEventPayload ||
      pendingSongPlayEventTimerId !== null
    )
      return
    pendingSongPlayEventTimerId = setTimeout(() => {
      pendingSongPlayEventTimerId = null
      if (!pendingSongPlayEventPayload || playerState.value !== 'playing')
        return
      usePlausibleAnalytics().trackEvent(
        'Song Play',
        pendingSongPlayEventPayload,
      )
      hasTrackedCurrentSongPlayEvent = true
    }, SONG_PLAY_EVENT_DELAY_MS)
  }
  const updatePlayerIframeFocusability = () => {
    const playerIframeEl = playerContainerEl?.querySelector('iframe')
    if (!(playerIframeEl instanceof HTMLIFrameElement)) return
    playerIframeEl.tabIndex = -1
    playerIframeEl.setAttribute('tabindex', '-1')
  }
  const storePlaybackPositionForRemount = () => {
    const readyYtPlayer = getReadyYtPlayer()
    if (!readyYtPlayer) return
    syncPlaybackProgress()
    const nextCurrentTime = readyYtPlayer.getCurrentTime?.()
    if (!Number.isFinite(nextCurrentTime) || !nextCurrentTime) return
    currentTimeSeconds.value = nextCurrentTime
    currentStartAtSeconds = nextCurrentTime
  }

  const restorePlayerAfterContainerSwap = async () => {
    logPlayerDebug('container:restore-after-swap:start')
    if (!currentPlaySong?.youtubeVideoId || !playerContainerEl) return
    const mountedPlayer = await ensurePlayerMounted()
    if (!mountedPlayer) return
    if (isAwaitingPlaybackStart.value || playerState.value === 'paused') {
      logPlayerDebug('container:restore-after-swap:cue')
      cueCurrentSongInPlayer()
      return
    }
    playerState.value = 'loading'
    logPlayerDebug('container:restore-after-swap:load')
    loadCurrentSongIntoPlayer()
  }
  const refreshPlayerAfterViewportChange = async () => {
    logPlayerDebug('viewport:refresh-request')
    if (
      !playerContainerEl ||
      !currentPlaySong?.youtubeVideoId ||
      playerState.value === 'playing'
    )
      return
    storePlaybackPositionForRemount()
    destroyPlayer()
    await restorePlayerAfterContainerSwap()
  }

  const setPlayerContainer = (el: HTMLDivElement | null) => {
    if (playerContainerEl === el) return
    const previousPlayerContainerEl = playerContainerEl
    const hasPlayerOnHostChange =
      !!el &&
      previousPlayerContainerEl !== el &&
      !!(ytPlayer || playerInitPromise)
    logPlayerDebug('container:set', {
      previousContainer: getElementDebug(previousPlayerContainerEl),
      nextContainer: getElementDebug(el),
    })
    clearDestroyPlayerOnContainerLossTimer()
    if (hasPlayerOnHostChange) {
      logPlayerDebug('container:remount-for-host-change')
      if (playerState.value !== 'idle' && currentPlaySong?.youtubeVideoId)
        storePlaybackPositionForRemount()
      destroyPlayer()
      playerContainerEl = el
      if (playerState.value !== 'idle' && currentPlaySong?.youtubeVideoId) {
        void restorePlayerAfterContainerSwap()
        return
      }
      void ensurePlayerMounted()
      return
    }
    playerContainerEl = el
    if (!playerContainerEl) {
      const orphanedPlayerMountEl = pendingPlayerMountEl
        ? null
        : previousPlayerContainerEl?.firstElementChild
      if (orphanedPlayerMountEl instanceof HTMLElement)
        pendingPlayerMountEl = orphanedPlayerMountEl
      logPlayerDebug('container:cleared', {
        orphanedPlayerMount: getElementDebug(orphanedPlayerMountEl),
      })
      if (playerState.value !== 'idle' && currentPlaySong?.youtubeVideoId) {
        storePlaybackPositionForRemount()
        shouldRestorePlayerOnContainerReady = true
        logPlayerDebug('container:marked-for-restore')
      }
      if (!ytPlayer && !playerInitPromise) {
        logPlayerDebug('container:cleared-no-player-destroy')
        destroyPlayer()
        return
      }
      if (typeof window === 'undefined') {
        logPlayerDebug('container:cleared-no-window-destroy')
        destroyPlayer()
        return
      }
      destroyPlayerOnContainerLossTimerId = window.setTimeout(() => {
        logPlayerDebug('container:loss-timeout-destroy')
        pendingPlayerMountEl = null
        destroyPlayer()
      }, 0)
      return
    }
    if (shouldRestorePlayerOnContainerReady) {
      logPlayerDebug('container:restore-on-ready')
      shouldRestorePlayerOnContainerReady = false
      void restorePlayerAfterContainerSwap()
      return
    }
    if (ytPlayer || playerInitPromise) return
    if (playerState.value !== 'idle' && currentPlaySong?.youtubeVideoId) {
      logPlayerDebug('container:restore-active-session')
      void restorePlayerAfterContainerSwap()
      return
    }
    logPlayerDebug('container:eager-mount-request')
    void ensurePlayerMounted()
  }

  const clearProgressTimer = () => {
    if (progressTimerId === null) return
    clearInterval(progressTimerId)
    progressTimerId = null
  }

  const clearStallTimer = () => {
    if (stallTimerId === null) return
    clearTimeout(stallTimerId)
    stallTimerId = null
  }
  const clearSongHighlightTimer = () => {
    if (clearSongHighlightTimerId === null) return
    clearTimeout(clearSongHighlightTimerId)
    clearSongHighlightTimerId = null
  }
  const clearSongHighlight = () => {
    clearSongHighlightTimer()
    highlightedSongKey.value = null
  }
  const getSongRowId = (year: number, rank: number) => `song-${year}-${rank}`
  const queueSongHighlight = (year: number, rank: number) => {
    pendingHighlightedSongKey.value = getSongHighlightKey(year, rank)
  }
  const flashSongHighlight = (year: number, rank: number) => {
    const songHighlightKey = getSongHighlightKey(year, rank)
    pendingHighlightedSongKey.value = null
    clearSongHighlightTimer()
    highlightedSongKey.value = songHighlightKey
    if (typeof window === 'undefined') return
    clearSongHighlightTimerId = window.setTimeout(() => {
      if (highlightedSongKey.value === songHighlightKey)
        highlightedSongKey.value = null
      clearSongHighlightTimerId = null
    }, SONG_ROW_HIGHLIGHT_DURATION_MS)
  }
  const revealQueuedSongHighlight = (year: number, rank: number) => {
    if (pendingHighlightedSongKey.value !== getSongHighlightKey(year, rank))
      return
    flashSongHighlight(year, rank)
  }
  const isSongHighlighted = (year: number, rank: number) =>
    highlightedSongKey.value === getSongHighlightKey(year, rank)
  const findSongRowElement = async (year: number, rank: number) => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return null
    for (
      let attemptIndex = 0;
      attemptIndex < SONG_ROW_LOOKUP_ATTEMPTS;
      attemptIndex += 1
    ) {
      const songRowElement = document.getElementById(getSongRowId(year, rank))
      if (songRowElement) return songRowElement
      await nextTick()
      await new Promise<void>((resolve) =>
        window.requestAnimationFrame(() => resolve()),
      )
    }
    return null
  }
  const waitForSongRowScrollSettle = () =>
    new Promise<void>((resolve) =>
      window.setTimeout(resolve, SONG_ROW_SCROLL_SETTLE_MS),
    )
  const scrollSongIntoView = async (
    song: Song,
    year: number,
    shouldHighlight = false,
  ) => {
    const songRowElement = await findSongRowElement(year, song.rank)
    if (!songRowElement) return
    songRowElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (!shouldHighlight) return
    await waitForSongRowScrollSettle()
    flashSongHighlight(year, song.rank)
  }

  const clearSeekPreview = () => {
    isSeekDragging.value = false
    seekPreviewSeconds.value = null
  }
  const resetPlaybackProgress = () => {
    currentTimeSeconds.value = currentStartAtSeconds ?? 0
    durationSeconds.value = 0
    if (!isSeekDragging.value) seekPreviewSeconds.value = null
  }

  const syncPlaybackProgress = () => {
    if (!ytPlayer || typeof ytPlayer.getDuration !== 'function') return
    const nextDuration = ytPlayer.getDuration()
    const nextCurrent = ytPlayer.getCurrentTime()
    if (nextDuration > 0) durationSeconds.value = nextDuration
    if (durationSeconds.value <= 0) return
    currentTimeSeconds.value = Math.min(nextCurrent, durationSeconds.value)

    if (!isSeekDragging.value && seekPreviewSeconds.value !== null) {
      const seekDelta = Math.abs(
        currentTimeSeconds.value - seekPreviewSeconds.value,
      )
      if (seekDelta < 0.75 || playerState.value !== 'loading')
        seekPreviewSeconds.value = null
    }
  }

  const startProgressTimer = () => {
    if (typeof window === 'undefined') return
    clearProgressTimer()
    syncPlaybackProgress()
    progressTimerId = setInterval(syncPlaybackProgress, 250)
  }

  const clearSaveTimer = () => {
    if (saveTimerId === null) return
    clearInterval(saveTimerId)
    saveTimerId = null
  }

  const persistState = () => {
    const song = playingSong.value
    const year = playingYear.value
    if (!song?.youtubeVideoId || year === null) return
    saveToDisk({
      year,
      videoId: song.youtubeVideoId,
      timeSeconds: currentTimeSeconds.value,
    })
  }

  const startSaveTimer = () => {
    if (typeof window === 'undefined') return
    clearSaveTimer()
    persistState()
    saveTimerId = setInterval(persistState, SAVE_INTERVAL_MS)
  }

  // Start/stop save timer when player becomes active/inactive
  watch(isActive, (active) => {
    if (active) startSaveTimer()
    else clearSaveTimer()
  })

  const clearOfflineHandler = () => {
    if (!offlineHandler) return
    if (typeof window !== 'undefined')
      window.removeEventListener('offline', offlineHandler)
    offlineHandler = null
  }
  const enterBlockedPlaybackState = () => {
    logPlayerDebug('playback:enter-blocked-state')
    clearStallTimer()
    clearLoadingTracking()
    clearProgressTimer()
    isAwaitingPlaybackStart.value = false
    playerState.value = 'paused'
  }
  const clearPlaybackSession = () => {
    logPlayerDebug('session:clear')
    clearDestroyPlayerOnContainerLossTimer()
    clearProgressTimer()
    clearStallTimer()
    clearPendingSongPlayEventTimer()
    currentTimeSeconds.value = 0
    durationSeconds.value = 0
    retryCount = 0
    currentPlaySong = null
    currentStartAtSeconds = undefined
    isAwaitingPlaybackStart.value = false
    clearLoadingTracking()
    clearSeekPreview()
    clearOfflineHandler()
    shouldRestorePlayerOnContainerReady = false
    pendingPlayerMountEl = null
    pendingSongPlayEventPayload = null
    hasTrackedCurrentSongPlayEvent = false
    startupRecoveryCount = 0
    shouldBootstrapPlaybackFromShell.value = false
  }
  const destroyPlayer = () => {
    logPlayerDebug('player:destroy:start')
    activePlayerGeneration += 1
    clearDestroyPlayerOnContainerLossTimer()
    clearProgressTimer()
    clearStallTimer()
    ytPlayer?.destroy()
    ytPlayer = null
    playerInitPromise = null
    isPlayerReady = false
    loadedPlayerVideoId = null
    hasMountedPlayer.value = false
    pendingPlayerMountEl = null
    playerContainerEl?.replaceChildren()
    logPlayerDebug('player:destroy:done')
  }
  const enterPlaybackStartGate = async () => {
    logPlayerDebug('playback:start-gate:enter')
    if (!currentPlaySong?.youtubeVideoId) return
    clearStallTimer()
    clearLoadingTracking()
    clearProgressTimer()
    if (currentTimeSeconds.value > 0)
      currentStartAtSeconds = currentTimeSeconds.value
    isAwaitingPlaybackStart.value = true
    playerState.value = 'paused'
    if (ytPlayer || playerInitPromise) destroyPlayer()
    const mountedPlayer = mountPlayerIfPossible()
    if (mountedPlayer) {
      await mountedPlayer
      logPlayerDebug('playback:start-gate:cue-after-immediate-mount')
      cueCurrentSongInPlayer()
      return
    }
    try {
      await ensurePlayerMounted()
      if (isAwaitingPlaybackStart.value) {
        logPlayerDebug('playback:start-gate:cue-after-ensure')
        cueCurrentSongInPlayer()
      }
    } catch {
      logPlayerDebug('playback:start-gate:error')
      /* noop */
    }
  }
  const stop = () => {
    logPlayerDebug('playback:stop:start')
    clearSaveTimer()
    clearPlaybackSession()
    clearSongHighlight()
    pendingHighlightedSongKey.value = null
    const readyYtPlayer = getReadyYtPlayer()
    if (typeof readyYtPlayer?.stopVideo === 'function')
      readyYtPlayer.stopVideo()
    playerState.value = 'idle'
    playingSong.value = null
    playingYear.value = null
    clearActive()
    deactivate()
    clearSavedState()
    logPlayerDebug('playback:stop:done')
  }
  const waitForPlayerContainer = async () => {
    if (typeof window === 'undefined') return null
    for (let attemptIndex = 0; attemptIndex < 8; attemptIndex += 1) {
      if (
        playerContainerEl &&
        playerContainerEl.clientWidth >= 200 &&
        playerContainerEl.clientHeight >= 200
      ) {
        logPlayerDebug('container:wait-ready', { attemptIndex })
        return playerContainerEl
      }
      logPlayerDebug('container:wait-pending', {
        attemptIndex,
        container: getElementDebug(playerContainerEl),
      })
      await nextTick()
      await new Promise<void>((resolve) =>
        window.requestAnimationFrame(() => resolve()),
      )
    }
    logPlayerDebug('container:wait-fell-through', {
      container: getElementDebug(playerContainerEl),
    })
    return playerContainerEl
  }
  const getReadyPlayerContainer = () => {
    if (typeof window === 'undefined') return null
    if (
      playerContainerEl &&
      playerContainerEl.clientWidth >= 200 &&
      playerContainerEl.clientHeight >= 200
    )
      return playerContainerEl
    return null
  }
  const getPlayerMountEl = async () => {
    const playerContainerHost = await waitForPlayerContainer()
    if (!playerContainerHost) return null
    if (playerContainerHost.childElementCount > 0) {
      logPlayerDebug('mount-el:reuse-existing', {
        container: getElementDebug(playerContainerHost),
        existingMount: getElementDebug(playerContainerHost.firstElementChild),
      })
      return playerContainerHost.firstElementChild as HTMLDivElement
    }
    const playerMountEl = document.createElement('div')
    playerMountEl.className = 'h-full w-full'
    playerContainerHost.appendChild(playerMountEl)
    logPlayerDebug('mount-el:create', {
      container: getElementDebug(playerContainerHost),
      mount: getElementDebug(playerMountEl),
    })
    return playerMountEl
  }
  const getImmediatePlayerMountEl = () => {
    const playerContainerHost = getReadyPlayerContainer()
    if (!playerContainerHost) return null
    if (playerContainerHost.childElementCount > 0) {
      logPlayerDebug('mount-el:reuse-immediate', {
        container: getElementDebug(playerContainerHost),
        existingMount: getElementDebug(playerContainerHost.firstElementChild),
      })
      return playerContainerHost.firstElementChild as HTMLDivElement
    }
    const playerMountEl = document.createElement('div')
    playerMountEl.className = 'h-full w-full'
    playerContainerHost.appendChild(playerMountEl)
    logPlayerDebug('mount-el:create-immediate', {
      container: getElementDebug(playerContainerHost),
      mount: getElementDebug(playerMountEl),
    })
    return playerMountEl
  }
  const startPlaybackStallTimer = (shouldRestart = false) => {
    if (stallTimerId !== null && !shouldRestart) return
    clearStallTimer()
    logPlayerDebug('stall-timer:start', { shouldRestart })
    stallTimerId = setTimeout(async () => {
      logPlayerDebug('stall-timer:fired')
      if (playerState.value !== 'loading') return
      if (!(await getHasNetworkConnection()))
        return failLoadingAttempt(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
      await recoverPlaybackAfterStartupStall()
    }, STALL_TIMEOUT_MS)
  }
  const syncMutedState = (player: YTPlayer | null = ytPlayer) => {
    if (!player) return
    if (isMuted.value) {
      if (typeof player.mute === 'function') player.mute()
      return
    }
    if (typeof player.unMute === 'function') player.unMute()
  }
  const loadCurrentSongIntoPlayer = () => {
    const readyYtPlayer = getReadyYtPlayer()
    if (!readyYtPlayer || !currentPlaySong?.youtubeVideoId) return
    loadedPlayerVideoId = currentPlaySong.youtubeVideoId
    logPlayerDebug('playback:load-current-song', {
      requestedVideoId: currentPlaySong.youtubeVideoId,
    })
    resetPlaybackProgress()
    syncMutedState()
    readyYtPlayer.loadVideoById(
      currentPlaySong.youtubeVideoId,
      currentStartAtSeconds ? Math.floor(currentStartAtSeconds) : undefined,
    )
    startPlaybackStallTimer(true)
  }
  const cueCurrentSongInPlayer = () => {
    const readyYtPlayer = getReadyYtPlayer()
    if (!readyYtPlayer || !currentPlaySong?.youtubeVideoId) return
    loadedPlayerVideoId = currentPlaySong.youtubeVideoId
    logPlayerDebug('playback:cue-current-song', {
      requestedVideoId: currentPlaySong.youtubeVideoId,
    })
    clearStallTimer()
    clearLoadingTracking()
    clearProgressTimer()
    resetPlaybackProgress()
    syncMutedState()
    readyYtPlayer.cueVideoById({
      videoId: currentPlaySong.youtubeVideoId,
      startSeconds: currentStartAtSeconds
        ? Math.floor(currentStartAtSeconds)
        : undefined,
    })
  }
  const skipCurrentSongAfterFailure = async (
    message = PLAYER_SKIP_FAILED_MESSAGE,
  ) => {
    const skippedSong = playingSong.value
    const skippedYear = playingYear.value
    const activeLoadingAttemptId = loadingAttemptId
    logPlayerDebug('playback:skip-after-failure:pending', {
      message,
      skippedVideoId: skippedSong?.youtubeVideoId ?? null,
      skippedYear,
      activeLoadingAttemptId,
    })
    if (!(await waitForMinimumErrorLoading(activeLoadingAttemptId))) return
    logPlayerDebug('playback:skip-after-failure', {
      message,
      skippedVideoId: skippedSong?.youtubeVideoId ?? null,
      skippedYear,
    })
    useToastStore().show(message)
    clearPlaybackSession()
    if (skippedSong && skippedYear !== null) {
      playerState.value = 'loading'
      await playNext(skippedSong, skippedYear, 'skip')
      return
    }
    stop()
  }
  const recoverPlaybackAfterStartupStall = async () => {
    logPlayerDebug('playback:recover-after-stall:start')
    if (!currentPlaySong?.youtubeVideoId) return skipCurrentSongAfterFailure()
    if (startupRecoveryCount >= MAX_STARTUP_RECOVERY_ATTEMPTS)
      return skipCurrentSongAfterFailure()
    startupRecoveryCount += 1
    clearStallTimer()
    clearLoadingTracking()
    clearProgressTimer()
    clearSeekPreview()
    if (currentTimeSeconds.value > 0)
      currentStartAtSeconds = currentTimeSeconds.value
    playerState.value = 'loading'
    destroyPlayer()
    await nextTick()
    await new Promise<void>((resolve) =>
      window.requestAnimationFrame(() => resolve()),
    )
    try {
      const mountedPlayer = await ensurePlayerMounted()
      if (!mountedPlayer) return skipCurrentSongAfterFailure()
      if (playerState.value !== 'loading' || !currentPlaySong?.youtubeVideoId)
        return
      logPlayerDebug('playback:recover-after-stall:reload')
      loadCurrentSongIntoPlayer()
    } catch {
      logPlayerDebug('playback:recover-after-stall:error')
      await skipCurrentSongAfterFailure()
    }
  }
  const handleEmbedBlockedPlayback = async () => {
    const failedSong = playingSong.value
    if (!failedSong) return
    logPlayerDebug('playback:error:embed-blocked', {
      failedVideoId: failedSong.youtubeVideoId,
    })
    useToastStore().showWarning(
      `Unfortunately we can't play:\n${failedSong.title} by ${failedSong.artist}`,
    )
    enterBlockedPlaybackState()
  }
  const handlePlaybackError = async (errorCode?: number) => {
    const failedSong = currentPlaySong
    if (!failedSong) return
    logPlayerDebug('playback:error', {
      errorCode,
      failedVideoId: failedSong.youtubeVideoId,
    })
    if (isEmbedBlockedError(errorCode)) return handleEmbedBlockedPlayback()
    if (!(await getHasNetworkConnection()))
      return failLoadingAttempt(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
    if (isAwaitingPlaybackStart.value || currentTimeSeconds.value < 1)
      return recoverPlaybackAfterStartupStall()
    if (!isAwaitingPlaybackStart.value && retryCount >= MAX_RETRIES)
      return recoverPlaybackAfterStartupStall()
    if (retryCount < MAX_RETRIES) {
      retryCount += 1
      playerState.value = 'loading'
      setTimeout(() => {
        if (playerState.value === 'loading' && currentPlaySong)
          loadCurrentSongIntoPlayer()
      }, 1000 * retryCount)
      return
    }
    await skipCurrentSongAfterFailure()
  }
  const handlePlayerStateChange = (event: YTPlayerEvent) => {
    if (!playingSong.value || playingYear.value === null) return
    logPlayerDebug('youtube:state-change', {
      youtubeState: event.data,
      youtubeStateLabel: YOUTUBE_STATE_LABELS[event.data] ?? 'unknown',
    })
    if (event.data === 1 || event.data === 2) clearStallTimer()
    if (event.data === 1) {
      startupRecoveryCount = 0
      isAwaitingPlaybackStart.value = false
      clearLoadingTracking()
      playerState.value = 'playing'
      scheduleSongPlayEvent()
    } else if (event.data === 2) {
      clearPendingSongPlayEventTimer()
      if (isAwaitingPlaybackStart.value && playerState.value === 'loading') {
        enterBlockedPlaybackState()
        return
      }
      isAwaitingPlaybackStart.value = false
      clearLoadingTracking()
      playerState.value = 'paused'
    } else if (event.data === 3) {
      clearPendingSongPlayEventTimer()
      playerState.value = 'loading'
      startPlaybackStallTimer()
    } else if (event.data === 5) {
      clearPendingSongPlayEventTimer()
      clearStallTimer()
      clearLoadingTracking()
      playerState.value = 'paused'
    } else if (event.data === 0) {
      clearPendingSongPlayEventTimer()
      const endedSong = playingSong.value
      const endedYear = playingYear.value
      if (!endedSong || endedYear === null) return stop()
      clearPlaybackSession()
      playerState.value = 'loading'
      void playNext(endedSong, endedYear, 'autoplay')
      return
    }
    if (playerState.value === 'playing' || playerState.value === 'loading')
      startProgressTimer()
    else clearProgressTimer()
    if (playerState.value === 'loading' && !isAwaitingPlaybackStart.value)
      startPlaybackStallTimer()
    else clearStallTimer()
    syncPlaybackProgress()
  }
  const createPlayer = (playerMountEl: HTMLDivElement) => {
    logPlayerDebug('player:create', {
      mount: getElementDebug(playerMountEl),
    })
    hasMountedPlayer.value = true
    activePlayerGeneration += 1
    const playerGeneration = activePlayerGeneration
    playerInitPromise = new Promise<YTPlayer | null>((resolve) => {
      ytPlayer = new window.YT!.Player(playerMountEl, {
        width: '100%',
        height: '100%',
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 0,
          controls: isAwaitingPlaybackStart.value ? 1 : 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
          ...(currentStartAtSeconds
            ? { start: Math.floor(currentStartAtSeconds) }
            : {}),
        },
        events: {
          onReady: (event) => {
            if (playerGeneration !== activePlayerGeneration) {
              logPlayerDebug('player:on-ready:stale-generation', {
                playerGeneration,
                activePlayerGeneration,
              })
              event.target.destroy?.()
              resolve(null)
              return
            }
            ytPlayer = event.target
            isPlayerReady = true
            playerInitPromise = Promise.resolve(event.target)
            logPlayerDebug('player:on-ready', {
              playerGeneration,
              iframe: getElementDebug(
                playerContainerEl?.querySelector('iframe'),
              ),
            })
            updatePlayerIframeFocusability()
            syncMutedState(event.target)
            resolve(event.target)
          },
          onStateChange: (event: YTPlayerEvent) => {
            if (playerGeneration !== activePlayerGeneration) return
            handlePlayerStateChange(event)
          },
          onError: (event: YTPlayerEvent) => {
            if (playerGeneration !== activePlayerGeneration) return
            logPlayerDebug('player:on-error', {
              playerGeneration,
              errorCode: event.data,
            })
            void handlePlaybackError(event.data)
          },
        },
      })
    })
    return playerInitPromise
  }
  const mountPlayerIfPossible = () => {
    if (typeof window === 'undefined') return null
    if (!window.YT?.Player || ytPlayer) {
      logPlayerDebug('player:mount-immediate:skip', {
        hasPlayerCtor: !!window.YT?.Player,
        hasYtPlayer: !!ytPlayer,
      })
      return null
    }
    const playerMountEl = getImmediatePlayerMountEl()
    if (!playerMountEl) {
      logPlayerDebug('player:mount-immediate:no-mount')
      return null
    }
    logPlayerDebug('player:mount-immediate:start')
    return createPlayer(playerMountEl)
  }
  const ensurePlayerMounted = async () => {
    if (typeof window === 'undefined') return null
    const readyYtPlayer = getReadyYtPlayer()
    if (readyYtPlayer) {
      logPlayerDebug('player:ensure-mounted:reuse-ready-player')
      return readyYtPlayer
    }
    if (playerInitPromise) {
      logPlayerDebug('player:ensure-mounted:reuse-init-promise')
      return playerInitPromise
    }
    logPlayerDebug('player:ensure-mounted:start')
    await ensureLoaded()
    const playerMountEl = await getPlayerMountEl()
    if (!playerMountEl) {
      logPlayerDebug('player:ensure-mounted:no-mount')
      return null
    }
    logPlayerDebug('player:ensure-mounted:create')
    return createPlayer(playerMountEl)
  }
  const primePlayback = async (song?: Song, year?: number) => {
    logPlayerDebug('playback:prime:start', {
      requestedVideoId: song?.youtubeVideoId ?? null,
      requestedYear: year ?? null,
    })
    await preload()
    if (
      typeof window === 'undefined' ||
      !song?.youtubeVideoId ||
      year === undefined ||
      year === null ||
      ytPlayer ||
      playerInitPromise ||
      !playerContainerEl
    ) {
      logPlayerDebug('playback:prime:skip', {
        requestedVideoId: song?.youtubeVideoId ?? null,
        requestedYear: year ?? null,
        hasPlayerContainer: !!playerContainerEl,
      })
      return
    }
    if (!isActive.value && getIsTinyViewport())
      isAwaitingPlaybackStart.value = true
    currentPlaySong = song
    currentStartAtSeconds = undefined
    try {
      await ensurePlayerMounted()
      logPlayerDebug('playback:prime:mounted')
    } catch {
      logPlayerDebug('playback:prime:error')
      /* noop */
    }
  }
  const preparePlaybackShell = (
    song: Song,
    year: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    if (typeof window === 'undefined') return
    logPlayerDebug('shell:prepare', {
      requestedVideoId: song.youtubeVideoId,
      requestedYear: year,
      trigger,
    })
    const wasActive = isActive.value
    const chart = useChartStore()
    playingSong.value = song
    playingYear.value = year
    playerState.value = 'paused'
    retryCount = 0
    startupRecoveryCount = 0
    currentPlaySong = song
    currentStartAtSeconds = undefined
    isAwaitingPlaybackStart.value = false
    if (!wasActive) registerActive(stop)
    if (chart.selectedYear === year)
      void scrollSongIntoView(song, year, trigger !== 'direct')
  }

  const openSong = async (
    song: Song,
    year: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    if (typeof window === 'undefined') return
    if (!song.youtubeVideoId) return
    logPlayerDebug('song:open:start', {
      requestedVideoId: song.youtubeVideoId,
      requestedYear: year,
      trigger,
    })

    const isSameSong =
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year
    if (isSameSong && playerState.value !== 'idle') {
      logPlayerDebug('song:open:same-song', { trigger })
      if (playerState.value === 'playing') ytPlayer?.pauseVideo()
      return
    }

    const wasActive = isActive.value
    if (wasActive) clearPlaybackSession()

    const chart = useChartStore()
    playingSong.value = song
    playingYear.value = year
    playerState.value = 'paused'
    retryCount = 0
    startupRecoveryCount = 0
    currentPlaySong = song
    currentStartAtSeconds = undefined
    isAwaitingPlaybackStart.value = false

    if (!wasActive) registerActive(stop)
    if (chart.selectedYear === year)
      void scrollSongIntoView(song, year, trigger !== 'direct')

    if (ytPlayer && isPlayerReady) {
      logPlayerDebug('song:open:cue-existing-ready-player')
      cueCurrentSongInPlayer()
      return
    }
    const mountedPlayer = mountPlayerIfPossible()
    if (mountedPlayer) {
      await mountedPlayer
      logPlayerDebug('song:open:cue-after-immediate-mount')
      cueCurrentSongInPlayer()
      return
    }
    try {
      await ensurePlayerMounted()
      logPlayerDebug('song:open:cue-after-ensure')
      cueCurrentSongInPlayer()
    } catch {
      logPlayerDebug('song:open:error')
      /* noop */
    }
  }

  const play = async (
    song: Song,
    year: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    if (typeof window === 'undefined') return
    if (!song.youtubeVideoId) return
    logPlayerDebug('play:start', {
      requestedVideoId: song.youtubeVideoId,
      requestedYear: year,
      trigger,
    })

    // Toggle if same song
    if (
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year
    ) {
      logPlayerDebug('play:same-song-branch', { trigger })
      if (playerState.value === 'playing') {
        getReadyYtPlayer()?.pauseVideo()
        return
      }
      if (playerState.value === 'paused' && ytPlayer) {
        logPlayerDebug('play:resume-paused-existing-player')
        if (isAwaitingPlaybackStart.value) return
        startLoadingAttempt()
        if (getHasImmediateNetworkConnection()) {
          const readyYtPlayer = getReadyYtPlayer()
          if (readyYtPlayer && getHasLoadedCurrentSongInPlayer(song)) {
            logPlayerDebug('play:resume-paused:play-video')
            readyYtPlayer.playVideo()
            return
          }
          if (readyYtPlayer) {
            logPlayerDebug('play:resume-paused:load-current-song')
            loadCurrentSongIntoPlayer()
            return
          }
          const mountedPlayer = await ensurePlayerMounted()
          if (
            mountedPlayer &&
            playerState.value === 'loading' &&
            currentPlaySong?.youtubeVideoId === song.youtubeVideoId &&
            playingYear.value === year
          ) {
            logPlayerDebug('play:resume-paused:load-after-ensure')
            loadCurrentSongIntoPlayer()
          }
          return
        }
        await failLoadingAttempt(OFFLINE_PLAYBACK_MESSAGE, () => {
          clearLoadingTracking()
          playerState.value = 'paused'
        })
        return
      }
      if (playerState.value === 'loading') {
        logPlayerDebug('play:same-song-loading-stop')
        stop()
        return
      }
      // Restored from storage — fall through to full play
    }

    if (!isActive.value && !getIsTinyViewport()) {
      logPlayerDebug('play:bootstrap-shell-first')
      shouldBootstrapPlaybackFromShell.value = true
      preparePlaybackShell(song, year, trigger)
      return
    }

    const isResumingSameSong =
      !ytPlayer &&
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year
    const resumeAt =
      isResumingSameSong && currentTimeSeconds.value > 0
        ? currentTimeSeconds.value
        : undefined

    const wasActive = isActive.value
    if (wasActive) clearPlaybackSession()

    const chart = useChartStore()
    playingSong.value = song
    playingYear.value = year
    startLoadingAttempt()
    retryCount = 0
    startupRecoveryCount = 0
    currentPlaySong = song
    currentStartAtSeconds = resumeAt
    pendingSongPlayEventPayload = {
      artist: song.artist,
      title: song.title,
      year: String(year),
      source: trigger,
    }
    hasTrackedCurrentSongPlayEvent = false
    clearPendingSongPlayEventTimer()
    if (!getHasImmediateNetworkConnection())
      return failLoadingAttempt(OFFLINE_PLAYBACK_MESSAGE)

    if (!wasActive) registerActive(stop)
    if (chart.selectedYear === year)
      void scrollSongIntoView(song, year, trigger !== 'direct')
    offlineHandler = () => {
      if (playerState.value === 'loading')
        void failLoadingAttempt(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
      else {
        showOfflinePlaybackStoppedToast()
        stop()
      }
    }
    window.addEventListener('offline', offlineHandler, { once: true })

    if (!wasActive && getIsTinyViewport()) return enterPlaybackStartGate()

    if (playerState.value !== 'loading') return
    if (ytPlayer && isPlayerReady) {
      logPlayerDebug('play:load-existing-ready-player')
      loadCurrentSongIntoPlayer()
      return
    }
    const mountedPlayer = mountPlayerIfPossible()
    if (mountedPlayer) {
      await mountedPlayer
      if (
        playerState.value === 'loading' &&
        currentPlaySong?.youtubeVideoId === song.youtubeVideoId &&
        playingYear.value === year
      ) {
        logPlayerDebug('play:load-after-immediate-mount')
        loadCurrentSongIntoPlayer()
      }
      return
    }
    void ensurePlayerMounted()
      .then(() => {
        if (
          playerState.value === 'loading' &&
          currentPlaySong?.youtubeVideoId === song.youtubeVideoId &&
          playingYear.value === year
        ) {
          logPlayerDebug('play:load-after-ensure')
          loadCurrentSongIntoPlayer()
        }
      })
      .catch(async () => {
        logPlayerDebug('play:ensure-mounted:error')
        if (!(await getHasNetworkConnection()))
          return failLoadingAttempt(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
        return failLoadingAttempt(PLAYER_LOAD_FAILED_MESSAGE)
      })
  }

  const togglePlayback = async (trigger: PlayTrigger = 'direct') => {
    logPlayerDebug('playback:toggle', { trigger })
    if (playerState.value === 'playing') getReadyYtPlayer()?.pauseVideo()
    else if (playerState.value === 'paused' && ytPlayer) {
      startLoadingAttempt()
      if (getHasImmediateNetworkConnection()) {
        const readyYtPlayer = getReadyYtPlayer()
        if (
          readyYtPlayer &&
          playingSong.value &&
          getHasLoadedCurrentSongInPlayer(playingSong.value)
        )
          readyYtPlayer.playVideo()
        else if (readyYtPlayer) {
          logPlayerDebug('playback:toggle:load-current-song')
          loadCurrentSongIntoPlayer()
        } else {
          const mountedPlayer = await ensurePlayerMounted()
          if (mountedPlayer && playerState.value === 'loading') {
            logPlayerDebug('playback:toggle:load-after-ensure')
            loadCurrentSongIntoPlayer()
          }
        }
      } else
        await failLoadingAttempt(OFFLINE_PLAYBACK_MESSAGE, () => {
          clearLoadingTracking()
          playerState.value = 'paused'
        })
    } else if (
      playerState.value === 'paused' &&
      !ytPlayer &&
      playingSong.value &&
      playingYear.value !== null
    )
      play(playingSong.value, playingYear.value, trigger)
  }

  const getSeekValue = (nextValue: number[]) => {
    const [v] = nextValue
    if (v === undefined) return null
    return Number.isNaN(v) ? null : v
  }

  const handleSeekInput = (nextValue: number[]) => {
    const v = getSeekValue(nextValue)
    if (v === null) return
    seekPreviewSeconds.value = v
  }
  const startSeekDrag = () => {
    isSeekDragging.value = true
  }

  const handleSeekCommit = (nextValue: number[]) => {
    const readyYtPlayer = getReadyYtPlayer()
    if (!readyYtPlayer) {
      clearSeekPreview()
      return
    }
    const v = getSeekValue(nextValue)
    if (v === null) {
      clearSeekPreview()
      return
    }
    isSeekDragging.value = false
    seekPreviewSeconds.value = v
    playerState.value = 'loading'
    readyYtPlayer.seekTo(v, true)
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
    saveMutedPreference(isMuted.value)
    syncMutedState()
  }
  const setMuted = (nextMuted: boolean) => {
    if (isMuted.value === nextMuted) return
    isMuted.value = nextMuted
    saveMutedPreference(isMuted.value)
    syncMutedState()
  }

  const seekRelative = (deltaSeconds: number) => {
    const readyYtPlayer = getReadyYtPlayer()
    if (!readyYtPlayer || playerState.value === 'idle') return
    const base = seekPreviewSeconds.value ?? currentTimeSeconds.value
    const next = Math.max(
      0,
      Math.min(durationSeconds.value, base + deltaSeconds),
    )
    seekPreviewSeconds.value = next
    playerState.value = 'loading'
    readyYtPlayer.seekTo(next, true)
  }

  const isSongActive = (song: Song, year: number) =>
    playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
    playingYear.value === year &&
    playerState.value !== 'idle'

  const getSortedYearData = async (year: number) => {
    const songs = await getYearSongs(year)
    if (!songs) return null
    const chart = useChartStore()
    return getSongsForSortOrder(songs, chart.sortOrder)
  }

  const getCurrentIndex = async () => {
    const song = playingSong.value
    const year = playingYear.value
    if (!song || year === null) return { songs: null, index: -1, year: null }
    const songs = await getSortedYearData(year)
    if (!songs) return { songs: null, index: -1, year: null }
    const index = songs.findIndex(
      (s) => s.youtubeVideoId === song.youtubeVideoId,
    )
    return { songs, index, year }
  }

  const playNext = async (
    fromSong?: Song,
    fromYear?: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    logPlayerDebug('queue:play-next:start', {
      fromVideoId:
        fromSong?.youtubeVideoId ?? playingSong.value?.youtubeVideoId,
      fromYear: fromYear ?? playingYear.value,
      trigger,
    })
    deactivateRickRollIfNeeded()
    const chart = useChartStore()
    const stopPlaybackIfNeeded = () => {
      if (trigger === 'autoplay' || trigger === 'skip') stop()
    }
    const song = fromSong ?? playingSong.value
    const year = fromYear ?? playingYear.value
    if (!song || year === null || year === undefined)
      return { songs: null, index: -1, year: null }
    const songs = await getSortedYearData(year)
    if (!songs) return stopPlaybackIfNeeded()

    const index = songs.findIndex(
      (s) => s.youtubeVideoId === song.youtubeVideoId,
    )
    if (index === -1) return stopPlaybackIfNeeded()

    if (index < songs.length - 1) {
      const nextSong = songs[index + 1]
      if (nextSong) play(nextSong, year, trigger)
      return
    }

    const yearIdx = chart.availableYears.indexOf(year)
    if (yearIdx === -1 || yearIdx >= chart.availableYears.length - 1)
      return stopPlaybackIfNeeded()
    const nextYear = chart.availableYears[yearIdx + 1]
    if (nextYear === undefined) return stopPlaybackIfNeeded()
    const nextYearSongs = await getSortedYearData(nextYear)
    if (!nextYearSongs?.length) return stopPlaybackIfNeeded()
    chart.selectYear(nextYear)
    await play(nextYearSongs[0], nextYear, trigger)
  }

  const playPrev = async (trigger: PlayTrigger = 'direct') => {
    logPlayerDebug('queue:play-prev:start', { trigger })
    deactivateRickRollIfNeeded()
    const chart = useChartStore()
    const { songs, index, year } = await getCurrentIndex()
    if (!songs || index === -1 || year === null) return

    if (index > 0) {
      const prevSong = songs[index - 1]
      if (prevSong) play(prevSong, year, trigger)
      return
    }

    const yearIdx = chart.availableYears.indexOf(year)
    if (yearIdx <= 0) return
    const prevYear = chart.availableYears[yearIdx - 1]
    if (prevYear === undefined) return
    const prevYearSongs = await getSortedYearData(prevYear)
    if (!prevYearSongs?.length) return
    chart.selectYear(prevYear)
    await play(prevYearSongs[prevYearSongs.length - 1], prevYear, trigger)
  }

  const restoreFromStorage = async () => {
    if (typeof window === 'undefined') return
    const saved = loadSavedState()
    logPlayerDebug('restore:start', { saved })
    if (!saved) return
    const songs = await getYearSongs(saved.year)
    if (!songs) return
    const song = songs.find((s) => s.youtubeVideoId === saved.videoId)
    if (!song) return
    playingSong.value = song
    playingYear.value = saved.year
    currentTimeSeconds.value = saved.timeSeconds
    playerState.value = 'paused'
    logPlayerDebug('restore:success', {
      restoredVideoId: song.youtubeVideoId,
      restoredYear: saved.year,
      restoredTimeSeconds: saved.timeSeconds,
    })
  }

  void restoreFromStorage()

  const completeShellPlaybackBootstrap = async () => {
    logPlayerDebug('shell:bootstrap:complete-request')
    if (!shouldBootstrapPlaybackFromShell.value) return
    shouldBootstrapPlaybackFromShell.value = false
    if (!playingSong.value || playingYear.value === null) return
    logPlayerDebug('shell:bootstrap:play', {
      requestedVideoId: playingSong.value.youtubeVideoId,
      requestedYear: playingYear.value,
    })
    await play(playingSong.value, playingYear.value, 'autoplay')
  }

  const goToSong = () => {
    const chart = useChartStore()
    if (playingYear.value === null || !playingSong.value) return
    chart.selectYear(playingYear.value)
    void scrollSongIntoView(playingSong.value, playingYear.value, true)
  }

  return {
    playingSong,
    playingYear,
    playerState,
    currentTimeSeconds,
    durationSeconds,
    displayedTimeSeconds,
    formattedCurrentTime,
    formattedDuration,
    showSeekBar,
    seekSliderValue,
    isActive,
    isMuted,
    hasMountedPlayer,
    isAwaitingPlaybackStart,
    shouldBootstrapPlaybackFromShell,
    preload,
    primePlayback,
    openSong,
    setPlayerContainer,
    refreshPlayerAfterViewportChange,
    play,
    stop,
    togglePlayback,
    toggleMute,
    setMuted,
    seekRelative,
    startSeekDrag,
    handleSeekInput,
    handleSeekCommit,
    isSongActive,
    isSongHighlighted,
    queueSongHighlight,
    flashSongHighlight,
    revealQueuedSongHighlight,
    playNext,
    playPrev,
    completeShellPlaybackBootstrap,
    goToSong,
  }
})
