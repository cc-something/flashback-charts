import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2004

export const source = {
  label: 'ARIA Charts',
  url: 'https://www.aria.com.au/charts/2004/singles-chart',
}

export const description =
  'In 2004, pop-rock, rap crossover, and slick ballads settled into a strong run, all chasing the same thing: a huge hook. The year felt confident, loud, and very comfortable living on the radio.'

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

// Source: ARIA year-end singles chart for 2004
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'What About Me',
    artist: 'Shannon Noll',
    album: "That's What I'm Talking About",
    youtubeVideoId: 'xaYpdAr1Vkk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a1/Shannon_Noll_-_What_About_Me.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Left Outside Alone',
    artist: 'Anastacia',
    album: 'Anastacia',
    youtubeVideoId: '7R_kfiwcMNs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/32/LeftOutsideAlone.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Black Betty',
    artist: 'Spiderbait',
    album: 'Tonight Alright',
    youtubeVideoId: '0rqyh7-am5I',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/64/Black_Betty_by_Spiderbait.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Milkshake',
    artist: 'Kelis',
    album: 'Tasty',
    youtubeVideoId: 'bw4FJx3mTvE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/76/Kelis_-_Milkshake.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: "Fuck It (I Don't Want You Back)",
    artist: 'Eamon',
    album: "I Don't Want You Back",
    youtubeVideoId: 'JsKtBoQ2Jhg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f3/Eamon_I_dont_want_you.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Superstar',
    artist: 'Jamelia',
    album: 'Thank You',
    youtubeVideoId: 'a97tvArlvpE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/7a/Jamelia-superstar.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'My Immortal',
    artist: 'Evanescence',
    album: 'Fallen',
    youtubeVideoId: 'rQ6oVEPrQDo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/76/Evanescence_-_My_Immortal_%28Official_Single_Cover%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'These Kids',
    artist: 'Joel Turner and the Modern Day Poets',
    album: 'Joel Turner and the Modern Day Poets',
    youtubeVideoId: '8yHOWwoFIs8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/95/JTMDP_TheseKids.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Shut Up',
    artist: 'The Black Eyed Peas',
    album: 'Elephunk',
    youtubeVideoId: 'T3vGz5llV8E',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Elephunk.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Suga Suga',
    artist: 'Baby Bash',
    album: "Tha Smokin' Nephew",
    youtubeVideoId: 'f6bIK_QDsB8',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Sugasuga.jpg',
      artist: null,
    },
  }),
]

export default songs
