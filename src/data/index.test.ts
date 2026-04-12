import { describe, expect, it } from 'vitest'
import { searchCatalog } from './index'

describe('searchCatalog', () => {
  it('returns year and decade targets for decade start years', () => {
    expect(searchCatalog('1980')).toEqual(
      expect.arrayContaining([
        {
          type: 'year',
          year: 1980,
          path: '/au/1980/',
          thumbnailPath: expect.any(String),
        },
        {
          type: 'decade',
          decade: '1980s',
          path: '/au/1980s/',
          thumbnailPath: expect.any(String),
        },
      ]),
    )
  })

  it('returns a matching year target for exact years', () => {
    expect(searchCatalog('1984')).toContainEqual({
      type: 'year',
      year: 1984,
      path: '/au/1984/',
      thumbnailPath: expect.any(String),
    })
    expect(searchCatalog('1984')).not.toContainEqual(
      expect.objectContaining({
        type: 'decade',
      }),
    )
  })

  it('returns a decade target for suffixed decade queries', () => {
    expect(searchCatalog('1990s')).toContainEqual({
      type: 'decade',
      decade: '1990s',
      path: '/au/1990s/',
      thumbnailPath: expect.any(String),
    })
  })

  it('returns a matching year target for two-digit year queries', () => {
    expect(searchCatalog('73')).toContainEqual({
      type: 'year',
      year: 1973,
      path: '/au/1973/',
      thumbnailPath: expect.any(String),
    })
  })

  it('returns a matching decade target for shorthand decade queries', () => {
    expect(searchCatalog('80s')).toContainEqual({
      type: 'decade',
      decade: '1980s',
      path: '/au/1980s/',
      thumbnailPath: expect.any(String),
    })
    expect(searchCatalog('80s')).toContainEqual({
      type: 'year',
      year: 1980,
      path: '/au/1980/',
      thumbnailPath: expect.any(String),
    })
  })

  it('treats temporal shorthand queries as year and decade intent first', () => {
    expect(searchCatalog('80s').every((result) => result.type !== 'song')).toBe(
      true,
    )
  })

  it('autocompletes numeric prefixes with decades first when song results are empty', () => {
    expect(searchCatalog('194').slice(0, 4)).toEqual([
      {
        type: 'decade',
        decade: '1940s',
        path: '/au/1940s/',
        thumbnailPath: expect.any(String),
      },
      {
        type: 'year',
        year: 1940,
        path: '/au/1940/',
        thumbnailPath: expect.any(String),
      },
      {
        type: 'year',
        year: 1941,
        path: '/au/1941/',
        thumbnailPath: expect.any(String),
      },
      {
        type: 'year',
        year: 1942,
        path: '/au/1942/',
        thumbnailPath: expect.any(String),
      },
    ])
  })
})
