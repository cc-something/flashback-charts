import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSitemapEntries, getSeoPages, type SeoPage } from './seo'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const publicDir = resolve(projectRoot, 'public')
const pages = getSeoPages()
const sitemapPaths = new Set(
  getSitemapEntries('https://flashbackcharts.com').map(({ loc }) =>
    loc.replace('https://flashbackcharts.com', ''),
  ),
)
const failures: string[] = []
const disallowedTextPattern =
  /\b(todo|tbd|placeholder|lorem ipsum|coming soon|fixme)\b/i

const addFailure = (message: string) => failures.push(message)

const validateText = (
  label: string,
  value: string,
  seoPage: SeoPage,
  minLength: number,
  maxLength: number,
) => {
  if (!value.trim()) addFailure(`${seoPage.path} is missing a ${label}`)
  if (value.length < minLength)
    addFailure(
      `${seoPage.path} ${label} is too short (${value.length} < ${minLength})`,
    )
  if (value.length > maxLength)
    addFailure(
      `${seoPage.path} ${label} is too long (${value.length} > ${maxLength})`,
    )
  if (disallowedTextPattern.test(value))
    addFailure(`${seoPage.path} ${label} contains placeholder copy`)
}

pages.forEach((seoPage) => {
  validateText('title', seoPage.title, seoPage, 20, 80)
  validateText('description', seoPage.description, seoPage, 80, 200)
  validateText('llm text', seoPage.llmText, seoPage, 40, 400)

  if (seoPage.kind !== 'home' && !seoPage.title.includes('Australia'))
    addFailure(`${seoPage.path} title should mention Australia`)
  if (
    seoPage.kind === 'year' &&
    !seoPage.path.includes(
      seoPage.title.match(/\b(19|20)\d{2}\b/u)?.[0] ?? '__missing__',
    )
  )
    addFailure(`${seoPage.path} year title should match its route`)
  if (
    seoPage.kind === 'decade' &&
    !seoPage.title.includes(seoPage.path.match(/\d{4}s/u)?.[0] ?? '__missing__')
  )
    addFailure(`${seoPage.path} decade title should match its route`)
  if (!existsSync(resolve(publicDir, `.${seoPage.imagePath}`)))
    addFailure(`${seoPage.path} is missing ${seoPage.imagePath}`)
  if (!sitemapPaths.has(seoPage.path))
    addFailure(`${seoPage.path} is missing from sitemap generation`)
})

const uniquePaths = new Set(pages.map(({ path }) => path))
if (uniquePaths.size !== pages.length)
  addFailure('SEO page paths must be unique')

if (failures.length > 0) {
  console.error('SEO lint failed:\n')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`SEO lint passed for ${pages.length} pages`)
