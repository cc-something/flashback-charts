<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, Play } from 'lucide-vue-next'
import {
  getAvailableDecades,
  getDecadePageDescription,
  getDecadePageHeading,
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
import {
  getAbsoluteUrl,
  getDecadePath,
  getOpenGraphImageMeta,
  getYearPath,
} from '@/utils/url'
import { getYearData } from '@/data'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'

const props = defineProps<{ decade: string }>()

const router = useRouter()
const chart = useChartStore()
const player = usePlayerStore()

const playYear = (year: number) => {
  const songs = getYearData(year)
  if (!songs?.length) return
  const song = chart.sortOrder === 'desc' ? songs[songs.length - 1] : songs[0]
  chart.selectYear(year)
  router.push(getYearPath(year))
  player.play(song, year, 'decade-btn')
}
const BACKGROUND_ROW_COUNT = 6
const BACKGROUND_DUPLICATE_COUNT = 2

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
const getDistributedRows = (thumbnails: string[], rowCount: number) => {
  if (thumbnails.length === 0) return []
  const rows = Array.from({ length: rowCount }, () => [] as string[])
  thumbnails.forEach((thumbnail, index) =>
    rows[index % rowCount].push(thumbnail),
  )
  return rows.filter((row) => row.length > 0)
}

const decadeStartYear = computed(() => Number.parseInt(props.decade, 10))
const theme = computed(() => getThemeForYear(decadeStartYear.value))
const years = computed(() => getDecadeYears(props.decade))
const backgroundRows = computed(() =>
  getDistributedRows(
    isRickRollActive.value
      ? getRepeatingTiles([rickThumbnail], BACKGROUND_ROW_COUNT * 8)
      : getDecadeSongThumbnails(props.decade),
    BACKGROUND_ROW_COUNT,
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
    '--nav-bg': decadeTheme.colors.surface,
    '--nav-border': `${decadeTheme.colors.primary}33`,
    '--nav-text': decadeTheme.colors.textMuted,
    '--nav-text-hover': decadeTheme.colors.text,
    '--nav-hover': decadeTheme.colors.tabInactive,
    '--nav-font-family': decadeTheme.bodyFontFamily ?? decadeTheme.fontFamily,
  }
}
const title = computed(() => getDecadePageTitle(props.decade))
const heading = computed(() => getDecadePageHeading(props.decade))
const description = computed(() => getDecadePageDescription(props.decade))
const subtitle = computed(() => getDecadePageSubtitle(props.decade))
const siteUrl = computed(() => {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return env?.replace(/\/$/, '') ?? ''
})
const decadePath = computed(() => getDecadePath(props.decade))
const canonical = computed(() =>
  getAbsoluteUrl(siteUrl.value, decadePath.value),
)
const ogImage = computed(() =>
  getAbsoluteUrl(siteUrl.value, `/og/au/decade-${props.decade}.jpg`),
)
const imageAlt = computed(() => `${title.value} social preview`)
const breadcrumbJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Flashback Charts Australia',
      'item': getAbsoluteUrl(siteUrl.value, '/'),
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': heading.value,
      'item': canonical.value,
    },
  ],
}))

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
    'url': getAbsoluteUrl(siteUrl.value, getYearPath(year)),
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
    ...getOpenGraphImageMeta(ogImage.value, imageAlt.value),
    {
      name: 'twitter:card',
      content: ogImage.value ? 'summary_large_image' : 'summary',
    },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
  ],
  link: canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd.value),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbJsonLd.value),
    },
  ],
}))
</script>

