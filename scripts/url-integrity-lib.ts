import { getYearData, getYearSource } from '@/data'
import type { Song } from '@/types/song'
import { socialLinks } from '@/constants/externalLinks'
import type { IntegritySelection } from './integrity-selection'

export type UrlIntegrityTargetKind = 'global' | 'year-source' | 'youtube'
export type UrlIntegrityResultReason =
  | 'http-ok'
  | 'http-error'
  | 'network-error'
  | 'timeout'
  | 'video-exists'
  | 'video-missing'
  | 'video-invalid'
  | 'probe-ambiguous'

export interface UrlIntegrityTargetReference {
  label: string
}

export interface HttpIntegrityTarget {
  kind: 'global' | 'year-source'
  id: string
  url: string
  references: UrlIntegrityTargetReference[]
}

export interface YoutubeIntegrityTarget {
  kind: 'youtube'
  id: string
  url: string
  videoId: string
  references: UrlIntegrityTargetReference[]
}

export type UrlIntegrityTarget = HttpIntegrityTarget | YoutubeIntegrityTarget

export interface UrlIntegrityResult {
  attempts: number
  finalUrl: string | null
  id: string
  kind: UrlIntegrityTargetKind
  message: string
  reason: UrlIntegrityResultReason
  references: UrlIntegrityTargetReference[]
  status: 'passed' | 'failed'
  statusCode: number | null
  url: string
}

interface FetchWithTimeoutOptions {
  fetchImpl?: typeof fetch
  headers?: HeadersInit
  timeoutMs?: number
}

interface UrlIntegrityCheckOptions extends FetchWithTimeoutOptions {
  retryCount?: number
}

const youtubeVideoIdPattern = /^[\w-]{11}$/u
const defaultRetryCount = 2
const defaultTimeoutMs = 15_000
const timeoutErrorName = 'TimeoutError'
const youtubeOembedOrigin = 'https://www.youtube.com/oembed'
const youtubeWatchOrigin = 'https://www.youtube.com/watch'
const removedVideoPatterns = [
  /video unavailable/iu,
  /this video (?:is )?unavailable/iu,
  /this video has been removed/iu,
  /watch on the latest version of youtube/iu,
]
const browserLikeHeaders = {
  'accept':
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'accept-language': 'en-AU,en;q=0.9',
  'cache-control': 'no-cache',
  'pragma': 'no-cache',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'none',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
} as const

const createReference = (label: string): UrlIntegrityTargetReference => ({
  label,
})

const addReference = (
  references: UrlIntegrityTargetReference[],
  label: string,
) => {
  if (references.some((reference) => reference.label === label)) return
  references.push(createReference(label))
}

const getSongReferenceLabel = (year: number, song: Song) =>
  `${year} #${song.rank} ${song.title}`

export const getYoutubeWatchUrl = (videoId: string) =>
  `${youtubeWatchOrigin}?v=${videoId}`

export const collectUrlIntegrityTargets = ({
  years,
}: IntegritySelection): UrlIntegrityTarget[] => {
  const targetsByKey = new Map<string, UrlIntegrityTarget>()

  const setHttpTarget = (
    kind: HttpIntegrityTarget['kind'],
    id: string,
    url: string,
    referenceLabel: string,
  ) => {
    const key = `${kind}:${url}`
    const existingTarget = targetsByKey.get(key)
    if (existingTarget?.kind === kind) {
      addReference(existingTarget.references, referenceLabel)
      return
    }
    targetsByKey.set(key, {
      kind,
      id,
      url,
      references: [createReference(referenceLabel)],
    })
  }

  const setYoutubeTarget = (
    videoId: string,
    song: Song,
    year: number,
    referenceLabel: string,
  ) => {
    const key = `youtube:${videoId}`
    const existingTarget = targetsByKey.get(key)
    if (existingTarget?.kind === 'youtube') {
      addReference(existingTarget.references, referenceLabel)
      return
    }
    targetsByKey.set(key, {
      kind: 'youtube',
      id: `${year}-${song.rank}-${videoId}`,
      url: getYoutubeWatchUrl(videoId),
      videoId,
      references: [createReference(referenceLabel)],
    })
  }

  for (const year of years) {
    const yearSource = getYearSource(year)
    if (yearSource?.url)
      setHttpTarget(
        'year-source',
        `year-source-${year}`,
        yearSource.url,
        `year:${year}`,
      )

    for (const song of getYearData(year) ?? []) {
      if (!song.youtubeVideoId) continue
      setYoutubeTarget(
        song.youtubeVideoId,
        song,
        year,
        getSongReferenceLabel(year, song),
      )
    }
  }

  for (const socialLink of socialLinks)
    setHttpTarget(
      'global',
      `global-social-${socialLink.network}`,
      socialLink.href,
      `global:social:${socialLink.network}`,
    )

  return [...targetsByKey.values()]
}

