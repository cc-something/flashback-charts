<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { groupBy } from 'lodash-es'
import { ArrowRight } from 'lucide-vue-next'
import { getAvailableYears, getYearData } from '@/data'
import { getDecadeForYear, getThemeForYear } from '@/themes'

const years = getAvailableYears().sort((a, b) => a - b)
const latestYear = years[years.length - 1]

const getNumberOneThumbnail = (year: number) =>
  getYearData(year)?.[0]?.thumbnailPath ?? null

const decades = computed(() => {
  const grouped = groupBy(years, (year) => getDecadeForYear(year))
  return Object.entries(grouped)
    .map(([decade, decadeYears]) => {
      const theme = getThemeForYear(parseInt(decade))
      const yearTiles = decadeYears.map((year) => ({
        year,
        thumbnail: getNumberOneThumbnail(year),
      }))
      return { decade, years: yearTiles, theme }
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
  <main class="max-w-[1300px] mx-auto px-4 py-10">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-primary">
        💿 Flashback Charts Australia
      </h1>
      <p class="mt-2 text-text-muted">
        The top 10 songs in Australia for every year from 1940 to
        {{ latestYear }}.
      </p>
    </header>

    <div class="grid grid-cols-1 min-[1260px]:grid-cols-2 gap-6">
      <section
        v-for="group in decades"
        :key="group.decade"
        class="flex h-full flex-col rounded-xl p-4"
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
        <p
          v-if="group.theme.description"
          class="text-sm leading-relaxed mb-4"
          :style="{ color: group.theme.colors.textMuted }"
        >
          {{ group.theme.description }}
        </p>
        <div class="mt-auto pt-4">
          <p
            class="mb-3 text-xs"
            :style="{ color: group.theme.colors.textMuted }"
          >
            Click on a year to see the Top 10 songs:
          </p>
          <ul class="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
            <li v-for="tile in group.years" :key="tile.year">
              <router-link
                :to="`/${tile.year}`"
                class="group relative block aspect-square overflow-hidden rounded-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                :style="{
                  backgroundColor: group.theme.colors.surface,
                  border: `1px solid ${group.theme.colors.primary}44`,
                  fontFamily: group.theme.fontFamily,
                }"
              >
                <img
                  v-if="tile.thumbnail"
                  :src="tile.thumbnail"
                  :alt="`#1 song of ${tile.year}`"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  class="absolute inset-0"
                  style="
                    background: linear-gradient(
                      to top,
                      rgb(0 0 0 / 95%) 0%,
                      rgb(0 0 0 / 60%) 40%,
                      transparent 75%
                    );
                  "
                />
                <div
                  class="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <ArrowRight class="h-6 w-6 text-white drop-shadow-lg" />
                </div>
                <span
                  class="absolute bottom-0 left-0 right-0 z-20 pb-1.5 text-center"
                >
                  <span
                    class="block text-sm leading-tight font-bold"
                    :style="{ color: group.theme.colors.primary }"
                  >
                    {{ tile.year }}
                  </span>
                  <span class="block text-xs leading-tight text-white/70">
                    Top 10
                  </span>
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>
