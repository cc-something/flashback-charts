import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2000

export const source = {
  label: 'ARIA Charts',
  url: 'https://www.aria.com.au/charts/2000/singles-chart',
}

export const description =
  '2000 still carried a lot of late-90s polish, with glossy pop, dance tracks, and big radio hooks doing most of the heavy lifting. The charts felt upbeat and clean-cut, with only a little room for grit.'

const getSong = ({
  rank,
  title,
  artist,
  album,
  youtubeVideoId,
  imageSelection,
  imageSources,
}: Omit<Song, 'thumbnailPath'>): Song => ({
  rank,
  title,
  artist,
  album,
  youtubeVideoId,
  imageSelection,
  imageSources,
  thumbnailPath: getSongThumbnailPath({ year, rank, title }),
})

// Source: ARIA year-end singles chart for 2000
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "I'm Outta Love",
    artist: 'Anastacia',
    album: 'Not That Kind',
    youtubeVideoId: 'KawZpghPUKg',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/7/77/Imouttalove.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Teenage Dirtbag',
    artist: 'Wheatus',
    album: 'Wheatus',
    youtubeVideoId: 'K9EqStdNPT8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Teenage_Dirtbag.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Freestyler',
    artist: "Bomfunk MC's",
    album: 'In Stereo',
    youtubeVideoId: 'WK7H4uv-qMA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/09/Bomfunk_-_Freestyler.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Music',
    artist: 'Madonna',
    album: 'Music',
    youtubeVideoId: 'AXA_PXblcow',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/5b/Madonna_music_single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Say My Name',
    artist: "Destiny's Child",
    album: "The Writing's on the Wall",
    youtubeVideoId: 'JHed3iCPesM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/73/Say_My_Name_%281999_single%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Poison',
    artist: 'Bardot',
    album: 'Bardot',
    youtubeVideoId: 'aviFNB0Ebx0',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/a/af/Poisonbardot.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Bye Bye Bye',
    artist: '*NSYNC',
    album: 'No Strings Attached',
    youtubeVideoId: '2ydCvkxuNm4',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/1/14/Bye_Bye_Bye.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Who the Hell Are You',
    artist: 'Madison Avenue',
    album: 'The Polyester Embassy',
    youtubeVideoId: 'r1FFfBp9zsc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2f/Whothehellareyou.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Groovejet (If This Ain't Love)",
    artist: 'Spiller feat. Sophie Ellis-Bextor',
    album: 'Read My Lips',
    youtubeVideoId: 'npJTeRjRX-8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/1b/Spiller-groovejet.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Shackles (Praise You)',
    artist: 'Mary Mary',
    album: 'Thankful',
    youtubeVideoId: 'i1L2lToMlB4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/dd/Mary_Mary_-_Shackles_%28Praise_You%29%28LQ%29.jpeg',
      artist: null,
    },
  }),
]

export default songs
