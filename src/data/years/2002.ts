import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2002

export const source = {
  label: 'ARIA Charts',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2002_in_Australia',
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
      album: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Without_Me.jpg',
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
        'https://upload.wikimedia.org/wikipedia/en/1/1d/Shakira_Whenever_Wherever.jpg',
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
        'https://upload.wikimedia.org/wikipedia/en/8/84/Las_Ketchup_-_The_Ketchup_Song.jpg',
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
        'https://upload.wikimedia.org/wikipedia/en/a/a6/Dilemma_Nelly_Rowland.jpg',
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
        'https://upload.wikimedia.org/wikipedia/en/8/8f/A_little_less_conversation_cover.jpg',
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
      album: 'https://upload.wikimedia.org/wikipedia/en/9/9d/ATMsingle.jpg',
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
        'https://upload.wikimedia.org/wikipedia/en/4/49/Delta_Goodrem_-_Born_to_Try.png',
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
        'https://upload.wikimedia.org/wikipedia/en/0/08/Not_Pretty_Enough.jpg',
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
        'https://upload.wikimedia.org/wikipedia/en/4/45/Complicated_%28Avril_Lavigne_song%29.jpg',
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
        'https://upload.wikimedia.org/wikipedia/en/d/d3/Holly_valance_kiss_kiss.JPG',
      artist: null,
    },
  }),
]

export default songs
