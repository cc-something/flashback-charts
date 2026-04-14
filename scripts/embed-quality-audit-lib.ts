import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { Song, SongEmbedIntegrity } from '@/types/song'

const execFileAsync = promisify(execFile)
const ytDlpPath = '/opt/homebrew/bin/yt-dlp'
const metadataTimeoutMs = 20000
const compromiseFlagOrder = [
  'lyric',
  'live',
  'acoustic',
  'session',
  'cover',
  'remix',
  'alternate',
  'non-official',
] as const

type CompromiseFlag = (typeof compromiseFlagOrder)[number]

export type ParsedDocAudit = {
  blockers: Map<string, string>
  replacements: Map<string, string[]>
  noteFlags: Map<string, Set<CompromiseFlag>>
}

export type VideoMetadata = {
  id: string
  title: string
  uploader: string
  channel: string
}

export type SongAuditRecord = {
  year: number
  rank: number
  title: string
  artist: string
  youtubeVideoId: string | null
  embedIntegrity: SongEmbedIntegrity
  reason: string
  wasReplaced: boolean
  replacementChain: string[]
  blockerEvidence: string | null
  metadata: VideoMetadata | null
}

const compromisePatterns: Array<{
  flag: CompromiseFlag
  getPattern: (song: Song) => RegExp | null
}> = [
  {
    flag: 'lyric',
    getPattern: () => /\blyrics?\b/u,
  },
  {
    flag: 'live',
    getPattern: () =>
      /\blive\b|wireless|festival|concert|billboard|jingle|iheart|vma|amas|brit|radio 1|radio1|mtv|final\b/u,
  },
  {
    flag: 'acoustic',
    getPattern: () => /\bacoustic\b/u,
  },
  {
    flag: 'session',
    getPattern: () => /\bsession\b|tiny desk|lounge|nrj|stripped/u,
  },
  {
    flag: 'cover',
    getPattern: () => /\bcover\b/u,
  },
  {
    flag: 'remix',
    getPattern: (song) =>
      normalizeText(song.title).includes('remix') ? null : /\bremix\b|\bmix\b/u,
  },
  {
    flag: 'alternate',
    getPattern: () =>
      /\bedit\b|\bversion\b|karaoke|instrumental|sped up|slowed|reverb|vertical|shorts|clean\b/u,
  },
]

const noteKeywordMatchers: Array<{ flag: CompromiseFlag; pattern: RegExp }> = [
  { flag: 'lyric', pattern: /\blyric/u },
  {
    flag: 'live',
    pattern: /\blive\b|performance|tv|vma|amas|billboard|iheart/u,
  },
  { flag: 'acoustic', pattern: /\bacoustic/u },
  { flag: 'session', pattern: /\bsession\b|tiny desk|lounge|nrj|radio/u },
  { flag: 'cover', pattern: /\bcover\b/u },
  { flag: 'remix', pattern: /\bremix\b|\bmix\b/u },
]

const getSongKey = (year: number, rank: number) => `${year}:${rank}`
const getSongTitleKey = (year: number, title: string) =>
  `${year}:${normalizeText(title)}`

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()

const getArtistTokens = (artist: string) => [
  ...new Set(
    normalizeText(artist)
      .split(' ')
      .filter(
        (token) =>
          token.length >= 4 &&
          !['feat', 'with', 'from', 'and', 'featuring'].includes(token),
      ),
  ),
]

const getCurrentYearSections = (content: string) => {
  const sectionSource = content.split('\n## Outstanding Work')[0] ?? content
  const headingPattern = /^### (\d{4})$/gmu
  const headingMatches = [...sectionSource.matchAll(headingPattern)]
  return headingMatches.map((match, index) => {
    const year = Number(match[1])
    const bodyStart = (match.index ?? 0) + match[0].length + 1
    const bodyEnd = headingMatches[index + 1]?.index ?? sectionSource.length
    return {
      year,
      body: sectionSource.slice(bodyStart, bodyEnd).trim(),
    }
  })
}

const getChainSegments = (chain: string) =>
  chain
    .split('->')
    .map((segment) => segment.trim())
    .filter(Boolean)

const getReplacementMatches = (line: string) =>
  [...line.matchAll(/rank\s+(\d+)\s+(?:replaced\s+)?`([^`]*->[^`]*)`/gmu)].map(
    ([, rank, chain]) => ({
      rank: Number(rank),
      chain: getChainSegments(chain),
    }),
  )

const getTableRows = (body: string) =>
  body
    .split('\n')
    .map((line) => line.trimStart())
    .filter((line) => /^\|\s*\d+\s*\|/u.test(line))

const getCompromiseFlagsFromText = (value: string) => {
  const flags = new Set<CompromiseFlag>()
  const normalizedValue = normalizeText(value)
  for (const matcher of noteKeywordMatchers)
    if (matcher.pattern.test(normalizedValue)) flags.add(matcher.flag)
  return flags
}

