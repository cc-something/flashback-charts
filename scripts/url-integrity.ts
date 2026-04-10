import process from 'node:process'
import {
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

const runUrlIntegrity = async () => {
  const selection = resolveIntegritySelection(process.argv.slice(2))
  const targets = collectUrlIntegrityTargets(selection)

  console.log(
    `URL integrity selection years=${selection.years.join(',')} targets=${targets.length} concurrency=${concurrencyLimit}`,
  )
  logDivider()

  const results = await runWithConcurrency(
    targets,
    concurrencyLimit,
    async (target: UrlIntegrityTarget) => {
      const result = await checkUrlIntegrityTarget(target)
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
}

runUrlIntegrity().catch((error) => {
  console.error(
    error instanceof Error
      ? error.message
      : 'URL integrity runner failed unexpectedly.',
  )
  process.exitCode = 1
})
