import { describe, expect, it } from 'vitest'
import { getSongImageCandidates } from './cache-images'

const getSong = (
  imageSources: Parameters<typeof getSongImageCandidates>[0]['imageSources'],
  imageSelection: Parameters<
    typeof getSongImageCandidates
  >[0]['imageSelection'] = 'album',
) => ({
  rank: 1,
  title: 'Test Song',
  artist: 'Test Artist',
  album: 'Test Album',
  thumbnailPath: '/images/au/years/1973/01-test-song.webp',
  imageSelection,
  imageSources,
})

describe('getSongImageCandidates', () => {
  it('returns album before artist when both are available', () => {
    expect(
      getSongImageCandidates(
        getSong({
          album: 'https://example.com/album.jpg',
          artist: 'https://example.com/artist.jpg',
        }),
      ),
    ).toEqual([
      { kind: 'album', url: 'https://example.com/album.jpg' },
      { kind: 'artist', url: 'https://example.com/artist.jpg' },
    ])
  })

  it('returns artist when album is unavailable', () => {
    expect(
      getSongImageCandidates(
        getSong(
          {
            album: null,
            artist: 'https://example.com/artist.jpg',
          },
          'artist',
        ),
      ),
    ).toEqual([{ kind: 'artist', url: 'https://example.com/artist.jpg' }])
  })

  it('returns no candidates when sources are missing', () => {
    expect(
      getSongImageCandidates(getSong({ album: null, artist: null })),
    ).toEqual([])
  })
})
