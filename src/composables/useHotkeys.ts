import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { useChartStore } from '@/stores/chart'

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

export const useHotkeys = (openSearch: () => void) => {
  const route = useRoute()
  const player = usePlayerStore()
  const chart = useChartStore()

  const handleKeydown = (e: KeyboardEvent) => {
    if (getIsInputFocused()) return

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
