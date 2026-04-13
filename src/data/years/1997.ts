import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1997

export const description =
  '1997 leaned into glossy pop, stadium-sized hooks, and a few wilder crossover moments that kept the chart from settling into one lane. It was catchy, high-contrast, and just a little chaotic in a way that made the year feel alive.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://www.aria.com.au/charts/1997/singles-chart',
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

// Source: ARIA End of Year singles chart 1997 year-end chart
// Via: Wikipedia - List of top 25 singles for 1997 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Candle in the Wind 1997',
    artist: 'Elton John',
    album: 'Candle in the Wind 1997',
    youtubeVideoId: 'dwhe7BUFsBk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/dc/Something_About_the_Way_You_Look_Tonight_%26_Candle_in_the_Wind_1997.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/61/EltonDocBFILFF101024_%284_of_17%29_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'Barbie Girl',
    artist: 'Aqua',
    album: 'Aquarium',
    youtubeVideoId: 'ZyhrYis509A',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Aquabarbie.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Aqua_performing_at_Caesars_Windsor%2C_Windsor%2C_Ontario%2C_2025-09-26_30.jpg/1280px-Aqua_performing_at_Caesars_Windsor%2C_Windsor%2C_Ontario%2C_2025-09-26_30.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Tubthumping',
    artist: 'Chumbawamba',
    album: 'Tubthumper',
    youtubeVideoId: 'zmns9tJywqY',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/3/37/TubthumpingHQ.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chumbawamba_TFF.JPG/1280px-Chumbawamba_TFF.JPG',
    },
  }),
  getSong({
    rank: 4,
    title: "I'll Be Missing You",
    artist: 'Puff Daddy',
    album: 'No Way Out',
    youtubeVideoId: 'qSk-74AQ7sE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/6/61/IllBeMissingYou.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Sean_Combs_Cannes_2012_%28cropped%29.jpg/960px-Sean_Combs_Cannes_2012_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'MMMBop',
    artist: 'Hanson',
    album: 'Middle of Nowhere',
    youtubeVideoId: '-GPffhQtfGI',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Hanson-mmmbop.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Hanson_2013.jpg/960px-Hanson_2013.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'Men in Black',
    artist: 'Will Smith',
    album: 'Men in Black: The Album and Big Willie Style',
    youtubeVideoId: 'qNQCZwol3Ec',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/25/WillSmithMenInBlackCDSingleCover.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/TechCrunch_Disrupt_San_Francisco_2019_-_Day_1_%2848834070763%29_%28cropped%29.jpg/960px-TechCrunch_Disrupt_San_Francisco_2019_-_Day_1_%2848834070763%29_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'Truly, Madly, Deeply',
    artist: 'Savage Garden',
    album: 'Savage Garden',
    youtubeVideoId: 'RTWReLoEvzE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/7/77/Savage_garden_truly_madly.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/8/82/Darren_hayes1.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: "Don't Speak",
    artist: 'No Doubt',
    album: 'Tragic Kingdom',
    youtubeVideoId: '46oWyc4P_pw',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Don%27t_Speak.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/6d/NO_DOUBT_327b_Brian_McCauley.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: 'Breathe',
    artist: 'The Prodigy',
    album: 'The Fat of the Land',
    youtubeVideoId: '1n6GvSfjE8M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/84/Breathe_Prodigy.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/The_Prodigy_live_in_Romania.JPG/1280px-The_Prodigy_live_in_Romania.JPG',
    },
  }),
  getSong({
    rank: 10,
    title: 'Break My Stride',
    artist: 'Unique II',
    album: 'Level II',
    youtubeVideoId: 'sxIeReOscrQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b0/Matthew_Wilder_-_Break_My_Stride.jpg',
      artist: null,
    },
  }),
]

export default songs
