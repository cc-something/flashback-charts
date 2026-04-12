import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const description =
  'Relief and celebration poured through the charts as the war ended, with carefree singalongs and breezy crooner numbers capturing the mood of a country ready to move on. Sentimental wartime ballads still lingered, but the tone had clearly brightened, and even the biggest tearjerkers felt more nostalgic than heartbroken.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_number-one_singles_in_Australia_during_the_1940s',
}

const year = 1945

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

// Source: Australian Chart Book year-end chart for 1945
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "Don't Fence Me In",
    artist: 'Bing Crosby & The Andrews Sisters',
    album: "Don't Fence Me In",
    youtubeVideoId: 'RLz8zYqazt0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'It Could Happen to You',
    artist: 'Bing Crosby; Dinah Shore',
    album: 'It Could Happen to You',
    youtubeVideoId: 'K7gD-JwCAlc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Amor, Amor',
    artist: 'Bing Crosby',
    album: 'Amor, Amor',
    youtubeVideoId: '2HaCkfzOVao',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: "I'll Be Seeing You",
    artist: 'Bing Crosby; Joe Loss',
    album: "I'll Be Seeing You",
    youtubeVideoId: '9JgDY6B_0po',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Long Ago (And Far Away)',
    artist: 'Perry Como; Vera Lynn',
    album: 'Long Ago (And Far Away)',
    youtubeVideoId: 'kJCB3aZF6DM',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Perry_Como_1962.JPG/330px-Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 6,
    title: 'My Dreams Are Getting Better All the Time',
    artist: 'Les Brown',
    album: 'My Dreams Are Getting Better All the Time',
    youtubeVideoId: 'n6a6f3SLVKE',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Les_Brown_1947.JPG/330px-Les_Brown_1947.JPG',
    },
  }),
  getSong({
    rank: 7,
    title: 'Swinging on a Star',
    artist: 'Bing Crosby; Joe Loss',
    album: 'Swinging on a Star',
    youtubeVideoId: 'ahsIPx62rXA',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'Lili Marlene (My Lili of the Lamplight)',
    artist: 'Geraldo; Lale Andersen',
    album: 'Lili Marlene (My Lili of the Lamplight)',
    youtubeVideoId: 'aS9IY8YeAS8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Lale.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: "(Too-Ra-Loo-Ra-Loo-Ral) That's an Irish Lullaby",
    artist: 'Bing Crosby',
    album: "(Too-Ra-Loo-Ra-Loo-Ral) That's an Irish Lullaby",
    youtubeVideoId: '8fYmxrDz7zU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bing_Crosby_Paramount_Pictures.jpg/330px-Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'There Goes That Song Again',
    artist: 'Kate Smith; George Trevare',
    album: 'There Goes That Song Again',
    youtubeVideoId: 'qlfDQpvWe-o',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/2/20/Kate_Smith_Billboard_4.jpg',
    },
  }),
]

export default songs
