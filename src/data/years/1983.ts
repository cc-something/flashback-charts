import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1983

export const description =
  "Pop went global and dramatic, with power ballads and flashy dance-pop flooding the Australian charts thanks to MTV's growing influence. Comedy and novelty records still had a uniquely strong showing here, and local humour sat comfortably next to massive international pop crossover hits."

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1983_in_Australia',
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

// Source: Kent Music Report 1983 year-end chart
// Via: Wikipedia - List of top 25 singles for 1983 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Australiana',
    artist: 'Austen Tayshus',
    album: 'The Mule (Original Soundtrack)',
    youtubeVideoId: 'StcXGhuliRk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/dd/2e/dd/dd2edda6-9d96-a8a1-c2f8-0c3b6c17cbb8/cover.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Flashdance... What a Feeling',
    artist: 'Irene Cara',
    album: "What a Feelin' (Bonus Track Version)",
    youtubeVideoId: 'ILWSp0m9G2U',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a6/89/fb/a689fb59-04a8-dd18-d4d4-94c0918f1463/3256.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Gloria',
    artist: 'Laura Branigan',
    album: 'The Best of Branigan',
    youtubeVideoId: 'nNEb2k_EmMg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c4/d2/c7/c4d2c736-a74d-fab1-1c48-a6c162d2d2ee/mzi.pedgwdsn.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    youtubeVideoId: 'Zi_XLOBDo_Y',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Up Where We Belong',
    artist: 'Joe Cocker and Jennifer Warnes',
    album:
      '20th Century Masters - The Millennium Collection: The Best of Joe Cocker',
    youtubeVideoId: 'kpYxZ-1PnlA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/45/bc/c5/45bcc533-2360-4f8d-b783-343c13d6b800/06UMGIM03749.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Total Eclipse of the Heart',
    artist: 'Bonnie Tyler',
    album: 'The Very Best of Bonnie Tyler',
    youtubeVideoId: 'lcOxhH8N3Bo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/00/94/32/0094321d-fc26-c617-b0f5-7f6e24c6d921/886448355717.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Save Your Love',
    artist: 'Renee and Renato',
    album: 'Save Your Love',
    youtubeVideoId: 'm7EnYrW0oQM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/0a/c9/0e/0ac90e0a-7857-5fd0-7e01-c6929e3d47c9/4040589508623_3000.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Karma Chameleon',
    artist: 'Culture Club',
    album: 'Colour By Numbers',
    youtubeVideoId: 'JmcA9LIIXWw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ea/dc/39/eadc39bf-f349-a141-a5c4-12b3d9b018cb/14ULAIM00351.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Beat It',
    artist: 'Michael Jackson',
    album: 'Thriller',
    youtubeVideoId: 'oRdxUFDoQe0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Every Breath You Take',
    artist: 'The Police',
    album: 'The Very Best of Sting & The Police',
    youtubeVideoId: 'OMOGaugKpzs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/42/b7/db/42b7dbe1-d13f-c600-5b78-daa57c5d0f08/06UMGIM50761.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
