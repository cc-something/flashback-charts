import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from './font'

const homeTheme: DecadeTheme = {
  name: 'home',
  fontFamily: defaultBodyFontFamily,
  bodyFontFamily: defaultBodyFontFamily,
  colors: {
    background: '#0a0f1f',
    surface: '#131c33',
    primary: '#7dd3fc',
    secondary: '#f59e0b',
    text: '#f8fbff',
    textMuted: '#9fb2d3',
    accent: '#f97316',
    tabActive: '#7dd3fc',
    tabInactive: '#131c33',
  },
}

export default homeTheme
