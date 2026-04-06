import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1999

export const description =
  '1999 sounded like a year getting ready to flip into something else, with glossy pop, dance-floor momentum, and a few novelty streaks all crowding the top end. It was big, bright, and slightly overstuffed in a way that suited the turn of the century.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1999_in_Australia',
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
    title: 'Mambo No. 5',
    artist: 'Lou Bega',
    album: 'A Little Bit of Mambo',
    youtubeVideoId: 'EK_LN3XEcnw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Mambo_No._5_%28Lou_Bega_single_-_cover_art%29.jpg/250px-Mambo_No._5_%28Lou_Bega_single_-_cover_art%29.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: '...Baby One More Time',
    artist: 'Britney Spears',
    album: '...Baby One More Time',
    youtubeVideoId: 'C-u5WLJ9Yk4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/...Baby_One_More_Time_Single.png/250px-...Baby_One_More_Time_Single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Blue (Da Ba Dee)',
    artist: 'Eiffel 65',
    album: 'Europop',
    youtubeVideoId: '4iwHb189X84',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Eiffel_65_blue_cover.png/250px-Eiffel_65_blue_cover.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Last Kiss',
    artist: 'Pearl Jam',
    album: 'No Boundaries: A Benefit for the Kosovar Refugees',
    youtubeVideoId: 'uvjTo-hRD5c',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/6/65/PJLastKiss.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Pretty Fly (For a White Guy)',
    artist: 'The Offspring',
    album: 'Americana',
    youtubeVideoId: 'QtTR-_Klcq8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/TheOffspringPrettyFlyforaWhiteGuy.jpg/250px-TheOffspringPrettyFlyforaWhiteGuy.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'Believe',
    artist: 'Cher',
    album: 'Believe',
    youtubeVideoId: 'nZXRV4MezEw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Cher_-_Believe_%28single%29.png/250px-Cher_-_Believe_%28single%29.png',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "Don't Call Me Baby",
    artist: 'Madison Avenue',
    album: 'The Polyester Embassy',
    youtubeVideoId: 'M1kEjj3Ej68',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Madisonave.jpg/250px-Madisonave.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: "That Don't Impress Me Much",
    artist: 'Shania Twain',
    album: 'Come On Over',
    youtubeVideoId: 'mqFLXayD6e8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Shania_Twain_-_That_Don%27t_Impress_Me_Much.jpg/250px-Shania_Twain_-_That_Don%27t_Impress_Me_Much.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Why Don't You Get a Job",
    artist: 'The Offspring',
    album: 'Americana',
    youtubeVideoId: 'LH-i8IvYIcg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/TheOffspringWDYGAJ.jpg/250px-TheOffspringWDYGAJ.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Genie in a Bottle',
    artist: 'Christina Aguilera',
    album: 'Christina Aguilera',
    youtubeVideoId: 'kIDWgqDBNXA',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Genie_in_a_Bottle.png/250px-Genie_in_a_Bottle.png',
      artist: null,
    },
  }),
]

export default songs
