import { ref } from 'vue'
import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export const RICK_ASTLEY_YEAR = 1988

export const RICK_ASTLEY_SONG: Song = {
  rank: 1,
  title: 'Never Gonna Give You Up',
  artist: 'Rick Astley',
  album: 'The Best Of Me: Never Edition',
  youtubeVideoId: 'dQw4w9WgXcQ',
  thumbnailPath: getSongThumbnailPath({
    year: 1988,
    rank: 8,
    title: 'Never Gonna Give You Up',
  }),
  imageSelection: 'album',
  imageSources: {
    album:
      'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/db/9e/2a/db9e2ae0-cb9f-f2a9-2774-de399dff2580/4099964133639.jpg/600x600bb.jpg',
    artist: null,
  },
}

// Module-level singleton so state and listener survive across component re-renders
const isRickRollActive = ref(false)
let konamiProgress = 0

const handleKeydown = (e: KeyboardEvent) => {
  const expected = KONAMI_SEQUENCE[konamiProgress]
  if (e.key === expected) {
    konamiProgress++
    if (konamiProgress === KONAMI_SEQUENCE.length) {
      konamiProgress = 0
      isRickRollActive.value = !isRickRollActive.value
    }
  } else {
    konamiProgress = e.key === KONAMI_SEQUENCE[0] ? 1 : 0
  }
}

export const useRickRollMode = () => {
  const setupKonamiListener = () =>
    window.addEventListener('keydown', handleKeydown)
  const teardownKonamiListener = () =>
    window.removeEventListener('keydown', handleKeydown)
  const deactivate = () => {
    isRickRollActive.value = false
  }

  return {
    isRickRollActive,
    setupKonamiListener,
    teardownKonamiListener,
    deactivate,
  }
}
