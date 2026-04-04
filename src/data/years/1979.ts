import { getSongThumbnailPath } from '@/data/imageAsset'
import type { Song } from '@/types/song'

const year = 1979

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

// Source: Kent Music Report 1979 year-end chart
// Via: Wikipedia — List of Top 25 singles for 1979 in Australia (cites David Kent's Australian Chart Book 1970–1992)
export const source = {
  label: 'Kent Music Report',
  url: 'https://en.wikipedia.org/wiki/List_of_top_25_singles_for_1979_in_Australia',
}

const songs: Song[] = [
  getSong({
    rank: 1,
    title: 'Lay Your Love on Me',
    artist: 'Racey',
    album: 'Smash and Grab',
    youtubeVideoId: 'ofDCsRhT57o',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Lay_Your_Love_on_Me.jpg/250px-Lay_Your_Love_on_Me.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 2,
    title: "I Was Made For Lovin' You",
    artist: 'Kiss',
    album: 'Dynasty',
    youtubeVideoId: 'ooZ-Sqx5gh0',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/IWasMadeForLovinYouUKSingle.jpg/250px-IWasMadeForLovinYouUKSingle.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 3,
    title: 'Heart of Glass',
    artist: 'Blondie',
    album: 'Parallel Lines',
    youtubeVideoId: 'WGU_4-5RaxU',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Heart_of_Glass_by_Blondie_US_vinyl_single.png/250px-Heart_of_Glass_by_Blondie_US_vinyl_single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 4,
    title: 'Some Girls',
    artist: 'Racey',
    album: 'Smash and Grab',
    youtubeVideoId: '-2oNlvavwWo',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Some_Girls.jpg/250px-Some_Girls.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 5,
    title: 'Born to Be Alive',
    artist: 'Patrick Hernandez',
    album: 'Born to Be Alive',
    youtubeVideoId: '9UaJAnnipkY',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Born_to_be_alive_Patrick_Hernandez_French_12-inch_single.png/250px-Born_to_be_alive_Patrick_Hernandez_French_12-inch_single.png',
      artist: null,
    },
  }),
  getSong({
    rank: 6,
    title: "I Don't Like Mondays",
    artist: 'The Boomtown Rats',
    album: 'The Fine Art of Surfacing',
    youtubeVideoId: '-Kobdb37Cwc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/8/83/I_Don%27t_Like_Mondays_single_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 7,
    title: "Da Ya Think I'm Sexy?",
    artist: 'Rod Stewart',
    album: 'Blondes Have More Fun',
    youtubeVideoId: 'Hphwfq1wLJs',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Da%27_Ya%27_Think_I%27m_Sexy_single_cover.jpg/250px-Da%27_Ya%27_Think_I%27m_Sexy_single_cover.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 8,
    title: 'Le Freak',
    artist: 'Chic',
    album: "C'est Chic",
    youtubeVideoId: 'aXgSHL7efKg',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Chicfreak.jpg/250px-Chicfreak.jpg',
      artist: null,
    },
  }),
  getSong({
    rank: 9,
    title: 'Knock on Wood',
    artist: 'Amii Stewart',
    album: 'Knock on Wood',
    youtubeVideoId: 'XKuJUxGntRI',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Knock_on_Wood_by_Eddie_Floyd_US_vinyl_single_Side-A.png/250px-Knock_on_Wood_by_Eddie_Floyd_US_vinyl_single_Side-A.png',
      artist: null,
    },
  }),
  getSong({
    rank: 10,
    title: 'Pop Muzik',
    artist: 'M',
    album: 'New York • London • Paris • Munich',
    youtubeVideoId: 'Yy7msZykATc',
    imageSelection: 'album',
    imageSources: {
      album:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Pop_Muzik.jpg/250px-Pop_Muzik.jpg',
      artist: null,
    },
  }),
]

export default songs
