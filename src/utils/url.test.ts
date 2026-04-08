import { describe, expect, it } from 'vitest'
import {
  getAbsoluteUrl,
  getDecadePath,
  getHomePath,
  getOpenGraphImageMeta,
  getYearPath,
} from './url'

describe('url helpers', () => {
  it('builds trailing-slash app paths', () => {
    expect(getHomePath()).toBe('/')
    expect(getDecadePath('1980s')).toBe('/au/1980s/')
    expect(getYearPath(2024)).toBe('/au/2024/')
  })

  it('builds absolute urls without double slashes', () => {
    expect(getAbsoluteUrl('https://flashbackcharts.com/', '/au/2024/')).toBe(
      'https://flashbackcharts.com/au/2024/',
    )
  })

  it('returns robust social image tags', () => {
    expect(
      getOpenGraphImageMeta(
        'https://flashbackcharts.com/og/au/home.jpg',
        'Home social preview',
      ),
    ).toEqual(
      expect.arrayContaining([
        {
          property: 'og:image',
          content: 'https://flashbackcharts.com/og/au/home.jpg',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          name: 'twitter:image:alt',
          content: 'Home social preview',
        },
      ]),
    )
  })
})
