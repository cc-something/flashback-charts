import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1966

export const description =
  'Pop was getting more adventurous, with local beat groups pushing boundaries alongside the usual British and American chart-toppers. Novelty pop and lush orchestral numbers still charted well, but there was a clear sense that something grittier and more experimental was bubbling up from the club circuit.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1966_in_Australia',
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

// Source: Kent Music Report 1966 year-end chart
// Via: Wikipedia - List of top 25 singles for 1966 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "These Boots Are Made for Walkin'",
    artist: 'Nancy Sinatra',
    album: 'Boots (Bonus Tracks Edition)',
    youtubeVideoId: '9Qp_SrTgBBs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/95/e0/e0/95e0e041-fe07-d5c1-1b28-95e3ccf36f88/196292057867.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'We Can Work It Out / Day Tripper',
    artist: 'The Beatles',
    album: 'Past Masters, Vols. 1 & 2',
    youtubeVideoId: 'Qyclqo_AV2M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/01/69/02/01690216-48fc-1c54-b1de-48170d16b1c3/00602567725268.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Yellow Submarine / Eleanor Rigby',
    artist: 'The Beatles',
    album: 'Yellow Submarine Songtrack',
    youtubeVideoId: 'HuS5NuXRb5Y',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/80/22/f9/8022f954-e2e4-9317-529e-a9e306f12553/18UMGIM29772.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Hitch Hiker',
    artist: 'Bobby and Laurie',
    album: 'Best Of………',
    youtubeVideoId: 'rY1Bu2fgck4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/06/71/58/0671587b-121c-cbf9-04ec-6f742c844217/0.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Somewhere My Love',
    artist: 'Ray Conniff and the Singers',
    album:
      'Somewhere My Love (Love Theme from "Dr. Zhivago") And Other Great Hits',
    youtubeVideoId: '1thos17eJ0c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/40/50/a5/4050a565-1c30-0656-26b6-e43f61681e0d/mzi.bmdltnbe.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Lady Godiva',
    artist: 'Peter and Gordon',
    album: 'Peter and Gordon (1966) Plus',
    youtubeVideoId: 'Src_WCmsg8o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/1e/fd/d7/1efdd773-d103-9965-9064-18dc79664252/5099945819551_3600x3600_300dpi.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Ooh La La',
    artist: 'Normie Rowe',
    album: 'The Year 1966',
    youtubeVideoId: 'iYIlC-E5Ymg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/49/0d/a2/490da296-8af4-0fde-cace-08dc2453530a/5059460063815.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Step Back / Cara-Lyn',
    artist: 'Johnny Young and Kompany',
    album: 'Step Back With',
    youtubeVideoId: 'Y3kO6pITtkU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/fa/46/9e/mzi.nqkjbyqt.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Winchester Cathedral',
    artist: 'The New Vaudeville Band',
    album: 'Winchester Cathedral - Single',
    youtubeVideoId: '0GcPYzYYM9M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/6a/77/24/6a772403-fb62-270b-bf80-69e268bee507/887396918658.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Friday on My Mind',
    artist: 'The Easybeats',
    album: 'Friday on My Mind',
    youtubeVideoId: 'dnqxbdnzlhw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/f4/44/2f/f4442f5f-67db-ecaa-ae89-d153b5cb1a0b/0888880697004.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
