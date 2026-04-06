import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useChartStore } from '@/stores/chart'
import { getHomeTheme, getThemeForYear } from '@/themes'

const getDecade = (year: number) => Math.floor(year / 10)
const getDecadeStartYear = (decade: string) => Number.parseInt(decade, 10)

const applyTheme = (year: number) => {
  if (typeof document === 'undefined') return
  const theme = getThemeForYear(year)
  const root = document.documentElement
  const bodyFontFamily = theme.bodyFontFamily ?? theme.fontFamily

  root.style.setProperty('--theme-background', theme.colors.background)
  root.style.setProperty('--theme-surface', theme.colors.surface)
  root.style.setProperty('--theme-primary', theme.colors.primary)
  root.style.setProperty('--theme-secondary', theme.colors.secondary)
  root.style.setProperty('--theme-text', theme.colors.text)
  root.style.setProperty('--theme-text-muted', theme.colors.textMuted)
  root.style.setProperty('--theme-accent', theme.colors.accent)
  root.style.setProperty('--theme-tab-active', theme.colors.tabActive)
  root.style.setProperty('--theme-tab-inactive', theme.colors.tabInactive)
  root.style.setProperty('--theme-display-font-family', theme.fontFamily)
  root.style.setProperty('--theme-body-font-family', bodyFontFamily)

  document.body.style.fontFamily = bodyFontFamily
}

const applyHomeTheme = () => {
  if (typeof document === 'undefined') return
  const theme = getHomeTheme()
  const root = document.documentElement
  const bodyFontFamily = theme.bodyFontFamily ?? theme.fontFamily

  root.style.setProperty('--theme-background', theme.colors.background)
  root.style.setProperty('--theme-surface', theme.colors.surface)
  root.style.setProperty('--theme-primary', theme.colors.primary)
  root.style.setProperty('--theme-secondary', theme.colors.secondary)
  root.style.setProperty('--theme-text', theme.colors.text)
  root.style.setProperty('--theme-text-muted', theme.colors.textMuted)
  root.style.setProperty('--theme-accent', theme.colors.accent)
  root.style.setProperty('--theme-tab-active', theme.colors.tabActive)
  root.style.setProperty('--theme-tab-inactive', theme.colors.tabInactive)
  root.style.setProperty('--theme-display-font-family', theme.fontFamily)
  root.style.setProperty('--theme-body-font-family', bodyFontFamily)

  document.body.style.fontFamily = bodyFontFamily
}

let pendingThemeApplication: (() => void) | null = null

export const applyPendingTheme = () => {
  pendingThemeApplication?.()
  pendingThemeApplication = null
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

    if (route.name === 'decade') {
      const routeDecade = getDecadeStartYear(String(route.params.decade))
      if (!Number.isNaN(routeDecade)) {
        applyTheme(routeDecade)
        return
      }
    }

    applyTheme(store.selectedYear)
  }
  const queueRouteTheme = () => {
    pendingThemeApplication = applyRouteTheme
  }

  applyRouteTheme()

  watch(
    () => store.selectedYear,
    (year, oldYear) => {
      if (route.name !== 'year') return
      if (getDecade(year) !== getDecade(oldYear))
        pendingThemeApplication = () => applyTheme(year)
    },
  )

  watch(
    () => route.fullPath,
    () => queueRouteTheme(),
  )
}
