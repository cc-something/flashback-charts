<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Play } from 'lucide-vue-next'
import type { Song } from '@/types/song'
import {
  getDecadePageDescription,
  getDecadePageTitle,
  getDecadeSummaries,
  getHomeBackgroundThumbnails,
  getHomePageDescription,
  getHomePageSubtitle,
  getHomePageTitle,
  getLatestYear,
} from '@/content/chartContent'
import {
  useRickRollMode,
  RICK_ASTLEY_SONG,
} from '@/composables/useRickRollMode'
import {
  getAbsoluteUrl,
  getDecadePath,
  getHomePath,
  getOpenGraphImageMeta,
  getYearPath,
} from '@/utils/url'
import { getYearData } from '@/data'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import { getRandomDecadePlaybackSelection } from '@/utils/playbackSelection'

const router = useRouter()
const chart = useChartStore()
const player = usePlayerStore()
type DecadePlaybackSelection = {
  year: number
  song: Song
}
const queuedDecadePlaybackSelections = new Map<
  string,
  DecadePlaybackSelection
>()
const getDecadePlaybackSelection = (decade: string) =>
  queuedDecadePlaybackSelections.get(decade) ??
  getRandomDecadePlaybackSelection(
    rawDecades
      .find((group) => group.decade === decade)
      ?.years.map(({ year }) => year) ?? [],
    getYearData,
  )
const primeDecadePlayback = (decade: string) => {
  const selection = getRandomDecadePlaybackSelection(
    rawDecades
      .find((group) => group.decade === decade)
      ?.years.map(({ year }) => year) ?? [],
    getYearData,
  )
  if (!selection) return
  queuedDecadePlaybackSelections.set(decade, selection)
  void player.primePlayback(selection.song, selection.year)
}
const playDecade = (decade: string) => {
  const selection = getDecadePlaybackSelection(decade)
  queuedDecadePlaybackSelections.delete(decade)
  if (!selection) return
  chart.selectYear(selection.year)
  router.push(getYearPath(selection.year))
  player.play(selection.song, selection.year, 'home-btn')
}

const { isRickRollActive } = useRickRollMode()
const rickThumbnail = RICK_ASTLEY_SONG.thumbnailPath
const HOME_BACKGROUND_ROW_COUNT = 6
const HOME_BACKGROUND_DUPLICATE_COUNT = 2
const HOME_BACKGROUND_RENDER_DELAY_MS = 900
const HOME_EAGER_TILE_COUNT = 4
const getDistributedRows = (thumbnails: string[], rowCount: number) => {
  if (thumbnails.length === 0) return []
  const rows = Array.from({ length: rowCount }, () => [] as string[])
  thumbnails.forEach((thumbnail, index) =>
    rows[index % rowCount].push(thumbnail),
  )
  return rows.filter((row) => row.length > 0)
}

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(
  /\/$/,
  '',
)
const rawDecades = getDecadeSummaries()
const decades = computed(() =>
  isRickRollActive.value
    ? rawDecades.map((group) => ({
        ...group,
        years: group.years.map((tile) => ({
          ...tile,
          thumbnail: rickThumbnail,
        })),
      }))
    : rawDecades,
)
const homeBackgroundRows = computed(() =>
  getDistributedRows(
    isRickRollActive.value
      ? Array.from(
          { length: HOME_BACKGROUND_ROW_COUNT * 8 },
          () => rickThumbnail,
        )
      : getHomeBackgroundThumbnails(),
    HOME_BACKGROUND_ROW_COUNT,
  ),
)
const shouldRenderHomeBackground = ref(false)
const homeBackgroundTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const visibleHomeBackgroundRows = computed(() =>
  shouldRenderHomeBackground.value ? homeBackgroundRows.value : [],
)
const decadeColumns = computed(() => [
  decades.value.filter((_, index) => index % 2 === 0),
  decades.value.filter((_, index) => index % 2 === 1),
])
const getHomeTileImageAttrs = (
  columnIndex: number,
  groupIndex: number,
  tileIndex: number,
) => {
  const isPrimaryTile = columnIndex === 0 && groupIndex === 0 && tileIndex === 0
  const isLikelyAboveFoldTile =
    groupIndex === 0 && tileIndex < HOME_EAGER_TILE_COUNT

  if (isPrimaryTile)
    return {
      loading: 'eager',
      decoding: 'async',
      fetchpriority: 'high',
    } as const

  if (isLikelyAboveFoldTile)
    return {
      loading: 'eager',
      decoding: 'async',
    } as const

  return {
    loading: 'lazy',
    decoding: 'async',
    fetchpriority: 'low',
  } as const
}
const latestYear = getLatestYear()
const title = getHomePageTitle()
const description = getHomePageDescription()
const subtitle = getHomePageSubtitle()
const shouldExpandSubtitle = ref(false)
const homePath = getHomePath()
const homeUrl = getAbsoluteUrl(siteUrl, homePath)
const homeImage = getAbsoluteUrl(siteUrl, '/og/au/home.jpg')
const imageAlt = `${title} social preview`
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      'name': 'Flashback Charts Australia',
      'url': homeUrl ?? siteUrl,
      'description': description,
      'inLanguage': 'en-AU',
    },
    {
      '@type': 'CollectionPage',
      'name': title,
      'url': homeUrl,
      'description': description,
      'image': homeImage,
      'inLanguage': 'en-AU',
      'hasPart': rawDecades.map((group) => ({
        '@type': 'CollectionPage',
        'name': getDecadePageTitle(group.decade),
        'url': getAbsoluteUrl(siteUrl, getDecadePath(group.decade)),
        'description': getDecadePageDescription(group.decade),
      })),
    },
  ],
}

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Flashback Charts Australia' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    ...(homeUrl ? [{ property: 'og:url', content: homeUrl }] : []),
    ...getOpenGraphImageMeta(homeImage, imageAlt),
    {
      name: 'twitter:card',
      content: homeImage ? 'summary_large_image' : 'summary',
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ],
  link: homeUrl ? [{ rel: 'canonical', href: homeUrl }] : [],
  script: siteUrl
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd),
        },
      ]
    : [],
})

