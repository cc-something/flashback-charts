import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1950

export const description =
  'Film themes and smooth crooners owned the Australian charts, with lush orchestral arrangements and heartfelt ballads setting the mood. Novelty tunes and easy-listening pop filled out the rest, and the postwar optimism was impossible to miss.'

export const source = {
  label: 'Australian Chart Book',
  url: 'https://en.wikipedia.org/wiki/List_of_number-one_singles_in_Australia_during_the_1950s',
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

// Source: Australian Chart Book year-end chart for 1950
// Via: Barry's Hits of All Decades chart archive
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'The Harry Lime (Third Man) Theme',
    artist: 'Anton Karas',
    album: 'The Harry Lime (Third Man) Theme',
    youtubeVideoId: 'I2ZWcwy12lk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Anton_Karas_%281906-1985%29.jpg/960px-Anton_Karas_%281906-1985%29.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Quicksilver',
    artist: 'Bing Crosby',
    album: 'Quicksilver',
    youtubeVideoId: 'Vr6qlYa2214',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/e5/Bing_Crosby_Paramount_Pictures.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Forever and Ever',
    artist: 'Perry Como',
    album: 'Forever and Ever',
    youtubeVideoId: 'e9-IwtdGOKQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Perry_Como_1962.JPG',
    },
  }),
  getSong({
    rank: 4,
    title: 'My Foolish Heart',
    artist: 'Gordon Jenkins',
    album: 'My Foolish Heart',
    youtubeVideoId: 'pQRrkiiE5SQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://d4ln1n73rozgf.cloudfront.net/prod/assets/Gordon-Jenkins_SHOF_1982-Inductee.png',
    },
  }),
  getSong({
    rank: 5,
    title: 'I Told Them All About You',
    artist: 'Donald Peers',
    album: 'I Told Them All About You',
    youtubeVideoId: '48zWdSchLO4',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist: 'https://upload.wikimedia.org/wikipedia/en/3/33/Donaldpeers.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'Hollywood Square Dance',
    artist: 'Sammy Kaye',
    album: 'Hollywood Square Dance',
    youtubeVideoId: 'JNMfWHvkjYI',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/ce/Sammy_Kaye_1952.JPG',
    },
  }),
  getSong({
    rank: 7,
    title: "You're Breaking My Heart",
    artist: 'Vic Damone',
    album: "You're Breaking My Heart",
    youtubeVideoId: '7FrgdhEoT6I',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/e/e3/Vic_Damone_1959.JPG',
    },
  }),
  getSong({
    rank: 8,
    title: 'Mona Lisa',
    artist: 'Nat King Cole',
    album: 'Mona Lisa',
    youtubeVideoId: 'NIDX18Xl16s',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/c/c5/Nat_King_Cole_1947.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Lavender Blue (Dilly Dilly)',
    artist: 'Burl Ives',
    album: 'Lavender Blue (Dilly Dilly)',
    youtubeVideoId: 'oH5q11bG3zk',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/80/Burl_Ives_-_Cat_on_a_Hot_Tin_Roof_%281958_press_photo%29_%28cropped%29.png',
    },
  }),
  getSong({
    rank: 10,
    title: 'Goodnight Irene',
    artist: 'Gordon Jenkins',
    album: 'Goodnight Irene',
    youtubeVideoId: 'lQrA3VcjIhU',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://d4ln1n73rozgf.cloudfront.net/prod/assets/Gordon-Jenkins_SHOF_1982-Inductee.png',
    },
  }),
]

export default songs
