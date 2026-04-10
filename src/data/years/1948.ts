import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const description =
  'Sweet, easygoing pop and novelty tunes ruled the year, with upbeat singalongs and sentimental ballads splitting the charts almost evenly. The Maori farewell song craze showed how much Australians loved a good emotional tearjerker, and old-fashioned Irish and folk-tinged numbers were surprisingly popular alongside the slick American bandleaders.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index2.php?do_pdf=1&id=934&option=com_content',
}

const year = 1948

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

// Source: Australian Chart Book year-end chart for 1948
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Near You',
    artist: 'Francis Craig; The Andrews Sisters',
    album: 'Near You',
    youtubeVideoId: 'CbZLpAMnclQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Andrews_Sisters_Billboard_4.jpg/330px-Andrews_Sisters_Billboard_4.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Chi-Baba, Chi-Baba',
    artist: 'Perry Como; Joe Loss',
    album: 'Chi-Baba, Chi-Baba',
    youtubeVideoId: 'GOzoS1gMv-g',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Perry_Como_1962.JPG/330px-Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 3,
    title: 'Serenade of the Bells',
    artist: 'Sammy Kaye; Geraldo',
    album: 'Serenade of the Bells',
    youtubeVideoId: 'X6nORsobZKE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sammy_Kaye_1952.JPG/330px-Sammy_Kaye_1952.JPG',
    },
  }),
  getSong({
    rank: 4,
    title: "I'm Looking Over a Four Leaf Clover",
    artist: 'Art Mooney; George Trevare',
    album: "I'm Looking Over a Four Leaf Clover",
    youtubeVideoId: 'VY-_8XOrvTs',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Art_Mooney_Billboard.jpg/330px-Art_Mooney_Billboard.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'When You Were Sweet Sixteen',
    artist: 'Al Jolson; Perry Como',
    album: 'When You Were Sweet Sixteen',
    youtubeVideoId: 'AYL3DBJL6o8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Al_Jolson_-_publicity.JPG/330px-Al_Jolson_-_publicity.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Now Is the Hour (Maori Farewell Song)',
    artist: 'Bing Crosby; Gracie Fields',
    album: 'Now Is the Hour (Maori Farewell Song)',
    youtubeVideoId: '0LGGMHFfM6s',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Golden Earrings',
    artist: 'Peggy Lee; Bing Crosby',
    album: 'Golden Earrings',
    youtubeVideoId: 'mL9HI19m4NM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Peggy_Lee_1950.JPG/330px-Peggy_Lee_1950.JPG',
    },
  }),
  getSong({
    rank: 8,
    title: "McNamara's Band",
    artist: 'Bing Crosby & Jesters',
    album: "McNamara's Band",
    youtubeVideoId: 'Y8wAK8EjooQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: "We'll Gather Lilacs",
    artist: 'Bing Crosby',
    album: "We'll Gather Lilacs",
    youtubeVideoId: 'Ttv15ZPKXZ4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'An Apple Blossom Wedding',
    artist: 'Sammy Kaye; Jimmy Leach',
    album: 'An Apple Blossom Wedding',
    youtubeVideoId: 'DwHw5O4Yo_c',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sammy_Kaye_1952.JPG/330px-Sammy_Kaye_1952.JPG',
    },
  }),
]

export default songs