const getTitlesFromSegment = (segment: string) =>
  [...segment.matchAll(/`([^`]+)`/gmu)].map(([, title]) => title)

export const parseEmbedQualityDoc = (content: string): ParsedDocAudit => {
  const blockers = new Map<string, string>()
  const replacements = new Map<string, string[]>()
  const noteFlags = new Map<string, Set<CompromiseFlag>>()

  for (const { year, body } of getCurrentYearSections(content)) {
    for (const row of getTableRows(body)) {
      const columns = row
        .split('|')
        .map((column) => column.trim())
        .filter(Boolean)
      const rank = Number(columns[0])
      if (!Number.isInteger(rank)) continue
      blockers.set(getSongKey(year, rank), columns[4] ?? '')
    }

    for (const line of body.split('\n'))
      for (const replacementMatch of getReplacementMatches(line))
        replacements.set(
          getSongKey(year, replacementMatch.rank),
          replacementMatch.chain,
        )

    for (const noteLine of body
      .split('\n')
      .filter((line) => line.startsWith('- Notes:'))) {
      for (const segment of noteLine.split(';')) {
        const segmentFlags = getCompromiseFlagsFromText(segment)
        if (segmentFlags.size === 0) continue
        for (const title of getTitlesFromSegment(segment)) {
          const titleKey = getSongTitleKey(year, title)
          const nextFlags = noteFlags.get(titleKey) ?? new Set<CompromiseFlag>()
          for (const flag of segmentFlags) nextFlags.add(flag)
          noteFlags.set(titleKey, nextFlags)
        }
      }
    }
  }

  return { blockers, replacements, noteFlags }
}
const getMetadataHaystack = (metadata: VideoMetadata) =>
  normalizeText(`${metadata.title} ${metadata.uploader} ${metadata.channel}`)

const getIsOfficialLike = (song: Song, metadata: VideoMetadata) => {
  const haystack = getMetadataHaystack(metadata)
  if (/\bvevo\b|\btopic\b|\bofficial\b/u.test(haystack)) return true
  return getArtistTokens(song.artist).some((token) => haystack.includes(token))
}

const getMetadataFlags = (song: Song, metadata: VideoMetadata | null) => {
  if (!metadata) return new Set<CompromiseFlag>()
  const flags = new Set<CompromiseFlag>()
  const haystack = getMetadataHaystack(metadata)
  for (const pattern of compromisePatterns) {
    const nextPattern = pattern.getPattern(song)
    if (nextPattern && nextPattern.test(haystack)) flags.add(pattern.flag)
  }
  return flags
}

const getPrimaryCompromiseFlag = (flags: Set<CompromiseFlag>) =>
  compromiseFlagOrder.find((flag) => flags.has(flag)) ?? null

const getCompromiseReason = (flag: CompromiseFlag | null) => {
  if (flag === 'lyric') return 'lyric upload'
  if (flag === 'live') return 'live/performance upload'
  if (flag === 'acoustic') return 'acoustic fallback'
  if (flag === 'session') return 'session/radio upload'
  if (flag === 'cover') return 'cover upload'
  if (flag === 'remix') return 'alternate mix/edit'
  if (flag === 'alternate') return 'alternate-format upload'
  if (flag === 'non-official') return 'non-official replacement upload'
  return 'compromised replacement upload'
}

export const classifySongAudit = ({
  year,
  song,
  parsedDocAudit,
  metadata,
}: {
  year: number
  song: Song
  parsedDocAudit: ParsedDocAudit
  metadata: VideoMetadata | null
}): SongAuditRecord => {
  const songKey = getSongKey(year, song.rank)
  const blockerEvidence = parsedDocAudit.blockers.get(songKey) ?? null
  const replacementChain = parsedDocAudit.replacements.get(songKey) ?? []
  const wasReplaced = replacementChain.length > 0

  if (blockerEvidence)
    return {
      year,
      rank: song.rank,
      title: song.title,
      artist: song.artist,
      youtubeVideoId: song.youtubeVideoId,
      embedIntegrity: 'unplayable',
      reason: 'documented HARD blocker',
      wasReplaced,
      replacementChain,
      blockerEvidence,
      metadata,
    }

  const flags = new Set<CompromiseFlag>([
    ...getMetadataFlags(song, metadata),
    ...(parsedDocAudit.noteFlags.get(getSongTitleKey(year, song.title)) ?? []),
  ])
  if (wasReplaced && metadata && !getIsOfficialLike(song, metadata))
    flags.add('non-official')

  const primaryFlag = getPrimaryCompromiseFlag(flags)
  return {
    year,
    rank: song.rank,
    title: song.title,
    artist: song.artist,
    youtubeVideoId: song.youtubeVideoId,
    embedIntegrity: primaryFlag ? 'suboptimal' : 'confirmed',
    reason: primaryFlag ? getCompromiseReason(primaryFlag) : 'primary embed',
    wasReplaced,
    replacementChain,
    blockerEvidence,
    metadata,
  }
}

const getMetadataFromSearchLine = (line: string): VideoMetadata | null => {
  const [id, title = '', uploader = '', channel = ''] = line
    .split('\t')
    .map((value) => value.trim())
  if (!id) return null
  return { id, title, uploader, channel: channel || uploader }
}

const getSearchMetadata = async (query: string) => {
  try {
    const { stdout } = await execFileAsync(
      ytDlpPath,
      [
        '--flat-playlist',
        `ytsearch5:${query}`,
        '--print',
        '%(id)s\t%(title)s\t%(uploader)s\t%(channel)s',
        '--skip-download',
        '--no-warnings',
      ],
      {
        timeout: metadataTimeoutMs,
      },
    )
    return stdout
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map(getMetadataFromSearchLine)
      .filter((entry): entry is VideoMetadata => Boolean(entry))
  } catch {
    return []
  }
}

export const getVideoMetadata = async (
  song: Song,
): Promise<VideoMetadata | null> => {
  if (!song.youtubeVideoId) return null
  const idResults = await getSearchMetadata(song.youtubeVideoId)
  const idMatch = idResults.find((entry) => entry.id === song.youtubeVideoId)
  if (idMatch) return idMatch

  const queryResults = await getSearchMetadata(`${song.title} ${song.artist}`)
  return (
    queryResults.find((entry) => entry.id === song.youtubeVideoId) ??
    queryResults[0] ??
    null
  )
}
