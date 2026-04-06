import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1960s',
  description:
    'Beat music, garage rock, and the British Invasion reshaped Australian pop in the 1960s, with surf rock, mod fashion, and psychedelic sounds following close behind. Local bands found their voice alongside the global explosion of rock, folk, and soul, making it the most creatively restless decade in Australian chart history.',
  fontFamily: "'Shrikhand', cursive",
  fontUrl: 'https://fonts.googleapis.com/css2?family=Shrikhand&display=swap',
  colors: {
    background: '#2b124c',
    surface: '#40206c',
    primary: '#ff7a00',
    secondary: '#ff4fd8',
    text: '#fff3bf',
    textMuted: '#d8b3ff',
    accent: '#b8ff2c',
    tabActive: '#ff7a00',
    tabInactive: '#40206c',
  },
}

export default theme
