<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { groupBy } from 'lodash-es'
import { getAvailableYears } from '@/data'
import { getDecadeForYear, getThemeForYear } from '@/themes'

const years = getAvailableYears().sort((a, b) => a - b)
const latestYear = years[years.length - 1]
const decades = computed(() => {
  const grouped = groupBy(years, (year) => getDecadeForYear(year))
  return Object.entries(grouped)
    .map(([decade, decadeYears]) => {
      const theme = getThemeForYear(parseInt(decade))
      return { decade, years: decadeYears, theme }
    })
    .sort((a, b) => a.decade.localeCompare(b.decade))
})

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(
  /\/$/,
  '',
)
const title = `Flashback Charts Australia — Australia Top 10 Songs by Year, 1940 to ${latestYear}`
const description = `Browse the top 10 songs in Australia for every year from 1940 to ${latestYear}. Listen to the biggest Aussie hits by decade, year, and artist.`

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    ...(siteUrl ? [{ property: 'og:url', content: siteUrl }] : []),
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ],
  link: siteUrl ? [{ rel: 'canonical', href: siteUrl }] : [],
})
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-primary">
        Flashback Charts Australia
      </h1>
      <p class="mt-2 text-text-muted">
        The top 10 songs in Australia for every year from 1940 to
        {{ latestYear }}.
      </p>
    </header>

    <section
      v-for="group in decades"
      :key="group.decade"
      class="mb-8 rounded-xl p-4"
      :style="{
        backgroundColor: group.theme.colors.background + '99',
        border: `1px solid ${group.theme.colors.primary}33`,
      }"
      :aria-labelledby="`decade-${group.decade}`"
    >
      <h2
        :id="`decade-${group.decade}`"
        class="text-xl font-bold mb-3"
        :style="{
          color: group.theme.colors.primary,
          fontFamily: group.theme.fontFamily,
        }"
      >
        {{ group.decade }}
      </h2>
      <ul class="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
        <li v-for="year in group.years" :key="year">
          <router-link
            :to="`/${year}`"
            class="flex items-center justify-center aspect-square rounded-lg text-sm font-bold text-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
            :style="{
              backgroundColor: group.theme.colors.surface,
              color: group.theme.colors.text,
              border: `1px solid ${group.theme.colors.primary}44`,
              fontFamily: group.theme.fontFamily,
            }"
          >
            <span>
              <span
                class="block text-base leading-tight"
                :style="{ color: group.theme.colors.primary }"
              >
                {{ year }}
              </span>
              <span class="block text-xs leading-tight opacity-70">Top 10</span>
            </span>
          </router-link>
        </li>
      </ul>
    </section>
  </main>
</template>
