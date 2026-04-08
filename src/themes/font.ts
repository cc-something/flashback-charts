import type { DecadeTheme } from '@/types/theme'

export const defaultBodyFontFamily =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
export const brandFontFamily = "'Space Grotesk', sans-serif"
export const brandFontUrl =
  'https://fonts.bunny.net/css2?family=Space+Grotesk:wght@400;500;700&display=swap'

const themeFontOrigin = 'https://fonts.bunny.net'
const getFontLinks = (fontUrl: string, keyPrefix = 'theme-font') => [
  {
    key: `${keyPrefix}-preconnect`,
    rel: 'preconnect',
    href: themeFontOrigin,
  },
  {
    key: `${keyPrefix}-preload`,
    rel: 'preload',
    href: fontUrl,
    as: 'style',
  },
  {
    key: `${keyPrefix}-stylesheet`,
    rel: 'stylesheet',
    href: fontUrl,
  },
]

export const getThemeBodyFontFamily = (theme: DecadeTheme) =>
  theme.bodyFontFamily ?? defaultBodyFontFamily

export const getThemeFontLinks = (theme: Pick<DecadeTheme, 'fontUrl'>) =>
  theme.fontUrl ? getFontLinks(theme.fontUrl) : []

export const getBrandFontLinks = () =>
  getFontLinks(brandFontUrl, 'brand-theme-font')

export const mergeFontLinks = (
  ...fontLinkSets: Array<ReturnType<typeof getFontLinks>>
) => {
  const seenPreconnectHrefs = new Set<string>()

  return fontLinkSets.flat().filter((link) => {
    if (link.rel !== 'preconnect') return true
    if (seenPreconnectHrefs.has(link.href)) return false
    seenPreconnectHrefs.add(link.href)
    return true
  })
}
