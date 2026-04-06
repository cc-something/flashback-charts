import { groupBy } from 'lodash-es'
import { getAvailableYears, getYearData } from '@/data'
import { getDecadeForYear, getThemeForYear } from '@/themes'

const years = getAvailableYears().sort(
  (firstYear, secondYear) => firstYear - secondYear,
)
const latestYear = years[years.length - 1]

const getTopSong = (year: number) => getYearData(year)?.[0] ?? null

const getDecadeStartYear = (decade: string) => Number.parseInt(decade, 10)

export const getLatestYear = () => latestYear

export const getNumberOneThumbnail = (year: number) =>
  getYearData(year)?.[0]?.thumbnailPath ?? null

export const getYearPageTitle = (year: number) =>
  `Australia Top 10 Songs ${year} | Flashback Charts Australia`

export const getYearPageDescription = (year: number) => {
  const topSong = getTopSong(year)
  const baseDescription = `The 10 biggest hit songs in Australia in ${year}.`
  if (!topSong) return baseDescription
  return `${baseDescription} ${topSong.title} by ${topSong.artist} topped the chart.`
}

export const getDecadeYears = (decade: string) =>
  years.filter((year) => getDecadeForYear(year) === decade)

export const getDecadePageTitle = (decade: string) =>
  `Australia Top 10 Songs of the ${decade} | Flashback Charts Australia`

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
