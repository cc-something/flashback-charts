import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1963

export const description =
  'The British Invasion hit Australia like a freight train, with beat pop flooding the charts and changing everything almost overnight. Surf rock instrumentals and sweet teen pop still had a foothold, but the excitement around UK groups was impossible to ignore. Local rock and roll acts were holding on, feeding off the new energy coming from overseas.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1963_in_Australia',
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

// Source: Kent Music Report 1963 year-end chart
// Via: Wikipedia - List of top 25 singles for 1963 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'I Want to Hold Your Hand',
    artist: 'The Beatles',
    album: 'Meet The Beatles!',
    youtubeVideoId: 'jenWdylTtzs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/83/56/3c/83563c70-437e-af42-4327-32842b34d467/00602537669042.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'She Loves You',
    artist: 'The Beatles',
    album: 'She Loves You',
    youtubeVideoId: 'nGbWU8S3vzs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/01/69/02/01690216-48fc-1c54-b1de-48170d16b1c3/00602567725268.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Tamoure',
    artist: 'Bill Justis',
    album: 'His Very Best',
    youtubeVideoId: '4IwmnTopT0A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/ab/e9/2c/mzi.fnqypzld.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'From a Jack to a King',
    artist: 'Ned Miller',
    album: 'From a Jack to a King',
    youtubeVideoId: 'vJEs2uM7zaM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/35/9a/95/359a959d-2de8-7935-ac3b-fb276cacb448/Ned_Miller_-_From_a_Jack_to_a_King.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Pipeline',
    artist: 'The Chantays',
    album: 'Pipeline',
    youtubeVideoId: 'ZFucCXherLg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/b0/e2/e8b0e27d-b8ab-106c-e64a-1ea8cc8cdefa/00602537769216.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Hey Paula',
    artist: 'Paul and Paula',
    album: 'Hey Paula',
    youtubeVideoId: 'tu26InG0bmE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/87/0f/e8/870fe8b2-34aa-49b9-c2ee-c2cad1b9231d/Paul_Paula_-_Hey_Paula.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Sugar Shack',
    artist: 'Jimmy Gilmer and the Fireballs',
    album: 'Sugar Shack',
    youtubeVideoId: '5ksZvHFxd9M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f6/cc/de/f6ccdebd-1c36-cedb-6c84-a39436b4e435/196626712318.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'I Will Follow Him',
    artist: 'Little Peggy March',
    album: 'I Will Follow Him',
    youtubeVideoId: 'V-7vnnuaoog',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/c8/df/73/c8df7390-4f08-d0c6-bafe-c79fa61f8ecc/Little_Peggy_March_-_I_Will_Follow_Him.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Return to Sender',
    artist: 'Elvis Presley',
    album: 'Girls! Girls! Girls! (Original Soundtrack)',
    youtubeVideoId: 'LZmUfUBqE-s',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/58/de/2c/58de2c6e-31ea-046c-a30d-58d1ecefa25a/886445009811.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "Move Baby Move / You'll Never Cherish a Love So True",
    artist: "Johnny O'Keefe",
    album: 'The Wild One',
    youtubeVideoId: '3nse9mFmG9c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/75/94/a3/mzi.kacfzarc.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
