import { watch } from 'vue'
import { useChartStore } from '@/stores/chart'
import { getThemeForYear } from '@/themes'

const applyTheme = (year: number) => {
  const theme = getThemeForYear(year)
  const root = document.documentElement

  root.style.setProperty('--theme-background', theme.colors.background)
  root.style.setProperty('--theme-surface', theme.colors.surface)
  root.style.setProperty('--theme-primary', theme.colors.primary)
  root.style.setProperty('--theme-secondary', theme.colors.secondary)
  root.style.setProperty('--theme-text', theme.colors.text)
  root.style.setProperty('--theme-text-muted', theme.colors.textMuted)
  root.style.setProperty('--theme-accent', theme.colors.accent)
  root.style.setProperty('--theme-tab-active', theme.colors.tabActive)
  root.style.setProperty('--theme-tab-inactive', theme.colors.tabInactive)

  document.body.style.fontFamily = theme.fontFamily
}

export const useDecadeTheme = () => {
  const store = useChartStore()
  applyTheme(store.selectedYear)
  watch(() => store.selectedYear, applyTheme)
}
