import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

export const source = {
  label: 'ARIA End of Year Singles Chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_2017_in_Australia',
}

export const description =
  '2017 pushed polished pop and festival-sized dance records to the front, while trap rhythms and softer ballads gave the year some contrast. It was glossy, streamlined, and hook-driven.'

const year = 2017

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
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷',
    youtubeVideoId: 'JGwWNGJdvx8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'Despacito',
    artist: 'Luis Fonsi and Daddy Yankee featuring Justin Bieber',
    album: 'Vida',
    youtubeVideoId: 'kJQP7kiw5Fk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/c8/Luis_Fonsi_Feat._Daddy_Yankee_-_Despacito_%28Official_Single_Cover%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Castle on the Hill',
    artist: 'Ed Sheeran',
    album: '÷',
    youtubeVideoId: 'K0ibBPhiaG0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/27/Castle_On_The_Hill_%28Official_Single_Cover%29_by_Ed_Sheeran.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Perfect',
    artist: 'Ed Sheeran',
    album: '÷',
    youtubeVideoId: '2Vv-BfVoq4g',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Something Just like This',
    artist: 'The Chainsmokers and Coldplay',
    album: 'Memories...Do Not Open',
    youtubeVideoId: 'FM7MFYoylVs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/57/Something_Just_Like_This.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Thunder',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    youtubeVideoId: 'fKopy74weus',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/28/Imagine_Dragons_Thunder.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Galway Girl',
    artist: 'Ed Sheeran',
    album: '÷',
    youtubeVideoId: '87gWaABqGYs',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/9/95/EdSheeranGG.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'HUMBLE.',
    artist: 'Kendrick Lamar',
    album: 'Damn.',
    youtubeVideoId: 'tvTRZJ-4EyI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/58/Humble_kendrick_lamar.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Glorious',
    artist: 'Macklemore featuring Skylar Grey',
    album: 'Gemini',
    youtubeVideoId: '7OrLroFa0AI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/45/Macklemore_Glorious.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: "There's Nothing Holdin' Me Back",
    artist: 'Shawn Mendes',
    album: 'Illuminate',
    youtubeVideoId: 'dT2owtxkU8k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/a/a4/Shawn_Mendes_-_Theres_Nothing_Holdin_Me_Back_%28Official_Single_Cover%29.jpeg',
      artist: null,
    },
  }),
]

export default songs
