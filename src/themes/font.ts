import type { DecadeTheme } from '@/types/theme'

export const defaultBodyFontFamily =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const themeFontOrigin = 'https://fonts.bunny.net'

export const getThemeBodyFontFamily = (theme: DecadeTheme) =>
  theme.bodyFontFamily ?? defaultBodyFontFamily

export const getThemeFontLinks = (theme: DecadeTheme) => [
  {
    key: 'theme-font-preconnect',
    rel: 'preconnect',
    href: themeFontOrigin,
  },
  {
    key: 'theme-font-preload',
    rel: 'preload',
    href: theme.fontUrl,
    as: 'style',
  },
  {
    key: 'theme-font-stylesheet',
    rel: 'stylesheet',
    href: theme.fontUrl,
  },
]
