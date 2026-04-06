import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1970s',
  description:
    "Pub rock, glam rock, and hard rock defined the Australian sound of the 1970s, with a thriving live music scene producing some of the country's most enduring acts. Toward the end of the decade, disco and funk broke through the charts, bridging the gap between the rock era and the electronic sounds to come.",
  fontFamily: "'Unbounded', cursive",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700&display=swap',
  colors: {
    background: '#1a0e00',
    surface: '#2d1800',
    primary: '#ff8c00',
    secondary: '#e65100',
    text: '#fff3e0',
    textMuted: '#c47a30',
    accent: '#ffd600',
    tabActive: '#ff8c00',
    tabInactive: '#2d1800',
  },
}

export default theme
