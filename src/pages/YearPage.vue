<script setup lang="ts">
import { computed, nextTick, onUnmounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import type { YearSource } from '@/data'
import type { Song } from '@/types/song'
import {
  ArrowDownNarrowWide,
  ArrowLeft,
  ArrowRight,
  ArrowUpNarrowWide,
} from 'lucide-vue-next'
import {
  getAdjacentYears,
  getDecadePageHeading,
  getYearPageDescription,
  getYearPageHeading,
  getYearPageTitle,
} from '@/content/chartContent'
import { getYearData, getYearDescription, getYearSource } from '@/data'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import { applyPendingTheme } from '@/composables/useDecadeTheme'
import { getThemeForYear } from '@/themes'
import SongCard from '@/components/SongCard.vue'
import {
  getAbsoluteUrl,
  getDecadePath,
  getOpenGraphImageMeta,
  getYearPath,
} from '@/utils/url'

const props = defineProps<{ year: string }>()

const route = useRoute()
const store = useChartStore()
const player = usePlayerStore()
const yearNumber = computed(() => Number(props.year))
const theme = computed(() => getThemeForYear(yearNumber.value))
const decadeString = computed(
  () => `${Math.floor(yearNumber.value / 10) * 10}s`,
)
const adjacentYears = computed(() => getAdjacentYears(yearNumber.value))
const previousYear = computed(() => adjacentYears.value.previousYear)
const nextYear = computed(() => adjacentYears.value.nextYear)
const songs = computed<Song[]>(() => getYearData(yearNumber.value) ?? [])
const currentSource = computed<YearSource | null>(() =>
  getYearSource(yearNumber.value),
)
const currentDescription = computed<string | null>(() =>
  getYearDescription(yearNumber.value),
)
const hasData = computed(() => songs.value.length > 0)
const getYearNavStyle = (year: number) => {
  const yearTheme = getThemeForYear(year)

  return {
    '--nav-bg': yearTheme.colors.surface,
    '--nav-border': `${yearTheme.colors.primary}33`,
    '--nav-text': yearTheme.colors.textMuted,
    '--nav-text-hover': yearTheme.colors.text,
    '--nav-hover': yearTheme.colors.tabInactive,
    '--nav-font-family': yearTheme.bodyFontFamily ?? yearTheme.fontFamily,
  }
}
const heading = computed(() => getYearPageHeading(yearNumber.value))
const title = computed(() => getYearPageTitle(yearNumber.value))
const description = computed(() => getYearPageDescription(yearNumber.value))
const siteUrl = computed(() => {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return env?.replace(/\/$/, '') ?? ''
})
const yearPath = computed(() => getYearPath(yearNumber.value))
const decadePath = computed(() => getDecadePath(decadeString.value))
const canonical = computed(() => getAbsoluteUrl(siteUrl.value, yearPath.value))
const selectedSongRank = computed(() => {
  const { song } = route.query
  const songRank = Number(Array.isArray(song) ? song[0] : song)
  return Number.isInteger(songRank) ? songRank : null
})
const ogImage = computed(() =>
  getAbsoluteUrl(siteUrl.value, `/og/au/year-${yearNumber.value}.jpg`),
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
      'name': getDecadePageHeading(decadeString.value),
      'item': getAbsoluteUrl(siteUrl.value, decadePath.value),
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'name': heading.value,
      'item': canonical.value,
    },
  ],
}))

const jsonLd = computed(() => {
  if (!songs.value.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicPlaylist',
    'name': heading.value,
    'description': description.value,
    'url': canonical.value,
    'image': ogImage.value,
    'inLanguage': 'en-AU',
    'numTracks': songs.value.length,
    'track': songs.value.map((song) => ({
      '@type': 'MusicRecording',
      'name': song.title,
      'byArtist': { '@type': 'MusicGroup', 'name': song.artist },
      'url': canonical.value
        ? `${canonical.value}?song=${song.rank}`
        : undefined,
      'image': getAbsoluteUrl(siteUrl.value, song.thumbnailPath),
      ...(song.album && {
        inAlbum: { '@type': 'MusicAlbum', 'name': song.album },
      }),
      'position': song.rank,
    })),
  }
})

useHead(() => ({
  title: title.value,
  meta: [
    { name: 'description', content: description.value },
    { property: 'og:type', content: 'music.playlist' },
    { property: 'og:site_name', content: 'Flashback Charts Australia' },
    { property: 'og:title', content: title.value },
    { property: 'og:description', content: description.value },
    ...(canonical.value
      ? [{ property: 'og:url', content: canonical.value }]
      : []),
    ...getOpenGraphImageMeta(ogImage.value, imageAlt.value),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
  ],
  link: canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
  script: [
    ...(jsonLd.value
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(jsonLd.value),
          },
        ]
      : []),
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbJsonLd.value),
    },
  ],
}))

