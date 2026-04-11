import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1960

export const description =
  'Rock and roll still had a firm grip on the Australian charts, but smooth crooners and novelty acts held their own alongside it. Skiffle was fading fast, and the local pop scene was buzzing with energy as homegrown acts started competing seriously with American and British imports.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1960_in_Australia',
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

// Source: Kent Music Report 1960 year-end chart
// Via: Wikipedia - List of top 25 singles for 1960 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "It's Now or Never",
    artist: 'Elvis Presley',
    album: 'The Essential Elvis Presley',
    youtubeVideoId: 'HtipfCdkdVE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3e/63/93/3e6393fb-5fe2-1ef4-1c0d-6452919a351c/828768904824.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Boom Boom Baby',
    artist: 'Crash Craddock',
    album: 'Boom Boom Baby',
    youtubeVideoId: 'F5KAMWnCByM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/40/4d/31/404d31f3-bdc0-9bb4-e685-34baa513df22/886448280583.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "He'll Have to Go",
    artist: 'Jim Reeves',
    album: "Valentine's Edition Nights of Romance",
    youtubeVideoId: 'FPBtqvljEFw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e7/3a/97/e73a9736-efb6-62ae-17d0-0dab1f04aa4c/5051509090950.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Are You Lonesome Tonight? / I Gotta Know',
    artist: 'Elvis Presley',
    album: 'Are You Lonesome Tonight? / I Gotta Know',
    youtubeVideoId: '8oK0Wl7_MXk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/17/29/3b/17293b10-b6e1-c7c4-2220-37904c5f469c/196589335173.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Clap Your Hands',
    artist: 'The Beau-Marks',
    album: 'Goodies Old Is New: Come Dance With Me',
    youtubeVideoId: 'uJJNskqgYwA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f3/95/24/f39524ed-e499-ae3c-7a49-fc47cc5b3e54/883247000510_cover.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Just a Closer Walk with Thee',
    artist: 'Jimmie Rodgers',
    album: 'Just a Closer Walk with Thee',
    youtubeVideoId: 'Kt2wmTCXKxw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/d4/38/9e/mzi.nolfvlgj.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Save the Last Dance for Me',
    artist: 'The Drifters',
    album: 'The Essentials: The Drifters',
    youtubeVideoId: 'n-XQ26KePUQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/91/a2/b1/mzi.lnmqvltg.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Tie Me Kangaroo Down, Sport',
    artist: 'Rolf Harris',
    album: 'Tie Me Kangaroo Down, Sport',
    youtubeVideoId: 'OX8KJJh86YU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/39/7f/b8/397fb8b2-3451-7e3a-eb64-b32aaaa17d0a/Rolf_Harris_-_Tie_Me_Kangaroo_Down_Sport.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'What Do You Want to Make Those Eyes at Me For?',
    artist: 'Emile Ford and The Checkmates',
    album: 'What Do You Want to Make Those Eyes at Me For?',
    youtubeVideoId: 'KbL530kanTU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/46/f3/bd/46f3bde2-ed04-4766-268e-91d1441d7030/Emile_Ford_The_Checkmates_-_What_Do_You_Want_to_Make_Those_Eyes_at_Me_For.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "My Old Man's a Dustman",
    artist: 'Lonnie Donegan',
    album: "My Old Man's a Dustman",
    youtubeVideoId: 'Y7GeZ3YmONw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/02/8f/55/028f550c-6985-39d9-8a78-790f9581eaec/mzi.mzsffffb.tif/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
