import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAvailableYears, getYearData } from '@/data'
import type { Song, SongEmbedIntegrity } from '@/types/song'
import {
  classifySongAudit,
  getVideoMetadata,
  parseEmbedQualityDoc,
  type SongAuditRecord,
} from './embed-quality-audit-lib'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = path.join(rootDir, 'docs', 'embed-integrity')
const registryPath = path.join(
  rootDir,
  'src',
  'data',
  'embedIntegrityRegistry.ts',
)
const decadeDocNames = [
  '1940s.md',
  '1950s.md',
  '1960s.md',
  '1970s.md',
  '1980s.md',
  '1990s.md',
  '2000s.md',
  '2010s.md',
  '2020s.md',
] as const

const getDecadeForYear = (year: number) => `${Math.floor(year / 10) * 10}s`

const groupByDecade = (records: SongAuditRecord[]) => {
  const grouped = new Map<string, SongAuditRecord[]>()
  for (const record of records) {
    const decade = getDecadeForYear(record.year)
    const nextRecords = grouped.get(decade) ?? []
    nextRecords.push(record)
    grouped.set(decade, nextRecords)
  }
  return grouped
}

const getRegistryContent = (records: SongAuditRecord[]) => {
  const years = [...new Set(records.map((record) => record.year))].sort(
    (left, right) => left - right,
  )
  const lines = [
    "import type { SongEmbedIntegrity } from '@/types/song'",
    '',
    'export const embedIntegrityRegistry: Record<number, Record<number, SongEmbedIntegrity>> = {',
  ]

  for (const year of years) {
    lines.push(`  ${year}: {`)
    for (const record of records
      .filter((entry) => entry.year === year)
      .sort((left, right) => left.rank - right.rank))
      lines.push(`    ${record.rank}: '${record.embedIntegrity}',`)
    lines.push('  },')
  }

  lines.push('}')
  lines.push('')
  lines.push(
    'export const getSongEmbedIntegrity = (year: number, rank: number): SongEmbedIntegrity | undefined =>',
  )
  lines.push('  embedIntegrityRegistry[year]?.[rank]')
  lines.push('')

  return `${lines.join('\n')}\n`
}

const getReasonLabel = (record: SongAuditRecord) => {
  if (record.embedIntegrity === 'unplayable') return 'documented HARD blocker'
  if (record.embedIntegrity === 'suboptimal') return record.reason
  return 'primary embed'
}

