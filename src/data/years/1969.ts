import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1969

export const description =
  'The decade went out with a bang as psychedelic rock, countercultural anthems, and raw blues-rock muscled their way onto the Australian charts. Local acts were producing genuinely ambitious, experimental pop that could stand next to anything from overseas. The mood was restless and creative, with the old easy listening guard giving way to something louder and more urgent.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1969_in_Australia',
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

// Source: Kent Music Report 1969 year-end chart
// Via: Wikipedia - List of top 25 singles for 1969 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Something / Come Together',
    artist: 'The Beatles',
    album: 'Abbey Road (Super Deluxe Edition) [2019 Remix & Remaster]',
    youtubeVideoId: '8JKoFCUaUbY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/29/77/1d/29771d4e-a301-6e48-99de-1300b3f63f15/19UMGIM68356.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Honky Tonk Women',
    artist: 'The Rolling Stones',
    album: "Honky Tonk Women / You Can't Always Get What You Want - EP",
    youtubeVideoId: 'gqtJELaLG5k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/9a/af/4b/9aaf4bb1-4f88-61c6-d742-f803f2bd0f87/19UMGIM98132.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Ob-La-Di, Ob-La-Da / While My Guitar Gently Weeps',
    artist: 'The Beatles',
    album: 'The Beatles (The White Album)',
    youtubeVideoId: 'g_Kh_L26604',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fa/5b/89/fa5b898d-bad6-e053-4195-260e5c74f2bb/00602567725466.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'The Real Thing',
    artist: 'Russell Morris',
    album: 'The Dish (Music From the Motion Picture)',
    youtubeVideoId: 'tAVPerpD44k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/f5/27/8b/f5278b22-4f27-c2b5-909c-b33ca7d2ac8b/00030206622690.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Suspicious Minds',
    artist: 'Elvis Presley',
    album: 'Elv1s: 30 #1 Hits',
    youtubeVideoId: 'WrMGGouem3c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/10/53/1d/10531d93-d6d2-996d-516f-5ea58bc4dbfa/884977724691.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Part Three into Paper Walls / The Girl That I Love',
    artist: 'Russell Morris',
    album: 'Fundamentalist',
    youtubeVideoId: 'zKHzUHb6g4Q',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bc/4a/85/bc4a85ef-2e37-f364-695f-b022a10e04e5/22UMGIM28442.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Penny Arcade',
    artist: 'Roy Orbison',
    album: 'Big O',
    youtubeVideoId: 'ovBuo7QyKTQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/9f/4d/a0/9f4da025-4ddb-5057-f0f6-4dacf0110e81/00602547463876.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: "Get Back / Don't Let Me Down",
    artist: 'The Beatles',
    album: 'Get Back: The Rooftop Performance (Live)',
    youtubeVideoId: 'NCtzkaL2t_Y',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/8f/63/a4/8f63a487-e0ad-968f-9750-5f762e6b462b/21UM1IM56121.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Hair',
    artist: 'The Cowsills',
    album: 'The Best of the Cowsills',
    youtubeVideoId: 'Qt_yKPNORLM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/cb/37/4d/cb374d1d-95bd-731a-2da3-2afe9bd03cc2/00731452020420.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Where Do You Go To (My Lovely)',
    artist: 'Peter Sarstedt',
    album: 'Where Do You Go to (My Lovely)',
    youtubeVideoId: 'L8XQZYIiNgo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b8/24/1f/b8241ffe-b18d-b355-dfbd-2402df31e0a2/842474113752.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
