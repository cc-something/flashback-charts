import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1984

export const description =
  "Slick pop production and feel-good anthems ruled 1984, with movie tie-in singles and bubbly synth-pop dominating radio and Countdown alike. Heartland rock made a big impression too, and the charts had a playful, optimistic energy that matched the decade's confident mood."

export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1984_in_Australia',
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

// Source: Kent Music Report 1984 year-end chart
// Via: Wikipedia - List of top 25 singles for 1984 in Australia
const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Dancing in the Dark',
    artist: 'Bruce Springsteen',
    album: 'Born In the U.S.A.',
    youtubeVideoId: '2qExWoSEyg8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/72/68/327268ba-b9dd-b322-2a16-bdd0212df48c/074643865326.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "It's Just Not Cricket",
    artist: 'The Twelfth Man',
    album: 'Wired World of Sports, Part 2',
    youtubeVideoId: 'jXPeC1flckE',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/0/06/ItsJustNotCricket-single.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Ghostbusters',
    artist: 'Ray Parker Jr.',
    album: 'Ghostbusters',
    youtubeVideoId: 'hck0xBS9OfM',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c5/96/63/c596638c-a823-1a5e-dba0-6f1df67ab671/886447946862.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Careless Whisper',
    artist: 'George Michael',
    album: 'Careless Whisper',
    youtubeVideoId: 'JqIHlDVqUTw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/89/46/95/8946959a-e959-f22d-ced2-745feb799454/mzm.upagbaeg.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Wake Me Up Before You Go-Go',
    artist: 'Wham!',
    album: 'Make It Big',
    youtubeVideoId: 'YfAF92Z3iFw',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/13/62/bd/1362bda5-3908-8112-7884-e6d58d2fdfdc/886447728932.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: 'I Just Called to Say I Love You',
    artist: 'Stevie Wonder',
    album: 'The Woman in Red',
    youtubeVideoId: 'psNE9XUiTjU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/29/3a/92/293a9224-329d-3ede-ed4c-caba1c045e97/00602547215086.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: 'Footloose',
    artist: 'Kenny Loggins',
    album: 'Footloose (Original Soundtrack of the Motion Picture)',
    youtubeVideoId: 'e-OG0EyJyV8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/10/b3/cc/10b3ccaa-d66e-54df-41e9-f8b3a52e7563/mzi.lrbbfqac.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Hello',
    artist: 'Lionel Richie',
    album: "Can't Slow Down",
    youtubeVideoId: 'xXJSmGfw9oI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0d/c0/a3/0dc0a301-d9e5-2980-5141-d8ddb1571398/00602498607497.rgb.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Girls Just Want to Have Fun',
    artist: 'Cyndi Lauper',
    album: "She's So Unusual",
    youtubeVideoId: 'biw4s8RQNn8',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8a/8c/13/8a8c13e0-06af-1710-7b7d-ebec65fb8361/074643893022.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Islands in the Stream',
    artist: 'Kenny Rogers and Dolly Parton',
    album: 'Eyes That See in the Dark',
    youtubeVideoId: 'UaNGtgYwSsU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://is1-ssl.mzstatic.com/image/thumb/Music/37/fa/d1/mzi.ecmonpil.jpg/600x600bb.jpg',
      artist: null,
    },
  }),
]

export default songs
