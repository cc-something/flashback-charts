import { availableYears } from '@/data/availableYears'

export interface PlaybackIntegritySelection {
  years: number[]
}

const decadeSpan = 10

const parseCsvNumbers = (value: string, flag: '--year' | '--decade') => {
  if (!value.trim())
    throw new Error(`Expected a comma-separated value after ${flag}=`)
  return value.split(',').map((entry) => {
    const trimmedEntry = entry.trim()
    const parsedNumber = Number(trimmedEntry)
    if (!trimmedEntry || !Number.isInteger(parsedNumber))
      throw new Error(`Invalid value "${entry}" passed to ${flag}=`)
    return parsedNumber
  })
}

const assertKnownYear = (year: number) => {
  if (availableYears.includes(year)) return
  throw new Error(
    `Year ${year} is unavailable. Expected one of ${availableYears[0]}-${availableYears[availableYears.length - 1]}.`,
  )
}

const getDecadeYears = (decadeStartYear: number) => {
  if (decadeStartYear % decadeSpan !== 0)
    throw new Error(
      `Decade ${decadeStartYear} must start on a year ending in 0.`,
    )
  const decadeYears = availableYears.filter(
    (year) => year >= decadeStartYear && year < decadeStartYear + decadeSpan,
  )
  if (decadeYears.length > 0) return decadeYears
  throw new Error(`Decade ${decadeStartYear} has no chart data.`)
}

export const resolvePlaybackIntegritySelection = (
  args: string[],
): PlaybackIntegritySelection => {
  const filteredArgs = args.filter((arg) => arg !== '--')

  if (filteredArgs.length === 0)
    throw new Error(
      'Playback integrity requires at least one selector: --all, --year=1945,1946, or --decade=1940.',
    )

  const selectedYears = new Set<number>()
  let hasSelector = false

  for (const arg of filteredArgs) {
    if (arg === '--all') {
      hasSelector = true
      for (const year of availableYears) selectedYears.add(year)
      continue
    }
    if (arg.startsWith('--year=')) {
      hasSelector = true
      const years = parseCsvNumbers(arg.slice('--year='.length), '--year')
      for (const year of years) {
        assertKnownYear(year)
        selectedYears.add(year)
      }
      continue
    }
    if (arg.startsWith('--decade=')) {
      hasSelector = true
      const decades = parseCsvNumbers(arg.slice('--decade='.length), '--decade')
      for (const decade of decades)
        for (const year of getDecadeYears(decade)) selectedYears.add(year)
      continue
    }
    throw new Error(`Unknown argument "${arg}".`)
  }

  if (!hasSelector || selectedYears.size === 0)
    throw new Error(
      'Playback integrity requires at least one selector: --all, --year=1945,1946, or --decade=1940.',
    )

  return { years: [...selectedYears].sort((left, right) => left - right) }
}
