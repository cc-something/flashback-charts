import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1978

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

export const description =
  "Disco arrived in full force on the Australian charts in 1978, with dancefloor anthems and soundtrack tie-ins pushing guitar rock to the margins. Movie music was huge, and the feelgood, escapist vibe of the year's biggest hits reflected a country ready to let loose after a turbulent mid-decade."

// Source: Kent Music Report 1978 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1978 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1978_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: "You're the One that I Want",
    artist: 'Olivia Newton-John & John Travolta',
    album: 'Grease: The Original Soundtrack from the Motion Picture',
    youtubeVideoId: 'e__Pp4FxsjU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/ac/GreaseYoureTheOneThatIWant7InchSingleCover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Mull of Kintyre',
    artist: 'Wings',
    album: 'Mull of Kintyre',
    youtubeVideoId: 'Plhtk_XJqhM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Mull_of_Kintyre_%28Wings_song_cover_art%29.jpg/250px-Mull_of_Kintyre_%28Wings_song_cover_art%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Rivers of Babylon',
    artist: 'Boney M',
    album: 'Nightflight to Venus',
    youtubeVideoId: 'jSxQJUv1e8k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Boney_M._-_Rivers_of_Babylon_%281978_single%29.jpg/250px-Boney_M._-_Rivers_of_Babylon_%281978_single%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "Stayin' Alive",
    artist: 'Bee Gees',
    album: 'Saturday Night Fever',
    youtubeVideoId: 'fNFzfwLM72c',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Bee_Gees_Stayin_Alive.jpg/250px-Bee_Gees_Stayin_Alive.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Black Is Black',
    artist: 'La Belle Epoque',
    album: 'Black Is Black',
    youtubeVideoId: 'Qlz8AmLAeNQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Los_Bravos_-_Black_Is_Black.jpeg/250px-Los_Bravos_-_Black_Is_Black.jpeg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Macho Man',
    artist: 'Village People',
    album: 'Macho Man',
    youtubeVideoId: 'HgBw22bBV74',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Macho_Man_by_Village_People_%28US_single%2C_side_A%29.png/250px-Macho_Man_by_Village_People_%28US_single%2C_side_A%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "It's a Heartache",
    artist: 'Bonnie Tyler',
    album: 'Natural Force',
    youtubeVideoId: '62aHuVz0brQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/BonnieTyler_IAH_single.jpg/250px-BonnieTyler_IAH_single.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Three Times a Lady',
    artist: 'The Commodores',
    album: 'Natural High',
    youtubeVideoId: 'aWrRY-LnEOY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Three_Times_a_Lady_by_Commodores_US_vinyl.jpg/250px-Three_Times_a_Lady_by_Commodores_US_vinyl.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'You Took the Words Right Out of My Mouth',
    artist: 'Meat Loaf',
    album: 'Bat Out of Hell',
    youtubeVideoId: '_wO8toxinoc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/43/You_Took_the_Words_Right_out_of_My_Mouth_by_Meat_Loaf_US_vinyl.jpg/250px-You_Took_the_Words_Right_out_of_My_Mouth_by_Meat_Loaf_US_vinyl.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Baker Street',
    artist: 'Gerry Rafferty',
    album: 'City to City',
    youtubeVideoId: 'dU6w56epBdc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Baker_Street_by_Gerry_Rafferty_1978_UK_single_side-A.png/250px-Baker_Street_by_Gerry_Rafferty_1978_UK_single_side-A.png',
      artist: null,
    },
  }),
]

export default songs
