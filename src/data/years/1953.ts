import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1953

export const description =
  'Novelty hits and breezy vocal pop shared the spotlight with dreamy waltzes and film-inspired love songs. Australian audiences still had a strong appetite for charm and whimsy, and the charts felt lighthearted, even a little playful.'

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

// Source: Australian Chart Book year-end chart for 1953
// Via: Kent Music Report (retro-calculated from state radio charts)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Till I Waltz Again With You',
    artist: 'Teresa Brewer',
    album: 'Till I Waltz Again With You',
    youtubeVideoId: 'WZkTC0YmfVY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/8f/Teresa_brewer.png',
    },
  }),
  getSong({
    rank: 2,
    title: 'The Song from Moulin Rouge (Where Is Your Heart?)',
    artist: 'Percy Faith',
    album: 'The Song from Moulin Rouge (Where Is Your Heart?)',
    youtubeVideoId: 'aKhrRgadxhc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/e9/Percy_Faith%2C_1908-1976_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'You Belong to Me',
    artist: 'Jo Stafford',
    album: 'You Belong to Me',
    youtubeVideoId: 'mJvwzZZkb4M',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/60/1947_Jo_Stafford.JPG',
    },
  }),
  getSong({
    rank: 4,
    title: "I'm Walking Behind You",
    artist: 'Frank Sinatra',
    album: "I'm Walking Behind You",
    youtubeVideoId: 'jTrVEQE2VDU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/3/38/Frank_Sinatra_1961.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Vaya con Dios',
    artist: 'Les Paul & Mary Ford',
    album: 'Vaya con Dios',
    youtubeVideoId: 'QqZ0Sdz_V40',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/6a/Les_Paul%2C_ca._Jan._1947_%28William_P._Gottlieb_07001%29.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'I Went to Your Wedding',
    artist: 'Patti Page',
    album: 'I Went to Your Wedding',
    youtubeVideoId: '9lwruR3CENw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/0/0c/Patti_Page.JPG',
    },
  }),
  getSong({
    rank: 7,
    title: 'I Saw Mommy Kissing Santa Claus',
    artist: 'Jimmy Boyd',
    album: 'I Saw Mommy Kissing Santa Claus',
    youtubeVideoId: 'KA790bGpxaY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/2/2b/Publicity_photograph_of_musician_Jimmy_Boyd_from_the_1960_film_%22Platinum_High_School%22.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: '(How Much Is) That Doggie in the Window?',
    artist: 'Patti Page',
    album: '(How Much Is) That Doggie in the Window?',
    youtubeVideoId: 'Aqwq4AgMiik',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/0/0c/Patti_Page.JPG',
    },
  }),
  getSong({
    rank: 9,
    title: "Don't Let the Stars Get in Your Eyes",
    artist: 'Perry Como',
    album: "Don't Let the Stars Get in Your Eyes",
    youtubeVideoId: 'fhN8l2Qxprk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 10,
    title: 'Tell Me a Story',
    artist: 'Frankie Laine & Jimmy Boyd',
    album: 'Tell Me a Story',
    youtubeVideoId: '1tVbim2gl-0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/f/f8/Frankie_Laine_1954.JPG',
    },
  }),
]

export default songs
