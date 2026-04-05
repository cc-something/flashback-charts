import { access, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { getAvailableYears, getYearData } from '../src/data/index.ts'
import type { Song, SongImageSelection } from '../src/types/song.ts'

interface SongImageCandidate {
  kind: SongImageSelection
  url: string
}

const outputSize = 160
const outputQuality = 76
const publicDirName = 'public'
const maxFetchAttempts = 4
const baseRetryDelayMs = 1500

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const getSongImageCandidates = (song: Song): SongImageCandidate[] =>
  [
    song.imageSources.album
      ? { kind: 'album', url: song.imageSources.album }
      : null,
    song.imageSources.artist
      ? { kind: 'artist', url: song.imageSources.artist }
      : null,
  ].filter((candidate): candidate is SongImageCandidate => candidate !== null)

const getOutputFilePath = (song: Song) =>
  join(process.cwd(), publicDirName, song.thumbnailPath.replace(/^\//, ''))

const getRetryDelayMs = (response: Response | null, attempt: number) => {
  const retryAfterHeader = response?.headers.get('retry-after')
  const retryAfterSeconds = retryAfterHeader
    ? Number.parseInt(retryAfterHeader, 10)
    : Number.NaN

  if (Number.isInteger(retryAfterSeconds) && retryAfterSeconds > 0)
    return retryAfterSeconds * 1000

  return baseRetryDelayMs * 2 ** attempt
}

const shouldRetryResponse = (response: Response) =>
  response.status === 429 || response.status >= 500

const fetchImageBuffer = async (url: string) => {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxFetchAttempts; attempt += 1) {
    let response: Response | null = null

    try {
      response = await fetch(url, {
        headers: {
          'user-agent': 'flashback-charts-image-cache/1.0',
        },
      })

      if (!response.ok) {
        if (shouldRetryResponse(response) && attempt < maxFetchAttempts - 1) {
          await sleep(getRetryDelayMs(response, attempt))
          continue
        }

        throw new Error(`Request failed with ${response.status}`)
      }

      return Buffer.from(await response.arrayBuffer())
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt >= maxFetchAttempts - 1) break
      await sleep(getRetryDelayMs(response, attempt))
    }
  }

  throw lastError || new Error('Unknown image fetch failure')
}

const writeOptimizedImage = async (song: Song, buffer: Buffer) => {
  const outputFilePath = getOutputFilePath(song)
  await mkdir(dirname(outputFilePath), { recursive: true })

  await sharp(buffer)
    .rotate()
    .resize(outputSize, outputSize, {
      fit: 'cover',
      position: sharp.strategy.attention,
    })
    .webp({ quality: outputQuality })
    .toFile(outputFilePath)
}

const hasCachedImage = async (song: Song) => {
  try {
    await access(getOutputFilePath(song))
    return true
  } catch {
    return false
  }
}

const cacheSongImage = async (year: number, song: Song) => {
  if (await hasCachedImage(song)) {
    console.log(
      `cached ${year} #${song.rank} ${song.title} -> ${song.thumbnailPath} (existing)`,
    )
    return
  }

  const imageCandidates = getSongImageCandidates(song)
  if (!imageCandidates.length)
    throw new Error(`Missing image sources for ${year} #${song.rank}`)

  let selectedCandidate: SongImageCandidate | null = null
  let lastError: Error | null = null

  for (const imageCandidate of imageCandidates) {
    try {
      const imageBuffer = await fetchImageBuffer(imageCandidate.url)
      await writeOptimizedImage(song, imageBuffer)
      selectedCandidate = imageCandidate
      break
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
    }
  }

  if (!selectedCandidate)
    throw new Error(
      `Unable to cache ${year} #${song.rank}: ${lastError?.message || 'Unknown error'}`,
    )

  if (selectedCandidate.kind !== song.imageSelection)
    throw new Error(
      `Image selection mismatch for ${year} #${song.rank}: cached ${selectedCandidate.kind}, expected ${song.imageSelection}`,
    )

  console.log(
    `cached ${year} #${song.rank} ${song.title} -> ${song.thumbnailPath} (${selectedCandidate.kind})`,
  )
}

const parseYears = () => {
  const providedYears = process.argv
    .slice(2)
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isInteger(value))

  return providedYears.length ? providedYears : getAvailableYears()
}

export const cacheImages = async () => {
  for (const year of parseYears()) {
    const songs = getYearData(year)
    if (!songs?.length) throw new Error(`No chart data found for ${year}`)
    for (const song of songs) await cacheSongImage(year, song)
  }
}

const runCacheImages = async () => {
  try {
    await cacheImages()
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  void runCacheImages()
