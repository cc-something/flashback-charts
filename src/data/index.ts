import type { Song } from '@/types/song'
import songs1973 from './years/1973'

const yearData: Record<number, Song[]> = {
  1973: songs1973,
}

export const getYearData = (year: number): Song[] | undefined => yearData[year]

export const getAvailableYears = (): number[] =>
  Object.keys(yearData).map(Number)
