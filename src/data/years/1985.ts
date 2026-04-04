import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1985

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1985_in_Australia',
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

// Source: Kent Music Report 1985 year-end chart
// Via: Wikipedia - List of top 25 singles for 1985 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'We Are the World',
    artist: 'USA for Africa',
    album: 'We Are the World - Single',
    youtubeVideoId: '9AjkUyX0rVw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/y2005/m01/d20/h14/s05.bkornbke.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Angel / Into the Groove',
    artist: 'Madonna',
    album: 'Angel',
    youtubeVideoId: '52iW3lcpK5M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6c/49/6f/6c496fa6-50d0-c5e6-3481-33c2401a653f/603497823475.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Crazy for You',
    artist: 'Madonna',
    album: 'Something to Remember',
    youtubeVideoId: 'DHutZXREZ0E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9c/ab/cb/9cabcb8c-61be-b83d-ba42-43f950680725/mzi.ogaspvuv.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Live It Up',
    artist: 'Mental As Anything',
    album: 'Essential as Anything (30th Anniversary Edition)',
    youtubeVideoId: 'kK_eQImKnPA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/36/b9/2d/36b92d9c-5ffa-92fa-73f6-e13822a96003/5032698678860.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'I Want to Know What Love Is',
    artist: 'Foreigner',
    album: 'Agent Provocateur',
    youtubeVideoId: 'r3Pr1_v7hsw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/eb/17/49/eb1749a8-29a1-83ef-5d0e-ec3394d3d057/075678279669.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Out of Mind, Out of Sight',
    artist: 'Models',
    album: 'Out Of Mind, Out Of Sight (35th Anniversary Edition)',
    youtubeVideoId: 'k5EZmJoNeYs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2e/5a/de/2e5adebe-4906-f86c-9f53-4a0ada736173/190295074845.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Money for Nothing',
    artist: 'Dire Straits',
    album: 'Private Investigations: The Best of Dire Straits & Mark Knopfler',
    youtubeVideoId: 'wTP2RUD_cL0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/c3/91/ff/c391ff50-caba-db8a-2387-6c906d2ca65c/mzi.gyijrdqr.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'I Got You Babe',
    artist: 'UB40 with Chrissie Hynde',
    album: 'The Very Best Of',
    youtubeVideoId: '2aP4GaAruws',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e8/a1/f4/e8a1f4ec-e0c0-6423-d2a1-16d6d9bb8275/13UABIM53401.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'I Should Have Known Better',
    artist: 'Jim Diamond',
    album: 'With Love From PolyGram 50th Anniversary',
    youtubeVideoId: 'qWEFNFsFrgE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d9/f3/26/d9f326b0-f196-82c7-15b8-5dcf85e20d9f/20UMGIM67235.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Would I Lie to You?',
    artist: 'Eurythmics',
    album: 'Ultimate Collection (Remastered)',
    youtubeVideoId: 'Uhpu2N4rQZM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/82/46/65/824665ec-aa22-0f93-e511-ba1585978159/mzi.gkkumlce.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
