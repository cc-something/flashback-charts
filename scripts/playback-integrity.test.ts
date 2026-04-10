import { describe, expect, it } from 'vitest'
import { availableYears } from '@/data/availableYears'
import { resolvePlaybackIntegritySelection } from './playback-integrity-lib'

describe('resolvePlaybackIntegritySelection', () => {
  it('requires at least one selector', () => {
    expect(() => resolvePlaybackIntegritySelection([])).toThrow(
      /requires at least one selector/i,
    )
  })

  it('selects all years with --all', () => {
    expect(resolvePlaybackIntegritySelection(['--all']).years).toEqual(
      availableYears,
    )
  })

  it('selects explicit years', () => {
    expect(
      resolvePlaybackIntegritySelection(['--year=1940,1945,1950']).years,
    ).toEqual([1940, 1945, 1950])
  })

  it('ignores pnpm argument separators', () => {
    expect(
      resolvePlaybackIntegritySelection(['--', '--year=1940']).years,
    ).toEqual([1940])
  })

  it('expands decades and de-duplicates merged selectors', () => {
    expect(
      resolvePlaybackIntegritySelection(['--year=1940,1945', '--decade=1940'])
        .years,
    ).toEqual([1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949])
  })

  it('supports multiple decades in a single flag', () => {
    expect(
      resolvePlaybackIntegritySelection(['--decade=1940,1950']).years,
    ).toEqual([
      1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951,
      1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
    ])
  })

  it('rejects unknown arguments', () => {
    expect(() =>
      resolvePlaybackIntegritySelection(['--year=1940', '--headed']),
    ).toThrow(/unknown argument/i)
  })

  it('rejects unavailable years', () => {
    expect(() => resolvePlaybackIntegritySelection(['--year=1939'])).toThrow(
      /unavailable/i,
    )
  })

  it('rejects invalid decade values', () => {
    expect(() => resolvePlaybackIntegritySelection(['--decade=1945'])).toThrow(
      /must start on a year ending in 0/i,
    )
  })
})
