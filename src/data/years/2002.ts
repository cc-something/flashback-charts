import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2002

export const source = {
  label: 'ARIA Charts',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2002_in_Australia',
}

export const description =
  '2002 sat between glossy pop and the rougher edges that were starting to creep in, so the charts moved between ballads, dance cuts, and guitar-led singles. The mood was familiar but a little less spotless than the year before.'

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

// Source: ARIA year-end singles chart for 2002
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Without Me',
    artist: 'Eminem',
    album: 'The Eminem Show',
    youtubeVideoId: 'YVkUvmDQ3HY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ad/Eminem_-_Without_Me_CD_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Whenever, Wherever',
    artist: 'Shakira',
    album: 'Laundry Service',
    youtubeVideoId: 'weRHyjj34ZE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/2a/Shakira_-_Whenever%2C_Wherever.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'The Ketchup Song',
    artist: 'Las Ketchup',
    album: 'Hijas del Tomate',
    youtubeVideoId: '5llcBScGuAE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bd/Las_Hijas_Del_Tomate.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Dilemma',
    artist: 'Nelly feat. Kelly Rowland',
    album: 'Nellyville',
    youtubeVideoId: '8WYHDfJDPDc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/61/Nelly_featuring_Kelly_Rowland_-_Dilemma_CD_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'A Little Less Conversation',
    artist: 'Elvis Presley vs. JXL',
    album: 'Almost in Love',
    youtubeVideoId: 'rZLQpUxYkas',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/61/ElvisVSJXLCDSingleCover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'A Thousand Miles',
    artist: 'Vanessa Carlton',
    album: 'Be Not Nobody',
    youtubeVideoId: 'Cwkej79U3ek',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/fd/A_Thousand_Miles.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Born to Try',
    artist: 'Delta Goodrem',
    album: 'Innocent Eyes',
    youtubeVideoId: 'qTBOJ71ypRw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/34/Delta_Goodrem_-_Born_to_Try.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Not Pretty Enough',
    artist: 'Kasey Chambers',
    album: 'Barricades & Brickwalls',
    youtubeVideoId: 'v5rOdF9rUKI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/ce/NotPrettyEnough.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Complicated',
    artist: 'Avril Lavigne',
    album: 'Let Go',
    youtubeVideoId: '5NPBIwQyPWE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/76/Complicated_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Kiss Kiss',
    artist: 'Holly Valance',
    album: 'Tarkan Ölürüm Sana',
    youtubeVideoId: 'o3wS2tdlZtE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0e/Holly_Valance_-_Footprints.png',
      artist: null,
    },
  }),
]

export default songs
