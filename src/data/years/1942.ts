import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index.php?option=com_content&task=view&id=940&Itemid=53',
}

const year = 1942

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

// Source: Australian Chart Book year-end chart for 1942
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "(There'll Be Bluebirds Over) The White Cliffs of Dover",
    artist: 'Vera Lynn; Jean Cherchi',
    album: "(There'll Be Bluebirds Over) The White Cliffs of Dover",
    youtubeVideoId: 'WAaxkAgVkHQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Dame_Vera_Lynn_4_Allan_Warren.jpg/330px-Dame_Vera_Lynn_4_Allan_Warren.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Deep in the Heart of Texas',
    artist: 'Gene Autry; Horace Heidt',
    album: 'Deep in the Heart of Texas',
    youtubeVideoId: 'pe4AOhwfRq4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gene_Autry%2C_NPG_94_39.jpg/330px-Gene_Autry%2C_NPG_94_39.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: "I Don't Want to Set the World on Fire",
    artist: 'Horace Heidt; Ink Spots',
    album: "I Don't Want to Set the World on Fire",
    youtubeVideoId: 'fW02pY8qUMg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/6a/Horace_Heidt_1937.JPG',
    },
  }),
  getSong({
    rank: 3,
    title: 'Daddy',
    artist: 'Sammy Kaye; Andrews Sisters',
    album: 'Daddy',
    youtubeVideoId: '5xY2vd-mNSU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sammy_Kaye_1952.JPG/330px-Sammy_Kaye_1952.JPG',
    },
  }),
  getSong({
    rank: 5,
    title: 'San Antonio Rose',
    artist: 'Bing Crosby',
    album: 'San Antonio Rose',
    youtubeVideoId: 'qrOqVSawiqA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: "Elmer's Tune",
    artist: 'Glenn Miller; Victor Silvester',
    album: "Elmer's Tune",
    youtubeVideoId: 'QmAoLjFEAi8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Glenn_Miller_Billboard.jpg/330px-Glenn_Miller_Billboard.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'I Yi, Yi, Yi, Yi (I Like You Very Much)',
    artist: 'Carmen Miranda; Frankie Masters',
    album: 'I Yi, Yi, Yi, Yi (I Like You Very Much)',
    youtubeVideoId: 'OBsf8DdRwpI',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Carmen_Miranda_in_That_Night_in_Rio_%281941%29.jpg/330px-Carmen_Miranda_in_That_Night_in_Rio_%281941%29.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'Concerto for Two (A Love Song)',
    artist: 'Vera Lynn; Johnny Messner',
    album: 'Concerto for Two (A Love Song)',
    youtubeVideoId: 'YL5FJpwEJCA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Dame_Vera_Lynn_4_Allan_Warren.jpg/330px-Dame_Vera_Lynn_4_Allan_Warren.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Chica Chica Boom Chic',
    artist: 'Carmen Miranda; The Modernists',
    album: 'Chica Chica Boom Chic',
    youtubeVideoId: 'KHJLm6WNEv4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Carmen_Miranda_in_That_Night_in_Rio_%281941%29.jpg/330px-Carmen_Miranda_in_That_Night_in_Rio_%281941%29.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Chattanooga Choo Choo',
    artist: 'Glenn Miller; Joe Loss',
    album: 'Chattanooga Choo Choo',
    youtubeVideoId: 'V2aj0zhXlLA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Glenn_Miller_Billboard.jpg/330px-Glenn_Miller_Billboard.jpg',
    },
  }),
]

export default songs
