import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2003

export const source = {
  label: 'ARIA Charts',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2003_in_Australia',
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

// Source: ARIA year-end singles chart for 2003
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Angels Brought Me Here',
    artist: 'Guy Sebastian',
    album: 'Just as I Am',
    youtubeVideoId: 'mMo67Nb-jeA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/9d/Angels_Brought_Me_Here.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Lose Yourself',
    artist: 'Eminem',
    album: '8 Mile: Music from and Inspired by the Motion Picture',
    youtubeVideoId: '7YuAzR2XVAM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Lose_Yourself.jpg/330px-Lose_Yourself.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Where Is the Love?',
    artist: 'The Black Eyed Peas',
    album: 'Elephunk',
    youtubeVideoId: 'WpYeekQkAdc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a1/Whereisthelove_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Born to Try',
    artist: 'Delta Goodrem',
    album: 'Innocent Eyes',
    youtubeVideoId: 'qTBOJ71ypRw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/34/Delta_Goodrem_-_Born_to_Try.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'In da Club',
    artist: '50 Cent',
    album: "Get Rich or Die Tryin'",
    youtubeVideoId: '5qm8PH4xAss',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/12/50_Cent_-_In_Da_Club_-_CD_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Bring Me to Life',
    artist: 'Evanescence',
    album: 'Daredevil: The Album Fallen',
    youtubeVideoId: '3YxaaGgTQYM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bb/Evanescence_-_Bring_Me_to_Life.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Lost Without You',
    artist: 'Delta Goodrem',
    album: 'Innocent Eyes',
    youtubeVideoId: 'YMYUYtsUGgg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b7/DeltaGoodremLostWithoutYou.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'The Ketchup Song',
    artist: 'Las Ketchup',
    album: 'Hijas del Tomate',
    youtubeVideoId: '5llcBScGuAE',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Las_ketchup.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Nu Flow',
    artist: 'Big Brovaz',
    album: 'Nu-Flow',
    youtubeVideoId: 'mhj0Q8wUlqs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/07/Big_Brovaz_-_Nu_Flow_%28CD_1%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Ignition (Remix)',
    artist: 'R. Kelly',
    album: 'Chocolate Factory',
    youtubeVideoId: 'MKvqpnB0SxE',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/d/d4/IgnitionRemix.jpg',
      artist: null,
    },
  }),
]

export default songs
