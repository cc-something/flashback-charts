import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '2020s',
  description:
    'The 2020s have been shaped by streaming speed, TikTok lift, and a blur between pop, hip-hop, R&B, dance, and indie. Bedroom-pop intimacy sits next to glossy crossover singles, and Australian hits now move between local radio and global playlists almost instantly.',
  fontFamily: "'Sora', sans-serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;700;800&display=swap',
  colors: {
    background: '#0b1020',
    surface: '#141b32',
    primary: '#9eb4ff',
    secondary: '#3ce6b0',
    text: '#f8fbff',
    textMuted: '#9ba9c7',
    accent: '#ff5ca8',
    tabActive: '#9eb4ff',
    tabInactive: '#141b32',
  },
}

export default theme
