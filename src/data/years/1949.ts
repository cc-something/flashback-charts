import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index.php?id=933&option=com_content&task=view',
}

const year = 1949

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

// Source: Australian Chart Book year-end chart for 1949
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Buttons and Bows',
    artist: 'Dinah Shore; Buddy Clark',
    album: 'Buttons and Bows',
    youtubeVideoId: 'vZsA7HQXXBE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Dinah_Shore_-_promo.jpg/330px-Dinah_Shore_-_promo.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Lavender Blue (Dilly Dilly)',
    artist: 'Burl Ives; Dinah Shore',
    album: 'Lavender Blue (Dilly Dilly)',
    youtubeVideoId: 'oH5q11bG3zk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Burl_Ives_-_Cat_on_a_Hot_Tin_Roof_%281958_press_photo%29_%28cropped%29.png/330px-Burl_Ives_-_Cat_on_a_Hot_Tin_Roof_%281958_press_photo%29_%28cropped%29.png',
    },
  }),
  getSong({
    rank: 3,
    title: 'On a Slow Boat to China',
    artist: 'Kay Kyser',
    album: 'On a Slow Boat to China',
    youtubeVideoId: 'QhMVtDI4o8s',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Kay_Kyser_Billboard.jpg/330px-Kay_Kyser_Billboard.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'Far Away Places',
    artist: 'Bing Crosby; Joe Loss',
    album: 'Far Away Places',
    youtubeVideoId: 'HVfexxLtyLg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Rambling Rose',
    artist: 'Perry Como; Tony Martin',
    album: 'Rambling Rose',
    youtubeVideoId: 'xxwL-6uKIes',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Perry_Como_1962.JPG/330px-Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Riders in the Sky',
    artist: 'Vaughn Monroe; Bing Crosby',
    album: 'Riders in the Sky',
    youtubeVideoId: 'YAPCxfuBzyo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/87/Vaughn_Monroe.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Galway Bay',
    artist: 'Bing Crosby',
    album: 'Galway Bay',
    youtubeVideoId: 'gt7NdiFeYJA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'My Happiness',
    artist: 'Jon & Sandra Steele; Marlin Sisters',
    album: 'My Happiness',
    youtubeVideoId: 'ewCRI04Sq10',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/8/82/My_Happiness.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Ballerina',
    artist: 'Vaughn Monroe; Bing Crosby',
    album: 'Ballerina',
    youtubeVideoId: 'K3veIFyNGbo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/87/Vaughn_Monroe.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Careless Hands',
    artist: 'Sammy Kaye; Bing Crosby',
    album: 'Careless Hands',
    youtubeVideoId: '9NTaFd3Dwuk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sammy_Kaye_1952.JPG/330px-Sammy_Kaye_1952.JPG',
    },
  }),
]

export default songs
