import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1968

export const description =
  'Sentimental pop and whimsical novelty hits sat comfortably alongside more ambitious, experimental singles on the Australian charts. Folk and Irish singalong numbers were surprisingly popular, while orchestral easy listening still pulled big numbers. Underneath it all, psychedelic rock and protest culture were gaining real momentum as the Vietnam War weighed heavily on the national mood.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1968_in_Australia',
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

// Source: Kent Music Report 1968 year-end chart
// Via: Wikipedia - List of top 25 singles for 1968 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Hey Jude / Revolution',
    artist: 'The Beatles',
    album: 'The Beatles 1967-1970 (The Blue Album)',
    youtubeVideoId: 'BGLGzRXY5Bw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a6/8b/65/a68b657c-cac6-68e6-3bde-b79d58fbc795/18UMGIM30762.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Sadie (The Cleaning Lady)',
    artist: 'Johnny Farnham',
    album: 'One Voice',
    youtubeVideoId: 'r0c55lXRAeg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/03/b4/fc/mzi.gbjehgaa.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Love Is Blue',
    artist: 'Paul Mauriat',
    album: 'Blooming Hits',
    youtubeVideoId: 'Y_tPE3o5NWk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4c/1b/f5/4c1bf5a9-37e1-7c9c-c590-ded0e9d62d8a/00602567781820.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Honey',
    artist: 'Bobby Goldsboro',
    album: 'Honey',
    youtubeVideoId: 'UKAeeGnAYBo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/10/8b/d5/108bd543-daf6-edbf-e6c0-b45d43d0c328/00094639259656.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'The Unicorn',
    artist: 'The Irish Rovers',
    album: 'The Unicorn',
    youtubeVideoId: 'mN-uA9CiV_w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/72/1e/5f/721e5f50-17c0-f570-cb72-f8e987164ab7/00008811195823.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Those Were the Days',
    artist: 'Mary Hopkin',
    album: 'Post Card',
    youtubeVideoId: 'JnxTT7XXMPA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f2/65/b1/f265b10f-cb87-a4e8-bf38-288ebb681cde/05099994647754.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Little Arrows',
    artist: 'Leapy Lee',
    album: '50th Anniversary Album',
    youtubeVideoId: 'QQHuAX5h5XA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/fc/07/45/fc0745e1-1a3a-9352-56ed-ef5f1983d8af/leapy.png/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'The Orange and the Green / Whiskey on a Sunday',
    artist: 'The Irish Rovers',
    album: 'The Unicorn',
    youtubeVideoId: 'Qqs4EbU02As',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/72/1e/5f/721e5f50-17c0-f570-cb72-f8e987164ab7/00008811195823.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'MacArthur Park',
    artist: 'Richard Harris',
    album: 'A Tramp Shining',
    youtubeVideoId: '9GKqEmAnWMo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/5e/22/05/5e22053a-224d-f64d-e7a0-a08965db78c9/00008811078027.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Hello, Goodbye / I Am the Walrus',
    artist: 'The Beatles',
    album: 'Magical Mystery Tour',
    youtubeVideoId: 'HdoYM8MaD78',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/43/0e/37/430e3790-75d5-c96a-1380-f9d9803aa700/18UMGIM31245.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
