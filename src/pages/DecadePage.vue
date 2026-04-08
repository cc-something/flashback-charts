<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import {
  getAvailableDecades,
  getDecadePageDescription,
  getDecadeSongThumbnails,
  getDecadePageSubtitle,
  getDecadePageTitle,
  getDecadeYears,
  getTopSongThumbnails,
  getYearSummaryText,
} from '@/content/chartContent'
import { getThemeForYear } from '@/themes'
import {
  useRickRollMode,
  RICK_ASTLEY_SONG,
} from '@/composables/useRickRollMode'

const props = defineProps<{ decade: string }>()
const BACKGROUND_TILE_COUNT = 48

const { isRickRollActive } = useRickRollMode()
const rickThumbnail = RICK_ASTLEY_SONG.thumbnailPath
const getThumbnails = (year: number) =>
  isRickRollActive.value
    ? Array.from({ length: 4 }, () => rickThumbnail)
    : getTopSongThumbnails(year)
const getRepeatingTiles = (thumbnails: string[], tileCount: number) => {
  if (thumbnails.length === 0) return []
  const uniqueThumbnails = [...new Set(thumbnails)]
  return Array.from(
    { length: tileCount },
    (_, index) => uniqueThumbnails[index % uniqueThumbnails.length],
  )
}

const decadeStartYear = computed(() => Number.parseInt(props.decade, 10))
const theme = computed(() => getThemeForYear(decadeStartYear.value))
const years = computed(() => getDecadeYears(props.decade))
const backgroundTiles = computed(() =>
  getRepeatingTiles(
    isRickRollActive.value
      ? [rickThumbnail]
      : getDecadeSongThumbnails(props.decade),
    BACKGROUND_TILE_COUNT,
  ),
)
const yearColumns = computed(() => [
  years.value.filter((_, index) => index % 2 === 0),
  years.value.filter((_, index) => index % 2 === 1),
])
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
const getDecadeNavStyle = (decade: string) => {
  const decadeTheme = getThemeForYear(Number.parseInt(decade, 10))

  return {
    '--nav-border': `${decadeTheme.colors.primary}33`,
    '--nav-text': decadeTheme.colors.textMuted,
    '--nav-text-hover': decadeTheme.colors.text,
    '--nav-hover': decadeTheme.colors.tabInactive,
    '--nav-font-family': decadeTheme.bodyFontFamily ?? decadeTheme.fontFamily,
  }
}
const title = computed(() => getDecadePageTitle(props.decade))
const description = computed(() => getDecadePageDescription(props.decade))
const subtitle = computed(() => getDecadePageSubtitle(props.decade))
const backgroundOverlayStyle = computed(() => ({
  background: `
    linear-gradient(
      180deg,
      rgb(0 0 0 / 42%) 0%,
      rgb(0 0 0 / 58%) 36%,
      rgb(0 0 0 / 72%) 100%
    ),
    linear-gradient(
      120deg,
      ${theme.value.colors.background}e0 0%,
      ${theme.value.colors.background}bf 42%,
      ${theme.value.colors.background}88 100%
    )
  `,
}))
const backgroundVignetteStyle = computed(() => ({
  background: `
    radial-gradient(
      circle at top,
      transparent 0%,
      rgb(0 0 0 / 10%) 40%,
      rgb(0 0 0 / 24%) 100%
    )
  `,
}))
const siteUrl = computed(() => {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return env?.replace(/\/$/, '') ?? ''
})
const canonical = computed(() =>
  siteUrl.value ? `${siteUrl.value}/${props.decade}` : undefined,
)
const ogImage = computed(() => {
  const leadThumbnail = getTopSongThumbnails(
    years.value[0] ?? decadeStartYear.value,
    1,
  )[0]
  return leadThumbnail && siteUrl.value
    ? `${siteUrl.value}${leadThumbnail}`
    : undefined
})
const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': title.value,
  'description': description.value,
  'url': canonical.value,
  'image': ogImage.value,
  'inLanguage': 'en-AU',
  'hasPart': years.value.map((year) => ({
    '@type': 'WebPage',
    'name': `Top 10 Songs in Australia in ${year}`,
    'url': canonical.value ? `${siteUrl.value}/${year}` : undefined,
    'description': getYearSummaryText(year),
  })),
}))

