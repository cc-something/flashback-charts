import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from '@/themes/font'

const theme: DecadeTheme = {
  name: '2020s',
  description:
    'The 2020s have been shaped by streaming speed, TikTok lift, and a blur between pop, hip-hop, R&B, dance, and indie. Bedroom-pop intimacy sits next to glossy crossover singles, and Australian hits now move between local radio and global playlists almost instantly.',
  fontFamily: "'Syne', sans-serif",
  bodyFontFamily: defaultBodyFontFamily,
  fontUrl:
    'https://fonts.bunny.net/css2?family=Syne:wght@400;600;700;800&display=swap',
  colors: {
    background: '#141428',
    surface: '#262658',
    player: '#1d1d41',
    primary: '#d4ff3e',
    secondary: '#ff3cac',
    text: '#f2f2ff',
    textMuted: '#8088a0',
    accent: '#6c63ff',
    tabActive: '#d4ff3e',
    tabInactive: '#262658',
  },
}

export default theme
