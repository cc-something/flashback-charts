import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1994

export const description =
  '1994 was heavy on slow-building ballads and easy-to-sing pop, with a warm, sentimental tone running through the whole year. The chart leaned into soft edges and big hooks, but there was still enough grit to keep it from feeling too neat.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1994_in_Australia',
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

// Source: ARIA End of Year singles chart 1994 year-end chart
// Via: Wikipedia - List of top 25 singles for 1994 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Love Is All Around',
    artist: 'Wet Wet Wet',
    album: 'Four Weddings and a Funeral: Music from the Motion Picture',
    youtubeVideoId: 'h3gEkwhdXUE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bb/The_Troggs_-_Love_Is_All_Around.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'I Swear',
    artist: 'All-4-One',
    album: 'All-4-One',
    youtubeVideoId: 'cVpvlaKfLQc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/All-4-One_-_All-4-One.jpg/250px-All-4-One_-_All-4-One.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Always',
    artist: 'Bon Jovi',
    album: 'Cross Road',
    youtubeVideoId: '9BMwcO6_hyA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a5/Always_BonJovi.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "It's Alright",
    artist: 'East 17',
    album: 'Steam',
    youtubeVideoId: 'tP_WRk-xV7I',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e3/East_17_It%27s_Alright.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'The Sign',
    artist: 'Ace of Base',
    album: 'Happy Nation',
    youtubeVideoId: 'iqu132vTl5Y',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/f/f6/TheSign.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'The Power of Love',
    artist: 'Celine Dion',
    album: 'The Colour of My Love',
    youtubeVideoId: 'Y8HOfcYWZoo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f3/Jennifer_rush_the_power_of_love.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "I'll Make Love to You",
    artist: 'Boyz II Men',
    album: 'II',
    youtubeVideoId: 'fV8vB1BB2qc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e1/I%27llMakeLovetoYouB2M.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Please Forgive Me',
    artist: 'Bryan Adams',
    album: 'So Far So Good',
    youtubeVideoId: 'mxVbPEIkfqw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/90/Please_forgive_me.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Tomorrow',
    artist: 'Silverchair',
    album: 'Tomorrow',
    youtubeVideoId: 'PjsMnvqL7eY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/8a/TomorrowEuCover.JPG',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'All for Love',
    artist: 'Bryan Adams, Rod Stewart & Sting',
    album: 'The Three Musketeers: Original Motion Picture Soundtrack',
    youtubeVideoId: 'ofA3URC1wyk',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/2/28/All_For_Love.jpg',
      artist: null,
    },
  }),
]

export default songs
