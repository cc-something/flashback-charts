import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const description =
  'Swing was king on Australian radios, with uptempo big band numbers and romantic ballads split right down the middle of the charts. Wartime service songs and British morale-boosters sat comfortably alongside cowboy tunes and Latin-flavoured novelties, reflecting how much Australian tastes leaned on both sides of the Atlantic.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index.php?Itemid=54&id=941&option=com_content&task=view',
}

const year = 1941

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

// Source: Australian Chart Book year-end chart for 1941
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'In the Mood',
    artist: 'Glenn Miller; Joe Loss',
    album: 'In the Mood',
    youtubeVideoId: 'dGUEyZshBgE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Glenn_Miller_Billboard.jpg/330px-Glenn_Miller_Billboard.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'A Nightingale Sang in Berkeley Square',
    artist: 'Vera Lynn; The West End Players',
    album: 'A Nightingale Sang in Berkeley Square',
    youtubeVideoId: 'xTeiYN_Vq6E',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Dame_Vera_Lynn_4_Allan_Warren.jpg/330px-Dame_Vera_Lynn_4_Allan_Warren.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: "It's a Great Day for the Irish",
    artist: 'Judy Garland; The Jesters',
    album: "It's a Great Day for the Irish",
    youtubeVideoId: 'gS-I-XGBPYw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Judy_Garland_publicity_photo.png/330px-Judy_Garland_publicity_photo.png',
    },
  }),
  getSong({
    rank: 4,
    title: "Bless 'Em All (The Service Song)",
    artist: 'George Formby',
    album: "Bless 'Em All (The Service Song)",
    youtubeVideoId: 'BYGyAez5_MI',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/George_Formby_with_the_army_in_France%2C_1940_cropped.jpg/330px-George_Formby_with_the_army_in_France%2C_1940_cropped.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Down Argentina Way',
    artist: 'Shep Fields; The West End Players',
    album: 'Down Argentina Way',
    youtubeVideoId: 'jecVlhiU9Hw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Shep_Fields_1957.JPG/330px-Shep_Fields_1957.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Ferryboat Serenade',
    artist: 'The Tic-Toc Rhythm Orchestra; Dick Robertson',
    album: 'Ferryboat Serenade',
    youtubeVideoId: '7UdTgNiNtE8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/88/Dick_Robertson.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: "It's a Lovely Day",
    artist: 'Vera Lynn; Kate Smith',
    album: "It's a Lovely Day",
    youtubeVideoId: 'zjX72vIpxsg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Dame_Vera_Lynn_4_Allan_Warren.jpg/330px-Dame_Vera_Lynn_4_Allan_Warren.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: "Goodbye Little Darlin' Goodbye",
    artist: 'Gene Autry; Bing Crosby',
    album: "Goodbye Little Darlin' Goodbye",
    youtubeVideoId: 'zWzJ2ETYCu8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gene_Autry%2C_NPG_94_39.jpg/330px-Gene_Autry%2C_NPG_94_39.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Trade Winds',
    artist: 'Bing Crosby; Kate Smith',
    album: 'Trade Winds',
    youtubeVideoId: 'n6a7L_Xx5Io',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'The Call of the Canyon',
    artist: 'Gene Autry; Tony Martin',
    album: 'The Call of the Canyon',
    youtubeVideoId: 'Rp_UuTvWn_k',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gene_Autry%2C_NPG_94_39.jpg/330px-Gene_Autry%2C_NPG_94_39.jpg',
    },
  }),
]

export default songs