useHead(() => ({
  title: title.value,
  meta: [
    { name: 'description', content: description.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Flashback Charts Australia' },
    { property: 'og:title', content: title.value },
    { property: 'og:description', content: description.value },
    ...(canonical.value
      ? [{ property: 'og:url', content: canonical.value }]
      : []),
    ...(ogImage.value
      ? [{ property: 'og:image', content: ogImage.value }]
      : []),
    {
      name: 'twitter:card',
      content: ogImage.value ? 'summary_large_image' : 'summary',
    },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
    ...(ogImage.value
      ? [{ name: 'twitter:image', content: ogImage.value }]
      : []),
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
  <main class="relative isolate">
    <div class="decade-page-background pointer-events-none fixed inset-0">
      <div class="decade-page-mosaic">
        <img
          v-for="(thumbnail, index) in backgroundTiles"
          :key="`${thumbnail}-${index}`"
          :src="thumbnail"
          alt=""
          class="decade-page-tile"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div
        class="decade-page-overlay absolute inset-0"
        :style="backgroundOverlayStyle"
      />
      <div
        class="decade-page-vignette absolute inset-0"
        :style="backgroundVignetteStyle"
      />
    </div>

    <div class="relative z-10 mx-auto max-w-[1300px] px-4 py-8 sm:py-10">
      <header class="mb-8">
        <h1
          class="theme-display text-4xl font-bold text-primary"
          :style="{ fontFamily: theme.fontFamily }"
        >
          {{ title }}
        </h1>
        <p
          v-if="theme.description"
          class="mt-4 max-w-3xl text-base leading-relaxed"
          :style="{ color: theme.colors.textMuted }"
        >
          {{ theme.description }}
        </p>
        <p class="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted/70">
          {{ subtitle }}
        </p>
      </header>

      <nav class="mb-5 flex items-center justify-between gap-3">
        <router-link
          v-if="previousDecade"
          :to="`/${previousDecade}`"
          class="decade-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
          :style="getDecadeNavStyle(previousDecade)"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          {{ previousDecade }}
        </router-link>
        <div v-else />

        <router-link
          v-if="nextDecade"
          :to="`/${nextDecade}`"
          class="decade-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
          :style="getDecadeNavStyle(nextDecade)"
        >
          {{ nextDecade }}
          <ArrowRight class="h-3.5 w-3.5" />
        </router-link>
        <div v-else />
      </nav>

      <section class="grid grid-cols-1 gap-6 min-[1260px]:grid-cols-2">
        <div
          v-for="(column, columnIndex) in yearColumns"
          :key="columnIndex"
          class="flex flex-col gap-6"
          :class="{ 'min-[1260px]:pt-28': columnIndex === 1 }"
        >
          <article
            v-for="year in column"
            :key="year"
            class="grid items-center gap-5 rounded-2xl border p-5 backdrop-blur-[6px] md:grid-cols-[168px_1fr]"
            :style="{
              backgroundColor: `${theme.colors.surface}e3`,
              borderColor: `${theme.colors.primary}52`,
              boxShadow: '0 24px 48px rgb(0 0 0 / 28%)',
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
                  v-for="(thumbnail, index) in getThumbnails(year)"
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
            </router-link>

            <div class="flex flex-col">
              <h2
                class="text-2xl font-bold"
                :style="{
                  color: theme.colors.primary,
                  fontFamily: theme.fontFamily,
                }"
              >
                <router-link :to="`/${year}`" class="text-inherit no-underline">
                  {{ year }}
                </router-link>
              </h2>
              <p class="mt-2 text-base leading-relaxed text-text-muted">
                {{ getYearSummaryText(year) }}
              </p>
              <router-link
                :to="`/${year}`"
                class="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-xl px-3 py-2 text-base font-bold text-black transition-transform duration-150 hover:scale-[1.02]"
                :style="{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }"
              >
                Top 10 {{ year }}
                <ArrowRight class="h-5 w-5" />
              </router-link>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.decade-page-background {
  background: #000;
}

.decade-page-mosaic {
  position: absolute;
  inset: -6rem -2rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 0;
  opacity: 0.96;
  filter: saturate(1.08) contrast(1.04) brightness(0.88);
  transform: scale(1.04);
}

.decade-page-tile {
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.decade-page-overlay,
.decade-page-vignette {
  z-index: 1;
}

.decade-nav-button {
  border-color: var(--nav-border);
  color: var(--nav-text);
  font-family: var(--nav-font-family);
}

.decade-nav-button:hover {
  background-color: var(--nav-hover);
  color: var(--nav-text-hover);
}

@media (width >= 640px) {
  .decade-page-mosaic {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (width >= 1024px) {
  .decade-page-mosaic {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}
</style>
