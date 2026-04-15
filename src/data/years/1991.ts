import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1991

export const description =
  '1991 balanced big emotional choruses with sharper, more club-friendly pop. The chart moved between heartbreak and bounce, with a slight grunge shadow starting to creep in around the edges.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://www.aria.com.au/charts/1991/singles-chart',
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

// Source: ARIA End of Year singles chart 1991 year-end chart
// Via: Wikipedia - List of top 25 singles for 1991 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: '(Everything I Do) I Do It for You',
    artist: 'Bryan Adams',
    album:
      'Robin Hood: Prince of Thieves (Original Soundtrack) and Waking Up the Neighbours',
    youtubeVideoId: 'Y0pdQU87dc8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/09/Everythingido_Idoitforyou.png',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/BryAdamsMargate130624_%2839_of_43%29_%2853789411882%29_Cropped.jpg/960px-BryAdamsMargate130624_%2839_of_43%29_%2853789411882%29_Cropped.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Tingles',
    artist: 'Ratcat',
    album: 'Tingles (EP)',
    youtubeVideoId: 'kZpXABSO_4Q',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/04/Tingles_EP_by_Ratcat.jpg',
      artist: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Ratcat.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Grease Mega-Mix',
    artist: 'John Travolta',
    album: 'Grease Mega-Mix',
    youtubeVideoId: 'BwbDUPQa3eU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/32/The_Grease_Megamix_cover.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/3/3e/John_Travolta_Cannes_2018_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'The Horses',
    artist: 'Daryl Braithwaite',
    album: 'Rise',
    youtubeVideoId: 'lnigc08J6FI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/3/3f/Daryl_Braithwaite_The_Horses.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/en/e/ea/Daryl_Braithwaite_-_2009.JPG',
    },
  }),
  getSong({
    rank: 5,
    title: 'You Could Be Mine',
    artist: "Guns N' Roses",
    album: 'Use Your Illusion II',
    youtubeVideoId: 'MXx9S2nDouY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/ff/You_Could_Be_Mine_%28Guns_N%27_Roses_single%29.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/GNR_Belgrade_2025_05_%28cropped%29.jpg/1280px-GNR_Belgrade_2025_05_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'Read My Lips',
    artist: 'Melissa',
    album: 'Fresh',
    youtubeVideoId: 'f_FswLkbHUY',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/b/b3/ReadMyLips.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Melissa_Tkautz_2017.jpg/960px-Melissa_Tkautz_2017.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'More Than Words',
    artist: 'Extreme',
    album: 'Pornograffitti',
    youtubeVideoId: 'UrIiLvg58SY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/25/More_than_words.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/89/Extreme_en_2017.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: "I've Been Thinking About You",
    artist: 'Londonbeat',
    album: 'In the Blood',
    youtubeVideoId: 'bDwI_cJ7Eds',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/ff/I%27ve_Been_Thinking_About_You.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/f/f8/LONDONBEAT_2018.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Joyride',
    artist: 'Roxette',
    album: 'Joyride',
    youtubeVideoId: 'xCorJG9mubk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/0f/Joyride_%28single%29.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Roxette_at_the_Beacon%2C_September_2012.jpg/1280px-Roxette_at_the_Beacon%2C_September_2012.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: "The Shoop Shoop Song (It's in His Kiss)",
    artist: 'Cher',
    album: 'Music From the Original Motion Picture Soundtrack - Mermaids',
    youtubeVideoId: 'yCpKQjqb8Y4',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/0/01/EverettShoop.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Cher_in_2019_cropped.jpg/960px-Cher_in_2019_cropped.jpg',
    },
  }),
]

export default songs
