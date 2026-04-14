import type { SongEmbedIntegrity } from '@/types/song'

export const embedIntegrityRegistry: Partial<
  Record<number, Partial<Record<number, SongEmbedIntegrity>>>
> = {}

export const getSongEmbedIntegrity = (
  year: number,
  rank: number,
): SongEmbedIntegrity | undefined => embedIntegrityRegistry[year]?.[rank]