player.setOnEnded((song, year) => player.playNext(song, year, 'autoplay'))
onUnmounted(() => player.setOnEnded(null))

const scrollToSelectedSong = async () => {
  if (typeof window === 'undefined') return
  if (selectedSongRank.value === null) return
  await nextTick()
  requestAnimationFrame(() => {
    const selectedSongElement = document.getElementById(
      `song-${yearNumber.value}-${selectedSongRank.value}`,
    )
    selectedSongElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

watch(
  yearNumber,
  (next) => {
    if (!Number.isNaN(next)) store.setYear(next)
  },
  { immediate: true },
)

watch(
  [yearNumber, () => store.sortOrder, selectedSongRank],
  scrollToSelectedSong,
  {
    immediate: true,
  },
)
</script>

<template>
  <main class="max-w-[50.4rem] mx-auto px-4 pt-4 pb-6">
    <h1
      class="theme-display mb-4 text-xl sm:text-2xl md:text-3xl font-bold text-primary [text-wrap:balance]"
      :style="{ fontFamily: theme.fontFamily }"
    >
      {{ heading }}
    </h1>

    <div class="mb-4 flex flex-col gap-3">
      <p
        v-if="currentDescription"
        class="text-base leading-relaxed text-text-muted"
      >
        {{ currentDescription }}
      </p>
    </div>

    <div class="mb-2 flex items-end justify-between gap-3">
      <a
        v-if="currentSource"
        :href="currentSource.url"
        class="text-xs text-text-muted/30 underline decoration-primary/15 underline-offset-4 transition-colors duration-150 hover:text-text-muted/60"
        rel="noreferrer"
        target="_blank"
      >
        Source: {{ currentSource.label }}
      </a>
      <div v-else />
      <button
        type="button"
        :aria-label="
          store.sortOrder === 'asc'
            ? 'Sort order: 1 to 10. Click to reverse'
            : 'Sort order: 10 to 1. Click to reverse'
        "
        class="shrink-0 flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5 text-sm sm:text-base font-medium text-text-muted transition-colors duration-150 hover:text-text"
        :title="store.sortOrder === 'asc' ? 'Sorted 1 → 10' : 'Sorted 10 → 1'"
        @click="store.toggleSortOrder()"
      >
        <ArrowUpNarrowWide v-if="store.sortOrder === 'asc'" class="h-4 w-4" />
        <ArrowDownNarrowWide v-else class="h-4 w-4" />
        {{ store.sortOrder === 'asc' ? '1 → 10' : '10 → 1' }}
      </button>
    </div>

    <Transition
      name="year-content"
      mode="out-in"
      @after-leave="applyPendingTheme"
    >
      <div :key="yearNumber" class="year-content">
        <div v-if="hasData" class="flex flex-col gap-0.5">
          <SongCard
            v-for="song in songs"
            :key="`${yearNumber}-${song.rank}`"
            :song="song"
            :year="yearNumber"
          />
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center gap-3 py-24 text-center"
        >
          <span class="text-5xl opacity-30">🎵</span>
          <p class="text-lg text-text-muted">
            No data yet for {{ yearNumber }}
          </p>
          <p class="text-base text-text-muted/70">Chart data coming soon</p>
        </div>
      </div>
    </Transition>

    <nav class="mt-4 flex items-center justify-between gap-3">
      <router-link
        v-if="previousYear"
        :to="getYearPath(previousYear)"
        class="year-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
        :style="getYearNavStyle(previousYear)"
      >
        <ArrowLeft class="h-3.5 w-3.5" />
        {{ previousYear }}
      </router-link>
      <div v-else />

      <router-link
        :to="decadePath"
        class="text-sm text-text-muted opacity-50 underline underline-offset-4 transition-opacity duration-150 hover:opacity-80"
      >
        More {{ decadeString }}
      </router-link>

      <router-link
        v-if="nextYear"
        :to="getYearPath(nextYear)"
        class="year-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
        :style="getYearNavStyle(nextYear)"
      >
        {{ nextYear }}
        <ArrowRight class="h-3.5 w-3.5" />
      </router-link>
      <div v-else />
    </nav>
  </main>
</template>

<style scoped>
.year-content-enter-active,
.year-content-leave-active {
  transition: opacity 0.28s ease;
}

.year-content-enter-from {
  opacity: 0;
}

.year-content-leave-to {
  opacity: 0;
}

.year-nav-button {
  background-color: var(--nav-bg);
  border-color: var(--nav-border);
  color: var(--nav-text);
  font-family: var(--nav-font-family);
}

.year-nav-button:hover {
  background-color: var(--nav-hover);
  color: var(--nav-text-hover);
}
</style>
