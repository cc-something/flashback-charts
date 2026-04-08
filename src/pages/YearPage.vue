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
  getYearPageDescription,
  getYearPageHeading,
  getYearPageTitle,
} from '@/content/chartContent'
import {
  useRickRollMode,
  RICK_ASTLEY_SONG,
} from '@/composables/useRickRollMode'
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
const YEAR_BACKGROUND_ROW_COUNT = 5
const YEAR_BACKGROUND_DUPLICATE_COUNT = 2

const route = useRoute()
const store = useChartStore()
const player = usePlayerStore()
const { isRickRollActive } = useRickRollMode()
const rickThumbnail = RICK_ASTLEY_SONG.thumbnailPath
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
const getSeededRandom = (seed: number) => {
  let nextSeed = seed % 2_147_483_647
  if (nextSeed <= 0) nextSeed += 2_147_483_646

  return () => {
    nextSeed = (nextSeed * 16_807) % 2_147_483_647
    return (nextSeed - 1) / 2_147_483_646
  }
}
const getShuffledTiles = (thumbnails: string[], seed: number) => {
  const random = getSeededRandom(seed)
  const shuffledTiles = [...thumbnails]

  for (let index = shuffledTiles.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const currentTile = shuffledTiles[index]
    const nextTile = shuffledTiles[swapIndex]
    if (!currentTile || !nextTile) continue
    shuffledTiles[index] = nextTile
    shuffledTiles[swapIndex] = currentTile
  }

  return shuffledTiles
}
const getRepeatedTiles = (
  thumbnails: string[],
  tileCount: number,
  seed: number,
) => {
  if (thumbnails.length === 0) return []

  const uniqueThumbnails = [...new Set(thumbnails)]
  if (uniqueThumbnails.length === 1)
    return Array.from({ length: tileCount }, () => uniqueThumbnails[0] ?? '')

  const result: string[] = []
  let remainingTiles = getShuffledTiles(uniqueThumbnails, seed)
  let poolSeed = seed + uniqueThumbnails.length

  for (let index = 0; index < tileCount; index += 1) {
    if (remainingTiles.length === 0) {
      poolSeed += 1
      remainingTiles = getShuffledTiles(uniqueThumbnails, poolSeed)
    }

    const previousTile = result[result.length - 1] ?? null
    const nextTileIndex = remainingTiles.findIndex(
      (thumbnail) => thumbnail !== previousTile,
    )
    const pickIndex = nextTileIndex === -1 ? 0 : nextTileIndex
    const pickedTile = remainingTiles[pickIndex] ?? uniqueThumbnails[0]
    remainingTiles.splice(pickIndex, 1)
    result.push(pickedTile)
  }

  return result
}
const getDistributedRows = (thumbnails: string[], rowCount: number) => {
  if (thumbnails.length === 0) return []
  const rows = Array.from({ length: rowCount }, () => [] as string[])
  thumbnails.forEach((thumbnail, index) =>
    rows[index % rowCount].push(thumbnail),
  )
  return rows.filter((row) => row.length > 0)
}
const backgroundRows = computed(() =>
  getDistributedRows(
    isRickRollActive.value
      ? getRepeatedTiles(
          [rickThumbnail],
          YEAR_BACKGROUND_ROW_COUNT * 8,
          yearNumber.value,
        )
      : getRepeatedTiles(
          songs.value.map((song) => song.thumbnailPath).filter(Boolean),
          YEAR_BACKGROUND_ROW_COUNT * 8,
          yearNumber.value,
        ),
    YEAR_BACKGROUND_ROW_COUNT,
  ),
)
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
  <main class="year-page relative isolate">
    <div
      class="year-page-background pointer-events-none fixed inset-0"
      aria-hidden="true"
    >
      <div class="year-page-background-rows">
        <div
          v-for="(row, rowIndex) in backgroundRows"
          :key="`row-${rowIndex}`"
          class="year-page-background-row"
        >
          <div
            class="year-page-background-track"
            :class="{
              'year-page-background-track-reversed': rowIndex % 2 === 1,
            }"
            :style="{ '--year-row-duration': `${210 + rowIndex * 16}s` }"
          >
            <div
              v-for="repeatIndex in YEAR_BACKGROUND_DUPLICATE_COUNT"
              :key="`row-${rowIndex}-repeat-${repeatIndex}`"
              class="year-page-background-repeat"
            >
              <img
                v-for="(thumbnail, thumbnailIndex) in row"
                :key="`row-${rowIndex}-tile-${repeatIndex}-${thumbnailIndex}`"
                :src="thumbnail"
                alt=""
                class="year-page-tile"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="year-page-overlay absolute inset-0" />
    </div>

    <div class="relative z-10 mx-auto max-w-[50.4rem] px-4 pt-6 pb-32">
      <header
        class="sticky z-30 mb-6 bg-background py-3 -my-3"
        style="top: var(--sticky-bar-height)"
      >
        <h1
          class="theme-display text-xl sm:text-2xl md:text-3xl font-bold text-primary"
          :style="{ fontFamily: theme.fontFamily }"
        >
          {{ heading }}
        </h1>
      </header>

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
    </div>
  </main>
</template>

<style scoped>
.year-page-background {
  background: #000;
}

.year-page-background-rows {
  position: absolute;
  inset: -4rem 0;
  display: flex;
  flex-direction: column;
}

.year-page-background-row {
  flex: 1 1 0;
  overflow: hidden;
}

.year-page-background-track {
  display: flex;
  width: max-content;
  min-width: 100%;
  height: 100%;
  animation: year-page-background-marquee var(--year-row-duration) linear
    infinite;
}

.year-page-background-track-reversed {
  animation-direction: reverse;
}

.year-page-background-repeat {
  display: flex;
  flex-shrink: 0;
  height: 100%;
}

.year-page-tile {
  width: clamp(8rem, 14vw, 13rem);
  height: 100%;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
  filter: saturate(1.06) contrast(1.04) brightness(0.88);
}

.year-page-overlay {
  background: rgb(0 0 0 / 84%);
}

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

@media (prefers-reduced-motion: reduce) {
  .year-page-background-track {
    animation: none;
  }
}

@keyframes year-page-background-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
