import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from '@/themes/font'

const theme: DecadeTheme = {
  name: '1970s',
  description:
    "Pub rock, glam rock, and hard rock defined the Australian sound of the 1970s, with a thriving live music scene producing some of the country's most enduring acts. Toward the end of the decade, disco and funk broke through the charts, bridging the gap between the rock era and the electronic sounds to come.",
  fontFamily: "'Unbounded', cursive",
  bodyFontFamily: defaultBodyFontFamily,
  fontUrl:
    'https://fonts.bunny.net/css2?family=Unbounded:wght@400;700&display=swap',
  colors: {
    background: '#331c00',
    surface: '#251400',
    player: '#1d1000',
    primary: '#ff8c00',
    secondary: '#e65100',
    text: '#fff3e0',
    textMuted: '#c47a30',
    accent: '#ffd600',
    tabActive: '#ff8c00',
    tabInactive: '#251400',
  },
}

export default theme
