import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2012_in_Australia',
}

export const description =
  '2012 mixed bright pop, electronic polish, and a few viral outliers. The charts moved fast and stayed playful.'

const year = 2012

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

// Source: ARIA End of Year Singles Chart
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Call Me Maybe',
    artist: 'Carly Rae Jepsen',
    album: 'Curiosity / Kiss',
    youtubeVideoId: 'fWNaR-rxAic',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ad/Carly_Rae_Jepsen_-_Call_Me_Maybe.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Gangnam Style',
    artist: 'PSY',
    album: 'Psy 6 (Six Rules), Part 1',
    youtubeVideoId: '9bZkp7q19f0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ad/Gangnam_Style_Official_Cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Battle Scars',
    artist: 'Guy Sebastian featuring Lupe Fiasco',
    album: 'Armageddon',
    youtubeVideoId: 'LJx9fADBtWM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/9b/Guy_Sebastian_-_Battle_Scars.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Whistle',
    artist: 'Flo Rida',
    album: 'Wild Ones',
    youtubeVideoId: 'cSnkWzZ7ZAA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b7/Whistle_-_Flo_Rida.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Wild Ones',
    artist: 'Flo Rida featuring Sia',
    album: 'Wild Ones',
    youtubeVideoId: 'bpOR_HuHRNs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e9/Flo_Rida_Wild_Ones.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Starships',
    artist: 'Nicki Minaj',
    album: 'Pink Friday: Roman Reloaded',
    youtubeVideoId: 'SeIJmciN8mo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/47/Nickiminaj_Starships_Pinkfridayromanreloaded.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Boom Boom',
    artist: 'Justice Crew',
    album: 'Boom Boom',
    youtubeVideoId: 'zHK0i3-BWTA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/cf/BoomBoomJusticeCrew.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Skinny Love',
    artist: 'Birdy',
    album: 'Birdy',
    youtubeVideoId: 'aNzCDt2eidg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/SkinnyLove.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Thrift Shop',
    artist: 'Macklemore & Ryan Lewis featuring Wanz',
    album: 'The Heist',
    youtubeVideoId: 'QK8mJJJvaes',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0e/Macklemore_-_Thrift_Shop.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "Don't You Worry Child",
    artist: 'Swedish House Mafia featuring John Martin',
    album: 'Until Now',
    youtubeVideoId: '1y6smkh6c-0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/e/e0/Dont-you-worry-child-swedish-house-mafia.png',
      artist: null,
    },
  }),
]

export default songs
