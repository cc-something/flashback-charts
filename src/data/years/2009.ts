import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2009

export const source = {
  label: 'ARIA Charts',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2009_in_Australia',
}

export const description =
  'In 2009, bright synth-pop and club-ready hooks had fully taken over the top end. The sound was slick, high-energy, and built for repetition, with fewer rough edges than earlier in the decade.'

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

// Source: ARIA year-end singles chart for 2009
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'I Gotta Feeling',
    artist: 'The Black Eyed Peas',
    album: 'The E.N.D.',
    youtubeVideoId: 'uSD4vsh1zDA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f4/I_Gotta_Feeling.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Sexy Bitch',
    artist: 'David Guetta feat. Akon',
    album: 'One Love',
    youtubeVideoId: 'N9hazmsUxrM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e9/Sexy_Bitch_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Love Story',
    artist: 'Taylor Swift',
    album: 'Fearless',
    youtubeVideoId: '8xg3vE8Ie_E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/01/Taylor_Swift_-_Love_Story.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Boom Boom Pow',
    artist: 'The Black Eyed Peas',
    album: 'The E.N.D.',
    youtubeVideoId: '4m48GqaOz90',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bb/Boom_Boom_Pow_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Right Round',
    artist: 'Flo Rida feat. Kesha',
    album: 'R.O.O.T.S.',
    youtubeVideoId: 'CcCw1ggftuQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b6/Flo_Rida_-_Right_Round_Official_Cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Like It Like That',
    artist: 'Guy Sebastian',
    album: 'Like It Like That',
    youtubeVideoId: 'pQNs_bVGS7Y',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/4/41/Guylikeit.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Halo',
    artist: 'Beyoncé',
    album: 'I Am... Sasha Fierce',
    youtubeVideoId: 'bnVUHWCynig',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ac/Beyonce_-_Halo.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Meet Me Halfway',
    artist: 'The Black Eyed Peas',
    album: 'The E.N.D.',
    youtubeVideoId: 'I7HahVwYpwo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/88/Meet_Me_Halfway.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'TiK ToK',
    artist: 'Kesha',
    album: 'Animal',
    youtubeVideoId: 'iP6XpLQM2Cs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/7e/TiK_ToK_-_Kesha_%28official_single_cover%29.JPG',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'The Last Day on Earth',
    artist: 'Kate Miller-Heidke',
    album: 'Curiouser',
    youtubeVideoId: 'ZiRuj2K1XJo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/98/Last_Day_On_Earth_KMH.jpg',
      artist: null,
    },
  }),
]

export default songs
