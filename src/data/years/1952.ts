import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1952

export const description =
  'Romantic ballads and show tunes ran the Australian charts, with operatic vocals and orchestral pop delivering plenty of drama. The big crooners were still firmly in charge, and the overall sound leaned lush, polished, and deeply sentimental.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://hitsofalldecades.com/chart_hits/index2.php?do_pdf=1&id=1010&option=com_content',
}

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

// Source: Australian Chart Book year-end chart for 1952
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Some Enchanted Evening',
    artist: 'Ezio Pinza',
    album: 'Some Enchanted Evening',
    youtubeVideoId: 'drHTYCRVoYQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c1/Ezio_Pinza_SP.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Auf Wiedersehn Sweetheart',
    artist: 'Vera Lynn',
    album: 'Auf Wiedersehn Sweetheart',
    youtubeVideoId: '36prRdWCqu0',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Dame_Vera_Lynn_4_Allan_Warren.jpg/960px-Dame_Vera_Lynn_4_Allan_Warren.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'A Kiss to Build a Dream On',
    artist: 'Louis Armstrong',
    album: 'A Kiss to Build a Dream On',
    youtubeVideoId: 'sT49gOujQGI',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Louis_Armstrong_in_Color_%28restored%29.jpg/1280px-Louis_Armstrong_in_Color_%28restored%29.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'Because of You',
    artist: 'Tony Bennett',
    album: 'Because of You',
    youtubeVideoId: 'i-4zvArJDGg',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b2/Tony_Bennett_2002.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Here in My Heart',
    artist: 'Al Martino',
    album: 'Here in My Heart',
    youtubeVideoId: 'cMD-k0C1AM8',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Al_Martino.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: "La Ronde de l'Amour (Love's Roundabout)",
    artist: 'Lou Preager; Anton Walbrook',
    album: "La Ronde de l'Amour (Love's Roundabout)",
    youtubeVideoId: 'AXAXVV1gORc',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Anton_Walbrook_cleaned.jpg/960px-Anton_Walbrook_cleaned.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Anytime',
    artist: 'Eddie Fisher',
    album: 'Anytime',
    youtubeVideoId: 'XTi6HBVSksk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eddie_Fisher_-_still.JPG',
    },
  }),
  getSong({
    rank: 8,
    title: 'Down Yonder',
    artist: 'Champ Butler; Joe "Fingers" Carr',
    album: 'Down Yonder',
    youtubeVideoId: 'L7RYQOl6JWY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/8/80/DownYonderCoverProfessorBillJolson.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Slow Coach (Slow Poke)',
    artist: 'Pee Wee King',
    album: 'Slow Coach (Slow Poke)',
    youtubeVideoId: '9g0AeQOFbsI',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/ec/Pee_Wee_King_1944.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Cold, Cold Heart',
    artist: 'Tony Bennett',
    album: 'Cold, Cold Heart',
    youtubeVideoId: 'Vbg7-kVtPKs',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/b/b2/Tony_Bennett_2002.jpg',
    },
  }),
]

export default songs
