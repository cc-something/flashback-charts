import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1993

export const description =
  '1993 turned the emotion up, with soaring ballads, laid-back groove tracks, and a few novelty turns keeping things loose. The chart had plenty of contrast, moving from stadium-size sentiment to lighter, more playful cuts.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://www.aria.com.au/charts/1993/singles-chart',
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

// Source: ARIA End of Year singles chart 1993 year-end chart
// Via: Wikipedia - List of top 25 singles for 1993 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "I'd Do Anything for Love (But I Won't Do That)",
    artist: 'Meat Loaf',
    album: 'Bat Out of Hell II: Back into Hell',
    youtubeVideoId: 'DpBSxhc8ZiA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/74/I%27d_Do_Anything_for_Love_%28but_I_Won%27t_Do_That%29_by_Meat_Loaf_US_commercial_cassette.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'I Will Always Love You',
    artist: 'Whitney Houston',
    album: 'The Bodyguard: Original Soundtrack Album',
    youtubeVideoId: 'ardglr9MVVQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/4/48/I_will_always_love_you_by_Dolly_Parton_1974_US_single.png',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Whitney_Houston_Welcome_Home_Heroes_1_cropped.jpg/1280px-Whitney_Houston_Welcome_Home_Heroes_1_cropped.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: "You Don't Treat Me No Good",
    artist: 'Sonia Dada',
    album: 'Sonia Dada',
    youtubeVideoId: 'Lqw1Q19i_vQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/65/You_Don%27t_Treat_Me_No_Good_AUSNZ.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Sweat (A La La La La Long)',
    artist: 'Inner Circle',
    album: 'Bad to the Bone',
    youtubeVideoId: '-SvridcLD-I',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e6/Sweat_%28a_la_la_la_la_long%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: "(I Can't Help) Falling in Love with You",
    artist: 'UB40',
    album: 'Promises and Lies',
    youtubeVideoId: 'vUdloUqZa7w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3c/Can%27t_Help_Falling_in_Love_by_Elvis_Presley_US_picture_sleeve.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Informer',
    artist: 'Snow',
    album: '12 Inches of Snow',
    youtubeVideoId: 'TSffz_bl6zo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2f/Snow_Informer_%28Single_Cover%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "What's Up",
    artist: '4 Non Blondes',
    album: 'Bigger, Better, Faster, More!',
    youtubeVideoId: '6NXnxTNIWkc',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/e/e1/WhatsUpCover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: "Cat's in the Cradle",
    artist: 'Ugly Kid Joe',
    album: "America's Least Wanted",
    youtubeVideoId: 'B32yjbCSVpU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b1/Chapin_cradle_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'All That She Wants',
    artist: 'Ace of Base',
    album: 'Happy Nation',
    youtubeVideoId: 'd73tiBBzvFM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/d5/All_That_She_Wants_%28Ace_of_Base_single_-_cover_art%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Please Forgive Me',
    artist: 'Bryan Adams',
    album: 'So Far So Good',
    youtubeVideoId: 'Qy4zFJmE-1E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/90/Please_forgive_me.jpg',
      artist: null,
    },
  }),
]

export default songs
