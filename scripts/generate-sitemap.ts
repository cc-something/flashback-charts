import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { getAvailableYears } from '../src/data'
import { getDecadeForYear } from '../src/themes'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const distDir = resolve(projectRoot, 'dist')
const env = loadEnv(process.env.NODE_ENV ?? 'production', projectRoot, 'VITE_')
const rawSiteUrl = process.env.VITE_SITE_URL ?? env.VITE_SITE_URL
if (!rawSiteUrl)
  throw new Error('VITE_SITE_URL is required to generate sitemap.xml')
const siteUrl = rawSiteUrl.replace(/\/$/, '')
if (siteUrl === 'https://example.com')
  throw new Error('VITE_SITE_URL must be a real production URL')
const today = new Date().toISOString().slice(0, 10)

const years = getAvailableYears().sort((a, b) => a - b)
const decades = [...new Set(years.map((year) => getDecadeForYear(year)))].sort()

const urls = [
  { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
  ...decades.map((decade) => ({
    loc: `${siteUrl}/au/${decade}/`,
    priority: '0.9',
    changefreq: 'monthly',
  })),
  ...years.map((year) => ({
    loc: `${siteUrl}/au/${year}/`,
    priority: '0.8',
    changefreq: 'yearly',
  })),
]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority, changefreq }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, 'sitemap.xml'), sitemapXml)
writeFileSync(resolve(distDir, 'robots.txt'), robotsTxt)

console.log(`Generated sitemap.xml (${urls.length} urls) and robots.txt`)
