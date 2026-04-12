import { describe, expect, it } from 'vitest'
import type { Song } from '@/types/song'
import { getSongsForSortOrder } from '@/utils/chartOrder'

const createSong = (rank: number): Song => ({
  rank,
  title: `Song ${rank}`,
  artist: `Artist ${rank}`,
  album: `Album ${rank}`,
  youtubeVideoId: `video-${rank}`,
  thumbnailPath: `/images/${rank}.webp`,
  imageSelection: 'album',
  imageSources: {
    album: null,
    artist: null,
  },
})

describe('getSongsForSortOrder', () => {
  it('returns songs unchanged for ascending order', () => {
    const songs = [createSong(1), createSong(2), createSong(3)]

    expect(getSongsForSortOrder(songs, 'asc')).toEqual(songs)
  })

  it('returns a reversed copy for descending order', () => {
    const songs = [createSong(1), createSong(2), createSong(3)]

    expect(getSongsForSortOrder(songs, 'desc')).toEqual([
      createSong(3),
      createSong(2),
      createSong(1),
    ])
    expect(songs).toEqual([createSong(1), createSong(2), createSong(3)])
  })
})
