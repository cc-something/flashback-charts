import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1950s',
  description:
    'Rock and roll swept into Australia in the 1950s, colliding with homegrown country, skiffle, and pop to create a new youth culture built around jukeboxes, dance halls, and the first television broadcasts. The decade marked a turning point as local artists began adapting American and British sounds into something distinctly Australian.',
  fontFamily: "'Bebas Neue', cursive",
  fontUrl: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
  colors: {
    background: '#0b1e30',
    surface: '#143050',
    primary: '#00e5ff',
    secondary: '#ff4081',
    text: '#f5faff',
    textMuted: '#80d4f0',
    accent: '#ff4081',
    tabActive: '#00e5ff',
    tabInactive: '#143050',
  },
}

export default theme
