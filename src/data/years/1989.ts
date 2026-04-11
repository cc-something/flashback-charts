import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1989

export const description =
  'The decade closed with a rush of polished pop-rock and sentimental power ballads, as Scandinavian pop and boy band mania hinted at what the 90s would bring. Australian artists held strong with soulful, sophisticated singles, and the charts had a bittersweet, end-of-an-era quality to them.'

export const source = {
  label: 'ARIA Charts',
  url: 'https://www.aria.com.au/charts/1989/singles-chart',
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

// Source: ARIA End of Year Singles Chart for 1989
// Via: Wikipedia - List of top 25 singles for 1989 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Like a Prayer',
    artist: 'Madonna',
    album: 'Like a Prayer',
    youtubeVideoId: '79fzeNUqQbQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/20/3c/f5/203cf53d-689e-528f-29d7-ba33758254aa/mzi.rotbotfl.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'The Look',
    artist: 'Roxette',
    album: 'Greatest Hits',
    youtubeVideoId: 'LlVI7ZNiFlI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/5c/ef/d7/5cefd760-1260-4081-621a-85db2355e13a/dj.gmqdvhoe.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "I'm Gonna Be (500 Miles)",
    artist: 'The Proclaimers',
    album: 'Sunshine On Leith',
    youtubeVideoId: 'tbNlMtqrYS0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/13/96/50/139650ee-571d-a428-9ea4-ca6cf2d0bbbd/094638392057.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Eternal Flame',
    artist: 'The Bangles',
    album: 'The Essential Bangles',
    youtubeVideoId: 'dkFZF4BZ75c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b2/2a/57/b22a5707-86ae-2719-e661-b7c4a91773c5/mzi.gizvcfrx.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'If I Could Turn Back Time',
    artist: 'Cher',
    album: 'Heart of Stone',
    youtubeVideoId: '9n3A_-HRFfc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/30/ee/1f/30ee1ff4-155f-118b-d1f2-51a6846f5c16/00720642423929.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'She Drives Me Crazy',
    artist: 'Fine Young Cannibals',
    album: 'The Raw & the Cooked',
    youtubeVideoId: 'UtvmTu4zAMg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4f/fe/9d/4ffe9dfd-4fe7-6c13-cf1e-96d02732d9e9/639842820820.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Bedroom Eyes',
    artist: 'Kate Ceberano',
    album: 'Brave',
    youtubeVideoId: 'ZZpl_G1v0BE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/12/02/65/120265b5-2162-0c2e-9608-4cbc7fe370b5/25UM1IM21309.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'You Got It (The Right Stuff)',
    artist: 'New Kids on the Block',
    album: 'Greatest Hits',
    youtubeVideoId: 'tbIEwIwYz-c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e3/eb/bc/e3ebbc1b-4712-dbc4-7be4-c4e991a22018/mzi.levfkmsl.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Kokomo',
    artist: 'The Beach Boys',
    album: 'The Very Best of The Beach Boys: Sounds of Summer',
    youtubeVideoId: 'WXB4LspLQE0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/e7/23/02/e7230264-d5a9-a3b0-9eee-c6af522781fb/13UABIM59247.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'The Living Years',
    artist: 'Mike + The Mechanics',
    album: 'Living Years',
    youtubeVideoId: '5hr64MxYpgk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/44/33/14/4433144a-7215-d89d-377a-871bd45b074f/081227921163.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
