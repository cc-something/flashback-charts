import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const description =
  'Polished crooners and smooth vocal pop completely owned the Australian charts, with romantic ballads and bittersweet love songs accounting for nearly every top hit. Broadway-flavoured numbers were gaining ground too, and there was a notable nostalgia kick as older standards got fresh recordings that found massive audiences all over again.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_number-one_singles_in_Australia_during_the_1940s',
}

const year = 1947

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

// Source: Australian Chart Book year-end chart for 1947
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Anniversary Song',
    artist: 'Al Jolson; Bing Crosby',
    album: 'Anniversary Song',
    youtubeVideoId: 'PcnpbM0pIJA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Al_Jolson_-_publicity.JPG',
    },
  }),
  getSong({
    rank: 2,
    title: 'Prisoner of Love',
    artist: 'Perry Como; Ink Spots',
    album: 'Prisoner of Love',
    youtubeVideoId: 'lbNPg_Rp0ws',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Perry_Como_1962.JPG/330px-Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 3,
    title: 'To Each His Own',
    artist: 'Ink Spots; Freddy Martin',
    album: 'To Each His Own',
    youtubeVideoId: 'bYFFkABCMoc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/ca/Ink_Spots_Billboard_3.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'Laughing on the Outside (Crying on the Inside)',
    artist: 'Sammy Kaye; Merry Macs',
    album: 'Laughing on the Outside (Crying on the Inside)',
    youtubeVideoId: 'PIZsdcv7NN8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sammy_Kaye_1952.JPG/330px-Sammy_Kaye_1952.JPG',
    },
  }),
  getSong({
    rank: 5,
    title: '(Give Me) Five Minutes More',
    artist: 'Frank Sinatra; Tex Beneke',
    album: '(Give Me) Five Minutes More',
    youtubeVideoId: 'GvWEigjXVsI',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Frank_Sinatra_1961.jpg/330px-Frank_Sinatra_1961.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'April Showers',
    artist: 'Al Jolson',
    album: 'April Showers',
    youtubeVideoId: '_79KIZ1IKcE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Al_Jolson_-_publicity.JPG',
    },
  }),
  getSong({
    rank: 7,
    title: "Mam'selle",
    artist: 'Frank Sinatra; Dick Haymes',
    album: "Mam'selle",
    youtubeVideoId: '2szBW-R926E',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Frank_Sinatra_1961.jpg/330px-Frank_Sinatra_1961.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: "They Say It's Wonderful",
    artist: 'Bing Crosby; Perry Como',
    album: "They Say It's Wonderful",
    youtubeVideoId: 'avMHoA9kQvw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: "(There's No Business Like) Show Business",
    artist: 'Dick Haymes & Andrews Sisters; Bing Crosby',
    album: "(There's No Business Like) Show Business",
    youtubeVideoId: 'rHQfqm3IcI4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Dick_Haymes.JPG',
    },
  }),
  getSong({
    rank: 10,
    title: 'You Keep Coming Back Like a Song',
    artist: 'Bing Crosby; Dinah Shore',
    album: 'You Keep Coming Back Like a Song',
    youtubeVideoId: 'VAHK4RNDu7k',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
]

export default songs
