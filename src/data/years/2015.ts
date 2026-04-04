import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2015_in_Australia',
}

const year = 2015

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

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Uptown Funk',
    artist: 'Mark Ronson featuring Bruno Mars',
    album: 'Uptown Special',
    youtubeVideoId: 'OPf0YbXqDm0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a7/Mark_Ronson_-_Uptown_Funk_%28feat._Bruno_Mars%29_%28Official_Single_Cover%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Cheerleader (Felix Jaehn Remix)',
    artist: 'Omi',
    album: 'Me 4 U',
    youtubeVideoId: 'jGflUbPQfos',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a5/Cheerleader-OMi-Felix-Jaehn-Remix.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'See You Again',
    artist: 'Wiz Khalifa featuring Charlie Puth',
    album: 'Furious 7 soundtrack',
    youtubeVideoId: 'RgKAFK5djSk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/08/Wiz_Khalifa_Feat._Charlie_Puth_-_See_You_Again_%28Official_Single_Cover%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Take Me to Church',
    artist: 'Hozier',
    album: 'Hozier',
    youtubeVideoId: 'PVjiKRfKpPI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e5/Hozier_Take_Me_to_Church.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Hello',
    artist: 'Adele',
    album: '25',
    youtubeVideoId: 'YQHsXMglC9A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/85/Adele_-_Hello_%28Official_Single_Cover%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Lean On',
    artist: 'Major Lazer & DJ Snake featuring MØ',
    album: 'Peace Is the Mission',
    youtubeVideoId: 'YqeW9_5kURI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/ed/Major_Lazer_and_DJ_Snake_-_Lean_On_%28feat._M%C3%98%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Love Me Like You Do',
    artist: 'Ellie Goulding',
    album: 'Delirium',
    youtubeVideoId: 'AJtDXIazrMo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/17/Ellie_Goulding_-_Love_Me_Like_You_Do.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Shut Up and Dance',
    artist: 'Walk the Moon',
    album: 'Talking Is Hard',
    youtubeVideoId: '6JCLY0Rlx6Q',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/71/Walk_the_Moon_-_Shut_Up_and_Dance_%28Official_Single_Cover%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'What Do You Mean?',
    artist: 'Justin Bieber',
    album: 'Purpose',
    youtubeVideoId: 'DK_0jXPuIr0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'FourFiveSeconds',
    artist: 'Rihanna, Kanye West and Paul McCartney',
    album: 'FourFiveSeconds',
    youtubeVideoId: 'kt0g4dWxEBo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/7e/FourFiveSeconds_cover.png',
      artist: null,
    },
  }),
]

export default songs
