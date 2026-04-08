import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { getAvailableYears, getYearData } from '../src/data'
import { getHomeTheme } from '../src/themes'
import type { Song } from '../src/types/song'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const outDir = resolve(projectRoot, 'public/social/au')
const homeTheme = getHomeTheme()

const bannerPresets = [
  { filename: 'twitter-header.jpg', width: 3000, height: 1000 },
  { filename: 'facebook-cover.jpg', width: 2460, height: 936 },
  { filename: 'universal-banner.jpg', width: 2400, height: 900 },
] as const

const toBase64DataUrl = (filePath: string): string => {
  const buf = readFileSync(filePath)
  const ext = filePath.endsWith('.webp') ? 'webp' : 'png'
  return `data:image/${ext};base64,${buf.toString('base64')}`
}

const songThumbnailPath = (year: number, song: Song): string =>
  resolve(projectRoot, `public${song.thumbnailPath}`)

const shuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const fillTiles = (sources: string[], count: number): string[] => {
  if (sources.length === 0) return []
  const unique = [...new Set(sources)]
  shuffle(unique)

  const result: string[] = []
  let pool = [...unique]

  for (let i = 0; i < count; i++) {
    if (pool.length === 0) pool = shuffle([...unique])

    let picked = pool[0]
    for (let j = 0; j < pool.length; j++) {
      if (result.length === 0 || pool[j] !== result[result.length - 1]) {
        picked = pool[j]
        pool.splice(j, 1)
        break
      }
    }

    if (
      result.length > 0 &&
      picked === result[result.length - 1] &&
      unique.length > 1
    ) {
      pool.push(picked)
      pool = shuffle(pool)
      picked =
        pool.find((tile) => tile !== result[result.length - 1]) ?? pool[0]
      pool.splice(pool.indexOf(picked), 1)
    }

    result.push(picked)
  }

  return result
}

const collectAllThumbs = (): string[] => {
  const allThumbs: string[] = []
  const years = getAvailableYears().sort((a, b) => a - b)

  years.forEach((year) => {
    const songs = getYearData(year) ?? []
    songs.forEach((song) => {
      try {
        allThumbs.push(toBase64DataUrl(songThumbnailPath(year, song)))
      } catch {
        /* skip missing */
      }
    })
  })

  return allThumbs
}

const getGridSize = (width: number, height: number) => ({
  cols: Math.max(8, Math.ceil(width / 220)),
  rows: Math.max(4, Math.ceil(height / 220)),
})

const buildBannerHtml = (
  width: number,
  height: number,
  allThumbs: string[],
): string => {
  const { cols, rows } = getGridSize(width, height)
  const tiles = fillTiles(allThumbs, cols * rows)

  return `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    position: relative;
    background: ${homeTheme.colors.background};
  }

  .mosaic {
    position: absolute;
    inset: -2%;
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    transform: scale(1.04);
    transform-origin: center;
  }

  .mosaic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(0.96) contrast(1.02);
  }

  .wash {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, ${homeTheme.colors.background}cc 0%, transparent 28%, transparent 72%, ${homeTheme.colors.background}bf 100%),
      radial-gradient(circle at center, transparent 0%, transparent 45%, ${homeTheme.colors.background}73 100%),
      linear-gradient(180deg, ${homeTheme.colors.background}66 0%, transparent 22%, transparent 78%, ${homeTheme.colors.background}80 100%);
    mix-blend-mode: normal;
  }

  .grain {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
</style></head><body>
  <div class="mosaic">
    ${tiles.map((src) => `<img src="${src}" />`).join('')}
  </div>
  <div class="wash"></div>
  <div class="grain"></div>
</body></html>`
}

const main = async () => {
  mkdirSync(outDir, { recursive: true })

  const allThumbs = collectAllThumbs()
  if (allThumbs.length === 0)
    throw new Error('No thumbnails available for banner generation')

  const browser = await chromium.launch()

  for (const preset of bannerPresets) {
    const context = await browser.newContext({
      viewport: { width: preset.width, height: preset.height },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    await page.setContent(
      buildBannerHtml(preset.width, preset.height, allThumbs),
      { waitUntil: 'networkidle' },
    )
    await page.screenshot({
      path: resolve(outDir, preset.filename),
      type: 'jpeg',
      quality: 90,
    })
    await page.close()
    await context.close()
    console.log(`  ✓ ${preset.filename}`)
  }

  await browser.close()
  console.log(`\nDone! Banners saved to ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
