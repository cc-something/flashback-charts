import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1998

export const description =
  '1998 ran on big singalong choruses, polished dance-pop, and a strong streak of feel-good momentum. The chart was lighter on grit than the years around it, but the hooks were strong enough to carry the whole thing.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1998_in_Australia',
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

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'La Copa De La Vida (The Cup of Life) / Un, Dos, Tres (María)',
    artist: 'Ricky Martin',
    album: 'Vuelve',
    youtubeVideoId: 'dZDj2CnG5dE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/The_Cup_of_Life_cover.png/250px-The_Cup_of_Life_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "It's Like That",
    artist: 'Run DMC vs. Jason Nevins',
    album: "It's Like That",
    youtubeVideoId: 'TLGWQfK-6DY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Run-DMC_performing_in_Long_Beach%2C_1984.jpg/960px-Run-DMC_performing_in_Long_Beach%2C_1984.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Iris',
    artist: 'Goo Goo Dolls',
    album: 'Dizzy Up the Girl',
    youtubeVideoId: 'NdYWuo9OFAw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/GGD_Iris.jpg/250px-GGD_Iris.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "I Don't Want to Miss a Thing",
    artist: 'Aerosmith',
    album: 'Armageddon: The Album',
    youtubeVideoId: 'JkK8g6FMEXE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Idontwanttomissathing.jpg/250px-Idontwanttomissathing.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Never Ever',
    artist: 'All Saints',
    album: 'All Saints',
    youtubeVideoId: 'nPXqkjpXZ_k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/AllSaintsNeverEver.jpg/250px-AllSaintsNeverEver.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Second Solution / Prisoner of Society',
    artist: 'The Living End',
    album: 'Second Solution / Prisoner of Society',
    youtubeVideoId: 'VVtD4qMy5Hc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Prisoner.jpg/250px-Prisoner.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Crush',
    artist: 'Jennifer Paige',
    album: 'Jennifer Paige',
    youtubeVideoId: 'EIhSnaqou0I',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Jennifer_paige-crush_s_1.jpg/250px-Jennifer_paige-crush_s_1.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Good Riddance (Time of Your Life) / Redundant',
    artist: 'Green Day',
    album: 'Nimrod',
    youtubeVideoId: 'CnQ8N1KacJc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Green_Day_-_Good_Riddance_%28Time_of_Your_Life%29_cover.jpg/250px-Green_Day_-_Good_Riddance_%28Time_of_Your_Life%29_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "You're Still the One",
    artist: 'Shania Twain',
    album: 'Come On Over',
    youtubeVideoId: 'KNZH-emehxA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/89/You%27re_Still_the_One.png/250px-You%27re_Still_the_One.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'From This Moment On',
    artist: 'Shania Twain',
    album: 'Come On Over',
    youtubeVideoId: 'a-Lp2uC_1lg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/From_This_Moment_On_%28Shania_Twain_song%29.jpg/250px-From_This_Moment_On_%28Shania_Twain_song%29.jpg',
      artist: null,
    },
  }),
]

export default songs
