import { afterEach, describe, expect, it, vi } from 'vitest'
import { socialLinks } from '@/constants/externalLinks'
import { availableYears } from '@/data/availableYears'
import {
  checkHttpIntegrityTarget,
  checkYoutubeIntegrityTarget,
  collectUrlIntegrityTargets,
  getYoutubeWatchUrl,
} from './url-integrity-lib'
import { resolveIntegritySelection } from './integrity-selection'

describe('resolveIntegritySelection', () => {
  it('requires at least one selector', () => {
    expect(() => resolveIntegritySelection([])).toThrow(
      /requires at least one selector/i,
    )
  })

  it('selects all years with --all', () => {
    expect(resolveIntegritySelection(['--all']).years).toEqual(availableYears)
  })

  it('selects explicit years', () => {
    expect(resolveIntegritySelection(['--year=1940,1945,1950']).years).toEqual([
      1940, 1945, 1950,
    ])
  })

  it('ignores pnpm argument separators', () => {
    expect(resolveIntegritySelection(['--', '--year=1940']).years).toEqual([
      1940,
    ])
  })

  it('expands decades and de-duplicates merged selectors', () => {
    expect(
      resolveIntegritySelection(['--year=1940,1945', '--decade=1940']).years,
    ).toEqual([1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949])
  })

  it('supports multiple decades in a single flag', () => {
    expect(resolveIntegritySelection(['--decade=1940,1950']).years).toEqual([
      1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951,
      1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
    ])
  })

  it('rejects unknown arguments', () => {
    expect(() =>
      resolveIntegritySelection(['--year=1940', '--headed']),
    ).toThrow(/unknown argument/i)
  })

  it('rejects unavailable years', () => {
    expect(() => resolveIntegritySelection(['--year=1939'])).toThrow(
      /unavailable/i,
    )
  })

  it('rejects invalid decade values', () => {
    expect(() => resolveIntegritySelection(['--decade=1945'])).toThrow(
      /must start on a year ending in 0/i,
    )
  })
})

describe('collectUrlIntegrityTargets', () => {
  it('collects year sources, youtube targets, and always-on global links', () => {
    const targets = collectUrlIntegrityTargets({ years: [1940] })

    expect(targets.some((target) => target.kind === 'year-source')).toBe(true)
    expect(targets.some((target) => target.kind === 'youtube')).toBe(true)
    expect(
      socialLinks.every((socialLink) =>
        targets.some(
          (target) =>
            target.kind === 'global' && target.url === socialLink.href,
        ),
      ),
    ).toBe(true)
  })

  it('de-duplicates global links and keeps references', () => {
    const targets = collectUrlIntegrityTargets({ years: [1940, 1941] })
    const facebookTarget = targets.find(
      (target) =>
        target.kind === 'global' &&
        target.url ===
          socialLinks.find((socialLink) => socialLink.network === 'facebook')
            ?.href,
    )

    expect(facebookTarget?.references).toEqual([
      { label: 'global:social:facebook' },
    ])
  })
})

