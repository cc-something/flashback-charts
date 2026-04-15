import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2001

export const source = {
  label: 'ARIA Charts',
  url: 'https://www.aria.com.au/charts/2001/singles-chart',
}

export const description =
  'In 2001, polished pop, smooth R&B, and club-ready singles did most of the work. It was a bright, radio-first year with plenty of chorus-led songs and not much patience for anything subtle.'

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

// Source: ARIA year-end singles chart for 2001
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "Can't Fight the Moonlight",
    artist: 'LeAnn Rimes',
    album: 'Coyote Ugly',
    youtubeVideoId: 'bx3s99FNXzI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Can%27t_Fight_the_Moonlight.jpg/330px-Can%27t_Fight_the_Moonlight.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "It Wasn't Me",
    artist: 'Shaggy',
    album: 'Hot Shot',
    youtubeVideoId: '2g5Hz17C4is',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b1/Shaggy-wasn%27t-me.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "Can't Get You Out of My Head",
    artist: 'Kylie Minogue',
    album: 'Fever',
    youtubeVideoId: 'c18441Eh_WE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/60/Kylie_Minogue_-_Can%27t_Get_You_Out_of_My_Head.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Angel',
    artist: 'Shaggy',
    album: 'Hot Shot',
    youtubeVideoId: 'XWJrPzAUzAs',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/0/0f/Shaggy-angel.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Hanging by a Moment',
    artist: 'Lifehouse',
    album: 'No Name Face',
    youtubeVideoId: 'tPnK39ax_AM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/67/Lifehousehangingbyamoment.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Stan',
    artist: 'Eminem feat. Dido',
    album: 'The Marshall Mathers LP',
    youtubeVideoId: 'gOMhN-hfMtY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e8/Eminem_-_Stan_CD_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "I'm Like a Bird",
    artist: 'Nelly Furtado',
    album: 'Whoa, Nelly!',
    youtubeVideoId: 'roPQ_M3yJTA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b6/Nelly_Furtado_-_I%27m_Like_a_Bird.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Smooth Criminal',
    artist: 'Alien Ant Farm',
    album: 'Bad',
    youtubeVideoId: 'CDl9ZMfj6aE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/33/Smooth_Criminal.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Can We Fix It?',
    artist: 'Bob the Builder',
    album: 'Bob the Builder: The Album',
    youtubeVideoId: 'l-epqIHe4w0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/09/Bob_the_Builder_Can_We_Fix_It_art.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Whole Again',
    artist: 'Atomic Kitten',
    album: 'Right Now',
    youtubeVideoId: '1V0xQkk9kbc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b3/Atomic_Kitten_Whole_Again_Cover.jpg',
      artist: null,
    },
  }),
]

export default songs
