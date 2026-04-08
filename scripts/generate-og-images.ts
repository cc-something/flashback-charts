import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { getAvailableYears, getYearData } from '../src/data'
import { getDecadeForYear, getThemeForYear, getHomeTheme } from '../src/themes'
import type { DecadeTheme } from '../src/types/theme'
import type { Song } from '../src/types/song'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const outDir = resolve(projectRoot, 'public/og/au')

const WIDTH = 1200
const HEIGHT = 630

// ── Helpers ──────────────────────────────────────────────────────────

const toBase64DataUrl = (filePath: string): string => {
  const buf = readFileSync(filePath)
  const ext = filePath.endsWith('.webp') ? 'webp' : 'png'
  return `data:image/${ext};base64,${buf.toString('base64')}`
}

const songThumbnailPath = (year: number, song: Song): string =>
  resolve(projectRoot, `public${song.thumbnailPath}`)

// Shuffle array in-place (Fisher-Yates)
const shuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Fill `count` tiles from `sources`, no side-by-side duplicates, balanced artist representation
const fillTiles = (sources: string[], count: number): string[] => {
  if (sources.length === 0) return []
  const unique = [...new Set(sources)]
  shuffle(unique)

  const result: string[] = []
  let pool = [...unique]

  for (let i = 0; i < count; i++) {
    if (pool.length === 0) pool = shuffle([...unique])

    // Find a tile that isn't the same as the previous one
    let picked = pool[0]
    for (let j = 0; j < pool.length; j++) {
      if (result.length === 0 || pool[j] !== result[result.length - 1]) {
        picked = pool[j]
        pool.splice(j, 1)
        break
      }
    }
    // Fallback if all remaining are same as last (shouldn't happen with >1 unique)
    if (
      result.length > 0 &&
      picked === result[result.length - 1] &&
      unique.length > 1
    ) {
      pool.push(picked)
      pool = shuffle(pool)
      picked = pool.find((t) => t !== result[result.length - 1]) ?? pool[0]
      pool.splice(pool.indexOf(picked), 1)
    }
    result.push(picked)
  }
  return result
}

const fontImport = (theme: DecadeTheme) => `@import url('${theme.fontUrl}');`

const cdPngDataUrl = toBase64DataUrl(resolve(projectRoot, 'public/cd.png'))

const brandHtml = (fontSize: string) => `
  <span class="brand" style="font-size: ${fontSize}">FLASHBACK CHARTS &nbsp;.&nbsp; COM</span>
`

const sharedStyles = (theme: DecadeTheme) => `
  ${fontImport(theme)}
  @import url('https://fonts.bunny.net/css2?family=Inter:wght@400;500;600&display=swap');
  @import url('https://fonts.bunny.net/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: ${theme.fontFamily};
    display: flex;
    overflow: hidden;
    position: relative;
  }

  .brand {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${theme.colors.textMuted};
  }

  .accent-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent}, ${theme.colors.secondary});
  }

  .grain {
    position: absolute;
    inset: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    pointer-events: none;
  }
`

// ── Home template ────────────────────────────────────────────────────

const homeTemplate = () => {
  const theme = getHomeTheme()

  // Gather thumbnails from across all decades
  const allThumbs: string[] = []
  const years = getAvailableYears().sort((a, b) => a - b)
  years.forEach((y) => {
    const songs = getYearData(y) ?? []
    songs.forEach((song) => {
      try {
        allThumbs.push(toBase64DataUrl(songThumbnailPath(y, song)))
      } catch {
        /* skip missing */
      }
    })
  })

  const cols = 8
  const rows = 4
  const tiles = fillTiles(allThumbs, cols * rows)

  return `<!DOCTYPE html>
<html><head><style>
  ${sharedStyles(theme)}

  body {
    position: relative;
  }

  .mosaic {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: 0;
  }

  .mosaic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, ${theme.colors.background}fa 0%, ${theme.colors.background}ee 30%, ${theme.colors.background}cc 55%, ${theme.colors.background}aa 75%, ${theme.colors.background}99 100%);
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 56px;
    height: 100%;
    width: 100%;
    gap: 4px;
  }

  .disc {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
  }

  h1 {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    color: ${theme.colors.primary};
    white-space: nowrap;
  }

  h2 {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    color: ${theme.colors.primary};
    white-space: nowrap;
  }

  .label {
    font-family: 'Inter', sans-serif;
    font-size: 48px;
    color: ${theme.colors.text};
    font-weight: 500;
    margin-top: 12px;
  }
</style></head><body>
  <div class="mosaic">
    ${tiles.map((src) => `<img src="${src}" />`).join('')}
  </div>
  <div class="overlay"></div>
  <div class="content">
    <img class="disc" src="${cdPngDataUrl}" />
    <h1>Flashback Charts</h1>
    <h2>Australia</h2>
    <p class="label">Top 10 songs across the years</p>
  </div>
  <div class="accent-bar" style="z-index:3"></div>
  <div class="grain" style="z-index:3"></div>
</body></html>`
}

// ── Decade template ──────────────────────────────────────────────────

