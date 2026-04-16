import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1958

export const description =
  'Folk music made a surprise splash alongside the now-established rock and roll, and novelty songs continued to find an eager audience. Australian country music also broke through with a homegrown pub anthem that became a genuine cultural moment. The charts were wide open, bouncing between polished pop, vocal harmony groups, and good-time singalongs.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_Top_25_singles_for_1958_in_Australia',
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

// Source: Australian Chart Book year-end chart for 1958
// Via: Kent Music Report (retro-calculated from state radio charts)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Tom Dooley',
    artist: 'The Kingston Trio',
    album: 'Tom Dooley',
    youtubeVideoId: 'S3zdE8bliGI',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/7/75/Kingston_Trio.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Catch a Falling Star',
    artist: 'Perry Como',
    album: 'Catch a Falling Star',
    youtubeVideoId: 'B_sJdH6fGd0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 3,
    title: 'Volare (Nel Blu Dipinto Di Blu)',
    artist: 'Dean Martin',
    album: 'Volare (Nel Blu Dipinto Di Blu)',
    youtubeVideoId: 'ZPnd2UKrh6c',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b0/Dean_Martin_1958.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'April Love',
    artist: 'Pat Boone',
    album: 'April Love',
    youtubeVideoId: 'ki2cJli-s5U',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/d/d0/8-15-22_Conversations_-_Pat_Boone_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'The Purple People Eater',
    artist: 'Sheb Wooley',
    album: 'The Purple People Eater',
    youtubeVideoId: 'MfzQMiogl9w',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/e3/Sheb_Wooley_1971.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Bird Dog',
    artist: 'The Everly Brothers',
    album: 'Bird Dog',
    youtubeVideoId: 'ESSlYHp8wPA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/cb/Everly_Brothers_-_Cropped.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: "He's Got the Whole World in His Hands",
    artist: 'Laurie London',
    album: "He's Got the Whole World in His Hands",
    youtubeVideoId: '2Zz8iHOdu0c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c6/Laurie_London_Whole_World.jpeg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Twilight Time',
    artist: 'The Platters',
    album: 'Twilight Time',
    youtubeVideoId: 's0kprJ30_HU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/5/57/The_Platters_First_Promo_Photo_crop.JPG',
    },
  }),
  getSong({
    rank: 9,
    title: 'The Twelfth of Never',
    artist: 'Johnny Mathis',
    album: 'The Twelfth of Never',
    youtubeVideoId: 'nNNRGa3pKyw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/f/fc/Johnny_Mathis_1960.JPG',
    },
  }),
  getSong({
    rank: 10,
    title: 'A Pub with No Beer',
    artist: 'Slim Dusty',
    album: 'A Pub with No Beer',
    youtubeVideoId: '-7EKMe8cZOk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Slim_Dusty_with_Golden_Guitar.jpeg',
    },
  }),
]

export default songs