<template>
  <main class="relative isolate">
    <div
      class="decade-page-background pointer-events-none fixed inset-0"
      aria-hidden="true"
    >
      <div class="decade-page-background-rows">
        <div
          v-for="(row, rowIndex) in backgroundRows"
          :key="`row-${rowIndex}`"
          class="decade-page-background-row"
        >
          <div
            class="decade-page-background-track"
            :class="{
              'decade-page-background-track-reversed': rowIndex % 2 === 1,
            }"
            :style="{ '--decade-row-duration': `${260 + rowIndex * 18}s` }"
          >
            <div
              v-for="repeatIndex in BACKGROUND_DUPLICATE_COUNT"
              :key="`row-${rowIndex}-repeat-${repeatIndex}`"
              class="decade-page-background-repeat"
            >
              <img
                v-for="(thumbnail, thumbnailIndex) in row"
                :key="`row-${rowIndex}-tile-${repeatIndex}-${thumbnailIndex}`"
                :src="thumbnail"
                alt=""
                class="decade-page-tile"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="decade-page-overlay absolute inset-0" />
    </div>

    <div class="relative z-10 pb-8 sm:pb-10">
      <header class="decade-page-intro relative mb-8">
        <div class="decade-page-intro-gradient absolute inset-0" />
        <div class="relative mx-auto max-w-[1300px] px-4">
          <div class="py-5">
            <h1
              class="theme-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
              :style="{ fontFamily: theme.fontFamily }"
            >
              {{ heading }}
            </h1>
            <p
              v-if="theme.description"
              class="mt-4 max-w-3xl text-base leading-relaxed"
              :style="{ color: theme.colors.textMuted }"
            >
              {{ theme.description }}
            </p>
            <p
              :class="theme.description ? 'mt-3' : 'mt-4'"
              class="max-w-3xl text-base leading-relaxed"
              :style="{ color: theme.colors.textMuted }"
            >
              {{ subtitle }}
            </p>
          </div>
        </div>
      </header>

      <div class="mx-auto max-w-[1300px] px-4">
        <nav class="mb-3 flex items-center justify-between gap-3">
          <router-link
            v-if="previousDecade"
            :to="getDecadePath(previousDecade)"
            class="decade-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
            :style="getDecadeNavStyle(previousDecade)"
          >
            <ArrowLeft class="h-3.5 w-3.5" />
            {{ previousDecade }}
          </router-link>
          <div v-else />

          <router-link
            v-if="nextDecade"
            :to="getDecadePath(nextDecade)"
            class="decade-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
            :style="getDecadeNavStyle(nextDecade)"
          >
            {{ nextDecade }}
            <ArrowRight class="h-3.5 w-3.5" />
          </router-link>
          <div v-else />
        </nav>

        <section class="grid grid-cols-1 gap-4 min-[1260px]:grid-cols-2">
          <div
            v-for="(column, columnIndex) in yearColumns"
            :key="columnIndex"
            class="flex flex-col gap-4"
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
                :to="getYearPath(year)"
                :aria-label="`View top 10 songs of ${year}`"
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
                <div class="flex items-center gap-2.5">
                  <h2
                    class="text-2xl sm:text-3xl md:text-4xl font-bold"
                    :style="{
                      color: theme.colors.primary,
                      fontFamily: theme.fontFamily,
                    }"
                  >
                    <router-link
                      :to="getYearPath(year)"
                      class="text-inherit no-underline"
                    >
                      {{ year }}
                    </router-link>
                  </h2>
                  <button
                    class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-md transition-transform duration-150 hover:scale-110"
                    :style="{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.background,
                    }"
                    :aria-label="`Play top songs of ${year}`"
                    @click="playYear(year)"
                  >
                    <Play
                      class="h-4 w-4"
                      style="margin-left: 1px; fill: currentcolor"
                    />
                  </button>
                </div>
                <p class="mt-2 text-base leading-relaxed text-text-muted">
                  {{ getYearSummaryText(year) }}
                </p>
                <router-link
                  :to="getYearPath(year)"
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
    </div>
  </main>
</template>

<style scoped>
.decade-page-background {
  background: #000;
}

.decade-page-background-rows {
  position: absolute;
  inset: -4rem 0;
  display: flex;
  flex-direction: column;
}

.decade-page-background-row {
  flex: 1 1 0;
  overflow: hidden;
}

.decade-page-background-track {
  display: flex;
  width: max-content;
  min-width: 100%;
  height: 100%;
  animation: decade-page-background-marquee var(--decade-row-duration) linear
    infinite;
  will-change: transform;
  backface-visibility: hidden;
}

.decade-page-background-track-reversed {
  animation-direction: reverse;
}

.decade-page-background-repeat {
  display: flex;
  flex-shrink: 0;
  height: 100%;
}

.decade-page-tile {
  height: 100%;
  aspect-ratio: 1 / 1;
  width: auto;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
  filter: saturate(1.08) contrast(1.04) brightness(0.88);
}

.decade-page-overlay {
  background: rgb(0 0 0 / 82%);
  z-index: 1;
}

.decade-page-intro {
  overflow: hidden;
}

.decade-page-intro-gradient {
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 78%) 0%,
    rgb(0 0 0 / 62%) 40%,
    rgb(0 0 0 / 28%) 76%,
    transparent 100%
  );
}

.decade-nav-button {
  background-color: var(--nav-bg);
  border-color: var(--nav-border);
  color: var(--nav-text);
  font-family: var(--nav-font-family);
}

.decade-nav-button:hover {
  background-color: var(--nav-hover);
  color: var(--nav-text-hover);
}

@keyframes decade-page-background-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
