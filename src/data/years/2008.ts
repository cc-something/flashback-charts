import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 2008

export const source = {
  label: 'ARIA Charts',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2008_in_Australia',
}

export const description =
  'By 2008, things were getting more electronic, with bright synths, club beats, and dramatic pop melodies all pushing together. The year felt glossy and a little restless, like mainstream pop had started to speed up.'

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

// Source: ARIA year-end singles chart for 2008
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Low',
    artist: 'Flo Rida feat. T-Pain',
    album: 'Mail on Sunday',
    youtubeVideoId: 'ax0solsTB78',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/3/36/Low_fr_tp.JPG',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'So What',
    artist: 'Pink',
    album: 'Funhouse',
    youtubeVideoId: 'FJfFZqTlWrQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/f3/Pinksowhatcover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Sweet About Me',
    artist: 'Gabriella Cilmi',
    album: 'Lessons to Be Learned',
    youtubeVideoId: '2kGOPqNaFP0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/d2/GabriellaCilmiSAM.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Bleeding Love',
    artist: 'Leona Lewis',
    album: 'Spirit',
    youtubeVideoId: '7_weSk0BonM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/cd/Leona_Lewis_-_Bleeding_Love.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Sex on Fire',
    artist: 'Kings of Leon',
    album: 'Only by the Night',
    youtubeVideoId: 'RF0HhrwIwp0',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/6/6c/SexOnFire.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'I Kissed a Girl',
    artist: 'Katy Perry',
    album: 'One of the Boys',
    youtubeVideoId: 'tAp9BKosZXs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/5c/I_Kissed_a_Girl.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Just Dance',
    artist: "Lady Gaga feat. Colby O'Donis",
    album: 'The Fame',
    youtubeVideoId: '2Abk1jAONjw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/77/Just_Dance_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'No Air',
    artist: 'Jordin Sparks with Chris Brown',
    album: 'Jordin Sparks',
    youtubeVideoId: 'ixfPx-52_wA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/75/JordinSparks-No_Air.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "I'm Yours",
    artist: 'Jason Mraz',
    album: 'We Sing. We Dance. We Steal Things.',
    youtubeVideoId: 'EkHTsc9PU2A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/35/ImYoursJasonMraz.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'All Summer Long',
    artist: 'Kid Rock',
    album: 'Rock n Roll Jesus',
    youtubeVideoId: 'uwIGZLjugKA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0a/Single_All_Summer_Long_cover.jpg',
      artist: null,
    },
  }),
]

export default songs
