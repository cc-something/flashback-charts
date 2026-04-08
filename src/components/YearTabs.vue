<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChartStore } from '@/stores/chart'
import { getThemeForYear } from '@/themes'
import { getYearPath } from '@/utils/url'

const store = useChartStore()
const router = useRouter()
const route = useRoute()
const scrollContainer = ref<HTMLElement | null>(null)
const defaultHomeYear = 2000
const isLandingRoute = computed(
  () => route.name === 'home' || route.name === 'decade',
)
const activeYear = computed(() => {
  if (route.name === 'home') return defaultHomeYear
  if (route.name === 'decade') {
    const decadeStartYear = Number.parseInt(String(route.params.decade), 10)
    return Number.isNaN(decadeStartYear) ? null : decadeStartYear
  }
  if (route.name !== 'year') return null

  const routeYear = Number(route.params.year)
  return Number.isNaN(routeYear) ? store.selectedYear : routeYear
})

const scrollToActiveTab = async () => {
  await nextTick()

  const container = scrollContainer.value
  if (!container) return
  const targetYear = activeYear.value
  if (targetYear === null) return
  const targetTab = container.querySelector<HTMLElement>(
    `[data-year="${targetYear}"]`,
  )
  if (!targetTab) return
  const targetScrollLeft =
    targetTab.offsetLeft - container.clientWidth / 2 + targetTab.clientWidth / 2
  const maxScrollLeft = container.scrollWidth - container.clientWidth
  const nextScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft))

  if (isLandingRoute.value) {
    container.scrollLeft = nextScrollLeft
    return
  }

  container.scrollTo({ left: nextScrollLeft, behavior: 'smooth' })
}

const goToYear = (year: number, target: EventTarget | null) => {
  if (!store.availableYears.includes(year)) return
  router.push(getYearPath(year))
  ;(target as HTMLElement | null)?.blur()
}

const getTabThemeStyle = (year: number) => {
  const decadeTheme = getThemeForYear(year)

  return {
    '--year-tab-surface': decadeTheme.colors.surface,
    '--year-tab-text': decadeTheme.colors.text,
    '--year-tab-text-muted': decadeTheme.colors.textMuted,
    '--year-tab-active': decadeTheme.colors.tabActive,
    '--year-tab-inactive': decadeTheme.colors.tabInactive,
    '--year-tab-font-family':
      decadeTheme.bodyFontFamily ?? decadeTheme.fontFamily,
  }
}

watch(activeYear, scrollToActiveTab, { immediate: true })
onMounted(scrollToActiveTab)
</script>

<template>
  <nav
    aria-label="Year navigation"
    class="year-tabs-shell border-b border-white/8"
  >
    <div
      ref="scrollContainer"
      class="year-tabs-track flex overflow-x-auto scrollbar-hide gap-0.5 px-4 py-2"
    >
      <button
        v-for="year in store.yearRange"
        :key="year"
        :data-year="year"
        :data-active="route.name === 'year' && year === store.selectedYear"
        :style="getTabThemeStyle(year)"
        :aria-current="
          route.name === 'year' && year === store.selectedYear
            ? 'true'
            : undefined
        "
        :aria-disabled="
          !store.availableYears.includes(year) ? 'true' : undefined
        "
        :class="[
          'year-tab inline-flex h-10 flex-shrink-0 items-center justify-center px-3 rounded text-sm font-medium transition-all duration-200',
          route.name === 'year' && year === store.selectedYear
            ? 'year-tab-active font-bold scale-105'
            : store.availableYears.includes(year)
              ? 'year-tab-available'
              : 'year-tab-unavailable',
        ]"
        @click="goToYear(year, $event.target)"
      >
        {{ year }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.year-tabs-shell {
  background: rgb(10 14 20 / 58%);
  backdrop-filter: blur(18px) saturate(140%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 5%),
    0 16px 36px rgb(0 0 0 / 14%);
}

.year-tabs-track {
  position: relative;
}

.year-tabs-track::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 4%), transparent 55%),
    linear-gradient(
      90deg,
      rgb(255 255 255 / 4%),
      transparent 18%,
      transparent 82%,
      rgb(255 255 255 / 4%)
    );
}

.year-tab {
  background-color: transparent;
  color: var(--year-tab-text-muted);
  font-family: var(--year-tab-font-family);
  font-variant-numeric: tabular-nums lining-nums;
  line-height: 1;
}

.year-tab-active {
  background-color: var(--year-tab-active);
  color: var(--year-tab-surface);
}

.year-tab-available:hover {
  background-color: var(--year-tab-inactive);
  color: var(--year-tab-text);
}

.year-tab-unavailable {
  color: var(--year-tab-text-muted);
  opacity: 0.4;
  cursor: default;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