onMounted(() => {
  homeBackgroundTimer.value = setTimeout(() => {
    shouldRenderHomeBackground.value = true
  }, HOME_BACKGROUND_RENDER_DELAY_MS)
})

onUnmounted(() => {
  if (!homeBackgroundTimer.value) return
  clearTimeout(homeBackgroundTimer.value)
})
</script>

<template>
  <main class="relative isolate">
    <div
      class="home-page-background pointer-events-none fixed inset-0"
      aria-hidden="true"
    >
      <div class="home-page-background-rows">
        <div
          v-for="(row, rowIndex) in visibleHomeBackgroundRows"
          :key="`row-${rowIndex}`"
          class="home-page-background-row"
        >
          <div
            class="home-page-background-track"
            :class="{
              'home-page-background-track-reversed': rowIndex % 2 === 1,
            }"
            :style="{
              '--home-row-duration': `${320 + rowIndex * 24}s`,
              '--home-row-delay': `${0.9 + rowIndex * 0.08}s`,
            }"
          >
            <div
              v-for="repeatIndex in HOME_BACKGROUND_DUPLICATE_COUNT"
              :key="`row-${rowIndex}-repeat-${repeatIndex}`"
              class="home-page-background-repeat"
            >
              <img
                v-for="(thumbnail, thumbnailIndex) in row"
                :key="`row-${rowIndex}-tile-${repeatIndex}-${thumbnailIndex}`"
                :src="thumbnail"
                alt=""
                class="home-page-background-tile"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="home-page-background-overlay absolute inset-0" />
    </div>

    <div class="relative z-10 pb-10">
      <div class="home-page-intro relative mb-4">
        <div class="home-page-intro-gradient absolute inset-0" />
        <div class="relative mx-auto max-w-[1300px] px-4">
          <div class="py-5">
            <h1 class="text-lg sm:text-2xl text-text-muted">
              Australia's Top 10 Songs by Year, 1940 to {{ latestYear }}
            </h1>
            <p
              v-if="!shouldExpandSubtitle"
              class="mt-2 flex w-full min-w-0 items-baseline gap-2 text-base leading-relaxed text-text-muted/70 sm:hidden"
            >
              <span class="min-w-0 flex-1 truncate">
                {{ subtitle }}
              </span>
              <button
                type="button"
                class="shrink-0 whitespace-nowrap text-text-muted/70 underline decoration-primary/35 underline-offset-4 transition-colors duration-150 hover:text-text-muted hover:decoration-text-muted"
                @click="shouldExpandSubtitle = true"
              >
                Read more
              </button>
            </p>
            <p
              v-if="shouldExpandSubtitle"
              class="mt-2 text-base leading-relaxed text-text-muted/70 sm:hidden"
            >
              {{ subtitle }}
            </p>
            <p
              class="mt-2 hidden text-base leading-relaxed text-text-muted/70 sm:block"
            >
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="mx-auto flex max-w-[1300px] flex-col gap-4 px-4 min-[1000px]:hidden"
      >
        <section
          v-for="group in decades"
          :key="group.decade"
          class="rounded-xl p-4"
          :style="{
            backgroundColor: group.theme.colors.background + 'c7',
            border: `1px solid ${group.theme.colors.primary}33`,
            boxShadow: '0 24px 48px rgb(0 0 0 / 24%)',
          }"
          :aria-labelledby="`decade-mobile-${group.decade}`"
        >
          <div class="mb-3 flex items-center gap-3">
            <h2
              :id="`decade-mobile-${group.decade}`"
              class="text-2xl font-bold sm:text-3xl md:text-5xl"
              :style="{ color: group.theme.colors.primary }"
            >
              <router-link
                :to="getDecadePath(group.decade)"
                class="transition-opacity duration-150 hover:opacity-80"
              >
                {{ group.decade }}
              </router-link>
            </h2>
            <button
              class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-md transition-transform duration-150 hover:scale-110"
              :style="{
                backgroundColor: group.theme.colors.primary,
                color: group.theme.colors.background,
              }"
              :aria-label="`Play top songs of the ${group.decade}`"
              @pointerdown="primeDecadePlayback(group.decade)"
              @click="playDecade(group.decade)"
            >
              <Play
                class="h-4 w-4"
                style="margin-left: 1px; fill: currentcolor"
              />
            </button>
          </div>
          <p
            v-if="group.theme.description"
            class="mb-4 text-base leading-relaxed"
            :style="{ color: group.theme.colors.textMuted }"
          >
            {{ group.theme.description }}
          </p>

          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <router-link
              v-for="(tile, tileIndex) in group.years"
              :key="tile.year"
              :to="getYearPath(tile.year)"
              class="group block overflow-hidden rounded-lg border transition-transform duration-150 hover:-translate-y-0.5"
              :style="{
                borderColor: group.theme.colors.primary + '40',
                backgroundColor: group.theme.colors.surface + 'd9',
              }"
            >
              <img
                :src="tile.thumbnail"
                :alt="`Top song thumbnail for ${tile.year}`"
                class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                v-bind="getHomeTileImageAttrs(0, 0, tileIndex)"
              />
              <div class="px-2 py-1.5 text-center text-sm font-medium">
                {{ tile.year }}
              </div>
            </router-link>
          </div>
        </section>
      </div>

      <div
        class="mx-auto hidden max-w-[1300px] gap-4 px-4 min-[1000px]:grid min-[1000px]:grid-cols-2"
      >
        <div
          v-for="(column, columnIndex) in decadeColumns"
          :key="columnIndex"
          class="flex flex-col gap-4"
          :class="{ 'min-[1000px]:pt-28': columnIndex === 1 }"
        >
          <section
            v-for="(group, groupIndex) in column"
            :key="group.decade"
            class="rounded-xl p-4"
            :style="{
              backgroundColor: group.theme.colors.background + 'c7',
              border: `1px solid ${group.theme.colors.primary}33`,
              boxShadow: '0 24px 48px rgb(0 0 0 / 24%)',
            }"
            :aria-labelledby="`decade-${group.decade}`"
          >
            <div class="mb-3 flex items-center gap-3">
              <h2
                :id="`decade-${group.decade}`"
                class="text-2xl font-bold sm:text-3xl md:text-5xl"
                :style="{ color: group.theme.colors.primary }"
              >
                <router-link
                  :to="getDecadePath(group.decade)"
                  class="transition-opacity duration-150 hover:opacity-80"
                >
                  {{ group.decade }}
                </router-link>
              </h2>
              <button
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-md transition-transform duration-150 hover:scale-110"
                :style="{
                  backgroundColor: group.theme.colors.primary,
                  color: group.theme.colors.background,
                }"
                :aria-label="`Play top songs of the ${group.decade}`"
                @pointerdown="primeDecadePlayback(group.decade)"
                @click="playDecade(group.decade)"
              >
                <Play
                  class="h-4 w-4"
                  style="margin-left: 1px; fill: currentcolor"
                />
              </button>
            </div>
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
              <ul class="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-4">
                <li v-for="(tile, tileIndex) in group.years" :key="tile.year">
                  <router-link
                    :to="getYearPath(tile.year)"
                    class="group relative isolate block aspect-square overflow-hidden rounded-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    :style="{
                      backgroundColor: group.theme.colors.surface,
                      border: `1px solid ${group.theme.colors.primary}44`,
                    }"
                  >
                    <img
                      v-if="tile.thumbnail"
                      :src="tile.thumbnail"
                      :alt="`#1 song of ${tile.year}`"
                      class="absolute inset-0 h-full w-full object-cover"
                      v-bind="
                        getHomeTileImageAttrs(
                          columnIndex,
                          groupIndex,
                          tileIndex,
                        )
                      "
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
                      class="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
    </div>
  </main>
