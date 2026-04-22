import { computed, nextTick, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Song } from '@/types/song'
import { getYearData } from '@/data'
import { useRickRollMode } from '@/composables/useRickRollMode'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'
import { useChartStore } from '@/stores/chart'
import { useToastStore } from '@/stores/toast'
import { getSongsForSortOrder } from '@/utils/chartOrder'
import {
  createYouTubePlayerAdapter,
  getIsEmbedBlockedError,
  getYouTubeWatchUrl,
} from '@/utils/youtubePlayer'

const STORAGE_KEY = 'flashback-miniplayer'
const MUTE_STORAGE_KEY = 'flashback-player-muted'
const VOLUME_STORAGE_KEY = 'flashback-player-volume'
const SAVE_INTERVAL_MS = 3_000
const PROGRESS_POLL_INTERVAL_MS = 250
const STARTUP_POLL_ADVANCE_SECONDS = 0.35
const STARTUP_PROGRESS_TICKS_REQUIRED = 2
const STARTUP_TIMEOUT_MS = 8_000
const PLAYBACK_FAILURE_SKIP_DELAY_MS = 2_000
const MAX_CONSECUTIVE_PLAYBACK_FAILURES = 5
const SONG_PLAY_EVENT_DELAY_MS = 5_000
const PLAYER_DEBUG_STORAGE_KEY = 'flashback-player-debug'
const PLAYER_DEBUG_EVENT_LIMIT = 200
const OFFLINE_PLAYBACK_MESSAGE = 'No internet connection. Cannot play.'
const OFFLINE_PLAYBACK_STOPPED_MESSAGE =
  'No internet connection. Playback stopped.'
const PLAYER_LOAD_FAILED_MESSAGE =
  'Failed to load player. Check your connection.'
const PLAYER_SKIP_FAILED_MESSAGE =
  'Playback failed to stabilise. Skipping to the next song.'
const SONG_ROW_HIGHLIGHT_DURATION_MS = 1_000
const SONG_ROW_LOOKUP_ATTEMPTS = 24
const SONG_ROW_SCROLL_SETTLE_MS = 350
const MAX_STARTUP_SOFT_RECOVERY_ATTEMPTS = 1
const MAX_STARTUP_REBUILD_ATTEMPTS = 1

interface SavedPlayerState {
  timeSeconds: number
  videoId: string
  year: number
}

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused'
type PlaybackHealth =
  | 'idle'
  | 'starting'
  | 'healthy'
  | 'stalled'
  | 'blocked'
  | 'failed'
type StartupMode = 'cue' | 'play'
type PlaybackFailureReason =
  | 'embed-blocked'
  | 'offline'
  | 'player-load-failed'
  | 'startup-timeout'
  | 'stalled'
  | 'youtube-error'

export type PlayTrigger =
  | 'autoplay'
  | 'decade-btn'
  | 'direct'
  | 'home-btn'
  | 'hotkey'
  | 'player-btn'
  | 'rickroll'
  | 'search'
  | 'skip'

interface PlaybackFailure {
  message: string
  reason: PlaybackFailureReason
  videoId: string | null
  year: number | null
  youtubeUrl: string | null
}

interface PlayerDebugEvent {
  at: string
  details: Record<string, unknown>
  event: string
}

interface PlayerDebugApi {
  clear: () => void
  dump: () => PlayerDebugEvent[]
  events: PlayerDebugEvent[]
}

const getPlayerDebugWindow = () =>
  typeof window === 'undefined'
    ? null
    : (window as Window & {
        __FLASHBACK_PLAYER_DEBUG__?: PlayerDebugApi
      })

const getShouldLogPlayerDebug = () => {
  const playerDebugWindow = getPlayerDebugWindow()
  if (!playerDebugWindow) return false
  try {
    return (
      playerDebugWindow.localStorage.getItem(PLAYER_DEBUG_STORAGE_KEY) ===
      'true'
    )
  } catch {
    return false
  }
}

const getPlayerDebugApi = () => {
  const playerDebugWindow = getPlayerDebugWindow()
  if (!playerDebugWindow) return null
  if (playerDebugWindow.__FLASHBACK_PLAYER_DEBUG__)
    return playerDebugWindow.__FLASHBACK_PLAYER_DEBUG__
  const playerDebugApi: PlayerDebugApi = {
    clear: () => {
      playerDebugApi.events.length = 0
    },
    dump: () => [...playerDebugApi.events],
    events: [],
  }
  playerDebugWindow.__FLASHBACK_PLAYER_DEBUG__ = playerDebugApi
  return playerDebugApi
}

const recordPlayerDebugEvent = (
  event: string,
  details: Record<string, unknown> = {},
) => {
  const playerDebugApi = getPlayerDebugApi()
  if (!playerDebugApi) return
  const playerDebugEvent: PlayerDebugEvent = {
    at: new Date().toISOString(),
    details,
    event,
  }
  playerDebugApi.events.push(playerDebugEvent)
  if (playerDebugApi.events.length > PLAYER_DEBUG_EVENT_LIMIT)
    playerDebugApi.events.splice(
      0,
      playerDebugApi.events.length - PLAYER_DEBUG_EVENT_LIMIT,
    )
  if (getShouldLogPlayerDebug()) console.info('[player-debug]', event, details)
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
    /* ignore */
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
    /* ignore */
  }
}

const loadVolumePreference = () => {
  if (typeof localStorage === 'undefined') return 100
  try {
    const savedVolume = Number(localStorage.getItem(VOLUME_STORAGE_KEY))
    if (Number.isNaN(savedVolume)) return 100
    return Math.min(100, Math.max(0, Math.round(savedVolume)))
  } catch {
    return 100
  }
}

