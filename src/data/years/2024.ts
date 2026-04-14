import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2024

export const source = {
  label: 'ARIA Top 100 Singles',
  url: 'https://www.aria.com.au/charts/2024/singles-chart',
}

export const description =
  '2024 ran on hook-first pop and glossy dance production, with songs built to bounce between radio, streaming, and short-form clips. Under the bright surface, a lot of the year still carried a bruised, nostalgic streak.'

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

// Source: ARIA Top 100 Singles 2024
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Beautiful Things',
    artist: 'Benson Boone',
    album: 'Fireworks & Rollerblades',
    youtubeVideoId: 'Z_O58UG2Lmk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/4b/Benson_Boone_-_Beautiful_Things.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'A Bar Song (Tipsy)',
    artist: 'Shaboozey',
    album: "Where I've Been, Isn't Where I'm Going",
    youtubeVideoId: '5wb76pMt6pU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/26/Shaboozey_-_A_Bar_Song_%28Tipsy%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    album: "Short n' Sweet",
    youtubeVideoId: 'fJQsKTbo6j8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/71/Espresso_-_Sabrina_Carpenter.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Stick Season',
    artist: 'Noah Kahan',
    album: 'Stick Season',
    youtubeVideoId: 'LjVI9aqE0y0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/1b/Noah_Kahan_-_Stick_Season_%28song%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Lose Control',
    artist: 'Teddy Swims',
    album: 'Lose Control',
    youtubeVideoId: '4c4JlVlsyIs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/03/Teddy_Swims_-_Lose_Control.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Birds Of A Feather',
    artist: 'Billie Eilish',
    album: 'Hit Me Hard and Soft',
    youtubeVideoId: 'd5gf9dXbPi0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/fe/Billie_Eilish_-_Birds_of_a_Feather_7%22_Vinyl_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'I Had Some Help',
    artist: 'Post Malone Feat. Morgan Wallen',
    album: 'F-1 Trillion',
    youtubeVideoId: 'kZu82V5iuoU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/83/Post_Malone_and_Morgan_Wallen_-_I_Had_Some_Help.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Too Sweet',
    artist: 'Hozier',
    album: 'Unreal Unearth',
    youtubeVideoId: 'Xgq_dZSXyIE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hozier_2015_01_%28cropped%29.jpg/330px-Hozier_2015_01_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    album: 'Lover',
    youtubeVideoId: 'm6XwKBMsZk0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Cruel_Summer.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Million Dollar Baby',
    artist: 'Tommy Richman',
    album: 'Million Dollar Baby',
    youtubeVideoId: 'UTPsTLzdOVI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b5/Tommy_Richman_-_Million_Dollar_Baby.png',
      artist: null,
    },
  }),
]

export default songs