const getTimeoutError = (timeoutMs: number) => {
  const timeoutError = new Error(`Request timed out after ${timeoutMs}ms`)
  timeoutError.name = timeoutErrorName
  return timeoutError
}

const fetchWithTimeout = async (
  input: string,
  {
    fetchImpl = fetch,
    headers,
    timeoutMs = defaultTimeoutMs,
  }: FetchWithTimeoutOptions,
) => {
  const abortController = new AbortController()
  const timeoutId = setTimeout(
    () => abortController.abort(getTimeoutError(timeoutMs)),
    timeoutMs,
  )

  try {
    return await fetchImpl(input, {
      headers,
      redirect: 'follow',
      signal: abortController.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

const isRetriableStatus = (statusCode: number) =>
  statusCode === 429 || statusCode >= 500

const createResult = (
  target: UrlIntegrityTarget,
  result: Omit<UrlIntegrityResult, 'id' | 'kind' | 'references' | 'url'>,
): UrlIntegrityResult => ({
  id: target.id,
  kind: target.kind,
  references: target.references,
  url: target.url,
  ...result,
})

const getHttpProbeLabel = (usedFallbackProfile: boolean) =>
  usedFallbackProfile ? 'Fallback browser-like probe' : 'Default probe'

const getHttpFailureResult = (
  target: HttpIntegrityTarget,
  attemptCount: number,
  response: Response,
  usedFallbackProfile: boolean,
) =>
  createResult(target, {
    attempts: attemptCount,
    finalUrl: response.url || target.url,
    message: `${getHttpProbeLabel(usedFallbackProfile)} resolved with HTTP ${response.status}`,
    reason: 'http-error',
    status: 'failed',
    statusCode: response.status,
  })

const getNetworkFailureResult = (
  target: HttpIntegrityTarget,
  attemptCount: number,
  error: unknown,
) => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  const errorName = error instanceof Error ? error.name : ''
  return createResult(target, {
    attempts: attemptCount,
    finalUrl: null,
    message: errorMessage,
    reason: errorName === timeoutErrorName ? 'timeout' : 'network-error',
    status: 'failed',
    statusCode: null,
  })
}

const runHttpProbeProfile = async (
  target: HttpIntegrityTarget,
  {
    fetchImpl = fetch,
    headers,
    retryCount = defaultRetryCount,
    timeoutMs,
  }: UrlIntegrityCheckOptions,
  usedFallbackProfile: boolean,
  attemptOffset: number,
) => {
  for (let attemptIndex = 0; attemptIndex <= retryCount; attemptIndex += 1) {
    const attemptCount = attemptOffset + attemptIndex + 1
    try {
      const response = await fetchWithTimeout(target.url, {
        fetchImpl,
        headers,
        timeoutMs,
      })
      if (response.ok || (response.status >= 300 && response.status < 400))
        return createResult(target, {
          attempts: attemptCount,
          finalUrl: response.url || target.url,
          message: `${getHttpProbeLabel(usedFallbackProfile)} resolved with HTTP ${response.status}`,
          reason: 'http-ok',
          status: 'passed',
          statusCode: response.status,
        })
      if (isRetriableStatus(response.status) && attemptIndex < retryCount)
        continue
      return getHttpFailureResult(
        target,
        attemptCount,
        response,
        usedFallbackProfile,
      )
    } catch (error) {
      const errorName = error instanceof Error ? error.name : ''
      if (attemptIndex < retryCount && errorName !== timeoutErrorName) continue
      return getNetworkFailureResult(target, attemptCount, error)
    }
  }

  return createResult(target, {
    attempts: attemptOffset + retryCount + 1,
    finalUrl: null,
    message: 'HTTP integrity failed unexpectedly.',
    reason: 'network-error',
    status: 'failed',
    statusCode: null,
  })
}

export const checkHttpIntegrityTarget = async (
  target: HttpIntegrityTarget,
  options: UrlIntegrityCheckOptions = {},
): Promise<UrlIntegrityResult> => {
  const defaultProbeResult = await runHttpProbeProfile(
    target,
    options,
    false,
    0,
  )
  if (defaultProbeResult.status === 'passed') return defaultProbeResult
  if (
    defaultProbeResult.reason === 'timeout' ||
    defaultProbeResult.reason === 'network-error'
  )
    return defaultProbeResult

  return runHttpProbeProfile(
    target,
    { ...options, headers: browserLikeHeaders },
    true,
    defaultProbeResult.attempts,
  )
}

const getYoutubeOembedUrl = (videoId: string) =>
  `${youtubeOembedOrigin}?url=${encodeURIComponent(
    getYoutubeWatchUrl(videoId),
  )}&format=json`

const getYoutubeExistenceResult = (
  target: YoutubeIntegrityTarget,
  response: Response,
) => {
  if (response.ok)
    return createResult(target, {
      attempts: 1,
      finalUrl: response.url || getYoutubeOembedUrl(target.videoId),
      message: 'YouTube oEmbed resolved successfully',
      reason: 'video-exists',
      status: 'passed',
      statusCode: response.status,
    })
  if (
    response.status === 401 ||
    response.status === 403 ||
    response.status === 404
  )
    return null
  return createResult(target, {
    attempts: 1,
    finalUrl: response.url || getYoutubeOembedUrl(target.videoId),
    message: `YouTube oEmbed returned HTTP ${response.status}`,
    reason: 'probe-ambiguous',
    status: 'failed',
    statusCode: response.status,
  })
}

const getWatchPageResult = async (
  target: YoutubeIntegrityTarget,
  { fetchImpl = fetch, timeoutMs }: FetchWithTimeoutOptions,
) => {
  try {
    const response = await fetchWithTimeout(target.url, {
      fetchImpl,
      timeoutMs,
    })
    const responseText = await response.text()
    if (response.status === 404)
      return createResult(target, {
        attempts: 2,
        finalUrl: response.url || target.url,
        message: 'YouTube watch page returned HTTP 404',
        reason: 'video-missing',
        status: 'failed',
        statusCode: response.status,
      })
    if (response.ok && responseText.includes(`"videoId":"${target.videoId}"`))
      return createResult(target, {
        attempts: 2,
        finalUrl: response.url || target.url,
        message: 'YouTube watch page contains the expected video ID',
        reason: 'video-exists',
        status: 'passed',
        statusCode: response.status,
      })
    if (removedVideoPatterns.some((pattern) => pattern.test(responseText)))
      return createResult(target, {
        attempts: 2,
        finalUrl: response.url || target.url,
        message: 'YouTube watch page indicates the video is unavailable',
        reason: 'video-missing',
        status: 'failed',
        statusCode: response.status,
      })
    return createResult(target, {
      attempts: 2,
      finalUrl: response.url || target.url,
      message: `YouTube watch page probe was inconclusive with HTTP ${response.status}`,
      reason: 'probe-ambiguous',
      status: 'failed',
      statusCode: response.status,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorName = error instanceof Error ? error.name : ''
    return createResult(target, {
      attempts: 2,
      finalUrl: null,
      message: errorMessage,
      reason: errorName === timeoutErrorName ? 'timeout' : 'network-error',
      status: 'failed',
      statusCode: null,
    })
  }
}

export const checkYoutubeIntegrityTarget = async (
  target: YoutubeIntegrityTarget,
  { fetchImpl = fetch, timeoutMs }: UrlIntegrityCheckOptions = {},
): Promise<UrlIntegrityResult> => {
  if (!youtubeVideoIdPattern.test(target.videoId))
    return createResult(target, {
      attempts: 0,
      finalUrl: null,
      message: 'YouTube video ID is invalid',
      reason: 'video-invalid',
      status: 'failed',
      statusCode: null,
    })

  try {
    const oembedResponse = await fetchWithTimeout(
      getYoutubeOembedUrl(target.videoId),
      {
        fetchImpl,
        timeoutMs,
      },
    )
    const oembedResult = getYoutubeExistenceResult(target, oembedResponse)
    if (oembedResult) return oembedResult
    return getWatchPageResult(target, { fetchImpl, timeoutMs })
  } catch (error) {
    const errorName = error instanceof Error ? error.name : ''
    if (errorName === timeoutErrorName)
      return createResult(target, {
        attempts: 1,
        finalUrl: null,
        message: error instanceof Error ? error.message : String(error),
        reason: 'timeout',
        status: 'failed',
        statusCode: null,
      })
    return getWatchPageResult(target, { fetchImpl, timeoutMs })
  }
}

export const checkUrlIntegrityTarget = (
  target: UrlIntegrityTarget,
  options?: UrlIntegrityCheckOptions,
) =>
  target.kind === 'youtube'
    ? checkYoutubeIntegrityTarget(target, options)
    : checkHttpIntegrityTarget(target, options)
