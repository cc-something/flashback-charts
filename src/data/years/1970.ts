import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1970

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

// Source: Kent Music Report 1970 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1970 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1970_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Let It Be',
    artist: 'The Beatles',
    album: 'Let It Be',
    youtubeVideoId: 'CGj85pVzRJs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/TheBeatles-LetItBe%282011VinylReissue%29.png/250px-TheBeatles-LetItBe%282011VinylReissue%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: '(They Long to Be) Close to You',
    artist: 'The Carpenters',
    album: 'Close to You',
    youtubeVideoId: '6yUq_-_v4rI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/They_Long_to_be_Close_to_You_by_Carpenters_Irish_single.png/250px-They_Long_to_be_Close_to_You_by_Carpenters_Irish_single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'In The Summertime',
    artist: 'The Mixtures',
    album: 'Electronically Tested',
    youtubeVideoId: '7RlQaKETL1w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/19/MungoJerryInTheSummertime7InchSingleCover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Spirit in the Sky',
    artist: 'Norman Greenbaum',
    album: 'Spirit in the Sky',
    youtubeVideoId: 'if2Zei7JANI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Spirit_in_the_sky_by_norman_greenbaum_1989_US_reissue_side-A.png/250px-Spirit_in_the_sky_by_norman_greenbaum_1989_US_reissue_side-A.png',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Bridge Over Troubled Water',
    artist: 'Simon and Garfunkel',
    album: 'Bridge over Troubled Water',
    youtubeVideoId: '4G-YQA_bsOU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Bridge_Over_Troubled_Water_single.jpg/250px-Bridge_Over_Troubled_Water_single.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Lookin\' Out My Back Door " / "Long As I Can See The Light',
    artist: 'Creedence Clearwater Revival',
    album: "Cosmo's Factory",
    youtubeVideoId: 'Aae_RHRptRg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Lookinoutmybackdoor45.jpg/250px-Lookinoutmybackdoor45.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'El Cóndor Pasa',
    artist: 'Simon and Garfunkel',
    album: 'Bridge over Troubled Water',
    youtubeVideoId: 'fYKV7onO1n8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/El_Condor_Pasa_cover_by_Sinon_%26_Garfunkel.jpg/250px-El_Condor_Pasa_cover_by_Sinon_%26_Garfunkel.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Up Around the Bend / Run Through The Jungle',
    artist: 'Creedence Clearwater Revival',
    album: "Cosmo's Factory",
    youtubeVideoId: '_7PUPNxsRQ0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Uparoundthebend45.jpg/250px-Uparoundthebend45.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Knock Knock Who's There",
    artist: 'Liv Maessen',
    album: 'Liv Maessen',
    youtubeVideoId: 'MgdT9aA_x3s',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Knock_knock_whos_there.jpg/250px-Knock_knock_whos_there.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "Raindrops Keep Fallin' on My Head",
    artist: 'Johnny Farnham',
    album: "Raindrops Keep Fallin' on My Head",
    youtubeVideoId: '8Ik79k_SHiE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Raindrops_Keep_Fallin%27_on_My_Head.jpg/250px-Raindrops_Keep_Fallin%27_on_My_Head.jpg',
      artist: null,
    },
  }),
]

export default songs
