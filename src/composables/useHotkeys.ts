import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { useChartStore } from '@/stores/chart'
import { useToastStore } from '@/stores/toast'

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

export const useHotkeys = (
  openSearch: () => void,
  getIsBlocked: () => boolean,
) => {
  const route = useRoute()
  const player = usePlayerStore()
  const chart = useChartStore()
  const toast = useToastStore()

  let konamiProgress = 0

  const handleKeydown = (e: KeyboardEvent) => {
    // Track Konami sequence regardless of focus/blocked state
    if (e.code === KONAMI[konamiProgress]) {
      konamiProgress++
      if (konamiProgress === KONAMI.length) {
        konamiProgress = 0
        toast.showInfo('🕺💃🎉', 3000)
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
        const topSong = chart.currentSongs[0]
        if (topSong) player.play(topSong, chart.selectedYear)
      }
      return
    }

    if (e.code === 'KeyK' && !isMod) {
      e.preventDefault()
      if (player.isActive) {
        player.togglePlayback()
      } else if (route.name === 'year') {
        const topSong = chart.currentSongs[0]
        if (topSong) player.play(topSong, chart.selectedYear)
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

    if (e.code === 'KeyM' && !isMod) {
      e.preventDefault()
      player.toggleMute()
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
      e.preventDefault()
      if (player.isActive) player.stop()
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

    if (isMod && e.key === 'f') {
      e.preventDefault()
      openSearch()
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}
