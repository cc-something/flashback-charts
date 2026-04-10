import type { SortOrder } from '@/stores/chart'
import type { Song } from '@/types/song'

export const getSongsForSortOrder = (songs: Song[], sortOrder: SortOrder) =>
  sortOrder === 'desc' ? [...songs].reverse() : songs
