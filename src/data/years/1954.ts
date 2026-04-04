import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1954

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_number-one_singles_in_Australia_during_the_1950s',
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

// Source: Australian Chart Book year-end chart for 1954
// Via: Kent Music Report (retro-calculated from state radio charts)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'The Happy Wanderer',
    artist: 'Frank Weir',
    album: 'The Happy Wanderer',
    youtubeVideoId: 'xW09Osnr7Yo',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/4/44/Happywanderer.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Pretend',
    artist: 'Nat King Cole',
    album: 'Pretend',
    youtubeVideoId: 'ciS5GikZ5Jo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c5/Nat_King_Cole_1947.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Rags to Riches',
    artist: 'Tony Bennett',
    album: 'Rags to Riches',
    youtubeVideoId: 'VBuPGwYvuzY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b2/Tony_Bennett_2002.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'Little Things Mean a Lot',
    artist: 'Kitty Kallen',
    album: 'Little Things Mean a Lot',
    youtubeVideoId: '2C7SzKv2uLU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/3/3f/Kitty_Kallen_in_Central_Park.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Oh My Pa-Pa (O Mein Papa)',
    artist: 'Eddie Fisher',
    album: 'Oh My Pa-Pa (O Mein Papa)',
    youtubeVideoId: '6dWOsP_wly0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eddie_Fisher_-_still.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Answer Me, My Love',
    artist: 'Nat King Cole',
    album: 'Answer Me, My Love',
    youtubeVideoId: 'l2C4p2gk5BA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c5/Nat_King_Cole_1947.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Sh-Boom',
    artist: 'The Crew Cuts',
    album: 'Sh-Boom',
    youtubeVideoId: '89bwImW95rY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b7/The_Crew_Cuts_1957.JPG',
    },
  }),
  getSong({
    rank: 8,
    title: "That's Amore",
    artist: 'Dean Martin',
    album: "That's Amore",
    youtubeVideoId: 'RUz1pZ_LujU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b0/Dean_Martin_1958.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Young at Heart',
    artist: 'Frank Sinatra',
    album: 'Young at Heart',
    youtubeVideoId: 'aZRn4auk4PQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/3/38/Frank_Sinatra_1961.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Three Coins in the Fountain',
    artist: 'Frank Sinatra',
    album: 'Three Coins in the Fountain',
    youtubeVideoId: 'B1FZpyUfM5g',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/3/38/Frank_Sinatra_1961.jpg',
    },
  }),
]

export default songs
