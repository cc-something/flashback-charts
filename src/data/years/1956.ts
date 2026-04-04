import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1956

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_Top_25_singles_for_1956_in_Australia',
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

// Source: Australian Chart Book year-end chart for 1956
// Via: Kent Music Report (retro-calculated from state radio charts)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Just Walking in the Rain',
    artist: 'Johnnie Ray',
    album: 'Just Walking in the Rain',
    youtubeVideoId: '8uCsvWgmjwg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/9b/Johnnie_Ray_c._1952_photo.png',
    },
  }),
  getSong({
    rank: 2,
    title: 'Whatever Will Be, Will Be (Que Sera Sera)',
    artist: 'Doris Day',
    album: 'Whatever Will Be, Will Be (Que Sera Sera)',
    youtubeVideoId: 'xZbKHDPPrrc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/87/DorisDay-midnightlace-full.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'The Yellow Rose of Texas',
    artist: 'Mitch Miller',
    album: 'The Yellow Rose of Texas',
    youtubeVideoId: 'q29aJSpA2o0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Mitch_Miller_Sing_Along.JPG',
    },
  }),
  getSong({
    rank: 4,
    title: 'Sixteen Tons',
    artist: 'Tennessee Ernie Ford',
    album: 'Sixteen Tons',
    youtubeVideoId: 'S1980WfKC0o',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/a/ab/Tennessee_Ernie_Ford_1957.JPG',
    },
  }),
  getSong({
    rank: 5,
    title: 'Memories Are Made of This',
    artist: 'Dean Martin',
    album: 'Memories Are Made of This',
    youtubeVideoId: 'KqVUwJvde44',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b0/Dean_Martin_1958.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'The Rock and Roll Waltz',
    artist: 'Kay Starr',
    album: 'The Rock and Roll Waltz',
    youtubeVideoId: 'pJcJIK5olDo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/4/42/KayStarr.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Hot Diggity (Dog Ziggity Boom)',
    artist: 'Perry Como',
    album: 'Hot Diggity (Dog Ziggity Boom)',
    youtubeVideoId: '1jVECp5Dzp4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 8,
    title: 'Mack the Knife',
    artist: 'Louis Armstrong',
    album: 'Mack the Knife',
    youtubeVideoId: 'fZ0OOHLWo4w',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/1/16/Louis_Armstrong_in_Color_%28restored%29.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'The Great Pretender',
    artist: 'The Platters',
    album: 'The Great Pretender',
    youtubeVideoId: 'RBj2HN2uuNA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/5/57/The_Platters_First_Promo_Photo_crop.JPG',
    },
  }),
  getSong({
    rank: 10,
    title: 'The Poor People of Paris',
    artist: 'Les Baxter',
    album: 'The Poor People of Paris',
    youtubeVideoId: 'bv0Ga_i7O6M',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist: 'https://upload.wikimedia.org/wikipedia/en/3/37/Les_Baxter.jpg',
    },
  }),
]

export default songs
