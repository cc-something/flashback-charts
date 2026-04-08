import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1950s',
  description:
    'Rock and roll swept into Australia in the 1950s, colliding with homegrown country, skiffle, and pop to create a new youth culture built around jukeboxes, dance halls, and the first television broadcasts. The decade marked a turning point as local artists began adapting American and British sounds into something distinctly Australian.',
  fontFamily: "'Patua One', serif",
  bodyFontFamily: "'Inter', sans-serif",
  fontUrl: 'https://fonts.bunny.net/css2?family=Patua+One&display=swap',
  colors: {
    background: '#0f2040',
    surface: '#1c3260',
    primary: '#f2c572',
    secondary: '#57d6ff',
    text: '#fffaf2',
    textMuted: '#f4c8a4',
    accent: '#fff07a',
    tabActive: '#f2c572',
    tabInactive: '#213552',
  },
}

export default theme
