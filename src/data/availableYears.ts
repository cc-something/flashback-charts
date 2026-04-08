export const firstChartYear = 1940
export const latestChartYear = 2025
export const availableYears = Array.from(
  { length: latestChartYear - firstChartYear + 1 },
  (_, index) => firstChartYear + index,
)
