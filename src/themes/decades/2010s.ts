import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '2010s',
  description:
    'Streaming rewired the charts in the 2010s, favouring fast-moving pop, EDM drops, rap features, and moodier R&B. Australian acts broke through globally with regularity, and hit songs started sounding more at home on playlists than in record stores.',
  fontFamily: "'Manrope', sans-serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap',
  colors: {
    background: '#111827',
    surface: '#1b263b',
    primary: '#c4b5fd',
    secondary: '#2dd4bf',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#ffd166',
    tabActive: '#c4b5fd',
    tabInactive: '#1b263b',
  },
}

export default theme
