import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { range } from 'lodash-es'
import { useStorage } from '@vueuse/core'
import {
  getYearData,
  getAvailableYears,
  getYearSource,
  getYearDescription,
} from '@/data'
import { getDecadeForYear } from '@/themes'

export type SortOrder = 'asc' | 'desc'

export const useChartStore = defineStore('chart', () => {
  const initialYear = Number(window.location.pathname.slice(1)) || 1973
  const selectedYear = ref(initialYear)
  const sortOrder = useStorage<SortOrder>('chart-sort-order', 'asc')

  const yearRange = range(1940, 2026)
  const availableYears = getAvailableYears()

  const currentSongs = computed(() => {
    const songs = getYearData(selectedYear.value) ?? []
    if (sortOrder.value === 'desc') return [...songs].reverse()
    return songs
  })
  const currentSource = computed(() => getYearSource(selectedYear.value))
  const currentDescription = computed(() =>
    getYearDescription(selectedYear.value),
  )
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
    currentDescription,
    currentDecade,
    hasData,
    setYear,
    selectYear,
    toggleSortOrder,
  }
})
