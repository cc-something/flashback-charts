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
const outDir = resolve(projectRoot, 'public/og')

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

const fontImport = (theme: DecadeTheme) => `@import url('${theme.fontUrl}');`

const sharedStyles = (theme: DecadeTheme) => `
  ${fontImport(theme)}
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

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
  return `<!DOCTYPE html>
<html><head><style>
  ${sharedStyles(theme)}

  body {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .logo-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 72px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: ${theme.colors.text};
    margin-bottom: 12px;
  }

  h1 span {
    color: ${theme.colors.primary};
  }

  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 26px;
    color: ${theme.colors.textMuted};
    margin-bottom: 32px;
    font-weight: 400;
  }

  .year-range {
    font-family: 'Inter', sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 10px 28px;
    background: ${theme.colors.surface};
    border-radius: 999px;
    font-size: 20px;
    color: ${theme.colors.primary};
    font-weight: 500;
    border: 1px solid ${theme.colors.primary}33;
  }

  .year-range .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${theme.colors.accent};
  }
</style></head><body>
  <div class="logo-icon">💿</div>
  <h1>Flashback <span>Charts</span></h1>
  <p class="subtitle">Australia's Top 10 Songs — Every Year</p>
  <div class="year-range">
    <span>1940</span>
    <span class="dot"></span>
    <span>2025</span>
  </div>
  <div class="accent-bar"></div>
  <div class="grain"></div>
</body></html>`
}

// ── Decade template ──────────────────────────────────────────────────

const decadeTemplate = (decade: string) => {
  const startYear = Number.parseInt(decade, 10)
  const theme = getThemeForYear(startYear)
  const years = getAvailableYears()
    .filter((y) => getDecadeForYear(y) === decade)
    .sort((a, b) => a - b)

  const thumbnails = years.map((y) => {
    const songs = getYearData(y)
    const topSong = songs?.[0]
    const imgSrc = topSong ? toBase64DataUrl(songThumbnailPath(y, topSong)) : ''
    return {
      year: y,
      imgSrc,
      title: topSong?.title ?? '',
      artist: topSong?.artist ?? '',
    }
  })

  return `<!DOCTYPE html>
<html><head><style>
  ${sharedStyles(theme)}

  body {
    flex-direction: row;
    padding: 48px 56px;
    gap: 48px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  h1 {
    font-size: 96px;
    font-weight: 700;
    line-height: 1;
    color: ${theme.colors.primary};
    margin-bottom: 12px;
  }

  .label {
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    color: ${theme.colors.textMuted};
    margin-bottom: 24px;
    font-weight: 400;
  }

  .brand {
    margin-top: auto;
  }

  .right {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;
    align-self: center;
  }

  .thumb {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.primary}22;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thumb .year-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2px 0;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: ${theme.colors.text};
    background: ${theme.colors.background}cc;
  }
</style></head><body>
  <div class="left">
    <h1>${decade}</h1>
    <p class="label">Flashback Charts Australia</p>
    <span class="brand">flashbackcharts.com</span>
  </div>
  <div class="right">
    ${thumbnails
      .map(
        (t) => `
      <div class="thumb">
        ${t.imgSrc ? `<img src="${t.imgSrc}" alt="${t.title}" />` : ''}
        <div class="year-label">${t.year}</div>
      </div>
    `,
      )
      .join('')}
  </div>
  <div class="accent-bar"></div>
  <div class="grain"></div>
</body></html>`
}

// ── Year template ────────────────────────────────────────────────────

const yearTemplate = (year: number) => {
  const theme = getThemeForYear(year)
  const songs = getYearData(year) ?? []
  const topSongs = songs.slice(0, 5)

  return `<!DOCTYPE html>
<html><head><style>
  ${sharedStyles(theme)}

  body {
    flex-direction: row;
    padding: 48px 56px;
    gap: 40px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .year-label {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${theme.colors.accent};
    margin-bottom: 8px;
  }

  h1 {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    color: ${theme.colors.primary};
    margin-bottom: 16px;
  }

  .top-song {
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    color: ${theme.colors.text};
    line-height: 1.4;
    margin-bottom: 4px;
  }

  .top-song .artist {
    color: ${theme.colors.textMuted};
  }

  .chart-label {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: ${theme.colors.textMuted};
    margin-top: 20px;
    margin-bottom: 8px;
    opacity: 0.7;
  }

  .brand {
    margin-top: auto;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    width: 480px;
  }

  .song-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 12px;
    background: ${theme.colors.surface};
    border-radius: 10px;
    border: 1px solid ${theme.colors.primary}15;
  }

  .song-row .rank {
    font-family: ${theme.fontFamily};
    font-size: 20px;
    font-weight: 700;
    color: ${theme.colors.primary};
    min-width: 28px;
    text-align: center;
  }

  .song-row img {
    width: 52px;
    height: 52px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .song-info {
    min-width: 0;
    flex: 1;
  }

  .song-info .title {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: ${theme.colors.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .song-info .artist {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: ${theme.colors.textMuted};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style></head><body>
  <div class="left">
    <div class="year-label">Top 10 Australia</div>
    <h1>${year}</h1>
    ${
      songs[0]
        ? `
      <p class="top-song">
        #1 ${songs[0].title}<br/>
        <span class="artist">${songs[0].artist}</span>
      </p>
    `
        : ''
    }
    <span class="brand">flashbackcharts.com</span>
  </div>
  <div class="right">
    ${topSongs
      .map((song) => {
        const imgSrc = toBase64DataUrl(songThumbnailPath(year, song))
        return `
        <div class="song-row">
          <span class="rank">${song.rank}</span>
          <img src="${imgSrc}" alt="${song.title}" />
          <div class="song-info">
            <div class="title">${song.title}</div>
            <div class="artist">${song.artist}</div>
          </div>
        </div>
      `
      })
      .join('')}
  </div>
  <div class="accent-bar"></div>
  <div class="grain"></div>
</body></html>`
}

// ── Main ─────────────────────────────────────────────────────────────

const main = async () => {
  mkdirSync(outDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  })

  const screenshot = async (html: string, filename: string) => {
    const page = await context.newPage()
    await page.setContent(html, { waitUntil: 'networkidle' })
    const outPath = resolve(outDir, filename)
    await page.screenshot({ path: outPath, type: 'png' })
    await page.close()
    console.log(`  ✓ ${filename}`)
  }

  // Generate one of each for review
  console.log('Generating OG images...')

  await screenshot(homeTemplate(), 'home.png')
  await screenshot(decadeTemplate('1990s'), 'decade-1990s.png')
  await screenshot(yearTemplate(1994), 'year-1994.png')

  await browser.close()
  console.log(`\nDone! Images saved to ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
