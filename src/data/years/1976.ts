import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1976

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

// Source: Kent Music Report 1976 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1976 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1976_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Fernando',
    artist: 'ABBA',
    album: 'Frida ensam',
    youtubeVideoId: '40Z5cWP4IqQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Anni-Frid_Lyngstad_-_Fernando.jpg/250px-Anni-Frid_Lyngstad_-_Fernando.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    youtubeVideoId: 'fJ9rUzIMcZQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Bohemian_Rhapsody.png/250px-Bohemian_Rhapsody.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Dancing Queen',
    artist: 'ABBA',
    album: 'Arrival',
    youtubeVideoId: '-sVB91NTa4A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/ABBA_-_Dancing_Queen.png/250px-ABBA_-_Dancing_Queen.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Howzat',
    artist: 'Sherbet',
    album: 'Howzat',
    youtubeVideoId: 'aOPEhg_dNPE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Howzat_%28Single_Cover%29.jpg/250px-Howzat_%28Single_Cover%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: "Don't Go Breaking My Heart",
    artist: 'Elton John & Kiki Dee',
    album: 'Duets',
    youtubeVideoId: 'z0qW9P-uYfM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Don%27t_Go_Breaking_My_Heart_Single.jpeg/250px-Don%27t_Go_Breaking_My_Heart_Single.jpeg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Jump In My Car',
    artist: 'Ted Mulry',
    album: 'Jump In My Car',
    youtubeVideoId: 'lPsa8MJU_50',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Jump_In_My_Car_Cover.PNG/250px-Jump_In_My_Car_Cover.PNG',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Money Money Money',
    artist: 'ABBA',
    album: 'Arrival',
    youtubeVideoId: 'Zqcf1r1zBxc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Money_Money_Money.jpg/250px-Money_Money_Money.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'S-S-S-Single Bed',
    artist: 'Fox',
    album: 'Blue Hotel',
    youtubeVideoId: 'f98DOYcfIJ4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/S-S-S-Single_Bed_by_Fox.jpg/250px-S-S-S-Single_Bed_by_Fox.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Let's Stick Together",
    artist: 'Bryan Ferry',
    album: "Let's Stick Together",
    youtubeVideoId: 'Z9EbR0ckb40',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Let%27s_Stick_Together_single_cover.jpg/250px-Let%27s_Stick_Together_single_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Convoy',
    artist: 'C. W. McCall',
    album: 'Black Bear Road',
    youtubeVideoId: 'VBlnTz4fr5k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/67/McCall_-_Convoy.jpg',
      artist: null,
    },
  }),
]

export default songs
