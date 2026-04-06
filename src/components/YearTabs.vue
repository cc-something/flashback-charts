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

const getTabTheme = (year: number) => getThemeForYear(year)

const getTabStyle = (year: number) => {
  const theme = getTabTheme(year)
  return {
    fontFamily: theme.fontFamily,
    color: theme.colors.text,
  }
}

const getActiveTabStyle = (year: number) => {
  const theme = getTabTheme(year)
  return {
    ...getTabStyle(year),
    backgroundColor: theme.colors.tabActive,
    borderColor: theme.colors.tabActive,
    color: theme.colors.background,
  }
}

const getInactiveTabStyle = (year: number) => {
  const theme = getTabTheme(year)
  return {
    ...getTabStyle(year),
    borderColor: `${theme.colors.primary}44`,
  }
}

const getDisabledTabStyle = (year: number) => {
  const theme = getTabTheme(year)
  return {
    ...getInactiveTabStyle(year),
    color: theme.colors.textMuted,
  }
}

const goToYear = (year: number, target: EventTarget | null) => {
  if (!store.availableYears.includes(year)) return
  router.push(`/${year}`)
  ;(target as HTMLElement | null)?.blur()
  if (typeof window !== 'undefined')
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        :data-active="route.name !== 'home' && year === store.selectedYear"
        :class="[
          'flex-shrink-0 rounded border px-3 py-1.5 text-sm font-medium transition-all duration-200',
          route.name !== 'home' && year === store.selectedYear
            ? 'font-bold scale-105'
            : store.availableYears.includes(year)
              ? 'hover:opacity-80'
              : 'text-text-muted opacity-40 cursor-default',
        ]"
        :style="
          route.name !== 'home' && year === store.selectedYear
            ? getActiveTabStyle(year)
            : store.availableYears.includes(year)
              ? getInactiveTabStyle(year)
              : getDisabledTabStyle(year)
        "
        @click="goToYear(year, $event.target)"
      >
        {{ year }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
