import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://www.aria.com.au/charts/2010/singles-chart',
}

export const description =
  'Bright dance-pop, rap features, and huge chorus-first singles set the pace in 2010. The charts felt loud, glossy, and built for radio countdowns.'

const year = 2010

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

// Source: ARIA End of Year Singles Chart
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Love the Way You Lie',
    artist: 'Eminem featuring Rihanna',
    album: 'Recovery',
    youtubeVideoId: 'acMtKzTbAAU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/ed/Love_the_Way_You_Lie_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'OMG',
    artist: 'Usher featuring will.i.am',
    album: 'Raymond v. Raymond',
    youtubeVideoId: 'CvQfmbE82e4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/4c/OMG_Usher_song.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Dynamite',
    artist: 'Taio Cruz',
    album: 'Rokstarr',
    youtubeVideoId: '9UsKxqPvE-A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3e/Taio_Cruz_-_Dynamite_%28Official_Single_Cover%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Hey, Soul Sister',
    artist: 'Train',
    album: 'Save Me, San Francisco',
    youtubeVideoId: 'jXpOVnHjfIg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/15/Hey_Soul_Sister.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'California Gurls',
    artist: 'Katy Perry featuring Snoop Dogg',
    album: 'Teenage Dream',
    youtubeVideoId: 'dIgkAgHffkE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/84/California_Gurls_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Fireflies',
    artist: 'Owl City',
    album: 'Ocean Eyes',
    youtubeVideoId: 'M94XFqsKGhk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/ba/Owlcity_fireflies_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Only Girl (In the World)',
    artist: 'Rihanna',
    album: 'Loud',
    youtubeVideoId: 'jKlHzc6ZH74',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ab/Only_Girl_%28In_the_World%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Just the Way You Are',
    artist: 'Bruno Mars',
    album: 'Doo-Wops & Hooligans',
    youtubeVideoId: 'sTUwQ3jWJKo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/fa/Bruno-mars-just-the-way-you-are.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Teenage Dream',
    artist: 'Katy Perry',
    album: 'Teenage Dream',
    youtubeVideoId: 'T0B4L8ppg2s',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/5c/Teenage_Dream_single_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "DJ Got Us Fallin' in Love",
    artist: 'Usher featuring Pitbull',
    album: 'Versus',
    youtubeVideoId: 'kRFZYAw_D38',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/29/Usherdjgotusfallininlove_Pitbull.jpg',
      artist: null,
    },
  }),
]

export default songs
