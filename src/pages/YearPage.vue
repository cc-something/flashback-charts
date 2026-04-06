<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import {
  ArrowDownNarrowWide,
  ArrowLeft,
  ArrowRight,
  ArrowUpNarrowWide,
} from 'lucide-vue-next'
import {
  getAdjacentYears,
  getYearPageDescription,
  getYearPageTitle,
} from '@/content/chartContent'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import { applyPendingTheme } from '@/composables/useDecadeTheme'
import { getHomeTheme, getThemeForYear } from '@/themes'
import SongCard from '@/components/SongCard.vue'

const props = defineProps<{ year: string }>()

const store = useChartStore()
const player = usePlayerStore()
const homeTheme = getHomeTheme()

const yearNumber = computed(() => Number(props.year))
const theme = computed(() => getThemeForYear(yearNumber.value))
const adjacentYears = computed(() => getAdjacentYears(yearNumber.value))
const previousYear = computed(() => adjacentYears.value.previousYear)
const nextYear = computed(() => adjacentYears.value.nextYear)
const getYearNavStyle = (year: number) => {
  const yearTheme = getThemeForYear(year)

  return {
    '--nav-border': `${yearTheme.colors.primary}33`,
    '--nav-text': yearTheme.colors.textMuted,
    '--nav-text-hover': yearTheme.colors.text,
    '--nav-hover': yearTheme.colors.tabInactive,
    '--nav-font-family': yearTheme.bodyFontFamily ?? yearTheme.fontFamily,
  }
}
const topSong = computed(() => store.currentSongs[0] ?? null)
const title = computed(() => getYearPageTitle(yearNumber.value))
const description = computed(() => getYearPageDescription(yearNumber.value))
const siteUrl = computed(() => {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return env?.replace(/\/$/, '') ?? ''
})
const canonical = computed(() =>
  siteUrl.value ? `${siteUrl.value}/${yearNumber.value}` : undefined,
)
const ogImage = computed(() =>
  topSong.value?.thumbnailPath
    ? `${siteUrl.value}${topSong.value.thumbnailPath}`
    : undefined,
)

const jsonLd = computed(() => {
  if (!store.currentSongs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicPlaylist',
    'name': `Top 10 Songs in ${yearNumber.value} Australia`,
    'description': description.value,
    'url': canonical.value,
    'numTracks': store.currentSongs.length,
    'track': store.currentSongs.map((song) => ({
      '@type': 'MusicRecording',
      'name': song.title,
      'byArtist': { '@type': 'MusicGroup', 'name': song.artist },
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
    { property: 'og:title', content: title.value },
    { property: 'og:description', content: description.value },
    ...(canonical.value
      ? [{ property: 'og:url', content: canonical.value }]
      : []),
    ...(ogImage.value
      ? [{ property: 'og:image', content: ogImage.value }]
      : []),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
  ],
  link: canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
  script: jsonLd.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd.value),
        },
      ]
    : [],
}))

player.setOnEnded((song, year) => player.playNext(song, year))
onUnmounted(() => player.setOnEnded(null))

watch(
  yearNumber,
  (next) => {
    if (!Number.isNaN(next)) store.setYear(next)
  },
  { immediate: true },
)
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-6">
    <header class="mb-6 flex items-start justify-between">
      <div>
        <p
          class="mb-2 text-xl font-bold text-primary"
          :style="{ fontFamily: homeTheme.fontFamily }"
        >
          💿 Flashback Charts Australia
        </p>
        <h1
          class="theme-display text-3xl font-bold text-primary"
          :style="{ fontFamily: theme.fontFamily }"
        >
          Top 10 Songs {{ yearNumber }}
        </h1>
        <a
          v-if="store.currentSource"
          :href="store.currentSource.url"
          class="mt-1 inline-block text-sm text-text-muted underline decoration-primary/40 underline-offset-4 transition-colors duration-150 hover:text-primary"
          rel="noreferrer"
          target="_blank"
        >
          Source: {{ store.currentSource.label }}
        </a>
      </div>
      <button
        type="button"
        class="shrink-0 flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5 text-base font-medium text-text-muted transition-colors duration-150 hover:text-text"
        :title="store.sortOrder === 'asc' ? 'Sorted 1 → 10' : 'Sorted 10 → 1'"
        @click="store.toggleSortOrder()"
      >
        <ArrowUpNarrowWide v-if="store.sortOrder === 'asc'" class="h-4 w-4" />
        <ArrowDownNarrowWide v-else class="h-4 w-4" />
        {{ store.sortOrder === 'asc' ? '1 → 10' : '10 → 1' }}
      </button>
    </header>

    <p
      v-if="store.currentDescription"
      class="mb-5 text-sm leading-relaxed text-text-muted"
    >
      {{ store.currentDescription }}
    </p>

    <nav class="mb-5 flex items-center justify-between gap-3">
      <router-link
        v-if="previousYear"
        :to="`/${previousYear}`"
        class="year-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
        :style="getYearNavStyle(previousYear)"
      >
        <ArrowLeft class="h-3.5 w-3.5" />
        {{ previousYear }}
      </router-link>
      <div v-else />

      <router-link
        v-if="nextYear"
        :to="`/${nextYear}`"
        class="year-nav-button inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-150"
        :style="getYearNavStyle(nextYear)"
      >
        {{ nextYear }}
        <ArrowRight class="h-3.5 w-3.5" />
      </router-link>
      <div v-else />
    </nav>

    <Transition
      name="year-content"
      mode="out-in"
      @after-leave="applyPendingTheme"
    >
      <div :key="yearNumber" class="year-content">
        <div v-if="store.hasData" class="flex flex-col gap-1.5">
          <SongCard
            v-for="song in store.currentSongs"
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
  border-color: var(--nav-border);
  color: var(--nav-text);
  font-family: var(--nav-font-family);
}

.year-nav-button:hover {
  background-color: var(--nav-hover);
  color: var(--nav-text-hover);
}
</style>