describe('checkHttpIntegrityTarget', () => {
  afterEach(() => vi.restoreAllMocks())

  it('passes on HTTP 200', async () => {
    const fetchImpl = vi.fn(async () => new Response('', { status: 200 }))

    await expect(
      checkHttpIntegrityTarget(
        {
          kind: 'global',
          id: 'global-test',
          url: 'https://example.com',
          references: [{ label: 'global:test' }],
        },
        { fetchImpl },
      ),
    ).resolves.toMatchObject({
      reason: 'http-ok',
      status: 'passed',
      statusCode: 200,
    })
  })

  it('falls back to a browser-like request profile after a hard HTTP failure', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 403 }))
      .mockResolvedValueOnce(new Response('', { status: 200 }))

    await expect(
      checkHttpIntegrityTarget(
        {
          kind: 'year-source',
          id: 'year-source-1940',
          url: 'https://example.com/1940',
          references: [{ label: 'year:1940' }],
        },
        { fetchImpl, retryCount: 0 },
      ),
    ).resolves.toMatchObject({
      attempts: 2,
      reason: 'http-ok',
      status: 'passed',
      statusCode: 200,
    })
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      'https://example.com/1940',
      expect.objectContaining({
        headers: expect.objectContaining({
          'user-agent': expect.stringContaining('Mozilla/5.0'),
        }),
      }),
    )
  })

  it('retries retriable responses and then fails', async () => {
    const fetchImpl = vi.fn(async () => new Response('', { status: 500 }))

    await expect(
      checkHttpIntegrityTarget(
        {
          kind: 'year-source',
          id: 'year-source-1940',
          url: 'https://example.com/1940',
          references: [{ label: 'year:1940' }],
        },
        { fetchImpl, retryCount: 1 },
      ),
    ).resolves.toMatchObject({
      attempts: 4,
      reason: 'http-error',
      status: 'failed',
      statusCode: 500,
    })
  })

  it('fails after fallback is exhausted', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 403 }))
      .mockResolvedValueOnce(new Response('', { status: 403 }))

    await expect(
      checkHttpIntegrityTarget(
        {
          kind: 'year-source',
          id: 'year-source-1940',
          url: 'https://example.com/1940',
          references: [{ label: 'year:1940' }],
        },
        { fetchImpl, retryCount: 0 },
      ),
    ).resolves.toMatchObject({
      attempts: 2,
      reason: 'http-error',
      status: 'failed',
      statusCode: 403,
    })
  })

  it('uses the last-resort browser probe after both fetch profiles fail', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 403 }))
      .mockResolvedValueOnce(new Response('', { status: 403 }))
    const browserProbe = vi.fn(async () => ({
      finalUrl: 'https://example.com/1940',
      message: 'Last-resort browser probe resolved with HTTP 200',
      status: 'passed' as const,
      statusCode: 200,
    }))

    await expect(
      checkHttpIntegrityTarget(
        {
          kind: 'year-source',
          id: 'year-source-1940',
          url: 'https://example.com/1940',
          references: [{ label: 'year:1940' }],
        },
        { browserProbe, fetchImpl, retryCount: 0 },
      ),
    ).resolves.toMatchObject({
      attempts: 3,
      reason: 'http-ok',
      status: 'passed',
      statusCode: 200,
    })
    expect(browserProbe).toHaveBeenCalledWith(
      'https://example.com/1940',
      undefined,
    )
  })

  it('fails on network errors', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('socket hang up')
    })

    await expect(
      checkHttpIntegrityTarget(
        {
          kind: 'global',
          id: 'global-test',
          url: 'https://example.com',
          references: [{ label: 'global:test' }],
        },
        { fetchImpl, retryCount: 0 },
      ),
    ).resolves.toMatchObject({
      reason: 'network-error',
      status: 'failed',
      statusCode: null,
    })
  })
})

describe('checkYoutubeIntegrityTarget', () => {
  afterEach(() => vi.restoreAllMocks())

  it('passes when oEmbed resolves', async () => {
    const fetchImpl = vi.fn(async () => new Response('{}', { status: 200 }))

    await expect(
      checkYoutubeIntegrityTarget(
        {
          kind: 'youtube',
          id: 'youtube-test',
          url: getYoutubeWatchUrl('dQw4w9WgXcQ'),
          videoId: 'dQw4w9WgXcQ',
          references: [{ label: '1987 #1 Never Gonna Give You Up' }],
        },
        { fetchImpl },
      ),
    ).resolves.toMatchObject({
      reason: 'video-exists',
      status: 'passed',
      statusCode: 200,
    })
  })

  it('falls back to the watch page when oEmbed says unavailable and passes on videoId match', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 404 }))
      .mockResolvedValueOnce(
        new Response('{"videoDetails":{"videoId":"dQw4w9WgXcQ"}}', {
          status: 200,
        }),
      )

    await expect(
      checkYoutubeIntegrityTarget(
        {
          kind: 'youtube',
          id: 'youtube-test',
          url: getYoutubeWatchUrl('dQw4w9WgXcQ'),
          videoId: 'dQw4w9WgXcQ',
          references: [{ label: '1987 #1 Never Gonna Give You Up' }],
        },
        { fetchImpl },
      ),
    ).resolves.toMatchObject({
      attempts: 2,
      reason: 'video-exists',
      status: 'passed',
      statusCode: 200,
    })
  })

  it('fails malformed video ids without a request', async () => {
    const fetchImpl = vi.fn()

    await expect(
      checkYoutubeIntegrityTarget(
        {
          kind: 'youtube',
          id: 'youtube-test',
          url: getYoutubeWatchUrl('bad-id'),
          videoId: 'bad-id',
          references: [{ label: 'test' }],
        },
        { fetchImpl },
      ),
    ).resolves.toMatchObject({
      attempts: 0,
      reason: 'video-invalid',
      status: 'failed',
    })
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('fails when the watch page says the video is unavailable', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status: 404 }))
      .mockResolvedValueOnce(new Response('Video unavailable', { status: 200 }))

    await expect(
      checkYoutubeIntegrityTarget(
        {
          kind: 'youtube',
          id: 'youtube-test',
          url: getYoutubeWatchUrl('dQw4w9WgXcQ'),
          videoId: 'dQw4w9WgXcQ',
          references: [{ label: 'test' }],
        },
        { fetchImpl },
      ),
    ).resolves.toMatchObject({
      attempts: 2,
      reason: 'video-missing',
      status: 'failed',
    })
  })
})
