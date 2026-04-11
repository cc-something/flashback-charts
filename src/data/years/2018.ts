import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2018

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://www.aria.com.au/charts/2018/singles-chart',
}

export const description =
  'Pop, hip-hop, and bruised late-night ballads shared the charts in 2018. The production was sleek, but there was a worn, low-lit mood running through much of the year.'

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
    title: 'Youngblood',
    artist: '5 Seconds of Summer',
    album: 'Youngblood',
    youtubeVideoId: 'XwBmJnGocvY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/5_Seconds_of_Summer_Youngblood.png/250px-5_Seconds_of_Summer_Youngblood.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "God's Plan",
    artist: 'Drake',
    album: 'Scorpion',
    youtubeVideoId: 'xpVfcZ0ZcFM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Scorpion_by_Drake.jpg/250px-Scorpion_by_Drake.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Perfect',
    artist: 'Ed Sheeran',
    album: '÷',
    youtubeVideoId: '2Vv-BfVoq4g',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Divide_cover.png/250px-Divide_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Be Alright',
    artist: 'Dean Lewis',
    album: 'A Place We Knew',
    youtubeVideoId: 'WnqVVgpplVs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Dean_Lewis_-_A_Place_We_Knew.png/250px-Dean_Lewis_-_A_Place_We_Knew.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Meant to Be',
    artist: 'Bebe Rexha featuring Florida Georgia Line',
    album: 'All Your Fault: Pt. 2',
    youtubeVideoId: 'zDo0H8Fm7d0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Bebe_Rexha_-_All_Your_Fault_Pt_II.png/250px-Bebe_Rexha_-_All_Your_Fault_Pt_II.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'I Fall Apart',
    artist: 'Post Malone',
    album: 'Stoney',
    youtubeVideoId: 'sc5iTNVEOAI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Stoneyalbum.jpg/250px-Stoneyalbum.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Psycho',
    artist: 'Post Malone featuring Ty Dolla $ign',
    album: 'Beerbongs & Bentleys',
    youtubeVideoId: 'au2n7VVGv_c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Beerbongs_%26_Bentleys_by_Post_Malone.png/250px-Beerbongs_%26_Bentleys_by_Post_Malone.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Girls Like You',
    artist: 'Maroon 5 featuring Cardi B',
    album: 'Red Pill Blues',
    youtubeVideoId: 'aJOTlE1K90k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Red_Pill_Blues_cover.png/250px-Red_Pill_Blues_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Shotgun',
    artist: 'George Ezra',
    album: "Staying at Tamara's",
    youtubeVideoId: 'v_B3qkp4nO4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Staying_at_Tamara%27s_%28album%29.png/250px-Staying_at_Tamara%27s_%28album%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Eastside',
    artist: 'Benny Blanco, Halsey and Khalid',
    album: 'Friends Keep Secrets',
    youtubeVideoId: '56WBK4ZK_cw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Benny_Blanco_%E2%80%93_Friends_Keep_Secrets.png/250px-Benny_Blanco_%E2%80%93_Friends_Keep_Secrets.png',
      artist: null,
    },
  }),
]

export default songs
