import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1960s',
  description:
    'Beat music, garage rock, and the British Invasion reshaped Australian pop in the 1960s, with surf rock, mod fashion, and psychedelic sounds following close behind. Local bands found their voice alongside the global explosion of rock, folk, and soul, making it the most creatively restless decade in Australian chart history.',
  fontFamily: "'Righteous', cursive",
  fontUrl: 'https://fonts.googleapis.com/css2?family=Righteous&display=swap',
  colors: {
    background: '#120635',
    surface: '#261070',
    primary: '#ff5500',
    secondary: '#e040fb',
    text: '#f3e8ff',
    textMuted: '#c794f5',
    accent: '#39ff14',
    tabActive: '#ff5500',
    tabInactive: '#261070',
  },
}

export default theme
