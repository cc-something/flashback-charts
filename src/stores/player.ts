import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Song } from '@/types/song'
import { useYouTubeApi } from '@/composables/useYouTubeApi'
import { useChartStore } from '@/stores/chart'
import { useToastStore } from '@/stores/toast'
import { getYearData } from '@/data'

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused'

const MAX_RETRIES = 2

export const usePlayerStore = defineStore('player', () => {
  const { ensureLoaded, registerActive, clearActive } = useYouTubeApi()

  const playingSong = ref<Song | null>(null)
  const playingYear = ref<number | null>(null)
  const playerState = ref<PlayerState>('idle')
  const currentTimeSeconds = ref(0)
  const durationSeconds = ref(0)
  const isSeekDragging = ref(false)
  const seekPreviewSeconds = ref<number | null>(null)

  let ytPlayer: YTPlayer | null = null
  let progressTimerId: number | null = null
  let playerContainerEl: HTMLDivElement | null = null
  let onEndedCallback: ((song: Song, year: number) => void) | null = null
  let retryCount = 0
  let currentPlaySong: Song | null = null
  let offlineHandler: (() => void) | null = null

  const isActive = computed(() => playerState.value !== 'idle')
  const displayedTimeSeconds = computed(
    () => seekPreviewSeconds.value ?? currentTimeSeconds.value,
  )

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

  const setPlayerContainer = (el: HTMLDivElement) => {
    playerContainerEl = el
  }

  const setOnEnded = (cb: ((song: Song, year: number) => void) | null) => {
    onEndedCallback = cb
  }

  const clearProgressTimer = () => {
    if (progressTimerId === null) return
    window.clearInterval(progressTimerId)
    progressTimerId = null
  }

  const clearSeekPreview = () => {
    isSeekDragging.value = false
    seekPreviewSeconds.value = null
  }

  const syncPlaybackProgress = () => {
    if (!ytPlayer) return
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
    clearProgressTimer()
    syncPlaybackProgress()
    progressTimerId = window.setInterval(syncPlaybackProgress, 250)
  }

  const stop = () => {
    clearProgressTimer()
    ytPlayer?.destroy()
    ytPlayer = null
    playerState.value = 'idle'
    playingSong.value = null
    playingYear.value = null
    currentTimeSeconds.value = 0
    durationSeconds.value = 0
    retryCount = 0
    currentPlaySong = null
    clearSeekPreview()
    clearActive()
    if (offlineHandler) {
      window.removeEventListener('offline', offlineHandler)
      offlineHandler = null
    }
  }

  const attemptPlay = (song: Song) => {
    if (!playerContainerEl) {
      stop()
      return
    }

    ytPlayer?.destroy()
    ytPlayer = null

    ytPlayer = new window.YT!.Player(playerContainerEl, {
      width: '480',
      height: '270',
      videoId: song.youtubeVideoId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: {
        autoplay: 1,
        controls: 0,
        playsinline: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          startProgressTimer()
          event.target.playVideo()
        },
        onStateChange: (event: YTPlayerEvent) => {
          if (event.data === 1) playerState.value = 'playing'
          else if (event.data === 2) playerState.value = 'paused'
          else if (event.data === 3) playerState.value = 'loading'
          else if (event.data === 0) {
            const endedSong = playingSong.value
            const endedYear = playingYear.value
            stop()
            if (endedSong && endedYear !== null)
              onEndedCallback?.(endedSong, endedYear)
          }
          syncPlaybackProgress()
        },
        onError: () => {
          if (!navigator.onLine) {
            useToastStore().show('No internet connection — playback stopped')
            stop()
            return
          }
          if (retryCount < MAX_RETRIES) {
            retryCount++
            playerState.value = 'loading'
            window.setTimeout(() => {
              if (playerState.value === 'loading' && currentPlaySong)
                attemptPlay(currentPlaySong)
            }, 1000 * retryCount)
          } else {
            const failedSong = playingSong.value
            const failedYear = playingYear.value
            useToastStore().show(`Failed to play "${song.title}" — skipping`)
            stop()
            if (failedSong && failedYear !== null)
              playNext(failedSong, failedYear)
          }
        },
      },
    })
  }

  const play = async (song: Song, year: number) => {
    if (!song.youtubeVideoId) return

    // Toggle if same song
    if (
      playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
      playingYear.value === year
    ) {
      if (playerState.value === 'playing') {
        ytPlayer?.pauseVideo()
        return
      }
      if (playerState.value === 'paused') {
        ytPlayer?.playVideo()
        return
      }
      if (playerState.value === 'loading') {
        stop()
        return
      }
    }

    if (!navigator.onLine) {
      useToastStore().show('No internet connection — cannot play')
      return
    }

    // Stop any current playback
    if (isActive.value) stop()

    const chart = useChartStore()
    playingSong.value = song
    playingYear.value = year
    playerState.value = 'loading'
    retryCount = 0
    currentPlaySong = song
    registerActive(stop)

    if (chart.selectedYear === year) scrollSongIntoView(song)

    offlineHandler = () => {
      useToastStore().show('No internet connection — playback stopped')
      stop()
    }
    window.addEventListener('offline', offlineHandler, { once: true })

    try {
      await ensureLoaded()
    } catch {
      useToastStore().show('Failed to load player — check your connection')
      stop()
      return
    }

    if (playerState.value !== 'loading') return

    attemptPlay(song)
  }

  const togglePlayback = () => {
    if (playerState.value === 'playing') ytPlayer?.pauseVideo()
    else if (playerState.value === 'paused') ytPlayer?.playVideo()
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

  const isSongActive = (song: Song, year: number) =>
    playingSong.value?.youtubeVideoId === song.youtubeVideoId &&
    playingYear.value === year &&
    playerState.value !== 'idle'

  const getSortedYearData = (year: number) => {
    const songs = getYearData(year)
    if (!songs) return null
    const chart = useChartStore()
    if (chart.sortOrder === 'desc') return [...songs].reverse()
    return songs
  }

  const getCurrentIndex = () => {
    const song = playingSong.value
    const year = playingYear.value
    if (!song || year === null) return { songs: null, index: -1, year: null }
    const songs = getSortedYearData(year)
    if (!songs) return { songs: null, index: -1, year: null }
    const index = songs.findIndex(
      (s) => s.youtubeVideoId === song.youtubeVideoId,
    )
    return { songs, index, year }
  }

  const playNext = (fromSong?: Song, fromYear?: number) => {
    const chart = useChartStore()
    const song = fromSong ?? playingSong.value
    const year = fromYear ?? playingYear.value
    if (!song || year === null || year === undefined)
      return { songs: null, index: -1, year: null }
    const songs = getSortedYearData(year)
    if (!songs) return

    const index = songs.findIndex(
      (s) => s.youtubeVideoId === song.youtubeVideoId,
    )
    if (index === -1) return

    if (index < songs.length - 1) {
      const nextSong = songs[index + 1]
      if (nextSong) play(nextSong, year)
      return
    }

    const yearIdx = chart.availableYears.indexOf(year)
    if (yearIdx === -1 || yearIdx >= chart.availableYears.length - 1) return
    const nextYear = chart.availableYears[yearIdx + 1]
    if (nextYear === undefined) return
    const nextYearSongs = getSortedYearData(nextYear)
    if (!nextYearSongs?.length) return
    chart.selectYear(nextYear)
    play(nextYearSongs[0], nextYear)
  }

  const playPrev = () => {
    const chart = useChartStore()
    const { songs, index, year } = getCurrentIndex()
    if (!songs || index === -1 || year === null) return

    if (index > 0) {
      const prevSong = songs[index - 1]
      if (prevSong) play(prevSong, year)
      return
    }

    const yearIdx = chart.availableYears.indexOf(year)
    if (yearIdx <= 0) return
    const prevYear = chart.availableYears[yearIdx - 1]
    if (prevYear === undefined) return
    const prevYearSongs = getSortedYearData(prevYear)
    if (!prevYearSongs?.length) return
    chart.selectYear(prevYear)
    play(prevYearSongs[prevYearSongs.length - 1], prevYear)
  }

  const scrollSongIntoView = (song: Song) => {
    requestAnimationFrame(() => {
      const el = document.querySelector(
        `[data-song-id="${song.youtubeVideoId}"]`,
      )
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  const goToSong = () => {
    const chart = useChartStore()
    if (playingYear.value === null || !playingSong.value) return
    chart.selectYear(playingYear.value)
    scrollSongIntoView(playingSong.value)
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
    setPlayerContainer,
    setOnEnded,
    play,
    stop,
    togglePlayback,
    handleSeekInput,
    handleSeekCommit,
    isSongActive,
    playNext,
    playPrev,
    goToSong,
  }
})
