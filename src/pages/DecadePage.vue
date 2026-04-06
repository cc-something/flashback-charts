<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import {
  getDecadePageDescription,
  getDecadePageSubtitle,
  getDecadePageTitle,
  getDecadeYears,
  getYearPageDescription,
} from '@/content/chartContent'
import { getThemeForYear } from '@/themes'

const props = defineProps<{ decade: string }>()

const decadeStartYear = computed(() => Number.parseInt(props.decade, 10))
const theme = computed(() => getThemeForYear(decadeStartYear.value))
const years = computed(() => getDecadeYears(props.decade))
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
      <p
        class="mb-2 text-sm font-semibold uppercase tracking-[0.24em]"
        :style="{ color: theme.colors.secondary }"
      >
        Flashback Charts Australia
      </p>
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
        class="grid gap-4 rounded-2xl border p-5 md:grid-cols-[1fr_auto]"
        :style="{
          backgroundColor: `${theme.colors.background}99`,
          borderColor: `${theme.colors.primary}33`,
        }"
      >
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
  </main>
</template>
