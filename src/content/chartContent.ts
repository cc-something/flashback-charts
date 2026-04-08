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

export const getHomePageTitle = () =>
  `Australia Top 10 Songs by Year (1940-${latestYear}) | Flashback Charts`

export const getHomePageDescription = () =>
  `Browse Australia's top 10 songs for every year from 1940 to ${latestYear}. Explore year-end charts, decade overviews, chart-toppers, and the biggest hits in one archive.`

export const getHomePageSubtitle = () =>
  `Nearly 100 years of Australian music charts: #1s and Top 10s from today's hits back through 2000s pop, grunge, synth-pop, disco, and the rock'n'roll era.`

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

export const getDecadeSongThumbnails = (decade: string) =>
  getDecadeYears(decade).flatMap((year) =>
    (getYearData(year) ?? []).map((song) => song.thumbnailPath).filter(Boolean),
  )

export const getHomeBackgroundThumbnails = () =>
  years.map((year) => getNumberOneThumbnail(year)).filter(Boolean)

export const getYearPageTitle = (year: number) =>
  `Top 10 Songs in Australia in ${year} | Flashback Charts`

export const getYearPageHeading = (year: number) =>
  `Top 10 Songs in Australia in ${year}`

export const getYearPageDescription = (year: number) => {
  const topSong = getTopSong(year)
  if (!topSong)
    return `Browse Australia's top 10 songs of ${year}, with the full year-end chart and biggest hits in one place.`
  return `Browse Australia's top 10 songs of ${year}, including #1 ${topSong.title} by ${topSong.artist}. Explore the full year-end chart, artists, and videos.`
}

export const getYearSummaryText = (year: number) =>
  getYearDescription(year) ?? getYearPageDescription(year)

export const getDecadeYears = (decade: string) =>
  years.filter((year) => getDecadeForYear(year) === decade)

export const getAvailableDecades = () =>
  [...new Set(years.map((year) => getDecadeForYear(year)))].sort()

export const getDecadePageTitle = (decade: string) =>
  `Top 10 Songs in Australia in the ${decade} | Flashback Charts`

export const getDecadePageSubtitle = (decade: string) => {
  const decadeStartYear = getDecadeStartYear(decade)
  const decadeEndYear = decadeStartYear + 9
  return `Browse every yearly Australia top 10 songs chart from ${decadeStartYear} to ${decadeEndYear}.`
}

export const getDecadePageDescription = (decade: string) => {
  const decadeStartYear = getDecadeStartYear(decade)
  const decadeEndYear = decadeStartYear + 9
  return `Browse every annual Australian top 10 songs chart from ${decadeStartYear} to ${decadeEndYear}. Explore chart-toppers, biggest hits, and year-by-year music trends from the ${decade}.`
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
