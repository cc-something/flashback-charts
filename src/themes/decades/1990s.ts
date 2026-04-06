import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1990s',
  description:
    'Alternative rock, glossy dance-pop, and R&B all took turns running the Australian charts in the 1990s. Triple J and local guitar scenes mattered more than ever, while hip-hop and club music pushed the mainstream into a broader, messier shape.',
  fontFamily: "'Space Grotesk', sans-serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap',
  colors: {
    background: '#0a1a1a',
    surface: '#0f2e2e',
    primary: '#00bfa5',
    secondary: '#ff3d00',
    text: '#e0f2f1',
    textMuted: '#6db5a8',
    accent: '#ff6e40',
    tabActive: '#00bfa5',
    tabInactive: '#0f2e2e',
  },
}

export default theme
