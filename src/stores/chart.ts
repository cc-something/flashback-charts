import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { availableYears } from '@/data/availableYears'

export type SortOrder = 'asc' | 'desc'

export const useChartStore = defineStore('chart', () => {
  const fallbackYear = availableYears.includes(1973)
    ? 1973
    : (availableYears[0] ?? 1973)
  const pathYear =
    typeof window === 'undefined'
      ? Number.NaN
      : Number(window.location.pathname.slice(1))
  const initialYear = availableYears.includes(pathYear)
    ? pathYear
    : fallbackYear
  const selectedYear = ref(initialYear)
  const sortOrder = useStorage<SortOrder>('chart-sort-order', 'asc')
  const yearRange = computed(() => availableYears)

  const setYear = (year: number) => {
    selectedYear.value = year
  }

  const selectYear = (year: number) => {
    selectedYear.value = year
  }

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  return {
    selectedYear,
    sortOrder,
    yearRange,
    availableYears,
    setYear,
    selectYear,
    toggleSortOrder,
  }
})
