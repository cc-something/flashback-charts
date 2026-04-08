const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const ogImageWidth = '1200'
const ogImageHeight = '630'
const ogImageType = 'image/jpeg'

export const getHomePath = () => '/'

export const getDecadePath = (decade: string) => `/au/${decade}/`

export const getYearPath = (year: number | string) => `/au/${year}/`

export const getAbsoluteUrl = (siteUrl: string | undefined, path: string) => {
  if (!siteUrl) return undefined
  return `${trimTrailingSlash(siteUrl)}${path}`
}

export const getOpenGraphImageMeta = (
  imageUrl: string | undefined,
  imageAlt: string,
) => {
  if (!imageUrl) return []

  return [
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:url', content: imageUrl },
    { property: 'og:image:secure_url', content: imageUrl },
    { property: 'og:image:type', content: ogImageType },
    { property: 'og:image:width', content: ogImageWidth },
    { property: 'og:image:height', content: ogImageHeight },
    { property: 'og:image:alt', content: imageAlt },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: imageAlt },
  ]
}
