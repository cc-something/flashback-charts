import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1957

export const description =
  'Teen pop and rock and roll were now a permanent fixture on the Australian charts, but the old-school crooners still managed to claim the top spots. Love songs dominated either way, whether delivered with a smooth vocal or a driving beat. Country flavours crept in at the edges, giving the year a slightly looser, more casual feel.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_Top_25_singles_for_1957_in_Australia',
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

// Source: Australian Chart Book year-end chart for 1957
// Via: Kent Music Report (retro-calculated from state radio charts)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Around the World',
    artist: 'Bing Crosby',
    album: 'Around the World',
    youtubeVideoId: 'JIF_IWzP7Qk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/e5/Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Diana',
    artist: 'Paul Anka',
    album: 'Diana',
    youtubeVideoId: 'J3XWtwpnKIg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Paul_Anka_performing_at_Caesars_Windsor%2C_2024-05-24_10.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Love Letters in the Sand',
    artist: 'Pat Boone',
    album: 'Love Letters in the Sand',
    youtubeVideoId: '1W6T36-J_XU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/d/d0/8-15-22_Conversations_-_Pat_Boone_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'Round and Round',
    artist: 'Perry Como',
    album: 'Round and Round',
    youtubeVideoId: 'sxtDaTD5S98',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 5,
    title: 'Singing the Blues',
    artist: 'Guy Mitchell',
    album: 'Singing the Blues',
    youtubeVideoId: 'wJA8b3esxfE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Guy_Mitchell.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Hey There',
    artist: 'Rosemary Clooney',
    album: 'Hey There',
    youtubeVideoId: 'n-_licBGCLc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/en/f/f4/Rosemary_Clooney_1954.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'A White Sport Coat (and a Pink Carnation)',
    artist: 'Marty Robbins',
    album: 'A White Sport Coat (and a Pink Carnation)',
    youtubeVideoId: 'wYIIzEOI7Kg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/3/31/Marty_Robbins_1966.JPG',
    },
  }),
  getSong({
    rank: 8,
    title: 'True Love',
    artist: 'Bing Crosby & Grace Kelly',
    album: 'True Love',
    youtubeVideoId: 'zfqFtsINILo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/e5/Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Young Love',
    artist: 'Tab Hunter',
    album: 'Young Love',
    youtubeVideoId: 'gCC5CeiL3-U',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/bf/TABHUnter.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Marianne',
    artist: 'Terry Gilkyson and the Easy Riders',
    album: 'Marianne',
    youtubeVideoId: 'awMq7TDDZkM',
    imageSelection: 'album',
    imageSources: {
      album: 'https://img.youtube.com/vi/bUYDl-foMpk/hqdefault.jpg',
      artist: null,
    },
  }),
]

export default songs
