import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const description =
  'Crooner-led ballads and dreamy romantic numbers dominated the Australian charts, with songs about moonlight, waltzes, and missing loved ones giving the year a deeply sentimental feel. The war still loomed over everything, and several hits openly wished for the lights to come back on, but the mood was more wistful than grim.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index.php?option=com_content&task=view&id=939&Itemid=53',
}

const year = 1943

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

// Source: Australian Chart Book year-end chart for 1943
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'White Christmas',
    artist: 'Bing Crosby',
    album: 'White Christmas',
    youtubeVideoId: 'v5ryZdpEHqM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: "I Don't Want to Walk Without You",
    artist: 'Kate Smith; Bing Crosby',
    album: "I Don't Want to Walk Without You",
    youtubeVideoId: 'a0x5P9huTtg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/2/20/Kate_Smith_Billboard_4.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: "Why Don't You Fall in Love with Me",
    artist: 'Dinah Shore',
    album: "Why Don't You Fall in Love with Me",
    youtubeVideoId: '0vqzMKJSGRY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Dinah_Shore_-_promo.jpg/330px-Dinah_Shore_-_promo.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'I Had the Craziest Dream',
    artist: 'Harry James; Vera Lynn',
    album: 'I Had the Craziest Dream',
    youtubeVideoId: '9CoC3oo_HOA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Harry_James_Billboard_4.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'The Anniversary Waltz',
    artist: 'Bing Crosby; Vera Lynn',
    album: 'The Anniversary Waltz',
    youtubeVideoId: 'zs-z0z483sw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'When the Lights Go On Again (All Over the World)',
    artist: 'Vaughn Monroe; Vera Lynn',
    album: 'When the Lights Go On Again (All Over the World)',
    youtubeVideoId: 'zVg97yrjkwA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/87/Vaughn_Monroe.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Moonlight Becomes You',
    artist: 'Bing Crosby; Glenn Miller',
    album: 'Moonlight Becomes You',
    youtubeVideoId: 'dUmkz95E7mw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'Jingle, Jangle, Jingle',
    artist: 'Gene Autry',
    album: 'Jingle, Jangle, Jingle',
    youtubeVideoId: 'F5fFkrigxHg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gene_Autry%2C_NPG_94_39.jpg/330px-Gene_Autry%2C_NPG_94_39.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Blues in the Night',
    artist: 'Bing Crosby; Judy Garland',
    album: 'Blues in the Night',
    youtubeVideoId: 'A1OBvPIphLw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Tangerine',
    artist: 'Jimmy Dorsey; Victor Silvester',
    album: 'Tangerine',
    youtubeVideoId: 'q-JDUnZv1N0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Jimmy_Dorsey_Billboard_2.jpg',
    },
  }),
]

export default songs
