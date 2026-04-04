import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2016_in_Australia',
}

const year = 2016

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
    title: 'Closer',
    artist: 'The Chainsmokers featuring Halsey',
    album: 'Collage',
    youtubeVideoId: 'PT2_F-1esPk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'One Dance',
    artist: 'Drake featuring Wizkid and Kyla',
    album: 'Views',
    youtubeVideoId: 'iAbnEUA0wpA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/5/59/DrakeOneDance.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: '7 Years',
    artist: 'Lukas Graham',
    album: 'Lukas Graham',
    youtubeVideoId: 'LHCob76kigA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bc/7-Years-by-Lukas-Graham.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Never Be like You',
    artist: 'Flume featuring Kai',
    album: 'Skin',
    youtubeVideoId: 'Ly7uj0JwgKg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/39/Never_Be_Like_You_%28featuring_Kai%29_%28Official_Single_Cover%29_by_Flume.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: "Don't Let Me Down",
    artist: 'The Chainsmokers featuring Daya',
    album: 'Collage',
    youtubeVideoId: 'Io0fBr1XBUA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/44/Don%27t_Let_Me_Down_%28featuring_Daya%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'This Is What You Came For',
    artist: 'Calvin Harris featuring Rihanna',
    album: 'This Is What You Came For',
    youtubeVideoId: 'kOkQ4T5WO9E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a8/This_Is_What_You_Came_For_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "Can't Stop the Feeling!",
    artist: 'Justin Timberlake',
    album: 'Trolls: Original Motion Picture Soundtrack',
    youtubeVideoId: 'ru0K8uYEZWw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/21/Justin_Timberlake_-_Can%27t_Stop_the_Feeling.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Cheap Thrills',
    artist: 'Sia',
    album: 'This Is Acting',
    youtubeVideoId: 'nYh-n-O1nJo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/fc/Sia_Cheap_Thrills.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    album: 'Blurryface',
    youtubeVideoId: 'pXRviuL6vMY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/fc/Twenty_One_Pilots_-_Stressed_Out.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    album: 'Purpose',
    youtubeVideoId: 'oyEuk8j8imI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0b/JustinBieberLoveYourself.png',
      artist: null,
    },
  }),
]

export default songs
