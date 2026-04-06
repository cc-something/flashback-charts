import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2020

export const source = {
  label: 'ARIA Top 100 Singles',
  url: 'https://www.aria.com.au/charts/2020/singles-chart',
}

export const description =
  'Escape-pop, glossy R&B, and disco revival sounds defined 2020 on the Australian charts. The year feels polished and restless at the same time, with big hooks carrying songs built for phones, cars, and empty dancefloors.'

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

// Source: ARIA Top 100 Singles 2020
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    youtubeVideoId: '4NRXx6U8ABQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Roses (Imanbek Remix)',
    artist: 'SAINt JHN',
    album: 'While the World Was Burning',
    youtubeVideoId: 'jOMHWVv0xX4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c0/Saint_Jhn_-_Roses_%28Imanbek_Remix%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "Don't Start Now",
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    youtubeVideoId: 'oygrmJFKYZY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2b/Dua_Lipa_-_Don%27t_Start_Now.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    youtubeVideoId: 'q0hyYWKXF0Q',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/1f/Dance_Monkey_by_Tones_and_I.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Rockstar',
    artist: 'DaBaby Feat. Roddy Ricch',
    album: 'Blame It on Baby',
    youtubeVideoId: 'mxFstYSbBmc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/95/Rockstar_%28Official_Single_Cover%29_-_DaBaby_featuring_Roddy_Ricch.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    youtubeVideoId: 'E07s5ZYygMg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bf/Watermelon_Sugar_-_Harry_Styles.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Circles',
    artist: 'Post Malone',
    album: "Hollywood's Bleeding",
    youtubeVideoId: 'wXhTHyIgQ_U',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a5/Post_Malone_-_Circles.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Before You Go',
    artist: 'Lewis Capaldi',
    album: 'Divinely Uninspired to a Hellish Extent',
    youtubeVideoId: 'Jtauh8GcxBY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Lewis_Capaldi_-_Before_You_Go.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Intentions',
    artist: 'Justin Bieber Feat. Quavo',
    album: 'Changes',
    youtubeVideoId: '9p2wMpVVtXg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e0/Justin_Bieber_-_Intentions.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Say So',
    artist: 'Doja Cat',
    album: 'Hot Pink',
    youtubeVideoId: 'pok8H_KF1FA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b1/Doja_Cat_-_Say_So.png',
      artist: null,
    },
  }),
]

export default songs
