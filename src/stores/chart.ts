import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { range } from 'lodash-es'
import { useStorage } from '@vueuse/core'
import { getYearData, getAvailableYears, getYearSource } from '@/data'
import { getDecadeForYear } from '@/themes'

export type SortOrder = 'asc' | 'desc'

export const useChartStore = defineStore('chart', () => {
  const selectedYear = ref(1973)
  const sortOrder = useStorage<SortOrder>('chart-sort-order', 'asc')

  const yearRange = range(1940, 2026)
  const availableYears = getAvailableYears()

  const currentSongs = computed(() => {
    const songs = getYearData(selectedYear.value) ?? []
    if (sortOrder.value === 'desc') return [...songs].reverse()
    return songs
  })
  const currentSource = computed(() => getYearSource(selectedYear.value))
  const currentDecade = computed(() => getDecadeForYear(selectedYear.value))
  const hasData = computed(() => currentSongs.value.length > 0)

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
    currentSongs,
    currentSource,
    currentDecade,
    hasData,
    setYear,
    selectYear,
    toggleSortOrder,
  }
})
