import { describe, expect, it } from 'vitest'
import {
  classifySongAudit,
  parseEmbedQualityDoc,
} from './embed-quality-audit-lib'
import type { Song } from '@/types/song'

const createSong = (overrides: Partial<Song> = {}): Song => ({
  rank: 1,
  title: 'Test Song',
  artist: 'Test Artist',
  album: 'Test Album',
  youtubeVideoId: 'abc123',
  embedIntegrity: 'confirmed',
  thumbnailPath: '/test.webp',
  imageSelection: 'album',
  imageSources: {
    album: null,
    artist: null,
  },
  ...overrides,
})

describe('parseEmbedQualityDoc', () => {
  it('parses blocker evidence and replacement chains', () => {
    const parsed = parseEmbedQualityDoc(`
### 2010

- HARD blockers:
  | Rank | Title | Artist | Video ID | Evidence | Conclusion |
  | --- | --- | --- | --- | --- | --- |
  | 1 | \`Blocked Song\` | \`Blocked Artist\` | \`blocked123\` | untouched rerun failed | no practical embed-friendly replacement found |
 - Notes: targeted lyric probes recovered \`Replacement Song\`; targeted live probes recovered \`Another Song\`

## Outstanding Work

## Fix Log

| Year | Rank | Original | Current |
| ---: | ---: | --- | --- |
| 2010 | 2 | \`old123\` | \`new123\` |
| 2010 | 3 | \`older\` | \`newer\` |

## Handoff
    `)

    expect(parsed.blockers.get('2010:1')).toContain('untouched rerun failed')
    expect(parsed.replacements.get('2010:2')).toEqual(['old123', 'new123'])
    expect(parsed.replacements.get('2010:3')).toEqual(['older', 'newer'])
  })
})

describe('classifySongAudit', () => {
  it('marks blockers as unplayable', () => {
    const parsed = parseEmbedQualityDoc(`
### 2010

- HARD blockers:
  | Rank | Title | Artist | Video ID | Evidence | Conclusion |
  | --- | --- | --- | --- | --- | --- |
  | 1 | \`Test Song\` | \`Test Artist\` | \`abc123\` | blocked evidence | blocked |

## Outstanding Work
`)

    expect(
      classifySongAudit({
        year: 2010,
        song: createSong(),
        parsedDocAudit: parsed,
        metadata: null,
      }).embedIntegrity,
    ).toBe('unplayable')
  })

  it('marks lyric replacements as suboptimal', () => {
    const parsed = parseEmbedQualityDoc(`
### 2010

- Notes: targeted lyric probes recovered \`Test Song\`

## Outstanding Work

## Fix Log

| Year | Rank | Original | Current |
| ---: | ---: | --- | --- |
| 2010 | 1 | \`old123\` | \`abc123\` |

## Handoff
    `)

    expect(
      classifySongAudit({
        year: 2010,
        song: createSong(),
        parsedDocAudit: parsed,
        metadata: {
          id: 'abc123',
          title: 'Test Song (Lyrics)',
          uploader: 'Lyrics Channel',
          channel: 'Lyrics Channel',
        },
      }).embedIntegrity,
    ).toBe('suboptimal')
  })

  it('keeps clean official-style uploads confirmed', () => {
    const parsed = parseEmbedQualityDoc(`
### 2010

## Outstanding Work

## Fix Log

| Year | Rank | Original | Current |
| ---: | ---: | --- | --- |
| 2010 | 1 | \`old123\` | \`abc123\` |

## Handoff
    `)

    expect(
      classifySongAudit({
        year: 2010,
        song: createSong(),
        parsedDocAudit: parsed,
        metadata: {
          id: 'abc123',
          title: 'Test Song (Official Video)',
          uploader: 'Test Artist',
          channel: 'Test Artist',
        },
      }).embedIntegrity,
    ).toBe('confirmed')
  })
})
