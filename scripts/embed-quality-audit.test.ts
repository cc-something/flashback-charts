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
  embedIntegrity: 'best-match',
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
- Changes made:

| Rank | Original | Current |
| ---: | --- | --- |
| 2 | \`old123\` | \`new123\` |
| 3 | \`older\` | \`newer\` |

 - Notes: targeted lyric probes recovered \`Replacement Song\`; targeted live probes recovered \`Another Song\`

## Outstanding Work
    `)

    expect(parsed.blockers.get('2010:1')).toContain('untouched rerun failed')
    expect(parsed.replacements.get('2010:2')).toEqual(['old123', 'new123'])
    expect(parsed.replacements.get('2010:3')).toEqual(['older', 'newer'])
  })
})

describe('classifySongAudit', () => {
  it('marks blockers as blocked', () => {
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
    ).toBe('blocked')
  })

  it('marks lyric replacements as alternative', () => {
    const parsed = parseEmbedQualityDoc(`
### 2010

- Changes made:

| Rank | Original | Current |
| ---: | --- | --- |
| 1 | \`old123\` | \`abc123\` |

- Notes: targeted lyric probes recovered \`Test Song\`

## Outstanding Work
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
    ).toBe('alternative')
  })

  it('keeps clean official-style uploads best-match', () => {
    const parsed = parseEmbedQualityDoc(`
### 2010

- Changes made:

| Rank | Original | Current |
| ---: | --- | --- |
| 1 | \`old123\` | \`abc123\` |

## Outstanding Work
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
    ).toBe('best-match')
  })
})
