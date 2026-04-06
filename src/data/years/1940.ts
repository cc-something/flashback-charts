import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const description =
  'Big band swing and sentimental dance numbers set the mood for Australian listeners as the war kicked off. British bandleaders dominated the charts alongside American crooners, and novelty singalongs like polkas and waltzes gave people something cheerful to hold onto while the news from Europe grew darker.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index.php?Itemid=49&id=942&option=com_content&task=view',
}

const year = 1940

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

// Source: Australian Chart Book year-end chart for 1940
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'The Woodpecker Song',
    artist: 'Kate Smith; Glenn Miller',
    album: 'The Woodpecker Song',
    youtubeVideoId: 'SIhHGUIrwmw',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/2/20/Kate_Smith_Billboard_4.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Till the Lights of London Shine Again',
    artist: 'Joe Loss',
    album: 'Till the Lights of London Shine Again',
    youtubeVideoId: '61uq93r5FA8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg/330px-Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'South of the Border (Down Mexico Way)',
    artist: 'Joe Loss; Carson Robison',
    album: 'South of the Border (Down Mexico Way)',
    youtubeVideoId: 'WlDavrbBn1A',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg/330px-Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'Blue Orchids',
    artist: 'Joe Loss; Glenn Miller',
    album: 'Blue Orchids',
    youtubeVideoId: 'yEXU9xydFXY',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg/330px-Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Beer Barrel Polka (Roll Out the Barrel)',
    artist: 'The Andrews Sisters; Joe Loss',
    album: 'Beer Barrel Polka (Roll Out the Barrel)',
    youtubeVideoId: '6mHEEB61gn4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Andrews_Sisters_Billboard_4.jpg/330px-Andrews_Sisters_Billboard_4.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'Begin the Beguine',
    artist: 'Joe Loss; Artie Shaw',
    album: 'Begin the Beguine',
    youtubeVideoId: 'cCYGyg1H56s',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg/330px-Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'The Singing Hills',
    artist: 'Jack White; Bing Crosby',
    album: 'The Singing Hills',
    youtubeVideoId: 'PDO6tC7kJtk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Werchter070718_p2_%285_of_37%29_%2853977414178%29_%28cropped%29.jpg/330px-Werchter070718_p2_%285_of_37%29_%2853977414178%29_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'Somewhere in France with You',
    artist: 'Joe Loss; The West End Players',
    album: 'Somewhere in France with You',
    youtubeVideoId: '8RXZsAKuk5o',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg/330px-Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Oh Johnny, Oh Johnny, Oh!',
    artist: 'Joe Loss; The Andrews Sisters',
    album: 'Oh Johnny, Oh Johnny, Oh!',
    youtubeVideoId: 'qfY7L__-kIQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg/330px-Joe_Loss%2C_popular_British_Dance_Bandleader_of_the_1930s-1940s.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'When You Wish Upon a Star',
    artist: 'Roy Smeck; Kate Smith',
    album: 'When You Wish Upon a Star',
    youtubeVideoId: 'e4Dh4IU1iFQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Roy_Smeck_1926.jpg/330px-Roy_Smeck_1926.jpg',
    },
  }),
]

export default songs
