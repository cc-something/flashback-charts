import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1940s',
  fontFamily: "'Cormorant Garamond', serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;700&display=swap',
  description:
    "Big band swing and jazz ruled Australian airwaves in the 1940s, with fox trots, waltzes, and quicksteps filling ballrooms coast to coast. Wartime ballads gave way to optimistic post-war pop, and radio broadcasts cemented the era's most popular tunes in the national consciousness.",
  colors: {
    background: '#120b0d',
    surface: '#221317',
    primary: '#d7b56d',
    secondary: '#8f2d20',
    text: '#f7ecd8',
    textMuted: '#b89a66',
    accent: '#f2d38b',
    tabActive: '#d7b56d',
    tabInactive: '#221317',
  },
}

export default theme
