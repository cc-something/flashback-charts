import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2005

export const source = {
  label: 'ARIA Charts',
  url: 'https://www.aria.com.au/charts/2005/singles-chart',
}

export const description =
  '2005 leaned hard into club-pop, polished R&B, and emotional singalongs that could fill a car stereo or a dance floor without much effort. Guitar bands were still around, but most of the chart was chasing shine and momentum.'

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

// Source: ARIA year-end singles chart for 2005
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'The Prayer',
    artist: 'Anthony Callea',
    album: 'Anthony Callea',
    youtubeVideoId: 'kVYouTFhRiE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f7/The_Prayer_Anthony_Callea_cover_art.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "Don't Cha",
    artist: 'The Pussycat Dolls feat. Busta Rhymes',
    album: 'PCD',
    youtubeVideoId: 'YNSxNsr4wmA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3c/PCD_Don%27t_Cha.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Lonely',
    artist: 'Akon',
    album: 'Trouble',
    youtubeVideoId: '6EEW-9NDM5k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/75/Akon_CD_Mr_Lonely.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Axel F',
    artist: 'Crazy Frog',
    album: 'Crazy Frog Presents Crazy Hits',
    youtubeVideoId: 'k85mRPqvMbE',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Axel_F_HF.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Over and Over',
    artist: 'Nelly feat. Tim McGraw',
    album: 'Sweat',
    youtubeVideoId: 'n3htOCjafTc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b9/NellyOverandOver.jpeg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Switch',
    artist: 'Will Smith',
    album: 'Lost and Found',
    youtubeVideoId: 'uzUozo1uKOc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0c/Will_Smith_Switch_Cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Let Me Love You',
    artist: 'Mario',
    album: 'Turning Point',
    youtubeVideoId: 'H64QG4UsrGI',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Mario_-_LMLY.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Nasty Girl',
    artist: 'Nitty',
    album: "Player's Paradise",
    youtubeVideoId: 'JYikmKl-1HA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3d/Nitty_-_Nasty_Girl.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Feel Good Inc.',
    artist: 'Gorillaz',
    album: 'Demon Days',
    youtubeVideoId: 'HyHNuVaZJ-k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/dc/Feel_Good_Inc._Artwork.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "Don't Phunk with My Heart",
    artist: 'The Black Eyed Peas',
    album: 'Monkey Business',
    youtubeVideoId: 'YsAQnqMWP_o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/20/Black_Eyed_Peas_-_Dont_Phunk_With_My_Heart_-_CD_cover.jpg',
      artist: null,
    },
  }),
]

export default songs
