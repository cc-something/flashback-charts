<script setup lang="ts">
import { computed, nextTick, onUnmounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import {
  ArrowDownNarrowWide,
  ArrowLeft,
  ArrowRight,
  ArrowUpNarrowWide,
} from 'lucide-vue-next'
import {
  getAdjacentYears,
  getYearPageDescription,
  getYearPageHeading,
  getYearPageIntro,
  getYearPageTitle,
} from '@/content/chartContent'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import { applyPendingTheme } from '@/composables/useDecadeTheme'
import { getThemeForYear } from '@/themes'
import SongCard from '@/components/SongCard.vue'

const props = defineProps<{ year: string }>()

const route = useRoute()
const store = useChartStore()
const player = usePlayerStore()
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
const heading = computed(() => getYearPageHeading(yearNumber.value))
const title = computed(() => getYearPageTitle(yearNumber.value))
const description = computed(() => getYearPageDescription(yearNumber.value))
const intro = computed(() => getYearPageIntro(yearNumber.value))
const siteUrl = computed(() => {
  const env = import.meta.env.VITE_SITE_URL as string | undefined
  return env?.replace(/\/$/, '') ?? ''
})
const canonical = computed(() =>
  siteUrl.value ? `${siteUrl.value}/${yearNumber.value}` : undefined,
)
const selectedSongRank = computed(() => {
  const { song } = route.query
  const songRank = Number(Array.isArray(song) ? song[0] : song)
  return Number.isInteger(songRank) ? songRank : null
})
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
    'name': heading.value,
    'description': description.value,
    'url': canonical.value,
    'image': ogImage.value,
    'inLanguage': 'en-AU',
    'numTracks': store.currentSongs.length,
    'track': store.currentSongs.map((song) => ({
      '@type': 'MusicRecording',
      'name': song.title,
      'byArtist': { '@type': 'MusicGroup', 'name': song.artist },
      'url': canonical.value
        ? `${canonical.value}?song=${song.rank}`
        : undefined,
      'image': siteUrl.value
        ? `${siteUrl.value}${song.thumbnailPath}`
        : undefined,
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
    ...(ogImage.value
      ? [{ property: 'og:image', content: ogImage.value }]
      : []),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title.value },
    { name: 'twitter:description', content: description.value },
    ...(ogImage.value
      ? [{ name: 'twitter:image', content: ogImage.value }]
      : []),
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
  <main class="max-w-2xl mx-auto px-4 py-6">
    <header
      class="sticky z-30 mb-6 flex items-start justify-between bg-background py-3 -my-3"
      style="top: var(--sticky-bar-height)"
    >
      <h1
        class="theme-display text-3xl font-bold text-primary"
        :style="{ fontFamily: theme.fontFamily }"
      >
        {{ heading }}
      </h1>
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

    <div class="mb-5 flex flex-col gap-3">
      <p class="text-base leading-relaxed text-text-muted">
        {{ intro }}
      </p>
      <p
        v-if="store.currentDescription"
        class="text-base leading-relaxed text-text-muted/80"
      >
        {{ store.currentDescription }}
      </p>
    </div>

    <nav class="mb-2 flex items-center justify-between gap-3">
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
        <div v-if="store.hasData" class="flex flex-col gap-0.5">
          <SongCard
            v-for="song in store.currentSongs"
            :key="`${yearNumber}-${song.rank}`"
            :song="song"
            :year="yearNumber"
          />

          <a
            v-if="store.currentSource"
            :href="store.currentSource.url"
            class="mt-3 block text-xs text-text-muted/80 underline decoration-primary/30 underline-offset-4 transition-colors duration-150 hover:text-primary"
            rel="noreferrer"
            target="_blank"
          >
            Source: {{ store.currentSource.label }}
          </a>
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
