import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index.php?option=com_content&task=view&id=936&Itemid=53',
}

const year = 1946

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

// Source: Australian Chart Book year-end chart for 1946
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Symphony',
    artist: 'Freddy Martin; Bing Crosby',
    album: 'Symphony',
    youtubeVideoId: 'CyCaLRpZ08w',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/f/f5/FreddyMartinStageDoorCanteen2.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'On the Atchison, Topeka and the Santa Fe',
    artist: 'Bing Crosby; Judy Garland',
    album: 'On the Atchison, Topeka and the Santa Fe',
    youtubeVideoId: 'rZmmTZ3ONIg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Rum and Coca-Cola',
    artist: 'Andrews Sisters',
    album: 'Rum and Coca-Cola',
    youtubeVideoId: 'WiayZdPESno',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Andrews_Sisters_Billboard_4.jpg/330px-Andrews_Sisters_Billboard_4.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'A Friend of Yours',
    artist: 'Bing Crosby; Frank Sinatra',
    album: 'A Friend of Yours',
    youtubeVideoId: 'RH1R7NB7POA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Sioux City Sue',
    artist: 'Bing Crosby & Jesters; Kate Smith',
    album: 'Sioux City Sue',
    youtubeVideoId: 'DP1mq0xfeyw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: "I'm Beginning to See the Light",
    artist: 'Ella Fitzgerald & Ink Spots; Duke Ellington',
    album: "I'm Beginning to See the Light",
    youtubeVideoId: 'udjA9Pk3LMU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ella_Fitzgerald_6_%28cropped%29.jpg/330px-Ella_Fitzgerald_6_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Into Each Life Some Rain Must Fall',
    artist: 'Ella Fitzgerald & Ink Spots',
    album: 'Into Each Life Some Rain Must Fall',
    youtubeVideoId: 'PJ9IaplRrm4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ella_Fitzgerald_6_%28cropped%29.jpg/330px-Ella_Fitzgerald_6_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'Lily Belle',
    artist: 'Andrews Sisters; Freddy Martin',
    album: 'Lily Belle',
    youtubeVideoId: 'MSyfNiRF76E',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Andrews_Sisters_Billboard_4.jpg/330px-Andrews_Sisters_Billboard_4.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: "It's Been a Long, Long Time",
    artist: 'Bing Crosby & Carmen Cavallaro',
    album: "It's Been a Long, Long Time",
    youtubeVideoId: 'uVFDztq-eCs',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Just a Prayer Away',
    artist: 'Bing Crosby; Kate Smith',
    album: 'Just a Prayer Away',
    youtubeVideoId: 'Sxbh1S13noM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
]

export default songs
