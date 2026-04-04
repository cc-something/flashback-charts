import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { range } from 'lodash-es'
import { getYearData, getAvailableYears, getYearSource } from '@/data'
import { getDecadeForYear } from '@/themes'

export const useChartStore = defineStore('chart', () => {
  const selectedYear = ref(1973)

  const yearRange = range(1940, 2026)
  const availableYears = getAvailableYears()

  const currentSongs = computed(() => getYearData(selectedYear.value) ?? [])
  const currentSource = computed(() => getYearSource(selectedYear.value))
  const currentDecade = computed(() => getDecadeForYear(selectedYear.value))
  const hasData = computed(() => currentSongs.value.length > 0)

  const selectYear = (year: number) => {
    selectedYear.value = year
  }

  return {
    selectedYear,
    yearRange,
    availableYears,
    currentSongs,
    currentSource,
    currentDecade,
    hasData,
    selectYear,
  }
})
