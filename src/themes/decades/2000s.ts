import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from '@/themes/font'

const theme: DecadeTheme = {
  name: '2000s',
  description:
    'The 2000s mixed reality-TV pop, pop R&B, rap crossover, and the last big wave of chart rock. Downloads changed how hits spread, and the decade drifted from guitar radio toward shinier, more electronic pop.',
  bodyFontFamily: defaultBodyFontFamily,
  fontFamily: "'Michroma', sans-serif",
  fontUrl: 'https://fonts.bunny.net/css2?family=Michroma&display=swap',
  colors: {
    background: '#111b31',
    surface: '#23497c',
    player: '#182944',
    primary: '#69e2ff',
    secondary: '#ff4db8',
    text: '#edf8ff',
    textMuted: '#93b8d8',
    accent: '#c7f464',
    tabActive: '#69e2ff',
    tabInactive: '#23497c',
  },
}

export default theme
