import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1990

export const description =
  '1990 leaned toward polished pop, slow-burn ballads, and glossy radio singles that stuck around for months. Dance music was getting louder, but the year still had a soft edge, with plenty of tracks built for cruising and late-night singalongs.'

export const source = {
  label: 'ARIA End of Year singles chart',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1990_in_Australia',
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

// Source: ARIA End of Year singles chart 1990 year-end chart
// Via: Wikipedia - List of top 25 singles for 1990 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Nothing Compares 2 U',
    artist: "Sinéad O'Connor",
    album: "I Do Not Want What I Haven't Got",
    youtubeVideoId: '0-EF60neguk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/e/e6/Nothingcompares2u.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sinead_O%27Connor_%2814828633401%29_%28cropped%29.jpg/960px-Sinead_O%27Connor_%2814828633401%29_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 2,
    title: "U Can't Touch This",
    artist: 'MC Hammer',
    album: "Please Hammer Don't Hurt 'Em",
    youtubeVideoId: 'otCpCn0l4Wo',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Hammer_Touch.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/4/4f/MC_Hammer_2010_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 3,
    title: 'Vogue',
    artist: 'Madonna',
    album: "I'm Breathless: Music from and Inspired by the Film Dick Tracy",
    youtubeVideoId: 'GuJQSAiODqI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/81/Madonna%2C_Vogue_cover.png',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MadonnaO2171023_%2897_of_133%29_%2853269593787%29_%28cropped%29.jpg/960px-MadonnaO2171023_%2897_of_133%29_%2853269593787%29_%28cropped%29.jpg',
    },
  }),
  getSong({
    rank: 4,
    title: 'It Must Have Been Love',
    artist: 'Roxette',
    album: 'Pretty Woman (soundtrack)',
    youtubeVideoId: 'k2C5TjS2sh4',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/9/98/ItMustHaveBeenLove1987.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Roxette_at_the_Beacon%2C_September_2012.jpg/1280px-Roxette_at_the_Beacon%2C_September_2012.jpg',
    },
  }),
  getSong({
    rank: 5,
    title: 'All I Wanna Do Is Make Love to You',
    artist: 'Heart',
    album: 'Brigade',
    youtubeVideoId: 'OAfxs0IDeMs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/d/d0/Heart_AIWDIMLTY.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/VH1_Divas_Salute_the_Troops%2C_Heart.jpg/1280px-VH1_Divas_Salute_the_Troops%2C_Heart.jpg',
    },
  }),
  getSong({
    rank: 6,
    title: 'Opposites Attract',
    artist: 'Paula Abdul',
    album: 'Forever Your Girl',
    youtubeVideoId: 'xweiQukBM_k',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/1/1a/Paula_abdul_opposites_attract_single.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/d/d6/Paula_Abdul_%2853384817755%29.jpg',
    },
  }),
  getSong({
    rank: 7,
    title: 'How Am I Supposed to Live Without You',
    artist: 'Michael Bolton',
    album: 'Soul Provider',
    youtubeVideoId: 'a9NOcMnXkYw',
    imageSelection: 'artist',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/5/5b/LauraBranigan_HowAmISupposed.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Michael_Bolton_by_Gage_Skidmore_2.jpg/960px-Michael_Bolton_by_Gage_Skidmore_2.jpg',
    },
  }),
  getSong({
    rank: 8,
    title: 'Unchained Melody',
    artist: 'The Righteous Brothers',
    album: 'Just Once in My Life',
    youtubeVideoId: 'Zv8czIoAw5w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Unchained_Melody_by_Righteous_Brothers_1965_US_vinyl_B-side.png/250px-Unchained_Melody_by_Righteous_Brothers_1965_US_vinyl_B-side.png',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/TheRighteousBrothersperformingKBF.jpg/1280px-TheRighteousBrothersperformingKBF.jpg',
    },
  }),
  getSong({
    rank: 9,
    title: "Girl I'm Gonna Miss You",
    artist: 'Milli Vanilli',
    album: "All or Nothing and Girl You Know It's True",
    youtubeVideoId: 'Pup-ci8aPew',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/f/fb/GirlImGonnaMissYou.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Milli_Vanilli_and_C._Michael_Greene.jpg/1280px-Milli_Vanilli_and_C._Michael_Greene.jpg',
    },
  }),
  getSong({
    rank: 10,
    title: 'Love Shack',
    artist: "The B-52's",
    album: 'Cosmic Thing',
    youtubeVideoId: '9SOryJvTAGs',
    imageSelection: 'album',
    imageSources: {
      album: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Loveshack.jpg',
      artist:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/BsLiveCollage.jpg/1280px-BsLiveCollage.jpg',
    },
  }),
]

export default songs
