import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from '@/themes/font'

const theme: DecadeTheme = {
  name: '1990s',
  description:
    'Alternative rock, glossy dance-pop, and R&B all took turns running the Australian charts in the 1990s. Triple J and local guitar scenes mattered more than ever, while hip-hop and club music pushed the mainstream into a broader, messier shape.',
  bodyFontFamily: defaultBodyFontFamily,
  fontFamily: "'Chakra Petch', sans-serif",
  fontUrl:
    'https://fonts.bunny.net/css2?family=Chakra+Petch:wght@400;500;700&display=swap',
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
