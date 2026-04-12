import { nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Song } from '@/types/song'
import { usePlayerStore } from '@/stores/player'
import { useChartStore } from '@/stores/chart'
import { useToastStore } from '@/stores/toast'
import { getDecadeYears } from '@/content/chartContent'
import { getYearPath } from '@/utils/url'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]
const PLAYER_FULLSCREEN_OPEN_EVENT = 'player-fullscreen-open'
const PLAYER_FULLSCREEN_CLOSE_EVENT = 'player-fullscreen-close'

const getIsInputFocused = () => {
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName.toLowerCase()
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    (el as HTMLElement).isContentEditable
  )
}

const getHasEscapeConsumer = () =>
  typeof document !== 'undefined' &&
  document.querySelector('[data-esc-closes]') !== null
const getIsPlayerFullscreen = () =>
  typeof document !== 'undefined' &&
  document.documentElement.dataset.playerFullscreen === 'true'

export const useHotkeys = (
  openSearch: () => void,
  getIsBlocked: () => boolean,
  deactivateRickRoll: () => void,
) => {
  const route = useRoute()
  const router = useRouter()
  const player = usePlayerStore()
  const chart = useChartStore()
  const toast = useToastStore()
  const waitForScrollSettle = () =>
    new Promise<void>((resolve) => window.setTimeout(resolve, 350))
  const openMaxiPlayer = () =>
    window.dispatchEvent(new Event(PLAYER_FULLSCREEN_OPEN_EVENT))
  const closeMaxiPlayer = () =>
    window.dispatchEvent(new Event(PLAYER_FULLSCREEN_CLOSE_EVENT))
  const getTopSong = async (): Promise<Song | null> => {
    if (route.name !== 'year') return null
    const { getYearData } = await import('@/data')
    const songs = getYearData(chart.selectedYear) ?? []
    if (chart.sortOrder === 'desc') return songs[songs.length - 1] ?? null
    return songs[0] ?? null
  }
  const getRandomSongForYears = async (years: number[]) => {
    const { getYearData } = await import('@/data')
    const songs = years.flatMap((year) =>
      (getYearData(year) ?? []).map((song) => ({ song, year })),
    )
    if (!songs.length) return null
    return songs[Math.floor(Math.random() * songs.length)] ?? null
  }
  const goToSongYearPage = async (year: number, rank: number) => {
    chart.selectYear(year)
    player.queueSongHighlight(year, rank)
    await router.push({
      path: getYearPath(year),
      query: { song: String(rank) },
    })
    await nextTick()
  }
  const openSongInMaxiPlayer = async (
    song: Song,
    year: number,
    shouldAutoplay: boolean,
  ) => {
    if (shouldAutoplay) {
      const playPromise = player.play(song, year, 'hotkey')
      openMaxiPlayer()
      await playPromise
      return
    }
    const openPromise = player.openSong(song, year, 'hotkey')
    openMaxiPlayer()
    await openPromise
  }
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
  const playTopSong = async () => {
    const topSong = await getTopSong()
    if (topSong) await player.play(topSong, chart.selectedYear, 'hotkey')
  }
  const openPlayerFromCurrentRoute = async () => {
    if (route.name === 'year') {
      const topSong = await getTopSong()
      if (!topSong) return
      await openSongInMaxiPlayer(topSong, chart.selectedYear, true)
      return
    }

    if (route.name === 'decade') {
      const decade = Array.isArray(route.params.decade)
        ? route.params.decade[0]
        : route.params.decade
      if (!decade) return
      const selection = await getRandomSongForYears(getDecadeYears(decade))
      if (!selection) return
      await goToSongYearPage(selection.year, selection.song.rank)
      await openSongInMaxiPlayer(selection.song, selection.year, false)
      return
    }

    if (route.name === 'home') {
      const selection = await getRandomSongForYears(chart.availableYears)
      if (!selection) return
      await goToSongYearPage(selection.year, selection.song.rank)
      await openSongInMaxiPlayer(selection.song, selection.year, false)
    }
  }

  let konamiProgress = 0

  const handleKeydown = (e: KeyboardEvent) => {
    // Track Konami sequence regardless of focus/blocked state
    if (e.code === KONAMI[konamiProgress]) {
      konamiProgress++
      if (konamiProgress === KONAMI.length) {
        konamiProgress = 0
      }
    } else {
      konamiProgress = e.code === KONAMI[0] ? 1 : 0
    }

    if (getIsBlocked() || getIsInputFocused()) return

    const isMod = e.metaKey || e.ctrlKey

    if (e.code === 'Space' && !isMod) {
      e.preventDefault()
      if (player.isActive) {
        player.togglePlayback('hotkey')
      } else if (route.name === 'year') {
        void playTopSong()
      }
      return
    }

    if (e.code === 'KeyK' && !isMod) {
      e.preventDefault()
      if (player.isActive) {
        player.togglePlayback('hotkey')
      } else if (route.name === 'year') {
        void playTopSong()
      }
      return
    }

    if (isMod && e.code === 'KeyK') {
      e.preventDefault()
      openSearch()
      return
    }

    if (e.code === 'KeyJ' && !isMod) {
      e.preventDefault()
      player.seekRelative(-10)
      return
    }

    if (e.code === 'KeyL' && !isMod) {
      e.preventDefault()
      player.seekRelative(10)
      return
    }

    if (e.code === 'KeyS' && !isMod) {
      e.preventDefault()
      chart.toggleSortOrder()
      toast.showInfo(
        chart.sortOrder === 'asc' ? 'Sort: 1 → 10' : 'Sort: 10 → 1',
      )
      return
    }

    if (e.code === 'KeyG' && !isMod) {
      e.preventDefault()
      void goToPlayingSong()
      return
    }

    if (e.code === 'KeyF' && !isMod) {
      e.preventDefault()
      if (player.isActive) {
        if (getIsPlayerFullscreen()) {
          closeMaxiPlayer()
          return
        }
        openMaxiPlayer()
        return
      }
      void openPlayerFromCurrentRoute()
      return
    }

    if (e.code === 'Escape' && !isMod) {
      if (getHasEscapeConsumer()) return
      e.preventDefault()
      if (player.isActive && getIsPlayerFullscreen()) {
        window.dispatchEvent(new Event(PLAYER_FULLSCREEN_CLOSE_EVENT))
        return
      }
      if (player.isActive) player.stop()
      deactivateRickRoll()
      return
    }

    if (isMod && e.key === 'ArrowLeft') {
      e.preventDefault()
      player.playPrev('hotkey')
      return
    }

    if (isMod && e.key === 'ArrowRight') {
      e.preventDefault()
      player.playNext(undefined, undefined, 'hotkey')
      return
    }

    if (isMod && e.key === '[') {
      e.preventDefault()
      if (route.name === 'year') {
        const yearIdx = chart.availableYears.indexOf(chart.selectedYear)
        if (yearIdx > 0)
          router.push(getYearPath(chart.availableYears[yearIdx - 1]))
      }
      return
    }

    if (isMod && e.key === ']') {
      e.preventDefault()
      if (route.name === 'year') {
        const yearIdx = chart.availableYears.indexOf(chart.selectedYear)
        if (yearIdx < chart.availableYears.length - 1)
          router.push(getYearPath(chart.availableYears[yearIdx + 1]))
      }
      return
    }

    if (isMod && e.key === 'f') {
      e.preventDefault()
      openSearch()
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}
