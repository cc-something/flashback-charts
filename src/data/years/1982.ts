import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1982

export const description =
  'Synth-pop and hard-edged rock split the charts down the middle, with dark electronic tracks and anthemic guitar songs both pulling huge numbers. Movie soundtracks and TV themes had real commercial power, and Australian acts were proving they could hang with the biggest international names.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1982_in_Australia',
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

// Source: Kent Music Report 1982 year-end chart
// Via: Wikipedia - List of top 25 singles for 1982 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Eye of the Tiger',
    artist: 'Survivor',
    album: 'Eye of the Tiger (Remastered)',
    youtubeVideoId: 'PuxADhIKd5o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f9/02/8f/f9028f63-7a55-235e-f789-1e8946430fa2/614223201122.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'What About Me',
    artist: 'Moving Pictures',
    album: 'Days of Innocence',
    youtubeVideoId: 'OzQKECQgjW8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a1/39/5b/a1395bbd-e9ab-ba65-3fe8-aa949340f8c7/dj.mnogyjyk.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Tainted Love',
    artist: 'Soft Cell',
    album: 'Tainted Love / Where Did Our Love Go - Single',
    youtubeVideoId: 'XZVpR3Pk-r8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/70/ff/8c/70ff8c59-95dc-5444-fd3b-81204d0477e5/00600753223598.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Centerfold',
    artist: 'The J. Geils Band',
    album: 'Freeze Frame',
    youtubeVideoId: 'BqDjMZKf-wg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ad/86/40/ad8640f2-47e3-6436-2510-3ce392eb21d4/13ULAIM54452.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Key Largo',
    artist: 'Bertie Higgins',
    album: 'Bertie Higgins: The Ultimate Collection',
    youtubeVideoId: 'Ru2tsT32pHA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Features/70/d8/1c/dj.liseodyu.tif/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Mickey',
    artist: 'Toni Basil',
    album: 'Hey Mickey',
    youtubeVideoId: 'qXVlpUg2WXg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/82/af/c3/82afc3c8-5abc-42ff-391e-f2ddef6d4d18/194660720603.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "I Love Rock 'n Roll",
    artist: 'Joan Jett & The Blackhearts',
    album: "I Love Rock 'N' Roll (Expanded Edition)",
    youtubeVideoId: 'Lo7XMvF_4vo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ab/11/50/ab115097-b05e-fee8-61e1-4607fb82af89/886447254332_Cover.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Trouble',
    artist: 'Lindsey Buckingham',
    album: 'Law and Order',
    youtubeVideoId: 'j_Lvblql4qo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/65/f5/1a/mzi.avydqfqw.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Believe It or Not',
    artist: 'Joey Scarbury',
    album: 'The Greatest American Hero',
    youtubeVideoId: 'CsX1YcXY-Tk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/36/18/cc/3618cc3d-96bb-93af-7c89-68456a2e7bdd/s06.gvtyvgpq.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "Hard to Say I'm Sorry",
    artist: 'Chicago',
    album: 'Chicago 16 (Expanded Edition)',
    youtubeVideoId: 'EORSLz0_BRU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a6/af/81/a6af812d-9bc0-d991-707c-9fe83ad10564/081227409029.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
