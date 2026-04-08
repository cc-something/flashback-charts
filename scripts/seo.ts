import {
  getAvailableDecades,
  getDecadePageDescription,
  getDecadePageSubtitle,
  getDecadePageTitle,
  getHomePageDescription,
  getHomePageSubtitle,
  getHomePageTitle,
  getYearPageDescription,
  getYearSummaryText,
} from '@/content/chartContent'
import { getAvailableYears } from '@/data'
import { getDecadePath, getHomePath, getYearPath } from '@/utils/url'

export type SeoPage = {
  path: string
  title: string
  description: string
  imagePath: string
  llmText: string
  kind: 'home' | 'decade' | 'year'
}

export type SitemapEntry = {
  loc: string
  priority: string
  changefreq: string
}

const getSortedYears = () =>
  getAvailableYears().sort((firstYear, secondYear) => firstYear - secondYear)

const getSortedDecades = () => getAvailableDecades().sort()

export const getSeoPages = (): SeoPage[] => [
  {
    kind: 'home',
    path: getHomePath(),
    title: getHomePageTitle(),
    description: getHomePageDescription(),
    imagePath: '/og/au/home.jpg',
    llmText: getHomePageSubtitle(),
  },
  ...getSortedDecades().map((decade) => ({
    kind: 'decade' as const,
    path: getDecadePath(decade),
    title: getDecadePageTitle(decade),
    description: getDecadePageDescription(decade),
    imagePath: `/og/au/decade-${decade}.jpg`,
    llmText: getDecadePageSubtitle(decade),
  })),
  ...getSortedYears().map((year) => ({
    kind: 'year' as const,
    path: getYearPath(year),
    title: `Top 10 Songs in Australia in ${year} | Flashback Charts`,
    description: getYearPageDescription(year),
    imagePath: `/og/au/year-${year}.jpg`,
    llmText: getYearSummaryText(year),
  })),
]

export const getSitemapEntries = (siteUrl: string): SitemapEntry[] =>
  getSeoPages().map((page) => ({
    loc: `${siteUrl}${page.path}`,
    priority:
      page.kind === 'home' ? '1.0' : page.kind === 'decade' ? '0.9' : '0.8',
    changefreq:
      page.kind === 'home'
        ? 'weekly'
        : page.kind === 'decade'
          ? 'monthly'
          : 'yearly',
  }))
