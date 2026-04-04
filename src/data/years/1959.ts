import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1959

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_Top_25_singles_for_1959_in_Australia',
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

// Source: Australian Chart Book year-end chart for 1959
// Via: Kent Music Report (retro-calculated from state radio charts)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Smoke Gets in Your Eyes',
    artist: 'The Platters',
    album: 'Smoke Gets in Your Eyes',
    youtubeVideoId: 'vfBboBz3yoc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/5/57/The_Platters_First_Promo_Photo_crop.JPG',
    },
  }),
  getSong({
    rank: 2,
    title: "Joey's Song",
    artist: 'Bill Haley and His Comets',
    album: "Joey's Song",
    youtubeVideoId: '9fmyJLclU1M',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/62/Bill_Haley_and_the_Comets1956.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'A Fool Such as I',
    artist: 'Elvis Presley',
    album: 'A Fool Such as I',
    youtubeVideoId: '-unOfZiTM_0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'The Battle of New Orleans',
    artist: 'Johnny Horton',
    album: 'The Battle of New Orleans',
    youtubeVideoId: 'mjXM6x_0KZk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Personality',
    artist: 'Lloyd Price',
    album: 'Personality',
    youtubeVideoId: 'MvPU-cvaKCM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/2/2e/Publicity_photo_of_Lloyd_Price_-_ht24wk00x_files_046435e7-3a2b-42be-b859-88a492e9b836_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'Oh Yeah Uh Huh',
    artist: 'Col Joye and the Joy Boys',
    album: 'Oh Yeah Uh Huh',
    youtubeVideoId: '7QqXYK2uFsM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'The Three Bells',
    artist: 'The Browns',
    album: 'The Three Bells',
    youtubeVideoId: 'HTkbj56bnYs',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: "I'll Never Fall in Love Again",
    artist: 'Johnnie Ray',
    album: "I'll Never Fall in Love Again",
    youtubeVideoId: '-O67mmaAfSk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/9b/Johnnie_Ray_c._1952_photo.png',
    },
  }),
  getSong({
    rank: 9,
    title: 'Venus',
    artist: 'Frankie Avalon',
    album: 'Venus',
    youtubeVideoId: 'PIb3VCbBrHo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/97/Frankie_Avalon_1959.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Mona Lisa',
    artist: 'Conway Twitty',
    album: 'Mona Lisa',
    youtubeVideoId: 'tvUz3CyQbHk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Conway_Twitty%2C_c._1980s_portrait.png',
    },
  }),
]

export default songs
