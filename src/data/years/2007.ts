import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2007

export const source = {
  label: 'ARIA Charts',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2007_in_Australia',
}

export const description =
  'In 2007, guitar-heavy radio hits and glossy pop ballads split the spotlight, with a few darker club tracks filling out the edges. The overall feel was upbeat but a little sharper, as if mainstream pop was starting to brace for a bigger shift.'

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

// Source: ARIA year-end singles chart for 2007
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "Big Girls Don't Cry",
    artist: 'Fergie',
    album: 'The Dutchess',
    youtubeVideoId: 'PUMkxH03V5c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/55/Fergie_-_Big_Girls_Don%27t_Cry.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Girlfriend',
    artist: 'Avril Lavigne',
    album: 'The Best Damn Thing',
    youtubeVideoId: 'Bg59q4puhmg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3b/Avril_Lavigne_-_Girlfriend.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Umbrella',
    artist: 'Rihanna',
    album: 'Good Girl Gone Bad',
    youtubeVideoId: 'CvBfHwUxHIk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/01/Rihanna_-_Umbrella.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Straight Lines',
    artist: 'Silverchair',
    album: 'Young Modern',
    youtubeVideoId: '47P3bzefCVI',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Straightlines.gif',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Lips of an Angel',
    artist: 'Hinder',
    album: 'Extreme Behavior',
    youtubeVideoId: 'RiSfTyrvJlg',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/8/82/Lipsofanangel.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Apologize',
    artist: 'Timbaland feat. OneRepublic',
    album: 'Dreaming Out Loud',
    youtubeVideoId: 'ZSM3w1v-A_M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/85/Dreaming_Out_Loud_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Grace Kelly',
    artist: 'Mika',
    album: 'Life in Cartoon Motion',
    youtubeVideoId: '0CGVgAYJyjk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/cc/Grace_Kelly%28song%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Candyman',
    artist: 'Christina Aguilera',
    album: 'Back to Basics',
    youtubeVideoId: 'knJOMOkHCKI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/fb/Christina_Aguilera_-_Candyman_cover_artwork.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'The Sweet Escape',
    artist: 'Gwen Stefani feat. Akon',
    album: 'The Sweet Escape',
    youtubeVideoId: 'O0lf_fE3HwA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/13/Gwen_Stefani_-_The_Sweet_Escape_%28feat._Akon%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Beautiful Girls',
    artist: 'Sean Kingston',
    album: 'Sean Kingston',
    youtubeVideoId: 'MrTz5xjmso4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f6/Sean_Kingston_Beautiful_Girls.jpg',
      artist: null,
    },
  }),
]

export default songs
