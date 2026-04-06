import type { DecadeTheme } from '@/types/theme'

const theme: DecadeTheme = {
  name: '1940s',
  fontFamily: "'Playfair Display', serif",
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
  description:
    "Australian popular music in the 1940s was shaped by the twin forces of wartime sentiment and the golden age of American swing. Big band orchestras and jazz ensembles dominated the airwaves, with dance hall favourites — fox trots, waltzes, and quicksteps — filling ballrooms from Sydney to Melbourne. Wartime ballads and patriotic songs reflected the national mood, while the post-war years brought a wave of optimistic, romantic pop. Radio was the defining medium of the era, with the ABC and commercial stations broadcasting live orchestral performances that set the week's most popular tunes. Country and western influences from America began to take hold toward the end of the decade, planting seeds for a distinctly Australian style that would bloom in the 1950s.",
  colors: {
    background: '#1a0a0a',
    surface: '#2e1216',
    primary: '#e8b830',
    secondary: '#c0392b',
    text: '#fdf0d5',
    textMuted: '#c9a96e',
    accent: '#d4af37',
    tabActive: '#e8b830',
    tabInactive: '#3a1520',
  },
}

export default theme
