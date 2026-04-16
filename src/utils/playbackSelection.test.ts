import { describe, expect, it } from 'vitest'
import type { Song } from '@/types/song'
import { getRandomDecadePlaybackSelection } from '@/utils/playbackSelection'

const createSong = (year: number, rank: number): Song => ({
  rank,
  title: `Song ${year}-${rank}`,
  artist: `Artist ${year}-${rank}`,
  album: `Album ${year}-${rank}`,
  youtubeVideoId: `video-${year}-${rank}`,
  embedIntegrity: 'best-match',
  thumbnailPath: `/images/${year}-${rank}.webp`,
  imageSelection: 'album',
  imageSources: {
    album: null,
    artist: null,
  },
})

const getSequenceRandomValue = (...values: number[]) => {
  let nextIndex = 0

  return () => {
    const nextValue = values[nextIndex] ?? values[values.length - 1] ?? 0
    nextIndex += 1
    return nextValue
  }
}

describe('getRandomDecadePlaybackSelection', () => {
  it('selects a random playable year and a random song within that year', () => {
    const songsByYear = new Map<number, Song[]>([
      [1980, []],
      [1981, [createSong(1981, 1), createSong(1981, 2)]],
      [1982, [createSong(1982, 1), createSong(1982, 2), createSong(1982, 3)]],
    ])

    const selection = getRandomDecadePlaybackSelection(
      [1980, 1981, 1982],
      (year) => songsByYear.get(year),
      getSequenceRandomValue(0.75, 0.4),
    )

    expect(selection).toEqual({
      year: 1982,
      song: createSong(1982, 2),
    })
  })

  it('returns null when a decade has no playable years', () => {
    const selection = getRandomDecadePlaybackSelection(
      [1980, 1981],
      () => [],
      getSequenceRandomValue(0.1),
    )

    expect(selection).toBeNull()
  })
})
