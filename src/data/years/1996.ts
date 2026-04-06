import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1996

export const description =
  '1996 had a bright, crowd-pleasing sound, with dance-pop, glossy ballads, and lighter crossover hits doing most of the work. The mood was easygoing but not bland, with a few bigger swings giving the year some edge.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1996_in_Australia',
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

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Macarena',
    artist: 'Los del Rio',
    album: 'A mí me gusta',
    youtubeVideoId: 'zWaymcVmJ-A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Remix_of_Los_Del_Rio%27s_Macarena_by_The_Bayside_Boys_European_CD.jpeg/250px-Remix_of_Los_Del_Rio%27s_Macarena_by_The_Bayside_Boys_European_CD.jpeg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Killing Me Softly',
    artist: 'Fugees',
    album: 'The Score',
    youtubeVideoId: 'oKOtzIo-uYw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Kmsoftlyfugees.jpg/250px-Kmsoftlyfugees.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Because You Loved Me',
    artist: 'Celine Dion',
    album: 'Falling into You',
    youtubeVideoId: 'ReUpQWdGEVM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Because_You_Loved_Me_%28C%C3%A9line_Dion_single_-_cover_art%29.jpg/250px-Because_You_Loved_Me_%28C%C3%A9line_Dion_single_-_cover_art%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'How Bizarre',
    artist: 'OMC',
    album: 'How Bizarre',
    youtubeVideoId: 'C2cMG33mWVY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/43/OMCHowBizarreMaxiCDCover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Wannabe',
    artist: 'Spice Girls',
    album: 'Spice',
    youtubeVideoId: 'gJLIiF15wjQ',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Wannabe_Single.png/250px-Wannabe_Single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'One of Us',
    artist: 'Joan Osborne',
    album: 'Relish',
    youtubeVideoId: 'aDdOnl0bHO4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/JoanOsbourneOneOfUsCDSingleCover.jpg/250px-JoanOsbourneOneOfUsCDSingleCover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Missing',
    artist: 'Everything but the Girl',
    album: 'Amplified Heart',
    youtubeVideoId: 'U56Ns66Qrb8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Missing_1995_cover_by_Everything_but_the_Girl.jpg/250px-Missing_1995_cover_by_Everything_but_the_Girl.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Return of the Mack',
    artist: 'Mark Morrison',
    album: 'Return of the Mack',
    youtubeVideoId: 'uB1D9wWxd2w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/21/MarkMorrisonReturnOfTheMackFrenchCDSingleCover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "What's Love Got to Do with It",
    artist: 'Warren G',
    album: 'Supercop',
    youtubeVideoId: 'I7dSVg00Rsg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/What%27s_Love_Got_to_Do_with_It.jpg/250px-What%27s_Love_Got_to_Do_with_It.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "You're Makin' Me High",
    artist: 'Toni Braxton',
    album: 'Secrets',
    youtubeVideoId: 'wIgOL21S98o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Toni_Braxton_-_You%27re_Makin%27_Me_High_%28The_Remix%29_and_Let_It_Flow.png/250px-Toni_Braxton_-_You%27re_Makin%27_Me_High_%28The_Remix%29_and_Let_It_Flow.png',
      artist: null,
    },
  }),
]

export default songs
