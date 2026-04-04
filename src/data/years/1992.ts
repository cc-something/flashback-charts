import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1992

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1992_in_Australia',
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

// Source: ARIA End of Year singles chart 1992 year-end chart
// Via: Wikipedia — List of top 25 singles for 1992 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Achy Breaky Heart',
    artist: 'Billy Ray Cyrus',
    album: 'Some Gave All',
    youtubeVideoId: 'byQIPdHMpjc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/12/Achy_Breaky_Heart.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/9/94/Billy_Ray_Cyrus_2019.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: 'November Rain',
    artist: "Guns N' Roses",
    album: 'Use Your Illusion I',
    youtubeVideoId: '8SbUC-UaAxE',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Novemberrain.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/GNR_Belgrade_2025_05_%28cropped%29.jpg/1280px-GNR_Belgrade_2025_05_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'End of the Road',
    artist: 'Boyz II Men',
    album:
      'Boomerang: Original Soundtrack Album and Cooleyhighharmony (Reissue)',
    youtubeVideoId: 'zDKO6XYXioc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/b/b8/Boyz_II_Men_End_of_the_Road_USA_commercial_cassette.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/6/67/Boyz_II_Men_-_Walmart_%281%29.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'To Be with You',
    artist: 'Mr. Big',
    album: 'Lean into It',
    youtubeVideoId: 'L6-uJLteKek',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/c/cb/To_be_with_you.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mr._Big_%40_Tavastia%2C_2011-06-08_%285815516505%29.jpg/1280px-Mr._Big_%40_Tavastia%2C_2011-06-08_%285815516505%29.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'Amigos para siempre (Friends for Life)',
    artist: 'José Carreras',
    album: 'Amigos para siempre (Friends for Life)',
    youtubeVideoId: 'OmUS9vu-O1s',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/1c/Amigosparasiempre.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/4/4a/Jose_Carreras_-_World_Economic_Forum_Annual_Meeting_2011_-_cropped.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'The Best Things in Life Are Free',
    artist: 'Luther Vandross',
    album:
      "Mo' Money: Original Motion Picture Soundtrack and Design of a Decade: 1986–1996",
    youtubeVideoId: '79SNvZi3ltE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/44/Janet_Jackson_The_Best_Things_in_Life_are_Free.png',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Luther_Vandross_1985b.jpg/960px-Luther_Vandross_1985b.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: "Please Don't Go",
    artist: 'K.W.S.',
    album: 'KWS',
    youtubeVideoId: 'Qxaxynbf_9E',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/2/29/Please_Don%27t_Go_by_KC_and_the_Sunshine_Band_US_vinyl.png',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'The Day You Went Away',
    artist: 'Wendy Matthews',
    album: 'New Wave',
    youtubeVideoId: 'T8fgmfM2zeQ',
    imageSelection: 'artist',
    imageSources: {
      album: null,
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Under the Bridge',
    artist: 'Red Hot Chili Peppers',
    album: 'Blood Sugar Sex Magik',
    youtubeVideoId: 'GLvohMXgcBo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/4/41/UndertheBridge.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/RHCP_Live_in_London_26_June_2022.jpg/1280px-RHCP_Live_in_London_26_June_2022.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Hazard',
    artist: 'Richard Marx',
    album: 'Rush Street',
    youtubeVideoId: 'gdmHHoI9beM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/10/Richard_Marx_-_Hazard.jpeg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/2/20/Richard_Marx%2C_Birmingham%2C_AL_2025_%28cropped%29.jpg',
    },
  }),
]

export default songs
