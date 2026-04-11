import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const description =
  "The charts were packed with smooth crooner vocals and close-harmony vocal groups, as Australian audiences craved warmth and romance during the war's final stretch. Victory polkas and novelty numbers hinted at growing optimism, while soulful ballads about love and longing remained the reliable top-sellers."

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_number-one_singles_in_Australia_during_the_1940s',
}

const year = 1944

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

// Source: Australian Chart Book year-end chart for 1944
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "You'll Never Know",
    artist: 'Vera Lynn; Joe Loss',
    album: "You'll Never Know",
    youtubeVideoId: '0arra0O8m4c',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Dame_Vera_Lynn_4_Allan_Warren.jpg/330px-Dame_Vera_Lynn_4_Allan_Warren.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Sunday, Monday or Always',
    artist: 'Bing Crosby; Frank Sinatra',
    album: 'Sunday, Monday or Always',
    youtubeVideoId: 'BDsEJhLYilU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Paper Doll',
    artist: 'Mills Brothers',
    album: 'Paper Doll',
    youtubeVideoId: 'n2m8VZBfRYo',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Mills_Brothers_Billboard.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'A Lovely Way to Spend an Evening',
    artist: 'Ink Spots; Frank Sinatra',
    album: 'A Lovely Way to Spend an Evening',
    youtubeVideoId: 'Q1nVibkdDVM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/ca/Ink_Spots_Billboard_3.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'San Fernando Valley',
    artist: 'Bing Crosby; Joe Loss',
    album: 'San Fernando Valley',
    youtubeVideoId: 'hMRSpv1G8Vs',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'All or Nothing at All',
    artist: 'Frank Sinatra',
    album: 'All or Nothing at All',
    youtubeVideoId: 'dHBulKUTyOE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Frank_Sinatra_1961.jpg/330px-Frank_Sinatra_1961.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'No Other Love',
    artist: 'Joe Loss; Vera Lynn',
    album: 'No Other Love',
    youtubeVideoId: 'nkXHy7Do_Lw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg/330px-Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: "Whispering Grass (Don't Tell the Trees)",
    artist: 'Ink Spots',
    album: "Whispering Grass (Don't Tell the Trees)",
    youtubeVideoId: 'zBrwaCjJIFU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/ca/Ink_Spots_Billboard_3.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: "Pistol Packin' Mama",
    artist: 'Bing Crosby & The Andrews Sisters',
    album: "Pistol Packin' Mama",
    youtubeVideoId: 'ocOgJU0mxbg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: "Vic'try Polka",
    artist: 'Bing Crosby & The Andrews Sisters',
    album: "Vic'try Polka",
    youtubeVideoId: 'zuJVVhM-rGw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
]

export default songs
