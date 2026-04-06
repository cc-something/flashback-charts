import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1972

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
  'Teen idol pop and sentimental ballads owned the Australian charts in 1972, with swooning love songs and novelty hits filling the top spots. The local blues-rock underground was bubbling away, but the mainstream still leaned heavily toward polished, radio-friendly fare from overseas.'

// Source: Kent Music Report 1972 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1972 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1972_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Puppy Love',
    artist: 'Donny Osmond',
    album: 'Paul Anka Sings His Big 15',
    youtubeVideoId: 'Ze9oY6zaGYQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Puppy_Love_-_Paul_Anka.jpg/250px-Puppy_Love_-_Paul_Anka.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Without You',
    artist: 'Nilsson',
    album: 'No Dice',
    youtubeVideoId: '8dnUv3DUP4E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Without_You_by_Harry_Nilsson_Side-A_US_vinyl.png/250px-Without_You_by_Harry_Nilsson_Side-A_US_vinyl.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Popcorn',
    artist: 'Hot Butter',
    album: 'Music to Moog By',
    youtubeVideoId: 'YK3ZP6frAMc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Gershon_Kingsley_-_Popcorn_%28cover%29.jpg/250px-Gershon_Kingsley_-_Popcorn_%28cover%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'American Pie',
    artist: 'Don McLean',
    album: 'American Pie',
    youtubeVideoId: 'PRpiBpDy7MQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/American_Pie_by_Don_McLean.png/250px-American_Pie_by_Don_McLean.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Rangers Waltz',
    artist: 'The Mom and Dads',
    album: 'Rangers Waltz',
    youtubeVideoId: 'TRqLjgmeyiU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/y2003/m11/d12/h15/s05.xpgzmxba.jpg/1200x630wp-60.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "Boppin' the Blues",
    artist: 'Blackfeather',
    album: 'Dance Album of Carl Perkins',
    youtubeVideoId: 'HyjsTnGfvps',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Sun_243_78_Boppin_the_Blues.jpg/250px-Sun_243_78_Boppin_the_Blues.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "Daddy Don't You Walk So Fast",
    artist: 'Wayne Newton',
    album: "Daddy Don't You Walk So Fast",
    youtubeVideoId: 'Kh8hviz6iaU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Daddy_Don%27t_You_Walk_So_Fast_-_Wayne_Newton.jpg/250px-Daddy_Don%27t_You_Walk_So_Fast_-_Wayne_Newton.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'The First Time Ever I Saw Your Face',
    artist: 'Roberta Flack',
    album: 'First Take',
    youtubeVideoId: 'VqW-eO3jTVU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/The_First_Time_Ever_I_Saw_Your_Face_by_Roberta_Flack_US_vinyl.png/250px-The_First_Time_Ever_I_Saw_Your_Face_by_Roberta_Flack_US_vinyl.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Cherish',
    artist: 'David Cassidy',
    album: 'And Then... Along Comes the Association',
    youtubeVideoId: 'TIUwsxBy0I8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Cherish_%E2%80%93_The_Association.jpg/250px-Cherish_%E2%80%93_The_Association.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Amazing Grace',
    artist:
      'The Pipes and Drums and the Military Band of the Royal Scots Dragoon Guards',
    album: 'Amazing Grace',
    youtubeVideoId: 'M8AeV8Jbx6M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Olney_Hymns_page_53_Amazing_Grace.jpg/250px-Olney_Hymns_page_53_Amazing_Grace.jpg',
      artist: null,
    },
  }),
]

export default songs
