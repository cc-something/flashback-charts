import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from '@/themes/font'

const theme: DecadeTheme = {
  name: '1980s',
  description:
    'Synth-pop, new wave, and electronic dance music dominated Australian charts in the 1980s, as the MTV era made image as important as sound. Power ballads, post-punk, and a globally successful wave of Australian new wave acts put the country firmly on the international pop map.',
  fontFamily: "'Orbitron', sans-serif",
  bodyFontFamily: defaultBodyFontFamily,
  fontUrl:
    'https://fonts.bunny.net/css2?family=Orbitron:wght@400;700&display=swap',
  colors: {
    background: '#120033',
    surface: '#0f0024',
    primary: '#ff0090',
    secondary: '#00fff0',
    text: '#ffffff',
    textMuted: '#d580ff',
    accent: '#ffcc00',
    tabActive: '#ff0090',
    tabInactive: '#14003a',
  },
}

export default theme
