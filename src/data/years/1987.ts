import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1987

export const source = {
  label: 'Australian Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1987_in_Australia',
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

// Source: Australian Music Report 1987 year-end chart
// Via: Wikipedia - List of top 25 singles for 1987 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Locomotion',
    artist: 'Kylie Minogue',
    album: 'Kylie',
    youtubeVideoId: 'POWsFzSFLCE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/c4/95/15c495d2-30cb-2a84-88dc-47545b86e414/5060203290009.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'La Bamba',
    artist: 'Los Lobos',
    album: 'La Bamba (Original Motion Picture Soundtrack)',
    youtubeVideoId: 'nLAWPrCUQQ0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/11/ac/57/mzi.gihwdlmg.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Old Time Rock and Roll',
    artist: 'Bob Seger',
    album: 'Nine Tonight (Live) [Remastered]',
    youtubeVideoId: 'W1LsRShUPtY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/eb/12/e9/eb12e9f6-14a5-1e95-206b-349d5f1a1aed/00602557774740.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Slice of Heaven',
    artist: 'Dave Dobbyn and Herbs',
    album: "Footrot Flats - The Dog's Tale",
    youtubeVideoId: 'M0pWejAnLUQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/5d/4e/a8/5d4ea84b-0e43-7ef7-58c6-83a60bc0457e/828767660127.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Respectable',
    artist: 'Mel and Kim',
    album: 'F.L.M. (Deluxe Edition)',
    youtubeVideoId: 'ykDsmAqExH8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/97/45/77/97457769-d74a-ae2b-5d36-467c32997751/5037300817804.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "You Keep Me Hangin' On",
    artist: 'Kim Wilde',
    album: 'Another Step',
    youtubeVideoId: 'xJZF-skCY-M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/7a/fb/bf/7afbbf14-a998-af7d-791e-b3cd2d242ce3/00602537576388.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Walk Like an Egyptian',
    artist: 'The Bangles',
    album: 'Greatest Hits',
    youtubeVideoId: 'vth-T1u7A58',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4c/33/3e/4c333e8d-8f6e-c661-531a-f241231074f4/mzi.ircnuisz.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Electric Blue',
    artist: 'Icehouse',
    album: 'Man of Colours',
    youtubeVideoId: 'zeV_POB16f8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/82/f3/db/82f3dbeb-856d-c649-2dd1-807651880362/icehouse-man-of-colours-1761070.jpeg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Boom Boom (Let's Go Back to My Room)",
    artist: 'Paul Lekakis',
    album:
      "Boom, Boom (Let's Go Back To My Room) (Re-Recorded / Remastered Version)",
    youtubeVideoId: 'xXMrDu7374Y',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/e0/10/0e/mzi.vzncxjvs.tif/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'The Final Countdown',
    artist: 'Europe',
    album: 'The Final Countdown (Expanded Edition)',
    youtubeVideoId: '9jK-NcRmVcw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/00/4d/a9/004da9d2-9b4f-99f4-d396-72ec786fb88c/696998575721.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
