import process from 'node:process'
import { chromium } from 'playwright'
import type { Browser } from 'playwright'
import {
  type BrowserProbeResult,
  checkUrlIntegrityTarget,
  collectUrlIntegrityTargets,
  type UrlIntegrityResult,
  type UrlIntegrityTarget,
} from './url-integrity-lib'
import { resolveIntegritySelection } from './integrity-selection'

interface UrlIntegritySummary {
  failed: number
  passed: number
  total: number
}

const concurrencyLimit = 6
const browserProbeTimeoutMs = 20_000

const logDivider = () =>
  console.log('------------------------------------------------------------')

const formatReferences = (result: UrlIntegrityResult) =>
  result.references.map((reference) => reference.label).join(',')

const formatResultLine = (result: UrlIntegrityResult) =>
  `${result.status === 'passed' ? 'PASS ' : 'FAIL '} kind=${result.kind} id=${result.id} reason=${result.reason} statusCode=${result.statusCode ?? '-'} url=${result.url} finalUrl=${result.finalUrl ?? '-'} refs=${formatReferences(result)} message=${result.message}`

const createSummary = (results: UrlIntegrityResult[]): UrlIntegritySummary => ({
  failed: results.filter((result) => result.status === 'failed').length,
  passed: results.filter((result) => result.status === 'passed').length,
  total: results.length,
})

const runWithConcurrency = async <TItem, TResult>(
  items: TItem[],
  limit: number,
  worker: (item: TItem) => Promise<TResult>,
) => {
  const results = new Array<TResult>(items.length)
  let nextIndex = 0

  const runWorker = async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex
      nextIndex += 1
      results[currentIndex] = await worker(items[currentIndex])
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runWorker()),
  )
  return results
}

const createBrowserProbe = () => {
  let browserPromise: Promise<Browser> | null = null

  const getBrowser = () => {
    if (browserPromise) return browserPromise
    browserPromise = chromium.launch({ headless: true })
    return browserPromise
  }

  const probe = async (
    url: string,
    timeoutMs = browserProbeTimeoutMs,
  ): Promise<BrowserProbeResult> => {
    const browser = await getBrowser()
    const page = await browser.newPage()

    try {
      const response = await page.goto(url, {
        timeout: timeoutMs,
        waitUntil: 'domcontentloaded',
      })
      const statusCode = response?.status() ?? null
      const finalUrl = page.url() || null
      return {
        finalUrl,
        message: `Last-resort browser probe resolved with HTTP ${statusCode ?? 'unknown'}`,
        status: statusCode !== null && statusCode < 400 ? 'passed' : 'failed',
        statusCode,
      }
    } finally {
      await page.close()
    }
  }

  const close = async () => {
    if (!browserPromise) return
    const browser = await browserPromise
    await browser.close()
    browserPromise = null
  }

  return { close, probe }
}

const runUrlIntegrity = async () => {
  const selection = resolveIntegritySelection(process.argv.slice(2))
  const targets = collectUrlIntegrityTargets(selection)
  const browserProbe = createBrowserProbe()

  console.log(
    `URL integrity selection years=${selection.years.join(',')} targets=${targets.length} concurrency=${concurrencyLimit}`,
  )
  logDivider()

  try {
    const results = await runWithConcurrency(
      targets,
      concurrencyLimit,
      async (target: UrlIntegrityTarget) => {
        const result = await checkUrlIntegrityTarget(target, {
          browserProbe: browserProbe.probe,
        })
        console.log(formatResultLine(result))
        return result
      },
    )
    const summary = createSummary(results)

    logDivider()
    console.log(
      `SUMMARY years=${selection.years.join(',')} total=${summary.total} passed=${summary.passed} failed=${summary.failed}`,
    )
    process.exitCode = summary.failed > 0 ? 1 : 0
  } finally {
    await browserProbe.close()
  }
}

runUrlIntegrity().catch((error) => {
  console.error(
    error instanceof Error
      ? error.message
      : 'URL integrity runner failed unexpectedly.',
  )
  process.exitCode = 1
})