const getYearQualityLines = (records: SongAuditRecord[]) => {
  const confirmed = records.filter(
    (record) => record.embedIntegrity === 'confirmed',
  )
  const suboptimal = records.filter(
    (record) => record.embedIntegrity === 'suboptimal',
  )
  const unplayable = records.filter(
    (record) => record.embedIntegrity === 'unplayable',
  )

  const lines = [
    `### ${records[0]?.year ?? ''}`,
    '',
    `- Counts: ${confirmed.length} confirmed, ${suboptimal.length} suboptimal, ${unplayable.length} unplayable`,
    `- Suboptimal: ${
      suboptimal.length === 0
        ? 'none'
        : suboptimal
            .map(
              (record) =>
                `#${record.rank} "${record.title}" (${getReasonLabel(record)})`,
            )
            .join('; ')
    }`,
    `- Unplayable: ${
      unplayable.length === 0
        ? 'none'
        : unplayable
            .map(
              (record) =>
                `#${record.rank} "${record.title}" (${getReasonLabel(record)})`,
            )
            .join('; ')
    }`,
    '',
  ]

  return lines.join('\n')
}

const getGeneratedQualitySection = (records: SongAuditRecord[]) => {
  const years = [...new Set(records.map((record) => record.year))].sort(
    (left, right) => left - right,
  )
  const summaryLines = [
    '## Embed Quality Audit',
    '',
    '| Year | Confirmed | Suboptimal | Unplayable |',
    '| ---- | --------: | ---------: | ---------: |',
  ]

  for (const year of years) {
    const yearRecords = records.filter((record) => record.year === year)
    summaryLines.push(
      `| ${year} | ${yearRecords.filter((record) => record.embedIntegrity === 'confirmed').length} | ${yearRecords.filter((record) => record.embedIntegrity === 'suboptimal').length} | ${yearRecords.filter((record) => record.embedIntegrity === 'unplayable').length} |`,
    )
  }

  summaryLines.push('')
  summaryLines.push(
    `- Decade totals: ${records.filter((record) => record.embedIntegrity === 'confirmed').length} confirmed, ${records.filter((record) => record.embedIntegrity === 'suboptimal').length} suboptimal, ${records.filter((record) => record.embedIntegrity === 'unplayable').length} unplayable`,
  )
  summaryLines.push('')
  summaryLines.push('## Embed Quality Details')
  summaryLines.push('')

  for (const year of years)
    summaryLines.push(
      getYearQualityLines(
        records
          .filter((record) => record.year === year)
          .sort((left, right) => left.rank - right.rank),
      ),
    )

  return summaryLines.join('\n').trimEnd()
}

const upsertGeneratedQualitySection = (
  currentContent: string,
  generatedSection: string,
) => {
  const generatedPattern =
    /\n## Embed Quality Audit[\s\S]*?(?=\n## Blocker Recheck|\n## Fix Log|\n## Handoff)/u
  if (generatedPattern.test(currentContent))
    return currentContent.replace(generatedPattern, `\n${generatedSection}\n`)
  const insertPattern = /\n## Blocker Recheck|\n## Fix Log|\n## Handoff/u
  const insertMatch = currentContent.match(insertPattern)
  if (!insertMatch)
    return `${currentContent.trimEnd()}\n\n${generatedSection}\n`
  return currentContent.replace(
    insertPattern,
    `\n${generatedSection}\n${insertMatch[0]}`,
  )
}

const getReadmeContent = (currentContent: string) => {
  const generatedSection = [
    '## Embed Quality Audit',
    '',
    '- The app-level `embedIntegrity` classification is now exhaustive across the corpus and lives in `src/data/embedIntegrityRegistry.ts`.',
    '- `confirmed`: current playable embed is a primary-quality upload with no compromise markers.',
    '- `suboptimal`: current embed is playable but compromised, including lyric, live, acoustic, session, cover, remix/edit, or non-official fallback uploads.',
    '- `unplayable`: documented HARD blocker with no practical embed-friendly replacement.',
    '- Use `pnpm exec tsx --tsconfig tsconfig.node.json scripts/sync-embed-quality.ts` to regenerate the registry and decade quality summaries from the current docs and live YouTube search metadata.',
  ].join('\n')
  const generatedPattern = /\n## Embed Quality Audit[\s\S]*$/u
  if (generatedPattern.test(currentContent))
    return currentContent.replace(generatedPattern, `\n${generatedSection}\n`)
  return `${currentContent.trimEnd()}\n\n${generatedSection}\n`
}

const getSongRecords = () =>
  getAvailableYears().flatMap((year) =>
    (getYearData(year) ?? []).map((song) => ({ year, song })),
  )

const getAuditRecords = async () => {
  const parsedDocs = new Map<number, ReturnType<typeof parseEmbedQualityDoc>>()
  for (const docName of decadeDocNames) {
    const content = await readFile(path.join(docsDir, docName), 'utf8')
    const parsed = parseEmbedQualityDoc(content)
    for (const year of [
      ...new Set(
        [...parsed.blockers.keys(), ...parsed.replacements.keys()].map((key) =>
          Number(key.split(':')[0]),
        ),
      ),
    ])
      parsedDocs.set(year, parsed)
  }

  const records: SongAuditRecord[] = []
  for (const { year, song } of getSongRecords()) {
    const metadata = await getVideoMetadata(song)
    records.push(
      classifySongAudit({
        year,
        song,
        parsedDocAudit: parsedDocs.get(year) ?? {
          blockers: new Map(),
          replacements: new Map(),
          noteFlags: new Map(),
        },
        metadata,
      }),
    )
  }
  return records.sort(
    (left, right) => left.year - right.year || left.rank - right.rank,
  )
}

const writeDocs = async (records: SongAuditRecord[]) => {
  const groupedByDecade = groupByDecade(records)
  for (const docName of decadeDocNames) {
    const decade = docName.replace('.md', '')
    const currentContent = await readFile(path.join(docsDir, docName), 'utf8')
    const nextContent = upsertGeneratedQualitySection(
      currentContent,
      getGeneratedQualitySection(groupedByDecade.get(decade) ?? []),
    )
    await writeFile(path.join(docsDir, docName), nextContent)
  }

  const readmePath = path.join(docsDir, 'README.md')
  const readmeContent = await readFile(readmePath, 'utf8')
  await writeFile(readmePath, getReadmeContent(readmeContent))
}

const run = async () => {
  const records = await getAuditRecords()
  await writeFile(registryPath, getRegistryContent(records))
  await writeDocs(records)
  const counts = records.reduce(
    (totals, record) => {
      totals[record.embedIntegrity] += 1
      return totals
    },
    {
      confirmed: 0,
      suboptimal: 0,
      unplayable: 0,
    } satisfies Record<SongEmbedIntegrity, number>,
  )
  console.log(JSON.stringify(counts, null, 2))
}

void run()
