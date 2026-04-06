import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useChartStore } from '@/stores/chart'
import { getHomeTheme, getThemeForYear } from '@/themes'

const getDecade = (year: number) => Math.floor(year / 10)

const applyTheme = (year: number) => {
  if (typeof document === 'undefined') return
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

const applyHomeTheme = () => {
  if (typeof document === 'undefined') return
  const theme = getHomeTheme()
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

let pendingThemeYear: number | null = null

export const applyPendingTheme = () => {
  if (pendingThemeYear === null) return
  applyTheme(pendingThemeYear)
  pendingThemeYear = null
}

export const useDecadeTheme = () => {
  const store = useChartStore()
  const route = useRoute()
  const applyRouteTheme = () => {
    if (route.name === 'home') {
      applyHomeTheme()
      return
    }

    if (route.name === 'year') {
      const routeYear = Number(route.params.year)
      if (!Number.isNaN(routeYear)) {
        applyTheme(routeYear)
        return
      }
    }

    applyTheme(store.selectedYear)
  }

  applyRouteTheme()

  watch(
    () => store.selectedYear,
    (year, oldYear) => {
      if (route.name !== 'year') return
      if (getDecade(year) !== getDecade(oldYear)) pendingThemeYear = year
    },
  )

  watch(
    () => route.name,
    () => applyRouteTheme(),
  )
}
