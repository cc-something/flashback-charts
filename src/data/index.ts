import type { Song } from '@/types/song'
import songs1973, { source as source1973 } from './years/1973'

export interface YearSource {
  label: string
  url: string
}

interface YearChartData {
  songs: Song[]
  source: YearSource | null
}

const yearData: Record<number, YearChartData> = {
  1973: {
    songs: songs1973,
    source: source1973,
  },
}

export const getYearData = (year: number): Song[] | undefined =>
  yearData[year]?.songs

export const getYearSource = (year: number): YearSource | null =>
  yearData[year]?.source ?? null

export const getAvailableYears = (): number[] =>
  Object.keys(yearData).map(Number)
