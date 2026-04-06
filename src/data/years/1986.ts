import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1986

export const description =
  'Dance-pop and hi-NRG production took over, with uptempo floor-fillers and polished pop vocals pushing the charts toward pure fun. Movie soundtracks continued to deliver huge singles, and homegrown synth-pop acts were finally breaking through alongside the British and American heavyweights.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1986_in_Australia',
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

// Source: Kent Music Report 1986 year-end chart
// Via: Wikipedia - List of top 25 singles for 1986 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Chain Reaction',
    artist: 'Diana Ross',
    album: 'Eaten Alive (Expanded Edition)',
    youtubeVideoId: 'PcMD2Gs9fwU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/62/98/51/62985110-c17c-d4d6-be80-91a5a421f404/886445099515.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'When the Going Gets Tough, the Tough Get Going',
    artist: 'Billy Ocean',
    album: 'The Very Best of Billy Ocean',
    youtubeVideoId: '-n3sUWR4FV4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a9/ee/fd/a9eefd6d-667d-0d6d-87ff-3da7a5d8361f/mzi.abkecwqm.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Touch Me (I Want Your Body)',
    artist: 'Samantha Fox',
    album: '80s Dance',
    youtubeVideoId: 'W1btg3mpEOc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/f4/16/31f416e3-563a-c7d9-55d2-ce4b8d0f8c9c/4050538457902.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Venus',
    artist: 'Bananarama',
    album: "True Confessions (Collector's Edition)",
    youtubeVideoId: 'd4-1ASpdT1Y',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/33/0f/4c/330f4c31-6b9a-b346-e625-01e8fba322cb/190295715762.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Stimulation',
    artist: 'Wa Wa Nee',
    album: 'The Essential Wa Wa Nee',
    youtubeVideoId: 'DAHhjeXuiHk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/c0/3e/dd/c03edd53-03aa-1593-bca7-fa73bc4ec9f6/884977809985.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Take My Breath Away',
    artist: 'Berlin',
    album:
      'Top Gun (Original Motion Picture Soundtrack) [Special Expanded Edition]',
    youtubeVideoId: 'Bx51eegLTY8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/81/2f/27/812f27f8-4c88-7b16-8a54-5113fa169781/dj.jvcruggi.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Living Doll',
    artist: 'Cliff Richard and The Young Ones',
    album: 'Living Doll - Single',
    youtubeVideoId: 'gGOU0o9K89g',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8e/a5/56/8ea55640-2eb6-c61e-731a-29bbf4f906fe/5054197519932.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'A Good Heart',
    artist: 'Feargal Sharkey',
    album: 'Feargal Sharkey',
    youtubeVideoId: '8Z2qFTbyyOQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/d3/7d/0d/d37d0d34-7e55-5b7c-b629-6b59bf424475/00724384246259.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Papa Don't Preach",
    artist: 'Madonna',
    album: 'True Blue',
    youtubeVideoId: 'G333Is7VPOg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ab/f6/3d/abf63d25-a582-a1ef-dcc1-65dcda1ecbcb/mzi.klximtlq.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Addicted to Love',
    artist: 'Robert Palmer',
    album: 'Riptide',
    youtubeVideoId: 'XcATvu5f9vE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/72/0b/20/720b2054-4bd9-b4ae-624a-26b0311d7b8f/00042282646323.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
