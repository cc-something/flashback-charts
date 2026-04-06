import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1951

export const description =
  'Waltzes, country crossovers, and sweet vocal pop dominated the Australian airwaves, with sentimental love songs proving nearly impossible to escape. Novelty numbers and playful singalongs gave the charts a lighter side, and the mood was warm and uncomplicated.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index.php?Itemid=49&id=931&option=com_content&task=view',
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

// Source: Australian Chart Book year-end chart for 1951
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Tennessee Waltz',
    artist: 'Pee Wee King',
    album: 'Tennessee Waltz',
    youtubeVideoId: '7Sm4lrT9N24',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/ec/Pee_Wee_King_1944.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'If',
    artist: 'Perry Como',
    album: 'If',
    youtubeVideoId: 'nk7yRsSEPIM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 3,
    title: 'The Loveliest Night of the Year',
    artist: 'Mario Lanza',
    album: 'The Loveliest Night of the Year',
    youtubeVideoId: '0VeiwX5wVtw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/en/e/e8/Lanza_still_MGM_Cesari.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'Too Young',
    artist: 'Nat King Cole',
    album: 'Too Young',
    youtubeVideoId: 'KaFtsqU2V6U',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c5/Nat_King_Cole_1947.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'My Truly, Truly Fair',
    artist: 'Guy Mitchell',
    album: 'My Truly, Truly Fair',
    youtubeVideoId: 'DLfLKryY8sA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Guy_Mitchell.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'Silver Dollar',
    artist: 'Art Mooney',
    album: 'Silver Dollar',
    youtubeVideoId: '-9jX1lt02Hs',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/3/3b/Art_Mooney_Strike_It_Rich_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Sweet Violets',
    artist: 'Dinah Shore',
    album: 'Sweet Violets',
    youtubeVideoId: 'LtnLvrmyh3E',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/4/4a/Dinah_Shore_-_promo.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'Aba Daba Honeymoon',
    artist: 'Debbie Reynolds',
    album: 'Aba Daba Honeymoon',
    youtubeVideoId: 'QjXv2SYWVTs',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Debbie_Reynolds_6_Allan_Warren.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'My Heart Cries for You',
    artist: 'Guy Mitchell',
    album: 'My Heart Cries for You',
    youtubeVideoId: 'WPeK2hj02Xo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/6f/Guy_Mitchell.JPG',
    },
  }),
  getSong({
    rank: 10,
    title: 'Come On-a My House',
    artist: 'Rosemary Clooney',
    album: 'Come On-a My House',
    youtubeVideoId: 'mriXncI96lw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/en/f/f4/Rosemary_Clooney_1954.jpg',
    },
  }),
]

export default songs
