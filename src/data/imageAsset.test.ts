import { describe, expect, it } from 'vitest'
import { getSongThumbnailFilename, getSongThumbnailPath } from './imageAsset'

describe('imageAsset', () => {
  it('builds deterministic thumbnail filenames', () => {
    expect(
      getSongThumbnailFilename({
        rank: 3,
        title: "You're So Vain",
      }),
    ).toBe('03-youre-so-vain.webp')
  })

  it('builds deterministic thumbnail paths', () => {
    expect(
      getSongThumbnailPath({
        year: 1973,
        rank: 8,
        title: "I'd Love You to Want Me",
      }),
    ).toBe('/images/years/1973/08-id-love-you-to-want-me.webp')
  })
})
