<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import {
  getAvailableDecades,
  getDecadePageDescription,
  getDecadePageSubtitle,
  getDecadePageTitle,
  getDecadeYears,
  getTopSongThumbnails,
  getYearPageDescription,
} from '@/content/chartContent'
import { getThemeForYear } from '@/themes'

const props = defineProps<{ decade: string }>()

const decadeStartYear = computed(() => Number.parseInt(props.decade, 10))
const theme = computed(() => getThemeForYear(decadeStartYear.value))
const years = computed(() => getDecadeYears(props.decade))
const decades = getAvailableDecades()
const decadeIndex = computed(() => decades.indexOf(props.decade))
const previousDecade = computed(() =>
  decadeIndex.value > 0 ? decades[decadeIndex.value - 1] : null,
)
const nextDecade = computed(() =>
  decadeIndex.value >= 0 && decadeIndex.value < decades.length - 1
    ? decades[decadeIndex.value + 1]
    : null,
)
const title = computed(() => getDecadePageTitle(props.decade))
const subtitle = computed(() => getDecadePageSubtitle(props.decade))
const description = computed(() => getDecadePageDescription(props.decade))
const siteUrl = computed(() => {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return env?.replace(/\/$/, '') ?? ''
})
const canonical = computed(() =>
  siteUrl.value ? `${siteUrl.value}/${props.decade}` : undefined,
)
const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': title.value,
  'description': description.value,
  'url': canonical.value,
  'hasPart': years.value.map((year) => ({
    '@type': 'WebPage',
    'name': `Australia Top 10 Songs ${year}`,
    'url': canonical.value ? `${siteUrl.value}/${year}` : undefined,
    'description': getYearPageDescription(year),
  })),
}))

useHead(() => ({
  title: title.value,
  meta: [
    { name: 'description', content: description.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title.value },
    { property: 'og:description', content: description.value },
    ...(canonical.value
      ? [{ property: 'og:url', content: canonical.value }]
      : []),
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
  ],
  link: canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd.value),
    },
  ],
}))
</script>

<template>
  <main class="mx-auto max-w-5xl px-4 py-8">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-primary">
        {{ title }}
      </h1>
      <p class="mt-2 text-text-muted">
        {{ subtitle }}
      </p>
      <p
        v-if="theme.description"
        class="mt-4 max-w-3xl text-base leading-relaxed"
        :style="{ color: theme.colors.textMuted }"
      >
        {{ theme.description }}
      </p>
    </header>

    <section class="grid grid-cols-1 gap-4">
      <article
        v-for="year in years"
        :key="year"
        class="grid gap-4 rounded-2xl border p-5 md:grid-cols-[128px_1fr_auto]"
        :style="{
          backgroundColor: `${theme.colors.background}99`,
          borderColor: `${theme.colors.primary}33`,
        }"
      >
        <router-link
          :to="`/${year}`"
          class="group relative block aspect-square overflow-hidden rounded-xl"
          :style="{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.primary}44`,
          }"
        >
          <div class="grid h-full grid-cols-2 grid-rows-2">
            <img
              v-for="(thumbnail, index) in getTopSongThumbnails(year)"
              :key="`${year}-${index}`"
              :src="thumbnail"
              :alt="`Top song ${index + 1} of ${year}`"
              class="h-full w-full object-cover"
            />
          </div>
          <div
            class="absolute inset-0"
            style="
              background: linear-gradient(
                to top,
                rgb(0 0 0 / 95%) 0%,
                rgb(0 0 0 / 55%) 36%,
                transparent 78%
              );
            "
          />
          <div
            class="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <ArrowRight class="h-7 w-7 text-white drop-shadow-lg" />
          </div>
          <span class="absolute bottom-0 left-0 right-0 z-20 pb-2 text-center">
            <span
              class="block text-base font-bold leading-tight"
              :style="{
                color: theme.colors.primary,
                fontFamily: theme.fontFamily,
              }"
            >
              {{ year }}
            </span>
            <span class="block text-xs leading-tight text-white/70">Top 4</span>
          </span>
        </router-link>

        <div>
          <h2
            class="text-2xl font-bold"
            :style="{
              color: theme.colors.primary,
              fontFamily: theme.fontFamily,
            }"
          >
            {{ year }}
          </h2>
          <p class="mt-2 text-sm leading-relaxed text-text-muted">
            {{ getYearPageDescription(year) }}
          </p>
        </div>

        <div class="flex items-center md:justify-end">
          <router-link
            :to="`/${year}`"
            class="inline-flex min-w-[220px] items-center justify-center rounded-xl px-6 py-4 text-base font-bold text-black transition-transform duration-150 hover:scale-[1.02]"
            :style="{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }"
          >
            View {{ year }} Top 10
          </router-link>
        </div>
      </article>
    </section>

    <nav class="mt-8 flex items-center justify-between gap-4">
      <router-link
        v-if="previousDecade"
        :to="`/${previousDecade}`"
        class="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-150 hover:bg-surface/60"
        :style="{
          borderColor: `${theme.colors.primary}33`,
          color: theme.colors.text,
        }"
      >
        <ArrowLeft class="h-4 w-4" />
        {{ previousDecade }}
      </router-link>
      <div v-else />

      <router-link
        v-if="nextDecade"
        :to="`/${nextDecade}`"
        class="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-150 hover:bg-surface/60"
        :style="{
          borderColor: `${theme.colors.primary}33`,
          color: theme.colors.text,
        }"
      >
        {{ nextDecade }}
        <ArrowRight class="h-4 w-4" />
      </router-link>
      <div v-else />
    </nav>
  </main>
</template>
