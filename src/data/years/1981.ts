import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1981

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1981_in_Australia',
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

// Source: Kent Music Report 1981 year-end chart
// Via: Wikipedia - List of top 25 singles for 1981 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Counting the Beat',
    artist: 'The Swingers',
    album: 'Counting the Beat',
    youtubeVideoId: 'p72Z1D1oKbw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/c8/58/fb/mzi.ujcjhvio.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Stars On 45',
    artist: 'Stars On 45',
    album: 'Stars On 45 - Single',
    youtubeVideoId: '5bGQ1-Gmoso',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9b/63/d8/9b63d8c6-c592-88f3-972f-a8185bce544a/mzi.ppgljghs.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Antmusic',
    artist: 'Adam & The Ants',
    album: 'Kings of the Wild Frontier (Deluxe Edition) [Remastered]',
    youtubeVideoId: 'Rm9drIwmmU4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f8/65/00/f86500a1-1818-4d8e-519e-890409c31f24/886445292176.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Jealous Guy',
    artist: 'Roxy Music',
    album: 'The Best of Roxy Music',
    youtubeVideoId: 'hRzGzRqNj58',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/cb/06/0b/cb060b04-38e3-b831-b81e-b1ffdc03e87b/13UADIM60728.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Devo Live (EP)',
    artist: 'Devo',
    album: 'Dev-O Live',
    youtubeVideoId: 'ITmROKQr8NI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/9d/66/aa/mzi.kwlwpnvg.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Bette Davis Eyes',
    artist: 'Kim Carnes',
    album: 'Mistaken Identity',
    youtubeVideoId: 'EPOIS5taqA8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/28/c2/5d/28c25d5f-4708-6692-4c0c-9e861b836862/13UABIM53155.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: '9 to 5 (Morning Train)',
    artist: 'Sheena Easton',
    album: 'The Definitive Singles 1980 - 1987',
    youtubeVideoId: 'S_3vZYOYNYU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9f/40/22/9f402268-3f12-5924-9f8a-4945133f4302/197338852729.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Endless Love',
    artist: 'Diana Ross and Lionel Richie',
    album: 'The Definitive Collection',
    youtubeVideoId: 'UsqDoz2Co4o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a2/42/21/a24221ca-86a6-7bc0-6497-904434415c32/06UMGIM11025.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Who Can It Be Now?',
    artist: 'Men At Work',
    album: 'Business As Usual',
    youtubeVideoId: 'SECVGN4Bsgg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/80/07/23/80072391-3543-cdb9-e298-08d5f0595f41/dj.uyepaoyc.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Kids In America',
    artist: 'Kim Wilde',
    album: 'Kim Wilde',
    youtubeVideoId: '80TfG7C9azA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f5/57/07/f55707e4-4192-9a3d-63b1-1a2cb8be9775/5037300817682.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
