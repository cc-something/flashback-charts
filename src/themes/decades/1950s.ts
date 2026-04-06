import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1950s',
  description:
    'Rock and roll swept into Australia in the 1950s, colliding with homegrown country, skiffle, and pop to create a new youth culture built around jukeboxes, dance halls, and the first television broadcasts. The decade marked a turning point as local artists began adapting American and British sounds into something distinctly Australian.',
  fontFamily: "'Alfa Slab One', serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap',
  colors: {
    background: '#14243a',
    surface: '#213552',
    primary: '#ff6b9a',
    secondary: '#57d6ff',
    text: '#fffaf2',
    textMuted: '#f4c8a4',
    accent: '#fff07a',
    tabActive: '#ff6b9a',
    tabInactive: '#213552',
  },
}

export default theme
