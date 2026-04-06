import { groupBy } from 'lodash-es'
import { getAvailableYears, getYearData, getYearDescription } from '@/data'
import { getDecadeForYear, getThemeForYear } from '@/themes'

const years = getAvailableYears().sort(
  (firstYear, secondYear) => firstYear - secondYear,
)
const latestYear = years[years.length - 1]

const getTopSong = (year: number) => getYearData(year)?.[0] ?? null

const getDecadeStartYear = (decade: string) => Number.parseInt(decade, 10)

export const getLatestYear = () => latestYear

export const getAdjacentYears = (year: number) => {
  const yearIndex = years.indexOf(year)
  return {
    previousYear: yearIndex > 0 ? years[yearIndex - 1] : null,
    nextYear:
      yearIndex >= 0 && yearIndex < years.length - 1
        ? years[yearIndex + 1]
        : null,
  }
}

export const getNumberOneThumbnail = (year: number) =>
  getYearData(year)?.[0]?.thumbnailPath ?? null

export const getTopSongThumbnails = (year: number, limit = 4) =>
  (getYearData(year) ?? [])
    .slice(0, limit)
    .map((song) => song.thumbnailPath)
    .filter(Boolean)

export const getYearPageTitle = (year: number) =>
  `Top 10 Songs in ${year} Australia | Flashback Charts Australia`

export const getYearPageDescription = (year: number) => {
  const topSong = getTopSong(year)
  const baseDescription = `The 10 biggest hit songs in Australia in ${year}.`
  if (!topSong) return baseDescription
  return `${baseDescription} ${topSong.title} by ${topSong.artist} topped the chart.`
}

export const getYearSummaryText = (year: number) =>
  getYearDescription(year) ?? getYearPageDescription(year)

export const getDecadeYears = (decade: string) =>
  years.filter((year) => getDecadeForYear(year) === decade)

export const getAvailableDecades = () =>
  [...new Set(years.map((year) => getDecadeForYear(year)))].sort()

export const getDecadePageTitle = (decade: string) =>
  `Top 10 Songs in ${decade} Australia`

export const getDecadePageSubtitle = (decade: string) => {
  const decadeStartYear = getDecadeStartYear(decade)
  const decadeEndYear = decadeStartYear + 9
  return `Browse every yearly Australia top 10 songs chart from ${decadeStartYear} to ${decadeEndYear}.`
}

export const getDecadePageDescription = (decade: string) => {
  const decadeStartYear = getDecadeStartYear(decade)
  const decadeEndYear = decadeStartYear + 9
  return `Explore the top 10 songs in Australia for every year of the ${decade}, from ${decadeStartYear} to ${decadeEndYear}. Find the biggest hits, artists, and chart-toppers from the decade in one place.`
}

export const getDecadeSummaries = () => {
  const groupedYears = groupBy(years, (year) => getDecadeForYear(year))
  return Object.entries(groupedYears)
    .map(([decade, decadeYears]) => ({
      decade,
      years: decadeYears.map((year) => ({
        year,
        thumbnail: getNumberOneThumbnail(year),
      })),
      theme: getThemeForYear(getDecadeStartYear(decade)),
    }))
    .sort((firstDecade, secondDecade) =>
      firstDecade.decade.localeCompare(secondDecade.decade),
    )
}
