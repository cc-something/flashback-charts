import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getSongThumbnailPath } from '@/data/imageAsset'
import songs, { source } from './1973'

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
      expect(song.youtubeVideoId).toMatch(/^[\w-]{11}$/)
    }
  })

  it('has a generated local thumbnail for each song', () => {
    for (const song of songs) {
      const publicFilePath = join(
        process.cwd(),
        'public',
        song.thumbnailPath.replace(/^\//, ''),
      )

      expect(existsSync(publicFilePath)).toBe(true)
    }
  })

  it('has a source link for the year', () => {
    expect(source.label).toBeTruthy()
    expect(() => new URL(source.url)).not.toThrow()
  })
})
