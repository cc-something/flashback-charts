import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { getSeoPages } from './seo'
import { getYearData } from '../src/data/index'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const distDir = resolve(projectRoot, 'dist')
const env = loadEnv(process.env.NODE_ENV ?? 'production', projectRoot, 'VITE_')
const rawSiteUrl = process.env.VITE_SITE_URL ?? env.VITE_SITE_URL
if (!rawSiteUrl)
  throw new Error('VITE_SITE_URL is required to generate llms.txt')
const siteUrl = rawSiteUrl.replace(/\/$/, '')
if (siteUrl === 'https://example.com')
  throw new Error('VITE_SITE_URL must be a real production URL')

const pages = getSeoPages()
const homePage = pages.find((p) => p.kind === 'home')!
const decadePages = pages.filter((p) => p.kind === 'decade')
const yearPages = pages.filter((p) => p.kind === 'year')

const header = `# Flashback Charts

> ${homePage.llmText}

Optional: [Full chart data with song listings](${siteUrl}/llms-full.txt)

`

const homeSection = `## Home

- [${homePage.title}](${siteUrl}${homePage.path}): ${homePage.llmText}

`

const decadesSection = `## Decades

${decadePages.map((p) => `- [${p.title}](${siteUrl}${p.path}): ${p.llmText}`).join('\n')}

`

const yearsSection = `## Years

${yearPages.map((p) => `- [${p.title}](${siteUrl}${p.path}): ${p.llmText}`).join('\n')}
`

const llmsTxt = header + homeSection + decadesSection + yearsSection

const fullYearsSection = yearPages
  .map((p) => {
    const year = Number(p.path.match(/\d{4}/)?.[0])
    const songs = getYearData(year) ?? []
    const songList = songs
      .map((s) => `${s.rank}. "${s.title}" — ${s.artist}`)
      .join('\n')
    return `### ${p.title}\n\n> ${p.llmText}\n\n${songList}`
  })
  .join('\n\n')

const llmsFullTxt =
  header +
  homeSection +
  decadesSection +
  `## Years (with full chart data)\n\n` +
  fullYearsSection +
  '\n'

mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, 'llms.txt'), llmsTxt)
writeFileSync(resolve(distDir, 'llms-full.txt'), llmsFullTxt)

console.log(
  `Generated llms.txt (${yearPages.length} years, ${decadePages.length} decades) and llms-full.txt`,
)
