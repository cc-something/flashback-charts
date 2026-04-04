import { describe, expect, it } from 'vitest'
import { getSongThumbnailPath } from '@/data/imageAsset'
import songs from './1973'

const year = 1973

describe('1973 image metadata', () => {
  it('keeps local thumbnail paths deterministic', () => {
    const thumbnailPaths = new Set<string>()

    for (const song of songs) {
      expect(song.thumbnailPath).toBe(
        getSongThumbnailPath({
          year,
          rank: song.rank,
          title: song.title,
        }),
      )
      expect(song.thumbnailPath.startsWith('/images/years/1973/')).toBe(true)
      expect(song.thumbnailPath.endsWith('.webp')).toBe(true)
      thumbnailPaths.add(song.thumbnailPath)
    }

    expect(thumbnailPaths.size).toBe(songs.length)
  })

  it('has at least one remote source per song and a valid selection', () => {
    for (const song of songs) {
      expect(song.imageSources.album || song.imageSources.artist).toBeTruthy()
      expect(song.imageSources[song.imageSelection]).toBeTruthy()
    }
  })
})
