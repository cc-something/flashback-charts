<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { groupBy } from 'lodash-es'
import { getAvailableYears } from '@/data'
import { getDecadeForYear } from '@/themes'

const years = getAvailableYears().sort((a, b) => a - b)
const decades = computed(() => {
  const grouped = groupBy(years, (year) => getDecadeForYear(year))
  return Object.entries(grouped)
    .map(([decade, decadeYears]) => ({ decade, years: decadeYears }))
    .sort((a, b) => a.decade.localeCompare(b.decade))
})

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(
  /\/$/,
  '',
)
const title = 'Aussie Top Ten — Australia Top 10 Songs by Year, 1940 to 2025'
const description =
  'Browse the top 10 songs in Australia for every year from 1940 to the present. Listen to the biggest Aussie hits by decade, year, and artist.'

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
      <h1 class="text-4xl font-bold text-primary">Aussie Top Ten</h1>
      <p class="mt-2 text-text-muted">
        The top 10 songs in Australia for every year from 1940 to the present.
      </p>
    </header>

    <section
      v-for="group in decades"
      :key="group.decade"
      class="mb-8"
      aria-labelledby="`decade-${group.decade}`"
    >
      <h2
        :id="`decade-${group.decade}`"
        class="text-xl font-bold text-text mb-3"
      >
        {{ group.decade }}
      </h2>
      <ul class="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
        <li v-for="year in group.years" :key="year">
          <router-link
            :to="`/${year}`"
            class="block rounded-md bg-surface px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-tab-inactive"
          >
            Australia Top 10 Songs {{ year }}
          </router-link>
        </li>
      </ul>
    </section>
  </main>
</template>
