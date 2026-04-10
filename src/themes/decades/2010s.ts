import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from '@/themes/font'

const theme: DecadeTheme = {
  name: '2010s',
  description:
    'Streaming rewired the charts in the 2010s, favouring fast-moving pop, EDM drops, rap features, and moodier R&B. Australian acts broke through globally with regularity, and hit songs started sounding more at home on playlists than in record stores.',
  fontFamily: "'Exo 2', sans-serif",
  bodyFontFamily: defaultBodyFontFamily,
  fontUrl:
    'https://fonts.bunny.net/css2?family=Exo+2:wght@400;700&display=swap',
  colors: {
    background: '#181030',
    surface: '#38246a',
    player: '#281c4d',
    primary: '#7c6fe0',
    secondary: '#00c4b8',
    text: '#f0ecff',
    textMuted: '#8878aa',
    accent: '#ff6b6b',
    tabActive: '#7c6fe0',
    tabInactive: '#38246a',
  },
}

export default theme
