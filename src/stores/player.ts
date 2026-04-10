import { ref, computed, nextTick, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Song } from '@/types/song'
import { useYouTubeApi } from '@/composables/useYouTubeApi'
import { useRickRollMode } from '@/composables/useRickRollMode'
import { useChartStore } from '@/stores/chart'
import { useToastStore } from '@/stores/toast'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'

const STORAGE_KEY = 'flashback-miniplayer'
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
const isEmbedBlockedError = (errorCode?: number) =>
  errorCode !== undefined && EMBED_BLOCKED_ERROR_CODES.has(errorCode)
const getYearSongs = async (year: number) => {
  const { getYearData } = await import('@/data')
  return getYearData(year) ?? null
}

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
  const isMuted = ref(false)
  const hasMountedPlayer = ref(false)
  const highlightedSongKey = ref<string | null>(null)
  const pendingHighlightedSongKey = ref<string | null>(null)

  let ytPlayer: YTPlayer | null = null
  let progressTimerId: number | null = null
  let saveTimerId: number | null = null
  let playerContainerEl: HTMLDivElement | null = null
  let onEndedCallback: ((song: Song, year: number) => void) | null = null
  let retryCount = 0
  let currentPlaySong: Song | null = null
  let currentStartAtSeconds: number | undefined
  let offlineHandler: (() => void) | null = null
  let stallTimerId: ReturnType<typeof setTimeout> | null = null
  let connectivityCheckPromise: Promise<boolean> | null = null
  let playerInitPromise: Promise<YTPlayer | null> | null = null
  let isPlayerReady = false
  let loadingAttemptId = 0
  let loadingStartedAt = 0
  let clearSongHighlightTimerId: ReturnType<typeof setTimeout> | null = null

  const isActive = computed(() => playerState.value !== 'idle')
  const displayedTimeSeconds = computed(
    () => seekPreviewSeconds.value ?? currentTimeSeconds.value,
  )
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
    try {
      await ensureLoaded()
    } catch {
      /* noop */
    }
  }
  const getHasImmediateNetworkConnection = () => {
    if (typeof window === 'undefined') return false
    return navigator.onLine
  }
  const clearLoadingTracking = () => {
    loadingStartedAt = 0
  }
  const startLoadingAttempt = () => {
    loadingAttemptId += 1
    loadingStartedAt = Date.now()
    playerState.value = 'loading'
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
    if (!(await waitForMinimumErrorLoading(activeLoadingAttemptId))) return
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

  const setPlayerContainer = (el: HTMLDivElement | null) => {
    if (playerContainerEl === el) return
    playerContainerEl = el
    if (!playerContainerEl) {
      destroyPlayer()
      return
    }
  }

  const setOnEnded = (cb: ((song: Song, year: number) => void) | null) => {
    onEndedCallback = cb
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
  const revealSongRowHighlight = (year: number, rank: number) => {
    if (useChartStore().selectedYear !== year) return
    flashSongHighlight(year, rank)
  }
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
  const clearPlaybackSession = () => {
    clearProgressTimer()
    clearStallTimer()
    currentTimeSeconds.value = 0
    durationSeconds.value = 0
    retryCount = 0
    currentPlaySong = null
    currentStartAtSeconds = undefined
    clearLoadingTracking()
    clearSeekPreview()
    clearOfflineHandler()
  }
  const destroyPlayer = () => {
    clearProgressTimer()
    clearStallTimer()
    ytPlayer?.destroy()
    ytPlayer = null
    playerInitPromise = null
    isPlayerReady = false
    hasMountedPlayer.value = false
    playerContainerEl?.replaceChildren()
  }
  const stop = () => {
    clearSaveTimer()
    clearPlaybackSession()
    clearSongHighlight()
    pendingHighlightedSongKey.value = null
    ytPlayer?.stopVideo()
    playerState.value = 'idle'
    playingSong.value = null
    playingYear.value = null
    clearActive()
    deactivate()
    clearSavedState()
  }
  const waitForPlayerContainer = async () => {
    if (typeof window === 'undefined') return null
    for (let attemptIndex = 0; attemptIndex < 8; attemptIndex += 1) {
      if (
        playerContainerEl &&
        playerContainerEl.clientWidth >= 200 &&
        playerContainerEl.clientHeight >= 200
      )
        return playerContainerEl
      await nextTick()
      await new Promise<void>((resolve) =>
        window.requestAnimationFrame(() => resolve()),
      )
    }
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
    if (playerContainerHost.childElementCount > 0)
      return playerContainerHost.firstElementChild as HTMLDivElement
    const playerMountEl = document.createElement('div')
    playerMountEl.className = 'h-full w-full'
    playerContainerHost.appendChild(playerMountEl)
    return playerMountEl
  }
  const getImmediatePlayerMountEl = () => {
    const playerContainerHost = getReadyPlayerContainer()
    if (!playerContainerHost) return null
    if (playerContainerHost.childElementCount > 0)
      return playerContainerHost.firstElementChild as HTMLDivElement
    const playerMountEl = document.createElement('div')
    playerMountEl.className = 'h-full w-full'
    playerContainerHost.appendChild(playerMountEl)
    return playerMountEl
  }
  const startPlaybackStallTimer = () => {
    clearStallTimer()
    stallTimerId = setTimeout(async () => {
      if (playerState.value !== 'loading') return
      if (!(await getHasNetworkConnection()))
        return failLoadingAttempt(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
      await failLoadingAttempt('Playback failed, try again later')
    }, STALL_TIMEOUT_MS)
  }
  const loadCurrentSongIntoPlayer = () => {
    if (!ytPlayer || !currentPlaySong?.youtubeVideoId) return
    startProgressTimer()
    if (isMuted.value) ytPlayer.mute()
    else ytPlayer.unMute()
    ytPlayer.loadVideoById(
      currentPlaySong.youtubeVideoId,
      currentStartAtSeconds ? Math.floor(currentStartAtSeconds) : undefined,
    )
    startPlaybackStallTimer()
  }
  const handleEmbedBlockedPlayback = async () => {
    const failedSong = playingSong.value
    const failedYear = playingYear.value
    await failLoadingAttempt("Couldn't play that song, skipping", () => {})
    if (failedSong && failedYear !== null)
      playNext(failedSong, failedYear, 'skip')
  }
  const handlePlaybackError = async (errorCode?: number) => {
    const failedSong = currentPlaySong
    if (!failedSong) return
    if (isEmbedBlockedError(errorCode)) return handleEmbedBlockedPlayback()
    if (!(await getHasNetworkConnection()))
      return failLoadingAttempt(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
    if (retryCount < MAX_RETRIES) {
      retryCount += 1
      playerState.value = 'loading'
      setTimeout(() => {
        if (playerState.value === 'loading' && currentPlaySong)
          loadCurrentSongIntoPlayer()
      }, 1000 * retryCount)
      return
    }
    const skippedSong = playingSong.value
    const skippedYear = playingYear.value
    await failLoadingAttempt(`Failed to play "${failedSong.title}". Skipping.`)
    if (skippedSong && skippedYear !== null)
      playNext(skippedSong, skippedYear, 'skip')
  }
  const handlePlayerStateChange = (event: YTPlayerEvent) => {
    if (!playingSong.value || playingYear.value === null) return
    if (event.data === 1 || event.data === 2) clearStallTimer()
    if (event.data === 1) {
      clearLoadingTracking()
      playerState.value = 'playing'
    } else if (event.data === 2) {
      clearLoadingTracking()
      playerState.value = 'paused'
    } else if (event.data === 3) playerState.value = 'loading'
    else if (event.data === 0) {
      const endedSong = playingSong.value
      const endedYear = playingYear.value
      if (endedSong && endedYear !== null && onEndedCallback) {
        clearPlaybackSession()
        playerState.value = 'loading'
        void onEndedCallback(endedSong, endedYear)
      } else stop()
    }
    syncPlaybackProgress()
  }
  const createPlayer = (playerMountEl: HTMLDivElement) => {
    hasMountedPlayer.value = true
    playerInitPromise = new Promise<YTPlayer | null>((resolve) => {
      ytPlayer = new window.YT!.Player(playerMountEl, {
        width: '100%',
        height: '100%',
        videoId: currentPlaySong?.youtubeVideoId,
        playerVars: {
          autoplay: currentPlaySong ? 1 : 0,
          controls: 0,
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
            isPlayerReady = true
            playerInitPromise = Promise.resolve(event.target)
            if (isMuted.value) event.target.mute()
            resolve(event.target)
            if (currentPlaySong) {
              startProgressTimer()
              startPlaybackStallTimer()
            }
          },
          onStateChange: handlePlayerStateChange,
          onError: (event: YTPlayerEvent) =>
            void handlePlaybackError(event.data),
        },
      })
    })
    return playerInitPromise
  }
  const mountPlayerIfPossible = () => {
    if (typeof window === 'undefined') return null
    if (!window.YT?.Player || ytPlayer || !currentPlaySong?.youtubeVideoId)
      return null
    const playerMountEl = getImmediatePlayerMountEl()
    if (!playerMountEl) return null
    return createPlayer(playerMountEl)
  }
  const ensurePlayerMounted = async () => {
    if (typeof window === 'undefined') return null
    if (ytPlayer && isPlayerReady) return ytPlayer
    if (playerInitPromise) return playerInitPromise
    await ensureLoaded()
    const playerMountEl = await getPlayerMountEl()
    if (!playerMountEl || !currentPlaySong?.youtubeVideoId) return null
    return createPlayer(playerMountEl)
  }

  const play = async (
    song: Song,
    year: number,
    trigger: PlayTrigger = 'direct',
  ) => {
    if (typeof window === 'undefined') return
    if (!song.youtubeVideoId) return

    // Toggle if same song
    if (
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year
    ) {
      if (playerState.value === 'playing') {
        if (trigger !== 'direct') revealSongRowHighlight(year, song.rank)
        ytPlayer?.pauseVideo()
        return
      }
      if (playerState.value === 'paused' && ytPlayer) {
        if (trigger !== 'direct') revealSongRowHighlight(year, song.rank)
        startLoadingAttempt()
        if (getHasImmediateNetworkConnection()) {
          ytPlayer.playVideo()
          return
        }
        await failLoadingAttempt(OFFLINE_PLAYBACK_MESSAGE, () => {
          clearLoadingTracking()
          playerState.value = 'paused'
        })
        return
      }
      if (playerState.value === 'loading') {
        if (trigger !== 'direct') revealSongRowHighlight(year, song.rank)
        stop()
        return
      }
      // Restored from storage — fall through to full play
    }

    // Capture resume time before stop() clears it
    const resumeAt =
      currentTimeSeconds.value > 0 && !ytPlayer
        ? currentTimeSeconds.value
        : undefined

    const wasActive = isActive.value
    if (wasActive) clearPlaybackSession()

    const chart = useChartStore()
    playingSong.value = song
    playingYear.value = year
    startLoadingAttempt()
    retryCount = 0
    currentPlaySong = song
    currentStartAtSeconds = resumeAt
    if (!getHasImmediateNetworkConnection())
      return failLoadingAttempt(OFFLINE_PLAYBACK_MESSAGE)

    if (!wasActive) registerActive(stop)
    usePlausibleAnalytics().trackEvent('Song Play', {
      artist: song.artist,
      title: song.title,
      year: String(year),
      source: trigger,
    })
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

    if (playerState.value !== 'loading') return
    if (ytPlayer && isPlayerReady) {
      loadCurrentSongIntoPlayer()
      return
    }
    if (mountPlayerIfPossible()) return
    void ensurePlayerMounted()
      .then(() => undefined)
      .catch(async () => {
        if (!(await getHasNetworkConnection()))
          return failLoadingAttempt(OFFLINE_PLAYBACK_STOPPED_MESSAGE)
        return failLoadingAttempt(PLAYER_LOAD_FAILED_MESSAGE)
      })
  }

  const togglePlayback = async (trigger: PlayTrigger = 'direct') => {
    if (
      trigger !== 'direct' &&
      playingSong.value &&
      playingYear.value !== null &&
      playerState.value !== 'idle'
    )
      revealSongRowHighlight(playingYear.value, playingSong.value.rank)
    if (playerState.value === 'playing') ytPlayer?.pauseVideo()
    else if (playerState.value === 'paused' && ytPlayer) {
      startLoadingAttempt()
      if (getHasImmediateNetworkConnection()) ytPlayer.playVideo()
      else
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
    isSeekDragging.value = true
    seekPreviewSeconds.value = v
  }

  const handleSeekCommit = (nextValue: number[]) => {
    if (!ytPlayer) {
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
    ytPlayer.seekTo(v, true)
  }

  const toggleMute = () => {
    if (!ytPlayer) return
    if (isMuted.value) {
      ytPlayer.unMute()
      isMuted.value = false
    } else {
      ytPlayer.mute()
      isMuted.value = true
    }
  }

  const seekRelative = (deltaSeconds: number) => {
    if (!ytPlayer || playerState.value === 'idle') return
    const base = seekPreviewSeconds.value ?? currentTimeSeconds.value
    const next = Math.max(
      0,
      Math.min(durationSeconds.value, base + deltaSeconds),
    )
    seekPreviewSeconds.value = next
    playerState.value = 'loading'
    ytPlayer.seekTo(next, true)
  }

  const isSongActive = (song: Song, year: number) =>
    playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
    playingYear.value === year &&
    playerState.value !== 'idle'

  const getSortedYearData = async (year: number) => {
    const songs = await getYearSongs(year)
    if (!songs) return null
    const chart = useChartStore()
    if (chart.sortOrder === 'desc') return [...songs].reverse()
    return songs
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
    deactivateRickRollIfNeeded()
    const chart = useChartStore()
    const stopAutoplayIfNeeded = () => {
      if (trigger === 'autoplay') stop()
    }
    const song = fromSong ?? playingSong.value
    const year = fromYear ?? playingYear.value
    if (!song || year === null || year === undefined)
      return { songs: null, index: -1, year: null }
    const songs = await getSortedYearData(year)
    if (!songs) return stopAutoplayIfNeeded()

    const index = songs.findIndex(
      (s) => s.youtubeVideoId === song.youtubeVideoId,
    )
    if (index === -1) return stopAutoplayIfNeeded()

    if (index < songs.length - 1) {
      const nextSong = songs[index + 1]
      if (nextSong) play(nextSong, year, trigger)
      return
    }

    const yearIdx = chart.availableYears.indexOf(year)
    if (yearIdx === -1 || yearIdx >= chart.availableYears.length - 1)
      return stopAutoplayIfNeeded()
    const nextYear = chart.availableYears[yearIdx + 1]
    if (nextYear === undefined) return stopAutoplayIfNeeded()
    const nextYearSongs = await getSortedYearData(nextYear)
    if (!nextYearSongs?.length) return stopAutoplayIfNeeded()
    chart.selectYear(nextYear)
    await play(nextYearSongs[0], nextYear, trigger)
  }

  const playPrev = async (trigger: PlayTrigger = 'direct') => {
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
    if (!saved) return
    const songs = await getYearSongs(saved.year)
    if (!songs) return
    const song = songs.find((s) => s.youtubeVideoId === saved.videoId)
    if (!song) return
    playingSong.value = song
    playingYear.value = saved.year
    currentTimeSeconds.value = saved.timeSeconds
    playerState.value = 'paused'
  }

  void restoreFromStorage()

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
    preload,
    setPlayerContainer,
    setOnEnded,
    play,
    stop,
    togglePlayback,
    toggleMute,
    seekRelative,
    handleSeekInput,
    handleSeekCommit,
    isSongActive,
    isSongHighlighted,
    queueSongHighlight,
    flashSongHighlight,
    revealQueuedSongHighlight,
    playNext,
    playPrev,
    goToSong,
  }
})
