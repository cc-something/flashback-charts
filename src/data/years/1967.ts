import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1967

export const description =
  'Psychedelia was knocking on the door, but the Australian charts still leaned heavily toward romantic ballads, easy listening, and polished pop. The Summer of Love filtered through in flashes, with baroque pop and dreamy production creeping into the mix. Folk-pop vocal groups remained hugely popular, giving the year a warm, singalong quality.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1967_in_Australia',
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

// Source: Kent Music Report 1967 year-end chart
// Via: Wikipedia - List of top 25 singles for 1967 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'The Last Waltz',
    artist: 'Engelbert Humperdinck',
    album:
      '20th Century Masters - The Millennium Collection: Engelbert Humperdinck',
    youtubeVideoId: 'Wll-a6MOLtY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b1/82/a9/b182a967-c93a-0c27-9cbc-4c97e4e82675/07UMGIM04162.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'This Is My Song',
    artist: 'Petula Clark',
    album: 'Platinum & Gold Collection',
    youtubeVideoId: 'V8XmLuTmKIM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/46/c3/7c/46c37c8e-3bed-31f3-c850-6e191298a75f/0859381158844.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Snoopy vs. the Red Baron',
    artist: 'The Royal Guardsmen',
    album: 'The Best Of The Royal Guardsmen',
    youtubeVideoId: 'Oxzg_iM-T4E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/fa/53/3a/fa533af6-af23-c051-bdd8-ad77af09878b/22UMGIM55576.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Green, Green Grass of Home',
    artist: 'Tom Jones',
    album: 'Green, Green Grass of Home',
    youtubeVideoId: 'EmT1ptv3VEc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/a4/60/ef/a460ef55-308c-7b29-9102-b508450212d5/00602557851656.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Penny Lane / Strawberry Fields Forever',
    artist: 'The Beatles',
    album: 'Strawberry Fields Forever / Penny Lane - Single',
    youtubeVideoId: 'S-rB0pHI9fU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ae/ab/9d/aeab9d09-99cc-8d50-c3b6-6bc31c3d93c7/22UMGIM12166.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "Somethin' Stupid",
    artist: 'Nancy Sinatra and Frank Sinatra',
    album: 'Nothing But the Best (Remastered)',
    youtubeVideoId: '0f48fpoSEPU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3a/37/1a/3a371a7e-33fe-85db-0616-0c57ef26fb42/13UAEIM06265.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Georgy Girl',
    artist: 'The Seekers',
    album: 'The Very Best of The Seekers',
    youtubeVideoId: 'wsIbfYEizLk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/24/77/ad/2477ad40-cb24-f415-fcf6-ffce48a61576/0724385741159_1404x1404_300dpi.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: "All You Need Is Love / Baby, You're a Rich Man",
    artist: 'The Beatles',
    album: 'Magical Mystery Tour',
    youtubeVideoId: 'i5m-sgtwFck',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/43/0e/37/430e3790-75d5-c96a-1380-f9d9803aa700/18UMGIM31245.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'A Whiter Shade of Pale',
    artist: 'Procol Harum',
    album:
      'The Big Chill (Original Motion Picture Soundtrack) [15th Anniversary]',
    youtubeVideoId: 'z0vCwGUZe1I',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/9f/e7/f9/9fe7f9f4-ba2f-b369-707f-76899faf1f2c/06UMGIM07593.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "I'm a Believer / (I'm Not Your) Steppin' Stone",
    artist: 'The Monkees',
    album: "I'm a Believer / (I'm Not Your) Steppin' Stone - EP",
    youtubeVideoId: 'ehWbMmFm6G0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/cd/4c/f0/cd4cf0cf-7ab8-5a60-0cf3-5cc98dfa63be/3616846892210_Cover.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
