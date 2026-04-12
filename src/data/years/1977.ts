import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1977

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
  'Soft pop and musical theatre dominated the Australian charts in 1977, with lush, melodic ballads and breezy rock and roll crowd-pleasers setting the tone. Punk was exploding in London and New York, but Australian radio largely stuck with the safe and the sentimental.'

// Source: Kent Music Report 1977 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1977 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1977_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: "Don't Cry for Me Argentina",
    artist: 'Julie Covington',
    album: 'Evita',
    youtubeVideoId: '_K80t70Y6-I',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Dont_cry_for_me_argentina_julie_covington_uk_vinyl_single.jpg/250px-Dont_cry_for_me_argentina_julie_covington_uk_vinyl_single.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'The Way You Do It',
    artist: 'Pussyfoot',
    album: "Pussyfootin' Round... With Love",
    youtubeVideoId: 'j0UlnI_1MOg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/The_way_you_do_it_by_pussyfoot_Australian_single_side-A.png/250px-The_way_you_do_it_by_pussyfoot_Australian_single_side-A.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'I Just Want to Be Your Everything',
    artist: 'Andy Gibb',
    album: 'Flowing Rivers',
    youtubeVideoId: 'tA6L8-lxaA8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Andy_Gibb_-_I_Just_Want_to_Be_Your_Everything.jpg/250px-Andy_Gibb_-_I_Just_Want_to_Be_Your_Everything.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "That's Rock and Roll",
    artist: 'Shaun Cassidy',
    album: 'Eric Carmen',
    youtubeVideoId: 'vTqU9GwsRYU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/cb/That%27s_Rock_%27n%27_Roll_-_Eric_Carmen.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Living Next Door to Alice',
    artist: 'Smokie',
    album: 'Living Next Door to Alice',
    youtubeVideoId: 'fYAEoavUVJY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/New_world-living_next_door_to_alice.JPG/250px-New_world-living_next_door_to_alice.JPG',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'I Go To Rio',
    artist: 'Peter Allen',
    album: 'Taught by Experts',
    youtubeVideoId: 'FCYxTg6svXg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Peter_Allen_I_Go_to_Rio.jpg/250px-Peter_Allen_I_Go_to_Rio.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Torn Between Two Lovers',
    artist: 'Mary McGregor',
    album: 'Torn Between Two Lovers',
    youtubeVideoId: 'EZnZvMx074s',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/85/Torn_Between_Two_Lovers_-_Mary_MacGregor.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Walk Right In',
    artist: 'Dr Hook',
    album: 'Walk Right In',
    youtubeVideoId: 'YSxigs4iQ4g',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Walk_Right_In_-_The_Rooftop_Singers.jpg/250px-Walk_Right_In_-_The_Rooftop_Singers.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "You're Moving Out Today",
    artist: 'Carole Bayer Sager',
    album: 'Live at Last',
    youtubeVideoId: '9WOGRozdbjA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a6/You%27re_Moving_Out_Today_-_Bette_Midler.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'If You Leave Me Now',
    artist: 'Chicago',
    album: 'Chicago X',
    youtubeVideoId: '-9_d-sFhmRM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Chicago-if_you_leave_me_now.jpg/250px-Chicago-if_you_leave_me_now.jpg',
      artist: null,
    },
  }),
]

export default songs