const decadeTemplate = (decade: string) => {
  const startYear = Number.parseInt(decade, 10)
  const theme = getThemeForYear(startYear)
  const years = getAvailableYears()
    .filter((y) => getDecadeForYear(y) === decade)
    .sort((a, b) => a - b)

  // Gather all song thumbnails for the mosaic
  const allThumbs: string[] = []
  years.forEach((y) => {
    const songs = getYearData(y) ?? []
    songs.forEach((song) => {
      try {
        allThumbs.push(toBase64DataUrl(songThumbnailPath(y, song)))
      } catch {
        /* skip missing */
      }
    })
  })

  // Fill a grid that covers 1200×630 with ~150px tiles = 8 cols × 5 rows = 40 tiles
  const cols = 8
  const rows = 4
  const tileSize = Math.ceil(WIDTH / cols)
  const tiles = fillTiles(allThumbs, cols * rows)

  return `<!DOCTYPE html>
<html><head><style>
  ${sharedStyles(theme)}

  body {
    position: relative;
  }

  .mosaic {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: 0;
  }

  .mosaic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, ${theme.colors.background}fa 0%, ${theme.colors.background}f5 20%, ${theme.colors.background}ee 35%, ${theme.colors.background}dd 50%, ${theme.colors.background}cc 65%, ${theme.colors.background}bb 78%, ${theme.colors.background}aa 90%, ${theme.colors.background}99 100%);
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 56px;
    height: 100%;
    width: 100%;
  }

  h1 {
    font-size: 140px;
    font-weight: 700;
    line-height: 1;
    color: ${theme.colors.primary};
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 0.2em;
  }

  h1 .disc {
    width: 0.75em;
    height: 0.75em;
    flex-shrink: 0;
  }

  .label {
    font-family: 'Inter', sans-serif;
    font-size: 64px;
    color: ${theme.colors.text};
    margin-bottom: 24px;
    font-weight: 500;
  }

  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #ffffff;
    margin-top: auto;
  }
</style></head><body>
  <div class="mosaic">
    ${tiles.map((src) => `<img src="${src}" />`).join('')}
  </div>
  <div class="overlay"></div>
  <div class="content">
    <h1><img class="disc" src="${cdPngDataUrl}" />${decade}</h1>
    <p class="label">Australia's Top 10 for each year</p>
    ${brandHtml('54px')}
  </div>
  <div class="accent-bar" style="z-index:3"></div>
  <div class="grain" style="z-index:3"></div>
</body></html>`
}

// ── Year template ────────────────────────────────────────────────────

const yearTemplate = (year: number) => {
  const theme = getThemeForYear(year)
  const songs = getYearData(year) ?? []

  // Gather all song thumbnails for mosaic
  const allThumbs: string[] = []
  songs.forEach((song) => {
    try {
      allThumbs.push(toBase64DataUrl(songThumbnailPath(year, song)))
    } catch {
      /* skip missing */
    }
  })

  const cols = 8
  const rows = 4
  const tiles = fillTiles(allThumbs, cols * rows)

  return `<!DOCTYPE html>
<html><head><style>
  ${sharedStyles(theme)}

  body {
    position: relative;
  }

  .mosaic {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: 0;
  }

  .mosaic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, ${theme.colors.background}fa 0%, ${theme.colors.background}f5 20%, ${theme.colors.background}ee 35%, ${theme.colors.background}dd 50%, ${theme.colors.background}cc 65%, ${theme.colors.background}bb 78%, ${theme.colors.background}aa 90%, ${theme.colors.background}99 100%);
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 56px;
    height: 100%;
    width: 100%;
  }

  h1 {
    font-size: 140px;
    font-weight: 700;
    line-height: 1;
    color: ${theme.colors.primary};
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 0.2em;
  }

  h1 .disc {
    width: 0.75em;
    height: 0.75em;
    flex-shrink: 0;
  }

  .label {
    font-family: 'Inter', sans-serif;
    font-size: 64px;
    color: ${theme.colors.text};
    font-weight: 500;
    margin-bottom: 24px;
  }

  .brand {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #ffffff;
    margin-top: auto;
  }
</style></head><body>
  <div class="mosaic">
    ${tiles.map((src) => `<img src="${src}" />`).join('')}
  </div>
  <div class="overlay"></div>
  <div class="content">
    <h1><img class="disc" src="${cdPngDataUrl}" />${year}</h1>
    <p class="label">Australia's Top 10 songs</p>
    ${brandHtml('54px')}
  </div>
  <div class="accent-bar" style="z-index:3"></div>
  <div class="grain" style="z-index:3"></div>
</body></html>`
}

// ── Main ─────────────────────────────────────────────────────────────

const main = async () => {
  mkdirSync(outDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  })

  const screenshot = async (html: string, filename: string) => {
    const page = await context.newPage()
    await page.setContent(html, { waitUntil: 'networkidle' })
    const outPath = resolve(outDir, filename)
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 85 })
    await page.close()
    console.log(`  ✓ ${filename}`)
  }

  // Generate home
  console.log('Generating OG images...')
  await screenshot(homeTemplate(), 'home.jpg')

  // Generate all decades + one sample year per decade
  const decades = [
    '1940s',
    '1950s',
    '1960s',
    '1970s',
    '1980s',
    '1990s',
    '2000s',
    '2010s',
    '2020s',
  ]
  const allYears = getAvailableYears().sort((a, b) => a - b)

  for (const d of decades) {
    await screenshot(decadeTemplate(d), `decade-${d}.jpg`)
  }

  for (const y of allYears) {
    await screenshot(yearTemplate(y), `year-${y}.jpg`)
  }

  await browser.close()
  console.log(`\nDone! Images saved to ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
