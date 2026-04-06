import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2024

export const source = {
  label: 'ARIA Top 100 Singles',
  url: 'https://www.aria.com.au/charts/2024/singles-chart',
}

export const description =
  '2024 was built on hook-first pop, glossy dance production, and a steady stream of songs that crossed between radio, streaming, and playlist life. The mood stayed upbeat on the surface, but the strongest tracks still carried a bruised or nostalgic edge.'

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
    youtubeVideoId: 'HU08BcK5SUY',
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
    youtubeVideoId: 'nZjTtuNR3Og',
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
    youtubeVideoId: '51zjlMhdSTE',
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
    youtubeVideoId: 'iWG6apzIWAk',
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
    youtubeVideoId: 'FkOpwodhROI',
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
    youtubeVideoId: 'PCBZOSM8h5U',
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
    youtubeVideoId: 'aezstCBHOPQ',
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
    youtubeVideoId: 'ic8j13piAhQ',
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
    youtubeVideoId: 'zG5YzRxOcsI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b5/Tommy_Richman_-_Million_Dollar_Baby.png',
      artist: null,
    },
  }),
]

export default songs
