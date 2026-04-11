import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1965

export const description =
  'Australian pop was thriving, with homegrown beat groups and folk-pop acts finally holding their own against the British heavyweights. The charts mixed guitar-driven pop with lush vocal harmonies and the occasional sentimental ballad. Conscription for Vietnam had just begun, and a subtle undercurrent of unease was starting to creep into the culture.'

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1965_in_Australia',
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

// Source: Kent Music Report 1965 year-end chart
// Via: Wikipedia - List of top 25 singles for 1965 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: "Que Sera, Sera / Shakin' All Over",
    artist: 'Normie Rowe',
    album: "Que Sera, Sera / Shakin' All Over",
    youtubeVideoId: 'YrKUfo4oXOw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/de/00/17/de00178b-4a8c-1f66-9571-99f113b02c7e/825646081974.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: 'The Carnival Is Over',
    artist: 'The Seekers',
    album: 'The Seekers',
    youtubeVideoId: 'z4ZipKdI1sY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b7/f8/6b/b7f86b26-bea8-d978-67c2-77a8d09b20cb/077779037056.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Help!',
    artist: 'The Beatles',
    album: 'Help!',
    youtubeVideoId: '2Q_ZzBGPdqE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/1a/19/db/1a19db26-17ad-b986-11a9-f72ac7a6194b/18UMGIM31214.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: "Rock and Roll Music / Honey Don't",
    artist: 'The Beatles',
    album: 'Beatles For Sale',
    youtubeVideoId: 'XIc-VCw5r0A',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/79/2c/10/792c1019-387f-e819-ac8f-bc989f20a970/00602567725190.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Crying in the Chapel',
    artist: 'Elvis Presley',
    album: 'How Great Thou Art',
    youtubeVideoId: 'CYOUcV7nlN8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6d/74/50/6d74501e-ec89-f611-9ff8-794fcb750130/886445927924.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "I'll Never Find Another You",
    artist: 'The Seekers',
    album: "I'll Never Find Another You",
    youtubeVideoId: 'kKySE1Ukupg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ae/85/c6/ae85c6a4-4b00-bb66-b261-2bee96044eab/5059460061767.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'The Wedding',
    artist: 'Julie Rogers',
    album: 'Sing Another Song',
    youtubeVideoId: 'S-0INi8ziCw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/4d/82/55/mzi.xziowphq.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Under the Boardwalk / Walking the Dog',
    artist: 'The Rolling Stones',
    album: 'The Rolling Stones No. 2',
    youtubeVideoId: 'hXsmcgm7QxU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f7/a5/bc/f7a5bc79-4b8d-3bc1-e65f-8a0b6d1740e5/13ABKIM00015.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: "Mrs. Brown, You've Got a Lovely Daughter",
    artist: "Herman's Hermits",
    album:
      "Mrs. Brown, You've Got a Lovely Daughter (Music from the Original Soundtrack)",
    youtubeVideoId: 'IOfs8U_3NQk',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ec/ff/77/ecff77ea-0aa0-ca92-ee1f-23fd865a6ef8/00018771884125.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Ticket to Ride',
    artist: 'The Beatles',
    album: 'Help!',
    youtubeVideoId: 'SyNt5zm3U_M',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/1a/19/db/1a19db26-17ad-b986-11a9-f72ac7a6194b/18UMGIM31214.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
