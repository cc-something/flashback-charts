import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1980

export const description =
  'New wave and post-punk were crashing into the Australian mainstream, but disco and pop holdovers still had a firm grip on the charts. Local acts were starting to find their voice with quirky, guitar-driven singles, while funk and novelty tracks kept dancefloors packed across the country.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1980_in_Australia',
}

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

// Source: Kent Music Report 1980 year-end chart
// Via: Wikipedia - List of top 25 singles for 1980 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'I Got You',
    artist: 'Split Enz',
    album: 'True Colours',
    youtubeVideoId: 'wiqBlKnb91A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/33/45/fc/3345fcf5-ba8c-f076-b13d-863d1efb76d1/18UMGIM40846.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Turning Japanese',
    artist: 'The Vapors',
    album: 'Turning Japanese - Best of the Vapors',
    youtubeVideoId: 'nGy9uomagO4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a9/35/80/a935805f-5754-3077-3884-377aa561af85/0724385389856_1400x1400_300dpi.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Crazy Little Thing Called Love',
    artist: 'Queen',
    album: 'The Game (Deluxe Edition)',
    youtubeVideoId: 'zO6D_BAuYCI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bb/d4/75/bbd475e4-71ce-65d3-f622-e212b0dc9ecb/14DMGIM05605.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Another Brick in the Wall, Pt. 2',
    artist: 'Pink Floyd',
    album: 'The Wall',
    youtubeVideoId: 'HrxX9TBj2zY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3e/17/ec/3e17ec6d-f980-c64f-19e0-a6fd8bbf0c10/886445635850.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Brass in Pocket',
    artist: 'Pretenders',
    album: 'Pretenders (Expanded Edition) [2006 Remaster]',
    youtubeVideoId: '0H6re3PCP3E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/93/5c/a6/935ca680-f52e-d7da-f736-5470e48880bf/mzi.klixczwp.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "Can't Stop the Music",
    artist: 'Village People',
    album: "Can't Stop The Music (The Original Motion Picture Soundtrack)",
    youtubeVideoId: 'H_GT_2Z4xlU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/64/5e/56/645e5622-080c-64a7-c0d6-9d072ab68bc9/25UM1IM25557.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Space Invaders',
    artist: 'Player One',
    album: 'Space Invaders',
    youtubeVideoId: 'F2lGJMrUUHw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/16/Space_Invaders_%28Player_One_single%2C_cover_art_-_Australian_version%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'More Than I Can Say',
    artist: 'Leo Sayer',
    album: 'The Very Best of Leo Sayer',
    youtubeVideoId: 'GnIlo91CrBw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9e/df/4c/9edf4c10-3f97-2403-d298-045fa7e0e889/s06.hquvnizh.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Funkytown',
    artist: 'Lipps, Inc.',
    album: 'Mouth To Mouth',
    youtubeVideoId: 'Z6dqIYKIBSU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5b/8c/4c/5b8c4cd8-4d72-307f-da43-85dd8d9beb95/21UMGIM07561.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "Please Don't Go",
    artist: 'KC and the Sunshine Band',
    album: 'Do You Wanna Go Party',
    youtubeVideoId: 'PwrVePMx6t0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/y2004/m10/d21/h13/s06.uxenjjhu.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
