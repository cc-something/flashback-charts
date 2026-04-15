import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://www.aria.com.au/charts/2019/singles-chart',
}

export const description =
  'Sparse beats, trap-pop drift, and mood-first songwriting shaped 2019. The charts felt looser and more internet-native, with less need for traditional radio polish.'

const year = 2019

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

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Old Town Road',
    artist: 'Lil Nas X featuring Billy Ray Cyrus',
    album: '7 (EP)',
    youtubeVideoId: 'w2Ov5jzm3j8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/62/Old_Town_Road_Remix_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming (EP)',
    youtubeVideoId: 'q0hyYWKXF0Q',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/1f/Dance_Monkey_by_Tones_and_I.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    youtubeVideoId: 'DyDfgMOUjCI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/33/Billie_Eilish_-_Bad_Guy.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Sunflower',
    artist: 'Post Malone and Swae Lee',
    album:
      'Spider-Man: Into the Spider-Verse: Original Motion Picture Soundtrack',
    youtubeVideoId: 'ApXoWvfEYVU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/d0/Sunflower_promo.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    album: 'Divinely Uninspired to a Hellish Extent',
    youtubeVideoId: 'bCuhuePlP8o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a6/Lewis_Capaldi_-_Someone_You_Loved.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "I Don't Care",
    artist: 'Ed Sheeran and Justin Bieber',
    album: 'No.6 Collaborations Project',
    youtubeVideoId: 'y83x7MgzWOA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/69/Ed_Sheeran_%26_Justin_Bieber_-_I_Don%27t_Care.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Wow.',
    artist: 'Post Malone',
    album: "Hollywood's Bleeding",
    youtubeVideoId: '393C3pr2ioY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/5e/Post_Malone_-_Wow.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Señorita',
    artist: 'Shawn Mendes and Camila Cabello',
    album: 'Shawn Mendes / Romance',
    youtubeVideoId: 'Pkh8UtuejGw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/8/8d/Shawn_Mendes_and_Camila_Cabello_-_Se%C3%B1orita.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Shallow',
    artist: 'Lady Gaga and Bradley Cooper',
    album: 'A Star Is Born: Original Motion Picture Soundtrack',
    youtubeVideoId: 'bo_efYhYU2A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e0/A_Star_Is_Born_%282018_soundtrack%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: '7 Rings',
    artist: 'Ariana Grande',
    album: 'Thank U, Next',
    youtubeVideoId: 'QYh6mYIJG2Y',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b7/Ariana_Grande_-_7_rings.png',
      artist: null,
    },
  }),
]

export default songs
