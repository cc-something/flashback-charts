import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1975

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

export const description =
  'The Australian charts in 1975 were a proper battle between glam rock, homegrown pub rock, and slick European pop. Local acts were finally holding their own against international heavyweights, and the Dismissal gave the whole country a restless, defiant energy that showed up in the music.'

// Source: Kent Music Report 1975 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1975 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1975_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Fox on the Run',
    artist: 'Sweet',
    album: 'Desolation Boulevard',
    youtubeVideoId: 'aN-ldsWbFe8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Fox_on_the_Run_single_cover.jpg/250px-Fox_on_the_Run_single_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'January',
    artist: 'Pilot',
    album: 'Second Flight',
    youtubeVideoId: 'YnQZ5AHUk2U',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/46/January_-_Pilot.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Mamma Mia',
    artist: 'ABBA',
    album: 'ABBA',
    youtubeVideoId: 'U4Sm7v6PDY8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Mamma_Mia_Intermezzo_No_1.jpg/250px-Mamma_Mia_Intermezzo_No_1.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Summer Love',
    artist: 'Sherbet',
    album: 'Summer Love',
    youtubeVideoId: 'pv7_VntPKyA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/SummerLove1975.jpg/250px-SummerLove1975.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Horror Movie',
    artist: 'Skyhooks',
    album: "Living in the 70's",
    youtubeVideoId: 'XljmO_KPQaM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Horrormovie.jpg/250px-Horrormovie.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Love Will Keep Us Together',
    artist: 'Captain and Tennille',
    album: 'The Tra-La Days Are Over',
    youtubeVideoId: 'GpBZNh70uhA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/S140943.jpg/250px-S140943.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Please Mr. Postman',
    artist: 'The Carpenters',
    album: 'Please Mr. Postman',
    youtubeVideoId: 'AHfddvbKb4w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Please_Mr_Postman_by_The_Marvelettes_US_vinyl_single.jpg/250px-Please_Mr_Postman_by_The_Marvelettes_US_vinyl_single.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'The Newcastle Song',
    artist: 'Bob Hudson',
    album: 'The Newcastle Song',
    youtubeVideoId: '7GqO9M9dK9c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/19/The_Newcastle_Song_cover_art.jpg/250px-The_Newcastle_Song_cover_art.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Before the Next Teardrop Falls',
    artist: 'Freddy Fender',
    album: 'Before the Next Teardrop Falls',
    youtubeVideoId: 'ay5ciplY4Pg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/BeforeTheNextTeardropFalls.jpg/250px-BeforeTheNextTeardropFalls.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Bony Moronie',
    artist: 'Hush',
    album: "Rough Tough 'n' Ready",
    youtubeVideoId: 'vOO4zA1i5mA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Bony_Moronie.jpg/250px-Bony_Moronie.jpg',
      artist: null,
    },
  }),
]

export default songs
