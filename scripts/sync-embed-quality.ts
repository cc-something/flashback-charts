import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAvailableYears, getYearData } from '@/data'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registryPath = path.join(
  rootDir,
  'src',
  'data',
  'embedIntegrityRegistry.ts',
)
const bestMatchStatus = 'best-match'
const bestMatchReason = 'best match'

const getRegistryContent = () => {
  const lines = [
    "import type { SongEmbedIntegrity, SongEmbedIntegrityReason } from '@/types/song'",
    '',
    'export type SongEmbedIntegrityEntry = {',
    '  embedIntegrity: SongEmbedIntegrity',
    '  embedIntegrityReason: SongEmbedIntegrityReason',
    '}',
    '',
    'export const embedIntegrityRegistry: Record<',
    '  number,',
    '  Record<number, SongEmbedIntegrityEntry>',
    '> = {',
  ]

  for (const year of getAvailableYears()) {
    lines.push(`  ${year}: {`)
    for (const song of getYearData(year) ?? [])
      lines.push(
        `    ${song.rank}: { embedIntegrity: '${bestMatchStatus}', embedIntegrityReason: '${bestMatchReason}' },`,
      )
    lines.push('  },')
  }

  lines.push('}')
  lines.push('')
  lines.push(
    'export const getSongEmbedIntegrityEntry = (year: number, rank: number): SongEmbedIntegrityEntry | undefined =>',
  )
  lines.push('  embedIntegrityRegistry[year]?.[rank]')
  lines.push('')

  return `${lines.join('\n')}\n`
}

const run = async () => {
  await writeFile(registryPath, getRegistryContent())
  console.log(
    JSON.stringify(
      {
        years: getAvailableYears().length,
        status: bestMatchStatus,
        reason: bestMatchReason,
      },
      null,
      2,
    ),
  )
}

void run()
