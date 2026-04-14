import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://www.aria.com.au/charts/2015/singles-chart',
}

export const description =
  '2015 softened the edges, leaning on laid-back pop, warm R&B, and tropical touches that made the whole year feel sunlit. Even the sadder hits sounded smooth and unhurried.'

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
    youtubeVideoId: 'P-WdrMLLpPg',
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
    youtubeVideoId: 'I3JZEXEKzm0',
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
    album: 'Furious 7: Original Motion Picture Soundtrack',
    youtubeVideoId: 'Qog207eDMrY',
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
    youtubeVideoId: 'O1wDihZNQyQ',
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
    youtubeVideoId: '-yL7VP4-kP4',
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
    youtubeVideoId: 'EY98Q6kwoTU',
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
    youtubeVideoId: '4Q5smpIjPR4',
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
    youtubeVideoId: 'X8HUhFSLnl0',
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
    youtubeVideoId: 'zMjUPvHIS0k',
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
    youtubeVideoId: 'mnqZu5hesOo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/7e/FourFiveSeconds_cover.png',
      artist: null,
    },
  }),
]

export default songs
