import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2023

export const source = {
  label: 'ARIA Top 100 Singles',
  url: 'https://www.aria.com.au/charts/2023/singles-chart',
}

export const description =
  '2023 leaned on crisp pop writing, country spillover, and viral hooks that travelled quickly from phones to radio. The mood was lighter than the years just before it, though a darker edge still slipped into the best songs.'

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

// Source: ARIA Top 100 Singles 2023
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    youtubeVideoId: 'G7KNmW9a75Y',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/00/Miley_Cyrus_-_Flowers_%28digital_single%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Last Night',
    artist: 'Morgan Wallen',
    album: 'One Thing at a Time',
    youtubeVideoId: 'TyjgBxIVmEc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/5f/Morgan_Wallen_-_One_Thing_at_a_Time.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Kill Bill',
    artist: 'SZA',
    album: 'SOS',
    youtubeVideoId: 'MSRcC626prw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/6c/SZA_-_Kill_Bill.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
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
    rank: 5,
    title: 'Paint the Town Red',
    artist: 'Doja Cat',
    album: 'Scarlet',
    youtubeVideoId: 'm4_9TFeMfJE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/53/Doja_Cat_-_Paint_the_Town_Red.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Vampire',
    artist: 'Olivia Rodrigo',
    album: 'Guts',
    youtubeVideoId: 'RlPNh_PBZb4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/14/Olivia_Rodrigo_-_Vampire.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Greedy',
    artist: 'Tate McRae',
    album: 'Think Later',
    youtubeVideoId: 'To4SWGZkEPk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/7d/Tate_McRae_-_Greedy.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Fast Car',
    artist: 'Luke Combs',
    album: "Gettin' Old",
    youtubeVideoId: 'PnXzBVJfkRE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0f/Luke_Combs_-_Gettin%27_Old.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Sprinter',
    artist: 'Dave & Central Cee',
    album: 'Split Decision',
    youtubeVideoId: 'pSY3i5XHHXo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a0/Dave_and_Central_Cee_-_Sprinter.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Lovin on Me',
    artist: 'Jack Harlow',
    album: 'Lovin on Me',
    youtubeVideoId: 'Iq8h3GEe22o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/72/%22Lovin_On_Me%22_by_Jack_Harlow_-_cover_art.png',
      artist: null,
    },
  }),
]

export default songs
