import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2021

export const source = {
  label: 'ARIA Top 100 Singles',
  url: 'https://www.aria.com.au/charts/2021/singles-chart',
}

export const description =
  '2021 kept things intimate and a little worn down, with moody pop, confessional writing, and soft electronic textures all over the charts. Brighter singalongs still broke through, but the year mostly stayed reflective.'

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

// Source: ARIA Top 100 Singles 2021
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    youtubeVideoId: 'mRD0-GxqHVo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b0/Glass_Animals_-_Heat_Waves.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Stay',
    artist: 'The Kid Laroi & Justin Bieber',
    album: 'F*ck Love 3: Over You',
    youtubeVideoId: 'kTJczUoc26U',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Drivers License',
    artist: 'Olivia Rodrigo',
    album: 'Sour',
    youtubeVideoId: 'ZmDBbnmKpqQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/09/Drivers_License_by_Olivia_Rodrigo.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Without You',
    artist: 'The Kid Laroi',
    album: 'F*ck Love',
    youtubeVideoId: 'LvB4GUTWDcI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/98/The_Kid_Laroi_-_Without_You_%28Remix%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    youtubeVideoId: 'TUVcZfQe-Kw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c6/Dua_Lipa_Levitating_Solo_Single_Cover.jpeg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'Sour',
    youtubeVideoId: 'gNi_6U5Pm_o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3e/Olivia_Rodrigo_-_Good_4_U.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Bad Habits',
    artist: 'Ed Sheeran',
    album: '=',
    youtubeVideoId: 'orJSJGHjBLI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Ed_Sheeran_-_Bad_Habits_2.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    youtubeVideoId: 'XXYlFuWEuKI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Kiss Me More',
    artist: 'Doja Cat Feat. SZA',
    album: 'Planet Her',
    youtubeVideoId: '0EVVKs6DQLo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b1/Doja_Cat_-_Kiss_Me_More.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'The Business',
    artist: 'Tiësto',
    album: 'Drive',
    youtubeVideoId: 'ewufRwrayTI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/de/Ti%C3%ABsto_-_The_Business.jpg',
      artist: null,
    },
  }),
]

export default songs
