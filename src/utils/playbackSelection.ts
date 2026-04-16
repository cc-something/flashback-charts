import type { Song } from '@/types/song'

type RandomValueGetter = () => number

const getRandomItem = <Item>(
  items: readonly Item[],
  getRandomValue: RandomValueGetter = Math.random,
) => {
  if (items.length === 0) return null
  const randomIndex = Math.min(
    items.length - 1,
    Math.floor(getRandomValue() * items.length),
  )

  return items[randomIndex] ?? null
}

export const getRandomDecadePlaybackSelection = (
  years: readonly number[],
  getSongsForYear: (year: number) => readonly Song[] | null | undefined,
  getRandomValue: RandomValueGetter = Math.random,
) => {
  const playableYears = years.filter(
    (year) => (getSongsForYear(year)?.length ?? 0) > 0,
  )
  const selectedYear = getRandomItem(playableYears, getRandomValue)
  if (selectedYear === null) return null
  const selectedSong = getRandomItem(
    getSongsForYear(selectedYear) ?? [],
    getRandomValue,
  )
  if (!selectedSong) return null

  return {
    year: selectedYear,
    song: selectedSong,
  }
}
