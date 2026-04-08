export interface DecadeTheme {
  name: string
  fontFamily: string
  bodyFontFamily?: string
  fontUrl?: string
  description?: string
  colors: {
    background: string
    surface: string
    primary: string
    secondary: string
    text: string
    textMuted: string
    accent: string
    tabActive: string
    tabInactive: string
  }
}
