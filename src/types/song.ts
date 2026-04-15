export type SongImageSelection = 'album' | 'artist'
export type SongEmbedIntegrity = 'best-match' | 'alternative'
export type SongEmbedIntegrityReason = string

export interface SongImageSources {
  album: string | null
  artist: string | null
}

export interface Song {
  rank: number
  title: string
  artist: string
  album: string
  youtubeVideoId: string | null
  embedIntegrity?: SongEmbedIntegrity
  embedIntegrityReason?: SongEmbedIntegrityReason
  thumbnailPath: string
  imageSelection: SongImageSelection
  imageSources: SongImageSources
}
