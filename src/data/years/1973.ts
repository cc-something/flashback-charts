import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1973

export const description =
  "Sentimental pop and easy listening ruled the Australian charts in 1973, with lush orchestral ballads and feel-good singalongs dominating the top spots. Glam rock was making noise overseas but hadn't fully broken through here yet, and the homegrown pub rock scene was still finding its legs in inner-city venues."

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_Top_25_singles_for_1973_in_Australia',
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

// Source: Kent Music Report 1973 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1973 in Australia (cites David Kent's Australian Chart Book 1970–1992)
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Tie a Yellow Ribbon Round the Ole Oak Tree',
    artist: 'Tony Orlando and Dawn',
    album: 'Tie a Yellow Ribbon',
    youtubeVideoId: 'PxG9XFqHSFw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/1b/Tie%2BA%2BYellow%2BRibbon%2BDawn.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Never Never Never',
    artist: 'Shirley Bassey',
    album: 'Never Never Never',
    youtubeVideoId: 'suclM4sWffA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/bc/Never_Never_never_Shirley_Bassey.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "You're So Vain",
    artist: 'Carly Simon',
    album: 'No Secrets',
    youtubeVideoId: 'j13oJajXx0M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/24/You%27re_So_Vain_by_Carly_Simon_US_single_side_A.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "Heaven Is My Woman's Love",
    artist: 'Col Joye',
    album: "Heaven Is My Woman's Love",
    youtubeVideoId: 'KkZdZI3Ogrc',
    // No album cover on Wikimedia Commons; using Col Joye artist photo (1957)
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist:
        'https://upload.wikimedia.org/wikipedia/en/0/06/Col_Joye_1957.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Crocodile Rock',
    artist: 'Elton John',
    album: "Don't Shoot Me I'm Only the Piano Player",
    youtubeVideoId: 'D3QQYvqHCIQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Crocodile_rock_elton_john_US_single_side-A_black_label.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Delta Dawn',
    artist: 'Helen Reddy',
    album: 'Long Hard Climb',
    youtubeVideoId: 'mv5OkYcmCWU',
    // Original single cover not on Wikimedia; using US reissue vinyl label image
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/c/c8/Delta_Dawn_by_Helen_Reddy_US_Starline_early_reissue.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Can the Can',
    artist: 'Suzi Quatro',
    album: 'Suzi Quatro',
    youtubeVideoId: 'NF2kVVwqhuE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/7b/Suzie_Quatro_-_Can_the_Can.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: "I'd Love You to Want Me",
    artist: 'Lobo',
    album: 'Of a Simple Man',
    youtubeVideoId: 'tqp_wbYLsYQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/95/I%27d_Love_You_to_Want_Me_-_Lobo.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'And I Love You So',
    artist: 'Perry Como',
    album: 'And I Love You So',
    youtubeVideoId: 'JxzBCknAYn4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/96/Como_Loves_You_So.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Daisy a Day',
    artist: 'Jud Strunk',
    album: 'Daisy a Day',
    youtubeVideoId: 'BB8G0SFmJ1g',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/11/Daisy_a_Day_%28album%29.jpg',
      artist: null,
    },
  }),
]

export default songs
