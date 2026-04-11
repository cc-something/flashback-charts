import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1961

export const description =
  'Teenage pop and rock and roll kept driving the Australian charts, with a strong taste for upbeat, danceable singles and the occasional sentimental ballad. Orchestral instrumentals had a surprising presence, and local artists were carving out a bigger slice of the charts alongside the usual American favourites.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1961_in_Australia',
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

// Source: Kent Music Report 1961 year-end chart
// Via: Wikipedia - List of top 25 singles for 1961 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "I'm Gonna Knock on Your Door",
    artist: 'Eddie Hodges',
    album: "I'm Gonna Knock on Your Door",
    youtubeVideoId: 'QRIhld4O68c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/ed/d6/ea/edd6ead1-7803-9fb7-b586-30417b09cf7c/Eddie_Hodges_-_I_m_Gonna_Knock_On_Your_Door.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Runaway',
    artist: 'Del Shannon',
    album: 'Runaway',
    youtubeVideoId: 'veRHPL9xFpY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/ff/3b/5d/mzi.hjovibrf.tif/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Wooden Heart',
    artist: 'Elvis Presley',
    album: 'G.I. Blues',
    youtubeVideoId: 'X02t8vKLtbw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/10/53/1d/10531d93-d6d2-996d-516f-5ea58bc4dbfa/884977724691.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Hello Mary Lou',
    artist: 'Ricky Nelson',
    album: 'Rick Is 21',
    youtubeVideoId: 'AMVQCHgpYmI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a5/49/95/a549954c-6986-0d5a-4fbf-9d5ddabc174b/13UMGIM42973.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: "My Boomerang Won't Come Back",
    artist: 'Charlie Drake',
    album: "My Boomerang Won't Come Back",
    youtubeVideoId: '_prtbj4MtDU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b7/c0/5f/b7c05f36-7edd-7044-aaec-c6c111b0af15/05099962336659.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'A Scottish Soldier',
    artist: 'Andy Stewart',
    album: 'Scottish Songs',
    youtubeVideoId: 'SCSB_BiNSZo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/e8/cc/b2/e8ccb24c-b644-cdb6-38f9-8bd53dd16f90/BRHCD50.jpeg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "I'm Counting on You",
    artist: "Johnny O'Keefe",
    album: 'Love Songs & Ballads',
    youtubeVideoId: 'uPXvnPvi-WE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/d5/00/73/mzi.oooxyoyv.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Wonderland by Night',
    artist: 'Bert Kaempfert and His Orchestra',
    album: 'Wonderland By Night (Remastered)',
    youtubeVideoId: 'YCDpJT7pJFk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e0/70/2d/e0702d11-a3b1-8ac9-3ecc-3d5ff8c126c6/12UMGIM15139.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Theme from Exodus',
    artist: 'Ferrante and Teicher',
    album: 'All Time Great Movie Themes',
    youtubeVideoId: 'c6wq0RB6wTU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fa/fa/4e/fafa4ed9-b9b9-a416-5711-5e18d7b6fa08/00077779882359.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Crying / Candy Man',
    artist: 'Roy Orbison',
    album: 'Crying',
    youtubeVideoId: '0FTKYtQXbro',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music30/v4/1b/7d/6a/1b7d6ad1-bc32-ac8b-f430-26236ca595f7/dj.yqgmienz.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
