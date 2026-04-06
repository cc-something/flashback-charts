import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1964

export const description =
  'British beat groups utterly dominated the Australian charts this year, with Merseybeat practically becoming the national soundtrack. The local scene responded with its own wave of beat combos and pop acts, and the sheer enthusiasm for guitar-driven pop was unlike anything Australia had seen before.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1964_in_Australia',
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

// Source: Kent Music Report 1964 year-end chart
// Via: Wikipedia - List of top 25 singles for 1964 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'I Saw Her Standing There / Love Me Do',
    artist: 'The Beatles',
    album: 'Please Please Me',
    youtubeVideoId: 'oxwAB3SECtc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9c/ff/b5/9cffb5a6-a37f-c84a-7240-0333a071bc92/00602567725275.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "I Feel Fine / She's a Woman",
    artist: 'The Beatles',
    album: 'Past Masters, Vols. 1 & 2',
    youtubeVideoId: 'WrAV5EVI4tU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/01/69/02/01690216-48fc-1c54-b1de-48170d16b1c3/00602567725268.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "Can't Buy Me Love / You Can't Do That",
    artist: 'The Beatles',
    album: "A Hard Day's Night",
    youtubeVideoId: 'h3WJiqc_bEs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/a2/7a/dba27a46-3685-508d-d32e-a0e73cc82251/00602567713296.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "A Hard Day's Night / Things We Said Today",
    artist: 'The Beatles',
    album: "A Hard Day's Night",
    youtubeVideoId: 'NItAlTsPuQg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/a2/7a/dba27a46-3685-508d-d32e-a0e73cc82251/00602567713296.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'All My Loving',
    artist: 'The Beatles',
    album: 'With The Beatles',
    youtubeVideoId: 'TSpiwK5fig0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/03/02/d2/0302d204-77c1-0c87-e03a-698bd31cf038/00602567725619.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'I Should Have Known Better / If I Fell',
    artist: 'The Beatles',
    album: "A Hard Day's Night",
    youtubeVideoId: 'FV_PGs0m34U',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/a2/7a/dba27a46-3685-508d-d32e-a0e73cc82251/00602567713296.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "Ain't That Loving You Baby",
    artist: 'Elvis Presley',
    album: "The King of Rock 'n' Roll: The Complete 50's Masters",
    youtubeVideoId: 'KhTkiZOI2sE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7b/b5/62/7bb56262-8509-c451-eb9c-d3e403bfe4a9/884977782844.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Have I the Right?',
    artist: 'The Honeycombs',
    album: 'Have I the Right - The Very Best of the Honeycombs',
    youtubeVideoId: '2ZUWHfI6EuE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/94/16/1e/94161e6f-bee1-8c4e-4fd2-58e28a684b54/0724353831257_1417x1417_300dpi.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "You're My World",
    artist: 'Cilla Black',
    album: 'Cilla',
    youtubeVideoId: 'o6drD2SCwHE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/09/71/a0/0971a01d-ed08-8000-41b8-72781ce0507c/5099996590058_4800x4800_400dpi.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Oh, Pretty Woman',
    artist: 'Roy Orbison',
    album: 'Oh! Pretty Woman',
    youtubeVideoId: '3KFvoDDs0XM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/30/a2/b6/30a2b6ef-d9fb-738c-07e5-97028b39d430/dj.hcobukpd.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
