import { describe, expect, it } from 'vitest'
import {
  getAbsoluteUrl,
  getDecadePath,
  getGlobalHomePath,
  getHomePath,
  getIsDevHostname,
  getOpenGraphImageMeta,
  getYearPath,
} from './url'

describe('url helpers', () => {
  it('builds trailing-slash app paths', () => {
    expect(getGlobalHomePath()).toBe('/')
    expect(getHomePath()).toBe('/au/')
    expect(getDecadePath('1980s')).toBe('/au/1980s/')
    expect(getYearPath(2024)).toBe('/au/2024/')
  })

  it('builds absolute urls without double slashes', () => {
    expect(getAbsoluteUrl('https://flashbackcharts.com/', '/au/2024/')).toBe(
      'https://flashbackcharts.com/au/2024/',
    )
  })

  it('treats local and ngrok hosts as dev hosts', () => {
    expect(getIsDevHostname('localhost')).toBe(true)
    expect(getIsDevHostname('127.0.0.1')).toBe(true)
    expect(getIsDevHostname('168a-79-127-155-71.ngrok-free.app')).toBe(true)
    expect(getIsDevHostname('flashbackcharts.com')).toBe(false)
    expect(getIsDevHostname(undefined)).toBe(false)
  })

  it('returns robust social image tags', () => {
    const meta = getOpenGraphImageMeta(
      'https://flashbackcharts.com/og/au/home.jpg',
      'Home social preview',
    )

    expect(meta).toEqual(
      expect.arrayContaining([
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
    expect(meta).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          property: 'og:image',
          content: expect.stringMatching(
            /^https:\/\/flashbackcharts\.com\/og\/au\/home\.jpg\?v=/u,
          ),
        }),
        expect.objectContaining({
          name: 'twitter:image:src',
          content: expect.stringMatching(
            /^https:\/\/flashbackcharts\.com\/og\/au\/home\.jpg\?v=/u,
          ),
        }),
      ]),
    )
  })
})
