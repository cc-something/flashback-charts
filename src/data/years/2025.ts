import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2025

export const source = {
  label: 'ARIA Top 100 Singles',
  url: 'https://www.aria.com.au/charts/2025/singles-chart',
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

// Source: ARIA Top 100 Singles 2025
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Ordinary',
    artist: 'Alex Warren',
    album: "You'll Be Alright, Kid (Chapter 1)",
    youtubeVideoId: 'byxFUKxhT3s',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b0/Alex_Warren_-_Ordinary.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Golden',
    artist: 'Rei Ami, KPop Demon Hunters Cast, Huntrx, Ejae, Audrey Nuna',
    album: 'Golden',
    youtubeVideoId: 'htk6MRjmcnQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/6f/Huntr-x_-_Golden.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'APT.',
    artist: 'Rosé and Bruno Mars',
    album: 'Rosie',
    youtubeVideoId: '8Ebqe2Dbzls',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/52/Ros%C3%A9_and_Bruno_Mars_-_Apt..png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "That's So True",
    artist: 'Gracie Abrams',
    album: 'The Secret of Us',
    youtubeVideoId: 'W_YOJWZIjxo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/6d/Gracie_Abrams_That%27s_So_True.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Die With A Smile',
    artist: 'Lady Gaga and Bruno Mars',
    album: 'Die With A Smile',
    youtubeVideoId: 'PfH7jq_uSCM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png',
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
    rank: 8,
    title: 'Messy',
    artist: 'Lola Young',
    album: "This Wasn't Meant for You Anyway",
    youtubeVideoId: 'mhTiOYFF0wg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3e/Lola_Young_-_Messy.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
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
    rank: 10,
    title: 'The Days - NOTION Remix',
    artist: 'Chrystal',
    album: 'The Days',
    youtubeVideoId: 't-knFuqQdGc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e0/Chrystal_-_The_Days_%28single_cover%29.jpg',
      artist: null,
    },
  }),
]

export default songs
