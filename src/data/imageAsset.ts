interface SongThumbnailInput {
  year: number
  rank: number
  title: string
}

const marketSlug = 'au'

const getSongThumbnailSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled'

export const getSongThumbnailFilename = ({
  rank,
  title,
}: Omit<SongThumbnailInput, 'year'>) =>
  `${rank.toString().padStart(2, '0')}-${getSongThumbnailSlug(title)}.webp`

export const getSongThumbnailPath = ({
  year,
  rank,
  title,
}: SongThumbnailInput) =>
  `/images/${marketSlug}/years/${year}/${getSongThumbnailFilename({ rank, title })}`
