import type { DecadeTheme } from '@/types/theme'

export const defaultBodyFontFamily =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
export const brandFontFamily = "'Space Grotesk', sans-serif"
export const brandFontUrl =
  'https://fonts.bunny.net/css2?family=Space+Grotesk:wght@400;500;700&display=swap'

const themeFontOrigin = 'https://fonts.bunny.net'
const getFontLinks = (fontUrl: string) => [
  {
    key: 'theme-font-preconnect',
    rel: 'preconnect',
    href: themeFontOrigin,
  },
  {
    key: 'theme-font-preload',
    rel: 'preload',
    href: fontUrl,
    as: 'style',
  },
  {
    key: 'theme-font-stylesheet',
    rel: 'stylesheet',
    href: fontUrl,
  },
]

export const getThemeBodyFontFamily = (theme: DecadeTheme) =>
  theme.bodyFontFamily ?? defaultBodyFontFamily

export const getThemeFontLinks = (theme: Pick<DecadeTheme, 'fontUrl'>) =>
  theme.fontUrl ? getFontLinks(theme.fontUrl) : []

export const getBrandFontLinks = () => getFontLinks(brandFontUrl)