</template>

<style scoped>
.home-page-background {
  background: #000;
}

.home-page-background-rows {
  position: absolute;
  inset: -4rem 0;
  display: flex;
  flex-direction: column;
}

.home-page-background-row {
  flex: 1 1 0;
  overflow: hidden;
}

.home-page-background-track {
  display: flex;
  width: max-content;
  min-width: 100%;
  height: 100%;
  animation: home-page-background-marquee var(--home-row-duration) linear
    var(--home-row-delay) infinite both;
  will-change: transform;
  backface-visibility: hidden;
}

.home-page-background-track-reversed {
  animation-direction: reverse;
}

.home-page-background-repeat {
  display: flex;
  flex-shrink: 0;
  height: 100%;
}

.home-page-background-tile {
  height: 100%;
  aspect-ratio: 1 / 1;
  width: auto;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
  filter: saturate(1.05) contrast(1.04) brightness(0.9);
}

.home-page-background-overlay {
  background: rgb(0 0 0 / 82%);
}

.home-page-intro {
  overflow: hidden;
}

.home-page-intro-gradient {
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 78%) 0%,
    rgb(0 0 0 / 62%) 40%,
    rgb(0 0 0 / 28%) 76%,
    transparent 100%
  );
}

@media (prefers-reduced-motion: reduce) {
  .home-page-background-track {
    animation: none;
  }
}

@keyframes home-page-background-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
