import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1990s',
  description:
    "Grunge, alternative rock, and indie made their mark on Australian charts in the 1990s, as Triple J grew into a cultural force and homegrown rock scenes flourished. R&B, hip-hop, and electronic dance music also broke into the mainstream, reflecting the decade's restless genre diversity.",
  fontFamily: "'Chakra Petch', sans-serif",
  bodyFontFamily: "'Inter', sans-serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;700&display=swap',
  colors: {
    background: '#17151f',
    surface: '#262230',
    primary: '#70d96c',
    secondary: '#ff5d5d',
    text: '#f4f2ef',
    textMuted: '#b3a8c5',
    accent: '#00d1c7',
    tabActive: '#70d96c',
    tabInactive: '#262230',
  },
}

export default theme
