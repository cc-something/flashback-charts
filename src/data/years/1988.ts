import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1988

export const description =
  'Romantic soundtrack ballads and polished pop dominated, with the Dirty Dancing phenomenon sweeping Australian charts well into the year. Homegrown artists were hitting peak confidence, and a nostalgic streak ran through the top ten, blending new pop gloss with classic rock warmth.'

export const source = {
  label: 'ARIA Charts',
  url: 'https://www.aria.com.au/charts/1988/singles-chart',
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

// Source: ARIA End of Year Singles Chart for 1988
// Via: Wikipedia - List of top 25 singles for 1988 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "(I've Had) The Time of My Life",
    artist: 'Bill Medley and Jennifer Warnes',
    album: 'Dirty Dancing (Original Motion Picture Soundtrack)',
    youtubeVideoId: 'nBJNyE7q-mA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/8c/f2/1f/8cf21f62-eed1-64c0-e710-df52dc3556c3/078635640823.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Simply Irresistible',
    artist: 'Robert Palmer',
    album: 'Heavy Nova',
    youtubeVideoId: '2v7dD4LNY48',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5e/7f/ac/5e7fac42-1bdd-a740-ae37-421b45dcfad5/724359030654.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'The Flame',
    artist: 'Cheap Trick',
    album: 'The Essential Cheap Trick',
    youtubeVideoId: '0IMSiZKIdLo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/01/08/1a010844-9cde-9195-32e3-c17d043dec16/dj.mzmirbki.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Get Outta My Dreams, Get into My Car',
    artist: 'Billy Ocean',
    album: 'Tear Down These Walls',
    youtubeVideoId: 'zNgcYGgtf8M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a9/ee/fd/a9eefd6d-667d-0d6d-87ff-3da7a5d8361f/mzi.abkecwqm.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'I Should Be So Lucky',
    artist: 'Kylie Minogue',
    album: 'I Should Be so Lucky',
    youtubeVideoId: 'OiZlXOAOLLw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/27/9c/9e/279c9e1c-b006-4d3a-fb25-63ff64afc943/5060203290115.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Perfect',
    artist: 'Fairground Attraction',
    album: 'The First of a Million Kisses',
    youtubeVideoId: '_gCFSLkJBQw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/d6/91/00/mzi.bfsjjmzx.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'What a Wonderful World',
    artist: 'Louis Armstrong',
    album: 'What a Wonderful World',
    youtubeVideoId: 'ddLd0QRf7Vg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2e/8c/2f/2e8c2f46-4148-d40d-61dc-2cc8e2493aab/12UMGIM11012.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    album: 'Whenever You Need Somebody',
    youtubeVideoId: 'nsCIeklgp1M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/db/9e/2a/db9e2ae0-cb9f-f2a9-2774-de399dff2580/4099964133639.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Age of Reason',
    artist: 'John Farnham',
    album: 'Age of Reason',
    youtubeVideoId: 'adVR3MT8fGg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/17/27/65/172765fb-2b69-759b-fc64-caacc6dae466/mzi.tpludmjt.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Better Be Home Soon',
    artist: 'Crowded House',
    album: 'Temple of Low Men (Deluxe)',
    youtubeVideoId: 'hpc5Tb7QdKU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/19/f4/bc/19f4bceb-e1df-ce7d-404d-ace5b6092547/00600753720141.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
