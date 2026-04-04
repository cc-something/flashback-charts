import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1974

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

// Source: Kent Music Report 1974 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1974 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1974_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'My Coo Ca Choo',
    artist: 'Alvin Stardust',
    album: 'The Untouchable',
    youtubeVideoId: 'b0ZqNBd_orI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Alvin_Stardust_-_My_Coo_Ca_Choo.jpg/250px-Alvin_Stardust_-_My_Coo_Ca_Choo.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "Billy Don't Be a Hero",
    artist: 'Paper Lace',
    album: 'Paper Lace (US version)',
    youtubeVideoId: '6RvG5bJsu5Q',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Paper_Lace_-_Billy_Don%27t_Be_A_Hero.jpg/250px-Paper_Lace_-_Billy_Don%27t_Be_A_Hero.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Evie',
    artist: 'Stevie Wright',
    album: 'Hard Road',
    youtubeVideoId: 'NcE-MS49TUk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Evie_The_Wrights_cover.png/250px-Evie_The_Wrights_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'The Night Chicago Died',
    artist: 'Paper Lace',
    album: 'And Other Bits of Material, Paper Lace (US Version)',
    youtubeVideoId: 'w2OFubG0dPo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Paper_Lace_Night_Chicago_Died.jpg/250px-Paper_Lace_Night_Chicago_Died.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Seasons in the Sun',
    artist: 'Terry Jacks',
    album: 'Marieke',
    youtubeVideoId: '-tPcc1ftj8E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Jacques_Brel-Le_Moribond_%281961_single_cover%29.jpg/250px-Jacques_Brel-Le_Moribond_%281961_single_cover%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Farewell Aunty Jack',
    artist: 'Grahame Bond',
    album: 'Aunty Jack Sings Wollongong',
    youtubeVideoId: 'N9Jo5JicbCk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Farewell_Aunty_Jack.jpg/250px-Farewell_Aunty_Jack.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "Can't Stop Myself From Loving You",
    artist: 'William Shakespeare',
    album: "Can't Stop Myself From Loving You",
    youtubeVideoId: 'wO493T2Ji0s',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://res.cloudinary.com/he5wbsfbc/image/upload/c_limit,h_750,w_1000/v1386832399/rd2ru9gxl21gezw3hnrs.jpg?_a=BACHbCBn',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Leave Me Alone (Ruby Red Dress)',
    artist: 'Helen Reddy',
    album: 'Long Hard Climb',
    youtubeVideoId: 'ULKEBJRC0gs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Leave_me_alone_helen_reddy_Australian_vinyl.webp/250px-Leave_me_alone_helen_reddy_Australian_vinyl.webp.png',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'The Ballroom Blitz',
    artist: 'Sweet',
    album: 'Desolation Boulevard (US version)',
    youtubeVideoId: 'r8pYpii2Atg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Ballroom_blitz.jpg/250px-Ballroom_blitz.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'I Honestly Love You',
    artist: 'Olivia Newton-John',
    album: 'I Honestly Love You',
    youtubeVideoId: 'bCcKg2asm9k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/I_Love_You%2C_I_Honestly_Love_You_by_Olivia_Newton-John_Australian_single.png/250px-I_Love_You%2C_I_Honestly_Love_You_by_Olivia_Newton-John_Australian_single.png',
      artist: null,
    },
  }),
]

export default songs
