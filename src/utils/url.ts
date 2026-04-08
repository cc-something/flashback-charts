const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')
const getVersionedImageUrl = (imageUrl: string) =>
  `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}v=${__SOCIAL_IMAGE_VERSION__}`

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
  const versionedImageUrl = getVersionedImageUrl(imageUrl)

  return [
    { property: 'og:image', content: versionedImageUrl },
    { property: 'og:image:url', content: versionedImageUrl },
    { property: 'og:image:secure_url', content: versionedImageUrl },
    { property: 'og:image:type', content: ogImageType },
    { property: 'og:image:width', content: ogImageWidth },
    { property: 'og:image:height', content: ogImageHeight },
    { property: 'og:image:alt', content: imageAlt },
    { name: 'twitter:image', content: versionedImageUrl },
    { name: 'twitter:image:src', content: versionedImageUrl },
    { name: 'twitter:image:alt', content: imageAlt },
  ]
}
