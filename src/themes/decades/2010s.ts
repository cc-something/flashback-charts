import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '2010s',
  description:
    'Streaming changed everything in the 2010s, with indie pop, EDM, and hip-hop building a new chart landscape driven by algorithms and playlist culture. Australian artists crossed over to global audiences more than ever before, riding waves of tropical pop, dark pop, and R&B crossover.',
  fontFamily: "'Manrope', sans-serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap',
  colors: {
    background: '#111827',
    surface: '#1b263b',
    primary: '#ff6b6b',
    secondary: '#2dd4bf',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#ffd166',
    tabActive: '#ff6b6b',
    tabInactive: '#1b263b',
  },
}

export default theme
