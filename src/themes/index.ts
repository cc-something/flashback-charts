import type { DecadeTheme } from '@/types/theme'
import theme1940s from './decades/1940s'
import theme1950s from './decades/1950s'
import theme1960s from './decades/1960s'
import theme1970s from './decades/1970s'
import theme1980s from './decades/1980s'
import theme1990s from './decades/1990s'
import theme2000s from './decades/2000s'
import theme2010s from './decades/2010s'
import theme2020s from './decades/2020s'

const decadeThemes: Record<string, DecadeTheme> = {
  '1940s': theme1940s,
  '1950s': theme1950s,
  '1960s': theme1960s,
  '1970s': theme1970s,
  '1980s': theme1980s,
  '1990s': theme1990s,
  '2000s': theme2000s,
  '2010s': theme2010s,
  '2020s': theme2020s,
}

export const getDecadeForYear = (year: number): string => {
  const decade = Math.floor(year / 10) * 10
  return `${decade}s`
}

export const getThemeForYear = (year: number): DecadeTheme => {
  const decade = getDecadeForYear(year)
  return decadeThemes[decade] ?? theme1970s
}
