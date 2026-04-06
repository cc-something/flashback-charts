import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2014_in_Australia',
}

export const description =
  '2014 was upbeat and accessible, with pop, crossover hits, and feel-good energy carrying the year. Songs landed quickly and stuck around.'

const year = 2014

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
    title: 'Happy',
    artist: 'Pharrell Williams',
    album: 'Girl',
    youtubeVideoId: 'ZbZSe6N_BXs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/23/Pharrell_Williams_-_Happy.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'All About That Bass',
    artist: 'Meghan Trainor',
    album: 'Title',
    youtubeVideoId: '7PCkvCPvDXk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/24/Meghan_Trainor_-_All_About_That_Bass_%28Official_Single_Cover%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Shake It Off',
    artist: 'Taylor Swift',
    album: '1989',
    youtubeVideoId: 'nfWlot6h_JM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c4/Taylor_Swift_-_Shake_It_Off.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Geronimo',
    artist: 'Sheppard',
    album: 'Bombs Away',
    youtubeVideoId: 'E-SeaCZE4jM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/96/Sheppard_-_Geronimo.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Que Sera',
    artist: 'Justice Crew',
    album: 'Que Sera',
    youtubeVideoId: 'jJMxwBmQWHA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ac/Justice_Crew_Que_Sera_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Chandelier',
    artist: 'Sia',
    album: '1000 Forms of Fear',
    youtubeVideoId: '2vjPBrBU-TM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/32/Sia_Chandelier.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    album: '×',
    youtubeVideoId: 'lp-EO5I60KA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3e/Thinking_Out_Loud_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Stay with Me',
    artist: 'Sam Smith',
    album: 'In the Lonely Hour',
    youtubeVideoId: 'pB-5XG-DbAA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/73/Sam_Smith_Stay_with_Me.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Freaks',
    artist: 'Timmy Trumpet and Savage',
    album: 'Freaks',
    youtubeVideoId: 'ofmzX1nMzRQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/74/Freaks-Timmy-Trumpet-Savage.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Ugly Heart',
    artist: 'G.R.L.',
    album: 'Ugly Heart',
    youtubeVideoId: 'RIHxxnXmNBk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bc/Ugly_Heart_by_GRL.png',
      artist: null,
    },
  }),
]

export default songs
