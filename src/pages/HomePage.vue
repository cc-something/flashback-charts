<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { ArrowRight } from 'lucide-vue-next'
import { getDecadeSummaries, getLatestYear } from '@/content/chartContent'

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(
  /\/$/,
  '',
)
const decades = getDecadeSummaries().reverse()
const decadeColumnSplitIndex = Math.ceil(decades.length / 2)
const decadeColumns = [
  decades.slice(0, decadeColumnSplitIndex),
  decades.slice(decadeColumnSplitIndex),
]
const latestYear = getLatestYear()
const title = 'Flashback Charts Australia'
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
    <div class="mb-8">
      <h1 class="text-2xl text-text-muted">
        The top 10 songs in Australia for every year from 1940 to
        {{ latestYear }}
      </h1>
      <p class="mt-2 text-base leading-relaxed text-text-muted/70">
        Nine decades of Australian music charts, from today's streaming hits and
        2000s pop anthems back through grunge, synth-pop, disco, and the
        rock'n'roll pioneers. Listen to the #1s and Top 10s and discover the
        songs that shaped each era.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 min-[1000px]:grid-cols-2">
      <div
        v-for="(column, columnIndex) in decadeColumns"
        :key="columnIndex"
        class="flex flex-col gap-6"
        :class="{ 'min-[1000px]:pt-28': columnIndex === 1 }"
      >
        <section
          v-for="group in column"
          :key="group.decade"
          class="rounded-xl p-4"
          :style="{
            backgroundColor: group.theme.colors.background + '99',
            border: `1px solid ${group.theme.colors.primary}33`,
          }"
          :aria-labelledby="`decade-${group.decade}`"
        >
          <h2
            :id="`decade-${group.decade}`"
            class="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl"
            :style="{
              color: group.theme.colors.primary,
              fontFamily: group.theme.fontFamily,
            }"
          >
            <router-link
              :to="`/${group.decade}`"
              class="transition-opacity duration-150 hover:opacity-80"
            >
              {{ group.decade }}
            </router-link>
          </h2>
          <p
            v-if="group.theme.description"
            class="mb-4 text-base leading-relaxed"
            :style="{ color: group.theme.colors.textMuted }"
          >
            {{ group.theme.description }}
          </p>
          <div class="pt-4">
            <p
              class="mb-3 text-sm"
              :style="{ color: group.theme.colors.textMuted }"
            >
              Click on a year to see the Top 10:
            </p>
            <ul class="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
              <li v-for="tile in group.years" :key="tile.year">
                <router-link
                  :to="`/${tile.year}`"
                  class="group relative isolate block aspect-square overflow-hidden rounded-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
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
                    class="absolute inset-0 z-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <ArrowRight class="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                  <span
                    class="absolute bottom-0 left-0 right-0 z-10 pb-1.5 text-center"
                  >
                    <span
                      class="block text-base font-bold leading-tight"
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
    </div>
  </main>
</template>
