import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://www.aria.com.au/charts/2011/singles-chart',
}

export const description =
  '2011 kept the floor-filling pop sound rolling, with pounding beats, breakup ballads, and polished crossover hooks all over the place. It was a direct, crowd-pleasing year with very little dead air.'

const year = 2011

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
    title: 'Party Rock Anthem',
    artist: 'LMFAO featuring Lauren Bennett and GoonRock',
    album: 'Sorry for Party Rocking',
    youtubeVideoId: 'hmySMmaHAl4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a2/Party_Rock_Anthem_%28feat._Lauren_Bennet_%26_GoonRock%29_-_Single.jpeg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Somebody That I Used to Know',
    artist: 'Gotye featuring Kimbra',
    album: 'Making Mirrors',
    youtubeVideoId: '8UVNT4wvIGY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c1/Gotye_featuring_Kimbra_-_Somebody_That_I_Used_to_Know.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Moves Like Jagger',
    artist: 'Maroon 5 featuring Christina Aguilera',
    album: 'Hands All Over',
    youtubeVideoId: 'PdR1n_Zt8Mo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/f/fc/Maroon_5_Moves_Like_Jagger_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    youtubeVideoId: 'hLQl3WQQoQ0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/7a/Adele_-_Someone_Like_You.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Rolling in the Deep',
    artist: 'Adele',
    album: '21',
    youtubeVideoId: 'rYEDA3JcQqw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Sexy and I Know It',
    artist: 'LMFAO',
    album: 'Sorry for Party Rocking',
    youtubeVideoId: 'D-AVfWNMONw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/76/Sexy_and_I_Know_It_-_Single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Give Me Everything',
    artist: 'Pitbull featuring Ne-Yo, Afrojack and Nayer',
    album: 'Planet Pit',
    youtubeVideoId: 'EPo5wWmKEaI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/06/Pitbull_-_Give_Me_Everything.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Born This Way',
    artist: 'Lady Gaga',
    album: 'Born This Way',
    youtubeVideoId: '2Z8hHgXPgGQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ad/Lady_Gaga_-_Born_This_Way_%28single%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Price Tag',
    artist: 'Jessie J featuring B.o.B',
    album: 'Who You Are',
    youtubeVideoId: 'I_-MWKy0jCA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/52/Price_tag_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'On the Floor',
    artist: 'Jennifer Lopez featuring Pitbull',
    album: 'Love?',
    youtubeVideoId: 'SaSc39VLucc',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/9/91/On_the_Floor.png',
      artist: null,
    },
  }),
  getSong({
    rank: 11,
    title: 'S&M',
    artist: 'Rihanna',
    album: 'Loud',
    youtubeVideoId: 'DBXQMLnakiM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/07/Rihanna_-_S%26M.png',
      artist: null,
    },
  }),
]

export default songs
