import { describe, expect, it } from 'vitest'
import songs from './2009'

describe('2009 song mappings', () => {
  it('pins Sexy Bitch to the David Guetta upload', () => {
    const sexyBitchSong = songs.find(
      (song) =>
        song.title === 'Sexy Bitch' &&
        song.artist === 'David Guetta feat. Akon',
    )

    expect(sexyBitchSong).toBeDefined()
    expect(sexyBitchSong?.youtubeVideoId).toBe('N9hazmsUxrM')
  })
})