const saveVolumePreference = (nextVolume: number) => {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(VOLUME_STORAGE_KEY, String(nextVolume))
  } catch {
    /* ignore */
  }
}

const getYearSongs = async (year: number) => getYearData(year) ?? null

export const getHasStartupSeekProgress = (
  currentTimeSeconds: number,
  startupBaselineTimeSeconds: number,
) =>
  Number.isFinite(currentTimeSeconds) &&
  currentTimeSeconds > startupBaselineTimeSeconds

export const usePlayerStore = defineStore('player', () => {
  const { deactivate, isRickRollActive } = useRickRollMode()

  const playingSong = ref<Song | null>(null)
  const playingYear = ref<number | null>(null)
  const playerState = ref<PlayerState>('idle')
  const playbackHealth = ref<PlaybackHealth>('idle')
  const lastPlaybackFailure = ref<PlaybackFailure | null>(null)
  const isPlaybackFailureBurstModalOpen = ref(false)
  const currentTimeSeconds = ref(0)
  const durationSeconds = ref(0)
  const isSeekDragging = ref(false)
  const seekPreviewSeconds = ref<number | null>(null)
  const isMuted = ref(loadMutedPreference())
  const volumePercent = ref(loadVolumePreference())
  const hasMountedPlayer = ref(false)
  const isAwaitingPlaybackStart = ref(false)
  const highlightedSongKey = ref<string | null>(null)
  const pendingHighlightedSongKey = ref<string | null>(null)
  const shouldBootstrapPlaybackFromShell = ref(false)

  let playerHostEl: HTMLDivElement | null = null
  let youtubePlayer: ReturnType<typeof createYouTubePlayerAdapter> | null = null
  let activePlayerGeneration = 0
  let currentPlaySong: Song | null = null
  let currentStartAtSeconds: number | undefined
  let currentStartupMode: StartupMode | null = null
  let consecutivePlaybackFailureCount = 0
  let playbackFailureActionId = 0
  let startupAttemptId = 0
  let lastObservedTimeSeconds = 0
  let observedProgressTicks = 0
  let hasObservedStartupSeekProgress = false
  let lastKnownYoutubeState: number | null = null
  let startupSoftRecoveryCount = 0
  let startupRebuildCount = 0
  let progressTimerId: number | null = null
  let saveTimerId: number | null = null
  let startupTimeoutId: number | null = null
  let startupPollInFlight = false
  let offlineHandler: (() => void) | null = null
  let clearSongHighlightTimerId: ReturnType<typeof setTimeout> | null = null
  let pendingSongPlayEventTimerId: ReturnType<typeof setTimeout> | null = null
  let pendingSongPlayEventPayload: {
    artist: string
    source: PlayTrigger
    title: string
    year: string
  } | null = null
  let hasTrackedCurrentSongPlayEvent = false

  const isActive = computed(() => playerState.value !== 'idle')
  const displayedTimeSeconds = computed(
    () => seekPreviewSeconds.value ?? currentTimeSeconds.value,
  )
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

  const getHasImmediateNetworkConnection = () => {
    if (typeof window === 'undefined') return false
    return navigator.onLine
  }

  const formatPlaybackTime = (timeSeconds: number) => {
    if (!Number.isFinite(timeSeconds) || timeSeconds <= 0) return '0:00'
    const wholeSeconds = Math.floor(timeSeconds)
    const minutes = Math.floor(wholeSeconds / 60)
    const seconds = wholeSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const resetPlaybackProgress = () => {
    currentTimeSeconds.value = currentStartAtSeconds ?? 0
    durationSeconds.value = 0
    if (!isSeekDragging.value) seekPreviewSeconds.value = null
  }

  const clearSeekPreview = () => {
    isSeekDragging.value = false
    seekPreviewSeconds.value = null
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

  const clearProgressTimer = () => {
    if (progressTimerId === null) return
    clearInterval(progressTimerId)
    progressTimerId = null
  }

  const clearSaveTimer = () => {
    if (saveTimerId === null) return
    clearInterval(saveTimerId)
    saveTimerId = null
  }

  const clearOfflineHandler = () => {
    if (!offlineHandler || typeof window === 'undefined') return
    window.removeEventListener('offline', offlineHandler)
    offlineHandler = null
  }

  const clearStartupTimeout = () => {
    if (startupTimeoutId === null) return
    clearTimeout(startupTimeoutId)
    startupTimeoutId = null
  }

  const clearSongHighlightTimer = () => {
    if (clearSongHighlightTimerId === null) return
    clearTimeout(clearSongHighlightTimerId)
    clearSongHighlightTimerId = null
  }

  const persistState = () => {
    const song = playingSong.value
    const year = playingYear.value
    if (!song?.youtubeVideoId || year === null) return
    saveToDisk({
      timeSeconds: currentTimeSeconds.value,
      videoId: song.youtubeVideoId,
      year,
    })
  }

  const startSaveTimer = () => {
    if (typeof window === 'undefined') return
    clearSaveTimer()
    persistState()
    saveTimerId = window.setInterval(persistState, SAVE_INTERVAL_MS)
  }

  watch(isActive, (active) => {
    if (active) startSaveTimer()
    else clearSaveTimer()
  })

  const clearFailure = () => {
    lastPlaybackFailure.value = null
    if (playerState.value === 'idle') playbackHealth.value = 'idle'
  }

  const dismissPlaybackFailureBurstModal = () => {
    isPlaybackFailureBurstModalOpen.value = false
  }

  const cancelPendingPlaybackFailureAction = () => {
    playbackFailureActionId += 1
  }

  const waitForPlaybackFailureSkipDelay = async (actionId: number) => {
    if (typeof window === 'undefined')
      return actionId === playbackFailureActionId
    await new Promise<void>((resolve) =>
      window.setTimeout(resolve, PLAYBACK_FAILURE_SKIP_DELAY_MS),
    )
    return actionId === playbackFailureActionId
  }

  const setFailure = (
    reason: PlaybackFailureReason,
    message: string,
    song: Song | null = currentPlaySong,
    year: number | null = playingYear.value,
  ) => {
    lastPlaybackFailure.value = {
      message,
      reason,
      videoId: song?.youtubeVideoId ?? null,
      year,
      youtubeUrl: song?.youtubeVideoId
        ? getYouTubeWatchUrl(song.youtubeVideoId)
        : null,
    }
    playbackHealth.value =
      reason === 'embed-blocked'
        ? 'blocked'
        : reason === 'startup-timeout' || reason === 'stalled'
          ? 'stalled'
          : 'failed'
  }

  const clearCurrentStartupAttempt = () => {
    clearStartupTimeout()
    startupAttemptId += 1
    lastObservedTimeSeconds = currentStartAtSeconds ?? 0
    observedProgressTicks = 0
    hasObservedStartupSeekProgress = false
    currentStartupMode = null
  }

  const clearPlaybackSession = () => {
    cancelPendingPlaybackFailureAction()
    clearSaveTimer()
    clearProgressTimer()
    clearStartupTimeout()
    clearPendingSongPlayEventTimer()
    clearSeekPreview()
    clearOfflineHandler()
    clearCurrentStartupAttempt()
    currentTimeSeconds.value = 0
    durationSeconds.value = 0
    currentPlaySong = null
    currentStartAtSeconds = undefined
    consecutivePlaybackFailureCount = 0
    lastKnownYoutubeState = null
    startupSoftRecoveryCount = 0
    startupRebuildCount = 0
    pendingSongPlayEventPayload = null
    hasTrackedCurrentSongPlayEvent = false
    isAwaitingPlaybackStart.value = false
    shouldBootstrapPlaybackFromShell.value = false
    playbackHealth.value = 'idle'
  }

  const syncVolumeState = (
    player: ReturnType<
      typeof createYouTubePlayerAdapter
    > | null = youtubePlayer,
  ) => {
    if (!player) return
    void player.setVolume(volumePercent.value)
  }

  const syncMutedState = (
    player: ReturnType<
      typeof createYouTubePlayerAdapter
    > | null = youtubePlayer,
  ) => {
    if (!player) return
    syncVolumeState(player)
    if (isMuted.value) {
      void player.mute()
      return
    }
    void player.unMute()
  }

  const stopPlayerTransport = () => {
    if (!youtubePlayer) return
    void youtubePlayer.stopVideo()
  }

  const pausePlayerTransport = () => {
    if (!youtubePlayer) return
    void youtubePlayer.pauseVideo()
  }

  const destroyPlayer = () => {
    activePlayerGeneration += 1
    clearProgressTimer()
    clearStartupTimeout()
    if (youtubePlayer) void youtubePlayer.destroy()
    youtubePlayer = null
    hasMountedPlayer.value = false
    if (playerHostEl) playerHostEl.replaceChildren()
  }

  const handleStartupHealthy = () => {
    recordPlayerDebugEvent('startup:healthy', {
      currentTimeSeconds: currentTimeSeconds.value,
      hasObservedStartupSeekProgress,
      lastKnownYoutubeState,
      playerState: playerState.value,
      startupAttemptId,
      startupMode: currentStartupMode,
    })
    clearStartupTimeout()
    cancelPendingPlaybackFailureAction()
    consecutivePlaybackFailureCount = 0
    playbackHealth.value = 'healthy'
    clearFailure()
    if (currentStartupMode === 'play' || lastKnownYoutubeState === 1) {
      playerState.value = 'playing'
      scheduleSongPlayEvent()
      return
    }
    if (lastKnownYoutubeState === 2 || lastKnownYoutubeState === 5)
      playerState.value = 'paused'
  }

  const pausePlaybackSession = () => {
    pausePlayerTransport()
    cancelPendingPlaybackFailureAction()
    clearProgressTimer()
    clearStartupTimeout()
    clearPendingSongPlayEventTimer()
    clearOfflineHandler()
    clearCurrentStartupAttempt()
    isAwaitingPlaybackStart.value = false
    shouldBootstrapPlaybackFromShell.value = false
    startupSoftRecoveryCount = 0
    startupRebuildCount = 0
    playerState.value = 'paused'
  }

  const getStartupBaselineTimeSeconds = () => currentStartAtSeconds ?? 0

  const cancelStartupRecovery = () => {
    recordPlayerDebugEvent('startup-recovery:cancel', {
      playbackFailureActionId,
      startupAttemptId,
    })
    clearStartupTimeout()
    cancelPendingPlaybackFailureAction()
  }

  const noteStartupSeekProgress = (
    nextCurrentTime: number,
    attemptId = startupAttemptId,
  ) => {
    if (
      attemptId !== startupAttemptId ||
      playbackHealth.value !== 'starting' ||
      hasObservedStartupSeekProgress ||
      !getHasStartupSeekProgress(
        nextCurrentTime,
        getStartupBaselineTimeSeconds(),
      )
    )
      return false
    hasObservedStartupSeekProgress = true
    recordPlayerDebugEvent('startup-seek-progress:observed', {
      attemptId,
      currentTimeSeconds: nextCurrentTime,
      startupBaselineTimeSeconds: getStartupBaselineTimeSeconds(),
    })
    cancelStartupRecovery()
    return true
  }

  const cancelStartupFailureIfProgressObserved = (
    attemptId = startupAttemptId,
  ) => {
    if (attemptId !== startupAttemptId || !hasObservedStartupSeekProgress)
      return false
    cancelStartupRecovery()
    return true
  }

  const recoverPlaybackIfAlreadyRunning = async (
    attemptId = startupAttemptId,
  ) => {
    if (!youtubePlayer || !currentPlaySong?.youtubeVideoId) return false
    try {
      const [nextCurrentTime, nextPlayerState, nextVideoData] =
        await Promise.all([
          youtubePlayer.getCurrentTime(),
          youtubePlayer.getPlayerState(),
          youtubePlayer.getVideoData(),
        ])
      if (
        attemptId !== startupAttemptId ||
        !currentPlaySong?.youtubeVideoId ||
        nextPlayerState !== 1 ||
        nextVideoData?.video_id !== currentPlaySong.youtubeVideoId ||
        !getHasStartupSeekProgress(
          nextCurrentTime,
          getStartupBaselineTimeSeconds(),
        )
      )
        return false
      lastKnownYoutubeState = nextPlayerState
      noteStartupSeekProgress(nextCurrentTime, attemptId)
      if (Number.isFinite(nextCurrentTime))
        currentTimeSeconds.value =
          durationSeconds.value > 0
            ? Math.min(nextCurrentTime, durationSeconds.value)
            : nextCurrentTime
      lastObservedTimeSeconds = nextCurrentTime
      observedProgressTicks = Math.max(
        observedProgressTicks,
        STARTUP_PROGRESS_TICKS_REQUIRED,
      )
      handleStartupHealthy()
      return true
    } catch {
      return false
    }
  }

  const syncPlaybackProgress = async (attemptId = startupAttemptId) => {
    if (startupPollInFlight || !youtubePlayer) return
    startupPollInFlight = true
    try {
      const [nextCurrentTime, nextDuration, playerIframe] = await Promise.all([
        youtubePlayer.getCurrentTime(),
        youtubePlayer.getDuration(),
        youtubePlayer.getIframe(),
      ])
      if (attemptId !== startupAttemptId) return
      if (Number.isFinite(nextDuration) && nextDuration > 0)
        durationSeconds.value = nextDuration
      if (Number.isFinite(nextCurrentTime))
        currentTimeSeconds.value =
          durationSeconds.value > 0
            ? Math.min(nextCurrentTime, durationSeconds.value)
            : nextCurrentTime
      if (
        !isSeekDragging.value &&
        seekPreviewSeconds.value !== null &&
        Math.abs(currentTimeSeconds.value - seekPreviewSeconds.value) < 0.75
      )
        seekPreviewSeconds.value = null
      noteStartupSeekProgress(nextCurrentTime, attemptId)
      if (playbackHealth.value !== 'starting' || lastKnownYoutubeState !== 1)
        return
      const hasConnectedPlayerFrame =
        playerHostEl &&
        playerHostEl.isConnected &&
        playerHostEl.clientWidth > 0 &&
        playerHostEl.clientHeight > 0 &&
        playerIframe instanceof HTMLIFrameElement &&
        playerIframe.isConnected
      const timeAdvance = nextCurrentTime - lastObservedTimeSeconds
      if (timeAdvance >= STARTUP_POLL_ADVANCE_SECONDS)
        observedProgressTicks += 1
      lastObservedTimeSeconds = nextCurrentTime
      if (observedProgressTicks >= STARTUP_PROGRESS_TICKS_REQUIRED)
        handleStartupHealthy()
      if (!hasConnectedPlayerFrame && observedProgressTicks === 0) return
    } catch {
      if (attemptId !== startupAttemptId) return
      setFailure('player-load-failed', PLAYER_LOAD_FAILED_MESSAGE)
    } finally {
      startupPollInFlight = false
    }
  }

  const startProgressTimer = () => {
    if (typeof window === 'undefined') return
    clearProgressTimer()
    void syncPlaybackProgress()
    progressTimerId = window.setInterval(
      () => void syncPlaybackProgress(),
      PROGRESS_POLL_INTERVAL_MS,
    )
  }

  const handleFatalPlaybackFailure = async (
    reason: PlaybackFailureReason,
    message: string,
    song: Song | null = currentPlaySong,
    year: number | null = playingYear.value,
  ) => {
    const toastStore = useToastStore()
    const failedSong = song
    const failedYear = year
    const shouldSkipAfterFailure =
      reason !== 'offline' &&
      !!failedSong &&
      failedYear !== null &&
      failedYear !== undefined
    if (shouldSkipAfterFailure) consecutivePlaybackFailureCount += 1
    setFailure(reason, message, failedSong, failedYear)
    clearStartupTimeout()
    clearPendingSongPlayEventTimer()
    clearProgressTimer()
    if (!shouldSkipAfterFailure) {
      if (reason === 'embed-blocked' && failedSong)
        toastStore.showWarning(
          `Unable to play:\n(<b>${failedSong.title}</b> by <b>${failedSong.artist}</b>)`,
        )
      else toastStore.show(message)
      if (reason === 'offline') {
        pausePlaybackSession()
        return
      }
      stop()
      return
    }
    const shouldStopAfterFailureBurst =
      consecutivePlaybackFailureCount >= MAX_CONSECUTIVE_PLAYBACK_FAILURES
    playbackFailureActionId += 1
    const currentFailureActionId = playbackFailureActionId
    const shouldContinueFailureAction = await waitForPlaybackFailureSkipDelay(
      currentFailureActionId,
    )
    if (!shouldContinueFailureAction) return
    if (shouldStopAfterFailureBurst) {
      isPlaybackFailureBurstModalOpen.value = true
      pausePlaybackSession()
      return
    }
    if (reason === 'embed-blocked' && failedSong)
      toastStore.showWarning(
        `Unable to play:\n(<b>${failedSong.title}</b> by <b>${failedSong.artist}</b>)`,
      )
    else toastStore.show(message)
    if (failedSong && failedYear !== null && failedYear !== undefined) {
      await playNext(failedSong, failedYear, 'skip')
      return
    }
    stop()
  }

  const retryCurrentSong = async (strategy: 'reload' | 'rebuild') => {
    if (!currentPlaySong?.youtubeVideoId || playingYear.value === null) return
    recordPlayerDebugEvent('startup-retry', {
      currentStartAtSeconds: currentStartAtSeconds ?? null,
      currentTimeSeconds: currentTimeSeconds.value,
      playbackHealth: playbackHealth.value,
      playerState: playerState.value,
      startupAttemptId,
      strategy,
      videoId: currentPlaySong.youtubeVideoId,
      year: playingYear.value,
    })
    if (strategy === 'reload') startupSoftRecoveryCount += 1
    else startupRebuildCount += 1
    if (strategy === 'rebuild') {
      destroyPlayer()
      await nextTick()
      await ensurePlayer()
    }
    await beginStartupAttempt(
      currentPlaySong,
      playingYear.value,
      'play',
      currentStartAtSeconds,
    )
  }

  const handleStartupFailure = async (
    reason: PlaybackFailureReason,
    message: string,
    attemptId = startupAttemptId,
  ) => {
    recordPlayerDebugEvent('startup-failure', {
      attemptId,
      currentStartAtSeconds: currentStartAtSeconds ?? null,
      currentTimeSeconds: currentTimeSeconds.value,
      hasObservedStartupSeekProgress,
      message,
      playbackHealth: playbackHealth.value,
      playerState: playerState.value,
      reason,
      startupAttemptId,
    })
    if (cancelStartupFailureIfProgressObserved(attemptId)) return
    if (await recoverPlaybackIfAlreadyRunning(attemptId)) return
    if (cancelStartupFailureIfProgressObserved(attemptId)) return
    if (attemptId !== startupAttemptId) return
    if (!currentPlaySong?.youtubeVideoId || playingYear.value === null)
      return handleFatalPlaybackFailure(reason, message)
    if (reason === 'offline') return handleFatalPlaybackFailure(reason, message)
    if (
      reason !== 'embed-blocked' &&
      startupSoftRecoveryCount < MAX_STARTUP_SOFT_RECOVERY_ATTEMPTS
    )
      return retryCurrentSong('reload')
    if (
      reason !== 'embed-blocked' &&
      startupRebuildCount < MAX_STARTUP_REBUILD_ATTEMPTS
    )
      return retryCurrentSong('rebuild')
    return handleFatalPlaybackFailure(reason, message)
  }

  const startStartupTimeout = (attemptId: number) => {
    if (typeof window === 'undefined') return
    clearStartupTimeout()
    recordPlayerDebugEvent('startup-timeout:schedule', {
      attemptId,
      delayMs: STARTUP_TIMEOUT_MS,
      videoId: currentPlaySong?.youtubeVideoId ?? null,
    })
    startupTimeoutId = window.setTimeout(async () => {
      if (attemptId !== startupAttemptId) return
      recordPlayerDebugEvent('startup-timeout:fire', {
        attemptId,
        currentTimeSeconds: currentTimeSeconds.value,
        didReachPlayingState: lastKnownYoutubeState === 1,
        hasObservedStartupSeekProgress,
        lastKnownYoutubeState,
        playbackHealth: playbackHealth.value,
        playerState: playerState.value,
      })
      if (cancelStartupFailureIfProgressObserved(attemptId)) return
      const didReachPlayingState = lastKnownYoutubeState === 1
      await handleStartupFailure(
        didReachPlayingState ? 'stalled' : 'startup-timeout',
        PLAYER_SKIP_FAILED_MESSAGE,
        attemptId,
      )
    }, STARTUP_TIMEOUT_MS)
  }

  const handlePlayerStateChange = (stateCode: number, generation: number) => {
    if (generation !== activePlayerGeneration) return
    if (!currentPlaySong || !playingSong.value || playingYear.value === null)
      return
    recordPlayerDebugEvent('player-state-change', {
      currentTimeSeconds: currentTimeSeconds.value,
      generation,
      playbackHealth: playbackHealth.value,
      playerState: playerState.value,
      startupMode: currentStartupMode,
      stateCode,
      videoId: currentPlaySong.youtubeVideoId ?? null,
    })
    lastKnownYoutubeState = stateCode
    if (stateCode === 0) {
      clearPendingSongPlayEventTimer()
      const endedSong = playingSong.value
      const endedYear = playingYear.value
      if (!endedSong || endedYear === null) {
        stop()
        return
      }
      void playNext(endedSong, endedYear, 'autoplay')
      return
    }
    if (stateCode === 1) {
      startProgressTimer()
      if (
        playbackHealth.value === 'starting' &&
        currentStartupMode === 'play'
      ) {
        handleStartupHealthy()
        return
      }
      playerState.value = 'playing'
      scheduleSongPlayEvent()
      return
    }
    if (stateCode === 2) {
      clearPendingSongPlayEventTimer()
      if (playbackHealth.value === 'healthy' || currentStartupMode === 'cue')
        playerState.value = 'paused'
      return
    }
    if (stateCode === 3) {
      clearPendingSongPlayEventTimer()
      playerState.value = 'loading'
      startProgressTimer()
      return
    }
    if (stateCode === 5) {
      if (currentStartupMode === 'cue') handleStartupHealthy()
      else playerState.value = 'paused'
    }
  }

  const handlePlayerError = async (
    errorCode: number | null,
    generation: number,
  ) => {
    if (generation !== activePlayerGeneration) return
    if (getIsEmbedBlockedError(errorCode))
      return handleStartupFailure(
        'embed-blocked',
        "This upload can't play in the embedded player.",
      )
    if (!getHasImmediateNetworkConnection())
      return handleStartupFailure('offline', OFFLINE_PLAYBACK_STOPPED_MESSAGE)
    return handleStartupFailure('youtube-error', PLAYER_SKIP_FAILED_MESSAGE)
  }

  const ensurePlayer = async () => {
    if (typeof window === 'undefined' || !playerHostEl) return null
    if (youtubePlayer) return youtubePlayer
    activePlayerGeneration += 1
    const currentGeneration = activePlayerGeneration
    const mountEl = document.createElement('div')
    mountEl.className = 'h-full w-full'
    playerHostEl.replaceChildren(mountEl)
    youtubePlayer = createYouTubePlayerAdapter(mountEl, {
      onError: (errorCode) =>
        void handlePlayerError(errorCode, currentGeneration),
      onReady: () => syncMutedState(youtubePlayer),
      onStateChange: (stateCode) =>
        handlePlayerStateChange(stateCode, currentGeneration),
    })
    hasMountedPlayer.value = true
    syncMutedState(youtubePlayer)
    return youtubePlayer
  }

  const beginStartupAttempt = async (
    song: Song,
    year: number,
    mode: StartupMode,
    startAtSeconds?: number,
  ) => {
    recordPlayerDebugEvent('startup-attempt:begin', {
      mode,
      startAtSeconds: startAtSeconds ?? null,
      videoId: song.youtubeVideoId ?? null,
      year,
    })
    const player = await ensurePlayer()
    if (!player) {
      await handleStartupFailure(
        'player-load-failed',
        PLAYER_LOAD_FAILED_MESSAGE,
      )
      return
    }
    startupAttemptId += 1
    const attemptId = startupAttemptId
    currentStartupMode = mode
    currentPlaySong = song
    currentStartAtSeconds = startAtSeconds
    clearFailure()
    playbackHealth.value = 'starting'
    lastKnownYoutubeState = null
    lastObservedTimeSeconds = startAtSeconds ?? 0
    observedProgressTicks = 0
    hasObservedStartupSeekProgress = false
    resetPlaybackProgress()
    startProgressTimer()
    if (mode === 'cue') {
      playerState.value = 'loading'
      try {
        await player.cueVideoById({
          startSeconds: startAtSeconds ? Math.floor(startAtSeconds) : undefined,
          videoId: song.youtubeVideoId!,
        })
      } catch {
        if (attemptId !== startupAttemptId) return
        await handleStartupFailure(
          'player-load-failed',
          PLAYER_LOAD_FAILED_MESSAGE,
          attemptId,
        )
      }
      return
    }
    playerState.value = 'loading'
    startStartupTimeout(attemptId)
    try {
      await player.loadVideoById({
        startSeconds: startAtSeconds ? Math.floor(startAtSeconds) : undefined,
        videoId: song.youtubeVideoId!,
      })
    } catch {
      if (attemptId !== startupAttemptId) return
      clearStartupTimeout()
      await handleStartupFailure(
        'player-load-failed',
        PLAYER_LOAD_FAILED_MESSAGE,
        attemptId,
      )
    }
  }

  const preparePlaybackSession = (
    song: Song,
    year: number,
    trigger: PlayTrigger,
    startAtSeconds?: number,
  ) => {
    recordPlayerDebugEvent('playback-session:prepare', {
      startAtSeconds: startAtSeconds ?? null,
      trigger,
      videoId: song.youtubeVideoId ?? null,
      year,
    })
    dismissPlaybackFailureBurstModal()
    cancelPendingPlaybackFailureAction()
    clearFailure()
    clearPendingSongPlayEventTimer()
    pendingSongPlayEventPayload = {
      artist: song.artist,
      source: trigger,
      title: song.title,
      year: String(year),
    }
    hasTrackedCurrentSongPlayEvent = false
    playingSong.value = song
    playingYear.value = year
    currentPlaySong = song
    currentStartAtSeconds = startAtSeconds
    startupSoftRecoveryCount = 0
    startupRebuildCount = 0
    isAwaitingPlaybackStart.value = false
    playbackHealth.value = 'starting'
  }

  const attachOfflineHandler = () => {
    if (typeof window === 'undefined') return
    clearOfflineHandler()
    offlineHandler = () => {
      if (playerState.value === 'loading')
        void handleStartupFailure('offline', OFFLINE_PLAYBACK_STOPPED_MESSAGE)
      else {
        useToastStore().show(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
        pausePlaybackSession()
      }
    }
    window.addEventListener('offline', offlineHandler, { once: true })
  }

  const stop = () => {
    stopPlayerTransport()
    clearPlaybackSession()
    clearSongHighlightTimer()
    highlightedSongKey.value = null
    pendingHighlightedSongKey.value = null
    playerState.value = 'idle'
    playingSong.value = null
    playingYear.value = null
    deactivate()
    clearSavedState()
  }

  const preload = async () => {
    if (typeof window === 'undefined' || !playerHostEl) return
    await ensurePlayer()
  }

  const primePlayback = async () => {
    await preload()
  }

  const openSong = async (
    song: Song,
    year: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    if (!song.youtubeVideoId) return
    if (
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year
    ) {
      if (playerState.value === 'playing' && youtubePlayer) {
        await youtubePlayer.pauseVideo()
        playerState.value = 'paused'
      }
      return
    }
    preparePlaybackSession(song, year, trigger)
    await beginStartupAttempt(song, year, 'cue')
    const chart = useChartStore()
    if (chart.selectedYear === year)
      void scrollSongIntoView(song, year, trigger !== 'direct')
  }

  const play = async (
    song: Song,
    year: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    recordPlayerDebugEvent('play:request', {
      currentTimeSeconds: currentTimeSeconds.value,
      currentVideoId: playingSong.value?.youtubeVideoId ?? null,
      playerState: playerState.value,
      requestedVideoId: song.youtubeVideoId ?? null,
      requestedYear: year,
      trigger,
    })
    if (typeof window === 'undefined' || !song.youtubeVideoId) return
    if (!getHasImmediateNetworkConnection()) {
      useToastStore().show(OFFLINE_PLAYBACK_MESSAGE)
      return
    }
    if (
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year
    ) {
      if (playerState.value === 'playing' && youtubePlayer) {
        await youtubePlayer.pauseVideo()
        playerState.value = 'paused'
        return
      }
      if (playerState.value === 'paused' && youtubePlayer) {
        preparePlaybackSession(
          song,
          year,
          trigger,
          currentTimeSeconds.value || undefined,
        )
        await beginStartupAttempt(
          song,
          year,
          'play',
          currentTimeSeconds.value || undefined,
        )
        return
      }
    }
    const shouldResumeFromStorage =
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year &&
      currentTimeSeconds.value > 0
    const resumeAtSeconds = shouldResumeFromStorage
      ? currentTimeSeconds.value
      : undefined
    preparePlaybackSession(song, year, trigger, resumeAtSeconds)
    attachOfflineHandler()
    await beginStartupAttempt(song, year, 'play', resumeAtSeconds)
    const chart = useChartStore()
    if (chart.selectedYear === year)
      void scrollSongIntoView(song, year, trigger !== 'direct')
  }

  const togglePlayback = async (trigger: PlayTrigger = 'direct') => {
    if (playerState.value === 'playing' && youtubePlayer) {
      await youtubePlayer.pauseVideo()
      playerState.value = 'paused'
      return
    }
    if (
      playerState.value === 'paused' &&
      playingSong.value &&
      playingYear.value !== null
    ) {
      await play(playingSong.value, playingYear.value, trigger)
    }
  }

  const getSeekValue = (nextValue: number[]) => {
    const [value] = nextValue
    if (value === undefined || Number.isNaN(value)) return null
    return value
  }

  const handleSeekInput = (nextValue: number[]) => {
    const nextSeekValue = getSeekValue(nextValue)
    if (nextSeekValue === null) return
    seekPreviewSeconds.value = nextSeekValue
  }

  const startSeekDrag = () => {
    isSeekDragging.value = true
  }

  const handleSeekCommit = async (nextValue: number[]) => {
    const nextSeekValue = getSeekValue(nextValue)
    if (nextSeekValue === null || !youtubePlayer) {
      clearSeekPreview()
      return
    }
    isSeekDragging.value = false
    seekPreviewSeconds.value = nextSeekValue
    currentStartAtSeconds = nextSeekValue
    playerState.value = 'loading'
    await youtubePlayer.seekTo(nextSeekValue, true)
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
    saveMutedPreference(isMuted.value)
    syncMutedState()
  }

  const setMuted = (nextMuted: boolean) => {
    if (isMuted.value === nextMuted) return
    isMuted.value = nextMuted
    saveMutedPreference(nextMuted)
    syncMutedState()
  }

  const setVolume = (nextVolume: number) => {
    const clampedVolume = Math.min(100, Math.max(0, Math.round(nextVolume)))
    const shouldUnmute = isMuted.value
    if (volumePercent.value === clampedVolume && !shouldUnmute) return
    volumePercent.value = clampedVolume
    saveVolumePreference(clampedVolume)
    if (clampedVolume === 0 && !shouldUnmute && !isMuted.value) {
      isMuted.value = true
      saveMutedPreference(true)
    }
    if (shouldUnmute || (clampedVolume > 0 && isMuted.value)) {
      isMuted.value = false
      saveMutedPreference(false)
    }
    syncMutedState()
  }

  const seekRelative = async (deltaSeconds: number) => {
    if (!youtubePlayer || playerState.value === 'idle') return
    const baseSeconds = seekPreviewSeconds.value ?? currentTimeSeconds.value
    const nextSeekValue = Math.max(
      0,
      Math.min(durationSeconds.value, baseSeconds + deltaSeconds),
    )
    seekPreviewSeconds.value = nextSeekValue
    currentStartAtSeconds = nextSeekValue
    playerState.value = 'loading'
    await youtubePlayer.seekTo(nextSeekValue, true)
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
    if (!song || year === null) return { index: -1, songs: null, year: null }
    const songs = await getSortedYearData(year)
    if (!songs) return { index: -1, songs: null, year: null }
    const index = songs.findIndex(
      (currentSong) => currentSong.youtubeVideoId === song.youtubeVideoId,
    )
    return { index, songs, year }
  }

  const deactivateRickRollIfNeeded = () => {
    if (!isRickRollActive.value) return
    deactivate()
  }

  const playNext = async (
    fromSong?: Song,
    fromYear?: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    deactivateRickRollIfNeeded()
    const chart = useChartStore()
    const stopPlaybackIfNeeded = () => {
      if (trigger === 'autoplay' || trigger === 'skip') stop()
    }
    const activeSong = fromSong ?? playingSong.value
    const activeYear = fromYear ?? playingYear.value
    if (!activeSong || activeYear === null || activeYear === undefined)
      return { index: -1, songs: null, year: null }
    const songs = await getSortedYearData(activeYear)
    if (!songs) return stopPlaybackIfNeeded()
    const index = songs.findIndex(
      (currentSong) => currentSong.youtubeVideoId === activeSong.youtubeVideoId,
    )
    if (index === -1) return stopPlaybackIfNeeded()
    if (index < songs.length - 1) {
      const nextSong = songs[index + 1]
      if (nextSong) await play(nextSong, activeYear, trigger)
      return
    }
    const yearIndex = chart.availableYears.indexOf(activeYear)
    if (yearIndex === -1 || yearIndex >= chart.availableYears.length - 1)
      return stopPlaybackIfNeeded()
    const nextYear = chart.availableYears[yearIndex + 1]
    if (nextYear === undefined) return stopPlaybackIfNeeded()
    const nextYearSongs = await getSortedYearData(nextYear)
    if (!nextYearSongs?.length) return stopPlaybackIfNeeded()
    chart.selectYear(nextYear)
    await play(nextYearSongs[0], nextYear, trigger)
  }

  const playPrev = async (trigger: PlayTrigger = 'direct') => {
    deactivateRickRollIfNeeded()
    const chart = useChartStore()
    const { index, songs, year } = await getCurrentIndex()
    if (!songs || index === -1 || year === null) return
    if (index > 0) {
      const prevSong = songs[index - 1]
      if (prevSong) await play(prevSong, year, trigger)
      return
    }
    const yearIndex = chart.availableYears.indexOf(year)
    if (yearIndex <= 0) return
    const prevYear = chart.availableYears[yearIndex - 1]
    if (prevYear === undefined) return
    const prevYearSongs = await getSortedYearData(prevYear)
    if (!prevYearSongs?.length) return
    chart.selectYear(prevYear)
    await play(prevYearSongs[prevYearSongs.length - 1], prevYear, trigger)
  }

  const getSongHighlightKey = (year: number, rank: number) => `${year}-${rank}`
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

  const getSongRowId = (year: number, rank: number) => `song-${year}-${rank}`

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

  const setPlayerContainer = (nextPlayerHostEl: HTMLDivElement | null) => {
    if (playerHostEl === nextPlayerHostEl) return
    recordPlayerDebugEvent('player-container:set', {
      currentTimeSeconds: currentTimeSeconds.value,
      hadYoutubePlayer: !!youtubePlayer,
      nextHostConnected: nextPlayerHostEl?.isConnected ?? false,
      nextHostHeight: nextPlayerHostEl?.clientHeight ?? null,
      nextHostWidth: nextPlayerHostEl?.clientWidth ?? null,
      previousHostConnected: playerHostEl?.isConnected ?? false,
      startAtSeconds: currentTimeSeconds.value || currentStartAtSeconds || null,
    })
    playerHostEl = nextPlayerHostEl
    if (!playerHostEl) {
      destroyPlayer()
      return
    }
    if (!youtubePlayer) return
    const song = currentPlaySong
    const year = playingYear.value
    const playbackMode = playerState.value === 'playing' ? 'play' : 'cue'
    const startAtSeconds = currentTimeSeconds.value || currentStartAtSeconds
    destroyPlayer()
    if (!song || year === null) return
    void beginStartupAttempt(song, year, playbackMode, startAtSeconds)
  }

  const refreshPlayerAfterViewportChange = () => undefined

  const completeShellPlaybackBootstrap = async () => undefined

  const goToSong = () => {
    const chart = useChartStore()
    if (playingYear.value === null || !playingSong.value) return
    chart.selectYear(playingYear.value)
    void scrollSongIntoView(playingSong.value, playingYear.value, true)
  }

  const restoreFromStorage = async () => {
    if (typeof window === 'undefined') return
    const savedState = loadSavedState()
    if (!savedState) return
    const songs = await getYearSongs(savedState.year)
    if (!songs) return
    const restoredSong = songs.find(
      (song) => song.youtubeVideoId === savedState.videoId,
    )
    if (!restoredSong) return
    playingSong.value = restoredSong
    playingYear.value = savedState.year
    currentPlaySong = restoredSong
    currentStartAtSeconds = savedState.timeSeconds
    currentTimeSeconds.value = savedState.timeSeconds
    playerState.value = 'paused'
    playbackHealth.value = 'idle'
  }

  void restoreFromStorage()

  return {
    completeShellPlaybackBootstrap,
    currentTimeSeconds,
    displayedTimeSeconds,
    durationSeconds,
    flashSongHighlight,
    formattedCurrentTime,
    formattedDuration,
    goToSong,
    handleSeekCommit,
    handleSeekInput,
    hasMountedPlayer,
    isActive,
    isAwaitingPlaybackStart,
    isMuted,
    isPlaybackFailureBurstModalOpen,
    isSongActive,
    isSongHighlighted,
    lastPlaybackFailure,
    dismissPlaybackFailureBurstModal,
    openSong,
    play,
    playbackHealth,
    playerState,
    playNext,
    playingSong,
    playingYear,
    playPrev,
    preload,
    primePlayback,
    queueSongHighlight,
    refreshPlayerAfterViewportChange,
    revealQueuedSongHighlight,
    seekRelative,
    seekSliderValue,
    setMuted,
    setPlayerContainer,
    setVolume,
    shouldBootstrapPlaybackFromShell,
    showSeekBar,
    startSeekDrag,
    stop,
    toggleMute,
    togglePlayback,
    volumePercent,
  }
})
