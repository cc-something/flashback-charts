import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1962

export const description =
  'Polished pop and big emotional ballads dominated the Australian charts, with country crossover and easy listening instrumentals filling out the top spots. The twist craze was everywhere, and novelty instrumentals like space-age pop gave the year a playful, optimistic feel.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1962_in_Australia',
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

// Source: Kent Music Report 1962 year-end chart
// Via: Wikipedia - List of top 25 singles for 1962 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Working for the Man / Leah',
    artist: 'Roy Orbison',
    album: 'Oh! Pretty Woman',
    youtubeVideoId: '7YA_lRme-6I',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/30/a2/b6/30a2b6ef-d9fb-738c-07e5-97028b39d430/dj.hcobukpd.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "Can't Help Falling in Love / Rock-A-Hula Baby",
    artist: 'Elvis Presley',
    album: 'Blue Hawaii (Original Soundtrack)',
    youtubeVideoId: 'nMIdBzQcsy8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dc/79/4c/dc794ce3-b5e3-5cbe-ccf8-c10e695a38e8/886445009798.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: "Good Luck Charm / Anything That's Part of You",
    artist: 'Elvis Presley',
    album: "Elvis' Golden Records, Vol. 3",
    youtubeVideoId: 'ucs0iRoOEv0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c8/94/6d/c8946d44-19ef-d662-9a76-2373c03d19ba/886445009880.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Roses Are Red (My Love)',
    artist: 'Bobby Vinton',
    album: 'Roses Are Red',
    youtubeVideoId: '8rjPC7-JMUM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5d/37/6a/5d376a4c-105f-c225-8ccd-55eee82e8734/mzi.zxoghrfu.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Multiplication',
    artist: 'Bobby Darin',
    album: 'Twist With Bobby Darin',
    youtubeVideoId: '8x-NZ7TaoT0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/y2004/m11/d17/h18/s06.uxhkgfve.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'The Lonely Bull',
    artist: 'Herb Alpert and the Tijuana Brass',
    album: 'The Lonely Bull',
    youtubeVideoId: '6uqPBZncL5Q',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ac/53/0e/ac530e38-28cb-79cf-2873-6cc5eaf2c5e2/00814647020228_Cover.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "I Can't Stop Loving You",
    artist: 'Ray Charles',
    album: 'Jazz On the Afternoon',
    youtubeVideoId: 'H61YWtExfS0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a3/0b/6a/a30b6ae2-5a41-aeff-eec6-2126d7e2b80a/mzi.ussqueuw.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Stranger on the Shore',
    artist: 'Acker Bilk',
    album: 'Stranger On the Shore',
    youtubeVideoId: 'hTl-iAF6KsE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/84/59/bc/mzi.plkgzaek.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Telstar',
    artist: 'The Tornados',
    album: 'The Original Telstar: The Sounds of the Tornadoes',
    youtubeVideoId: 'ZxyN3b1bs-w',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/0b/59/01/0b590190-9ce4-3234-5b26-9542162aaa13/4066004374673_3000.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'The Swiss Maid',
    artist: 'Del Shannon',
    album: 'The Swiss Maid',
    youtubeVideoId: 'nn27xBY8X68',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music7/v4/6d/7c/5b/6d7c5bec-bbb4-44a4-160d-a7f0e171e365/889845189749.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
