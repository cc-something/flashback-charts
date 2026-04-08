import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Song } from '@/types/song'
import { usePlayerStore } from '@/stores/player'
import { useChartStore } from '@/stores/chart'
import { useToastStore } from '@/stores/toast'
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
  const getTopSong = async (): Promise<Song | null> => {
    if (route.name !== 'year') return null
    const { getYearData } = await import('@/data')
    const songs = getYearData(chart.selectedYear) ?? []
    if (chart.sortOrder === 'desc') return songs[songs.length - 1] ?? null
    return songs[0] ?? null
  }
  const playTopSong = async () => {
    const topSong = await getTopSong()
    if (topSong) await player.play(topSong, chart.selectedYear)
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
        player.togglePlayback()
      } else if (route.name === 'year') {
        void playTopSong()
      }
      return
    }

    if (e.code === 'KeyK' && !isMod) {
      e.preventDefault()
      if (player.isActive) {
        player.togglePlayback()
      } else if (route.name === 'year') {
        void playTopSong()
      }
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
      player.goToSong()
      return
    }

    if (e.code === 'Escape' && !isMod) {
      if (getHasEscapeConsumer()) return
      e.preventDefault()
      if (player.isActive) player.stop()
      deactivateRickRoll()
      return
    }

    if (isMod && e.key === 'ArrowLeft') {
      e.preventDefault()
      player.playPrev()
      return
    }

    if (isMod && e.key === 'ArrowRight') {
      e.preventDefault()
      player.playNext()
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
