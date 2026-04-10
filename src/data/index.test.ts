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
        },
        {
          type: 'decade',
          decade: '1980s',
          path: '/au/1980s/',
        },
      ]),
    )
  })

  it('returns a matching year target for exact years', () => {
    expect(searchCatalog('1984')).toContainEqual({
      type: 'year',
      year: 1984,
      path: '/au/1984/',
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
    })
  })
})
