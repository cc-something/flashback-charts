<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartStore } from '@/stores/chart'

const store = useChartStore()
const scrollContainer = ref<HTMLElement | null>(null)

const scrollToActiveTab = () => {
  const container = scrollContainer.value
  if (!container) return
  const activeTab = container.querySelector<HTMLElement>('[data-active="true"]')
  if (!activeTab) return
  const containerRect = container.getBoundingClientRect()
  const tabRect = activeTab.getBoundingClientRect()
  const offset =
    tabRect.left -
    containerRect.left -
    containerRect.width / 2 +
    tabRect.width / 2
  container.scrollBy({ left: offset, behavior: 'smooth' })
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
        :data-active="year === store.selectedYear"
        :class="[
          'flex-shrink-0 px-3 py-1.5 rounded text-sm font-medium transition-all duration-200',
          year === store.selectedYear
            ? 'bg-tab-active text-background font-bold scale-105'
            : store.availableYears.includes(year)
              ? 'text-text hover:bg-tab-inactive hover:text-text'
              : 'text-text-muted opacity-40 cursor-default',
        ]"
        @click="store.availableYears.includes(year) && store.selectYear(year)"
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
