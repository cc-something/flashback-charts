import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2013_in_Australia',
}

const year = 2013

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
    title: 'Roar',
    artist: 'Katy Perry',
    album: 'Prism',
    youtubeVideoId: 'CevxZvSJLk8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/41/Katy_Perry_-_Roar.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Blurred Lines',
    artist: 'Robin Thicke featuring T.I. and Pharrell Williams',
    album: 'Blurred Lines',
    youtubeVideoId: 'yyDUC1LUXSU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Robin_Thicke_Blurred_Lines_Cover.svg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Let Her Go',
    artist: 'Passenger',
    album: 'All the Little Lights',
    youtubeVideoId: 'RBumgq5yVrA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f9/Let-her-go-by-passenger.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Wake Me Up',
    artist: 'Avicii',
    album: 'True',
    youtubeVideoId: 'IcrbM1l_BoI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/da/Avicii_Wake_Me_Up_Official_Single_Cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Royals',
    artist: 'Lorde',
    album: 'Pure Heroine',
    youtubeVideoId: 'nlcIKh6sBtc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/d3/Lorde_-_Royals.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Just Give Me a Reason',
    artist: 'Pink featuring Nate Ruess',
    album: 'The Truth About Love',
    youtubeVideoId: 'OpQFFLBMEPI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/32/Just_Give_Me_a_Reason_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Get Lucky',
    artist: 'Daft Punk featuring Pharrell Williams',
    album: 'Random Access Memories',
    youtubeVideoId: '5NV6Rdv1a3I',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/7/71/Get_Lucky.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Counting Stars',
    artist: 'OneRepublic',
    album: 'Native',
    youtubeVideoId: 'hT_nvWreIhg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/37/OneRepublic_Counting_Stars_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Can't Hold Us",
    artist: 'Macklemore & Ryan Lewis featuring Ray Dalton',
    album: 'The Heist',
    youtubeVideoId: '2zNSgSzhBfM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/61/Can%27t_Hold_Us.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Impossible',
    artist: 'James Arthur',
    album: 'James Arthur',
    youtubeVideoId: 'BRwEM8XEWXA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/48/James_Arthur_-_Impossible.png',
      artist: null,
    },
  }),
]

export default songs
