import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2022

export const source = {
  label: 'ARIA Top 100 Singles',
  url: 'https://www.aria.com.au/charts/2022/singles-chart',
}

export const description =
  '2022 opened back up, mixing piano ballads, dance-floor lift, and clean crossover pop with very little genre loyalty. Big choruses returned, but the production stayed tidy and controlled.'

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

// Source: ARIA Top 100 Singles 2022
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    youtubeVideoId: 'P3rWbYuTa5E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/ff/Harry_Styles_-_As_It_Was.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    youtubeVideoId: '1GcnrBU4AWg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b0/Glass_Animals_-_Heat_Waves.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
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
    rank: 4,
    title: 'Cold Heart (Pnau Remix)',
    artist: 'Elton John & Dua Lipa',
    album: 'The Lockdown Sessions',
    youtubeVideoId: 'qod03PVTLqk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/08/Elton_John%2C_Dua_Lipa_-_Cold_Heart.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Bad Habits',
    artist: 'Ed Sheeran',
    album: '=',
    youtubeVideoId: 'ho1RzYneMtM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Ed_Sheeran_-_Bad_Habits_2.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Shivers',
    artist: 'Ed Sheeran',
    album: '=',
    youtubeVideoId: 'RSdFPWYE_MY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b0/Ed_Sheeran_-_Shivers.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Where Are You Now',
    artist: 'Lost Frequencies & Calum Scott',
    album: 'All Stand Together',
    youtubeVideoId: 'qbkme8yv5Yk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b0/Lost_Frequencies_Where_Are_You_Now.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'First Class',
    artist: 'Jack Harlow',
    album: 'Come Home the Kids Miss You',
    youtubeVideoId: 'lE4JBRSkT-o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ad/Jack_Harlow_-_Come_Home_the_Kids_Miss_You.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "I Ain't Worried",
    artist: 'OneRepublic',
    album: 'Top Gun: Maverick (Music from the Motion Picture)',
    youtubeVideoId: 'bG0HNB1921w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/cf/I_Ain%27t_Worried_-_OneRepublic.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'About Damn Time',
    artist: 'Lizzo',
    album: 'Special',
    youtubeVideoId: 'xHKNTWbNneE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/da/Lizzo_-_About_Damn_Time.png',
      artist: null,
    },
  }),
]

export default songs
