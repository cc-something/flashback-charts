import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2006

export const source = {
  label: 'ARIA Charts',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2006_in_Australia',
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

// Source: ARIA year-end singles chart for 2006
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'I Wish I Was a Punk Rocker (With Flowers in My Hair)',
    artist: 'Sandi Thom',
    album: 'Smile... It Confuses People',
    youtubeVideoId: 'u3ZvO4pcTHs',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/b/bf/Punkrocker-1.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Flaunt It',
    artist: 'TV Rock feat. Seany B',
    album: 'Flaunt It',
    youtubeVideoId: 'rAScl5zvPCo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f1/TVRock-FlauntIt.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "Hips Don't Lie",
    artist: 'Shakira feat. Wyclef Jean',
    album: 'Oral Fixation Vol. 2',
    youtubeVideoId: 'DUT5rEU6pqM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c0/Shakira-HipsDon%27tLie.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'SexyBack',
    artist: 'Justin Timberlake',
    album: 'FutureSex/LoveSounds',
    youtubeVideoId: '3gOHvDP_vCs',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/2/28/SexyBack.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: "I Don't Feel Like Dancin'",
    artist: 'Scissor Sisters',
    album: 'Ta-Dah',
    youtubeVideoId: '4H5I6y1Qvz0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b0/I_Dont_Feel_Like_Dancin%27_International_Cover.PNG',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "This Time I Know It's for Real",
    artist: 'Young Divas',
    album: 'Young Divas',
    youtubeVideoId: 'VuSwDEUkMYI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a2/This_Time_I_Know_It%27s_For_Real.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Forever Young',
    artist: 'Youth Group',
    album: 'Casino Twilight Dogs',
    youtubeVideoId: '6Wf7CXJV_0E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3b/Alphaville_-_Forever_Young_Single.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Wasabi',
    artist: 'Lee Harding',
    album: 'What About Me',
    youtubeVideoId: 'CsP0MrQdias',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/80/Wasabi-EyeOfTheTiger.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Who Knew',
    artist: 'Pink',
    album: "I'm Not Dead",
    youtubeVideoId: 'NJWIbIe0N90',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/ea/Who_Knew_%28Single%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Promiscuous',
    artist: 'Nelly Furtado feat. Timbaland',
    album: 'Loose',
    youtubeVideoId: '0J3vgcE5i2o',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Promiscuous.png',
      artist: null,
    },
  }),
]

export default songs
