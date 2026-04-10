import type { DecadeTheme } from '@/types/theme'
import { defaultBodyFontFamily } from '@/themes/font'

const theme: DecadeTheme = {
  name: '1960s',
  description:
    'Beat music, garage rock, and the British Invasion reshaped Australian pop in the 1960s, with surf rock, mod fashion, and psychedelic sounds following close behind. Local bands found their voice alongside the global explosion of rock, folk, and soul, making it the most creatively restless decade in Australian chart history.',
  fontFamily: "'Righteous', sans-serif",
  bodyFontFamily: defaultBodyFontFamily,
  fontUrl: 'https://fonts.bunny.net/css2?family=Righteous&display=swap',
  colors: {
    background: '#1b093a',
    surface: '#3d1a7a',
    player: '#2c1559',
    primary: '#ff7a00',
    secondary: '#ff4fd8',
    text: '#fff3bf',
    textMuted: '#d8b3ff',
    accent: '#b8ff2c',
    tabActive: '#ff7a00',
    tabInactive: '#4e219b',
  },
}

export default theme
