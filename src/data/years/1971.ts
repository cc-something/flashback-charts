import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1971

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
  'Australian rock got its first real anthem in 1971, and the local charts started to feel homegrown for the first time. Easy listening and country-pop still had a firm grip, but a scrappy new wave of Aussie bands was crashing through with raw energy and good-time rock and roll.'

// Source: Kent Music Report 1971 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1971 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1971_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Eagle Rock',
    artist: 'Daddy Cool',
    album: 'Daddy Who? Daddy Cool',
    youtubeVideoId: 'oQfAZVsz6KM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Eagle-Rock.jpg/250px-Eagle-Rock.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'My Sweet Lord',
    artist: 'George Harrison',
    album: 'All Things Must Pass',
    youtubeVideoId: 'AR4lpQWcT5g',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Mysweetlord1971single.jpg/250px-Mysweetlord1971single.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'The Pushbike Song',
    artist: 'The Mixtures',
    album: 'The Pushbike Song',
    youtubeVideoId: 'iokgq4I0OM8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/The_Mixtures_-_The_Pushbike_Song.jpg/250px-The_Mixtures_-_The_Pushbike_Song.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Daddy Cool',
    artist: 'Drummond',
    album: 'Daddy Cool',
    youtubeVideoId: 'RJVL_5so9uE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://res.cloudinary.com/he5wbsfbc/image/upload/c_limit,h_750,w_1000/v1386487643/itdiaa8tr6jfafmmk3fp.jpg?_a=BACHbCBn',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'L.A. International Airport',
    artist: 'Susan Raye',
    album: 'Willy Jones',
    youtubeVideoId: 'h2HfqmRISKA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/LA_International_Airport_by_Susan_Raye_Canadian_single.png/250px-LA_International_Airport_by_Susan_Raye_Canadian_single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "I Don't Know How to Love Him",
    artist: 'Helen Reddy',
    album: 'Jesus Christ Superstar',
    youtubeVideoId: 'WOCwE5D9Ghk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/I_dont_know_how_to_love_him_by_yvonne_elliman_US_single_side-A.png/250px-I_dont_know_how_to_love_him_by_yvonne_elliman_US_single_side-A.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Knock Three Times',
    artist: 'Tony Orlando & Dawn',
    album: 'Candida',
    youtubeVideoId: '4QZb12EVnsE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Knock_Three_Times_-_Tony_Orlando_%26_Dawn.jpg/250px-Knock_Three_Times_-_Tony_Orlando_%26_Dawn.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Banks of the Ohio',
    artist: 'Olivia Newton-John',
    album: 'If Not for You',
    youtubeVideoId: '-LT5ZJGj5QA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Banks_of_the_ohio_olivia_newton-john_US_single.png/250px-Banks_of_the_ohio_olivia_newton-john_US_single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Rose Garden',
    artist: 'Lynn Anderson',
    album: 'Billy Joe Royal featuring Hush',
    youtubeVideoId: '3-E23cwllgs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Rose_garden_by_lynn_anderson_US_single_var_A.png/250px-Rose_garden_by_lynn_anderson_US_single_var_A.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Eleanor Rigby',
    artist: 'Zoot',
    album: 'Revolver',
    youtubeVideoId: '-LZ2-N1QxhM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Eleanor_rigby_single_usa.jpg/250px-Eleanor_rigby_single_usa.jpg',
      artist: null,
    },
  }),
]

export default songs
