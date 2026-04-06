<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChartStore } from '@/stores/chart'
import { getThemeForYear } from '@/themes'

const store = useChartStore()
const router = useRouter()
const route = useRoute()
const scrollContainer = ref<HTMLElement | null>(null)

const scrollToActiveTab = async () => {
  await nextTick()

  const container = scrollContainer.value
  if (!container) return
  const activeTab = container.querySelector<HTMLElement>('[data-active="true"]')
  if (!activeTab) return
  const targetScrollLeft =
    activeTab.offsetLeft - container.clientWidth / 2 + activeTab.clientWidth / 2
  const maxScrollLeft = container.scrollWidth - container.clientWidth
  const nextScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft))

  container.scrollTo({ left: nextScrollLeft, behavior: 'smooth' })
}

const goToYear = (year: number, target: EventTarget | null) => {
  if (!store.availableYears.includes(year)) return
  router.push(`/${year}`)
  ;(target as HTMLElement | null)?.blur()
  if (typeof window !== 'undefined')
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getTabThemeStyle = (year: number) => {
  const decadeTheme = getThemeForYear(year)

  return {
    '--year-tab-surface': decadeTheme.colors.surface,
    '--year-tab-text': decadeTheme.colors.text,
    '--year-tab-text-muted': decadeTheme.colors.textMuted,
    '--year-tab-active': decadeTheme.colors.tabActive,
    '--year-tab-inactive': decadeTheme.colors.tabInactive,
  }
}

onMounted(scrollToActiveTab)
watch(() => store.selectedYear, scrollToActiveTab)
</script>

<template>
  <nav class="sticky top-0 z-10 bg-surface border-b border-primary/20">
    <div
      ref="scrollContainer"
      class="flex overflow-x-auto scrollbar-hide gap-0.5 px-4 py-2"
      style="scroll-behavior: smooth"
    >
      <button
        v-for="year in store.yearRange"
        :key="year"
        :data-active="route.name === 'year' && year === store.selectedYear"
        :style="getTabThemeStyle(year)"
        :class="[
          'year-tab flex-shrink-0 px-3 py-1.5 rounded text-sm font-medium transition-all duration-200',
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
.year-tab {
  background-color: transparent;
  color: var(--year-tab-text-muted);
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
