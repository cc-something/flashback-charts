import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1995

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1995_in_Australia',
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

const songs: Song[] = [
  getSong({
    rank: 1,
    title: "Gangsta's Paradise",
    artist: 'Coolio',
    album: "Gangsta's Paradise",
    youtubeVideoId: 'fPO76Jlnz6c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Gangsta%27s_paradise.jpg/250px-Gangsta%27s_paradise.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "Stayin' Alive",
    artist: 'N-Trance',
    album: 'Electronic Pleasure',
    youtubeVideoId: 'qiKOif0UKRM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Stayin%27_Alive_%28N-Trance_cover%29.jpg/250px-Stayin%27_Alive_%28N-Trance_cover%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Kiss from a Rose',
    artist: 'Seal',
    album: 'Batman Forever: Music from the Motion Picture',
    youtubeVideoId: 'hDd2G_V1rzc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/SealKissFromARose2.jpg/250px-SealKissFromARose2.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Mouth',
    artist: 'Merril Bainbridge',
    album: 'The Garden',
    youtubeVideoId: '5AlklK5q0wQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/MouthCD.jpg/250px-MouthCD.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Another Night',
    artist: 'Real McCoy',
    album: 'Another Night',
    youtubeVideoId: 'Pav2f4b-1ZE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Another_Night_Real_McCoy_1993_German_edition.jpg/250px-Another_Night_Real_McCoy_1993_German_edition.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Have You Ever Really Loved a Woman?',
    artist: 'Bryan Adams',
    album: 'Don Juan DeMarco: Original Motion Picture Soundtrack',
    youtubeVideoId: 'diKIYv8tMC8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/HaveYouEverLovedAWoman.jpg/250px-HaveYouEverLovedAWoman.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Zombie',
    artist: 'The Cranberries',
    album: 'No Need to Argue',
    youtubeVideoId: '6Ejga4kJUts',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/The_Cranberries_-_Zombie.jpg/250px-The_Cranberries_-_Zombie.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: "Let's Groove",
    artist: 'CDB',
    album: 'Glide with Me',
    youtubeVideoId: 'oYCx1WA072U',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Glide-with-me-by-cdb.jpg/250px-Glide-with-me-by-cdb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Back for Good',
    artist: 'Take That',
    album: 'Nobody Else',
    youtubeVideoId: 'N2ICtCO8TCw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Back_for_Good_cover.png/250px-Back_for_Good_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'You Are Not Alone',
    artist: 'Michael Jackson',
    album: 'HIStory: Past, Present and Future, Book I',
    youtubeVideoId: 'pAyKJAtDNCw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/You_Are_Not_Alone.jpg/250px-You_Are_Not_Alone.jpg',
      artist: null,
    },
  }),
]

export default songs
