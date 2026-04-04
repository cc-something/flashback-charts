export type SongImageSelection = 'album' | 'artist'

export interface SongImageSources {
  album: string | null
  artist: string | null
}

export interface Song {
  rank: number
  title: string
  artist: string
  album: string
  thumbnailPath: string
  imageSelection: SongImageSelection
  imageSources: SongImageSources
}
