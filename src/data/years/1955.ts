import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1955

export const description =
  'Rock and roll crashed the Australian charts for the first time, sitting right alongside gentle ballads and Latin-flavoured instrumentals. The old guard of traditional pop was still holding strong, but the energy had unmistakably changed, and teenagers were starting to drive what got played on the radio.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_Top_25_singles_for_1955_in_Australia',
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

// Source: Australian Chart Book year-end chart for 1955
// Via: Kent Music Report (retro-calculated from state radio charts)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Hold My Hand',
    artist: 'Don Cornell',
    album: 'Hold My Hand',
    youtubeVideoId: 'ksfUG6zHBgc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/a/a4/Don_Cornell_1963.JPG',
    },
  }),
  getSong({
    rank: 2,
    title: 'Rock Around the Clock',
    artist: 'Bill Haley and His Comets',
    album: 'Rock Around the Clock',
    youtubeVideoId: '-Hlbn3O7Rpo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/d/df/Bill_Haley_%281974%29.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Melody of Love',
    artist: 'Billy Vaughn',
    album: 'Melody of Love',
    youtubeVideoId: 'M_jd9ClV8-8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/4/49/Gale_Storm_Billy_Vaughn_The_Gale_Storm_Show_1958.JPG',
    },
  }),
  getSong({
    rank: 4,
    title: 'Unchained Melody',
    artist: 'Al Hibbler',
    album: 'Unchained Melody',
    youtubeVideoId: 'DjiA5RzosEY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c6/Al_Hibbler_publicity_photo.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'I Need You Now',
    artist: 'Eddie Fisher',
    album: 'I Need You Now',
    youtubeVideoId: 'B1-b63U5uFc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eddie_Fisher_-_still.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Stranger in Paradise',
    artist: 'Tony Bennett',
    album: 'Stranger in Paradise',
    youtubeVideoId: 'WFrUsa5SUv0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b2/Tony_Bennett_2002.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Mr. Sandman',
    artist: 'The Chordettes',
    album: 'Mr. Sandman',
    youtubeVideoId: 'CX45pYvxDiA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/The_Chordettes_%28cropped%29.JPG',
    },
  }),
  getSong({
    rank: 8,
    title: 'Let Me Go, Lover',
    artist: 'Teresa Brewer',
    album: 'Let Me Go, Lover',
    youtubeVideoId: 'cExfS_g763s',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/8f/Teresa_brewer.png',
    },
  }),
  getSong({
    rank: 9,
    title: 'The Ballad of Davy Crockett',
    artist: 'Tennessee Ernie Ford',
    album: 'The Ballad of Davy Crockett',
    youtubeVideoId: 'TNk_U3xHAPw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/a/ab/Tennessee_Ernie_Ford_1957.JPG',
    },
  }),
  getSong({
    rank: 10,
    title: 'Cherry Pink and Apple Blossom White',
    artist: 'Perez Prado',
    album: 'Cherry Pink and Apple Blossom White',
    youtubeVideoId: 'ggSDeyPu_e4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/6e/Perez_prado_%28cropped%29.jpg',
    },
  }),
]

export default songs
