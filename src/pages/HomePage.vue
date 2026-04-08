<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight } from 'lucide-vue-next'
import {
  getDecadePageDescription,
  getDecadePageTitle,
  getDecadeSummaries,
  getHomeBackgroundThumbnails,
  getHomePageDescription,
  getHomePageMethodologyText,
  getHomePageTitle,
  getLatestYear,
} from '@/content/chartContent'
import {
  useRickRollMode,
  RICK_ASTLEY_SONG,
} from '@/composables/useRickRollMode'

const { isRickRollActive } = useRickRollMode()
const rickThumbnail = RICK_ASTLEY_SONG.thumbnailPath
const HOME_BACKGROUND_ROW_COUNT = 6
const HOME_BACKGROUND_DUPLICATE_COUNT = 2
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
const rawDecades = getDecadeSummaries().reverse()
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
const decadeColumns = computed(() => [
  decades.value.filter((_, index) => index % 2 === 0),
  decades.value.filter((_, index) => index % 2 === 1),
])
const latestYear = getLatestYear()
const title = getHomePageTitle()
const description = getHomePageDescription()
const methodologyText = getHomePageMethodologyText()
const homeImage = siteUrl ? `${siteUrl}/og/home.png` : undefined
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      'name': 'Flashback Charts Australia',
      'url': siteUrl,
      'description': description,
      'inLanguage': 'en-AU',
    },
    {
      '@type': 'CollectionPage',
      'name': title,
      'url': siteUrl,
      'description': description,
      'image': homeImage,
      'inLanguage': 'en-AU',
      'hasPart': rawDecades.map((group) => ({
        '@type': 'CollectionPage',
        'name': getDecadePageTitle(group.decade),
        'url': siteUrl ? `${siteUrl}/${group.decade}` : undefined,
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
    ...(siteUrl ? [{ property: 'og:url', content: siteUrl }] : []),
    ...(homeImage ? [{ property: 'og:image', content: homeImage }] : []),
    {
      name: 'twitter:card',
      content: homeImage ? 'summary_large_image' : 'summary',
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(homeImage ? [{ name: 'twitter:image', content: homeImage }] : []),
  ],
  link: siteUrl ? [{ rel: 'canonical', href: siteUrl }] : [],
  script: siteUrl
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd),
        },
      ]
    : [],
})
</script>

<template>
  <main class="relative isolate">
    <div class="home-page-background pointer-events-none fixed inset-0">
      <div class="home-page-background-rows">
        <div
          v-for="(row, rowIndex) in homeBackgroundRows"
          :key="`row-${rowIndex}`"
          class="home-page-background-row"
        >
          <div
            class="home-page-background-track"
            :class="{
              'home-page-background-track-reversed': rowIndex % 2 === 1,
            }"
            :style="{ '--home-row-duration': `${260 + rowIndex * 18}s` }"
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
              />
            </div>
          </div>
        </div>
      </div>
      <div class="home-page-background-overlay absolute inset-0" />
      <div class="home-page-background-vignette absolute inset-0" />
    </div>

    <div class="relative z-10 max-w-[1300px] mx-auto px-4 py-10">
      <div
        class="mb-8 rounded-2xl border border-white/10 bg-black/46 px-5 py-5 backdrop-blur-[8px]"
      >
        <h1 class="text-2xl text-text-muted">
          The top 10 songs in Australia for every year from 1940 to
          {{ latestYear }}
        </h1>
        <p class="mt-2 text-base leading-relaxed text-text-muted/70">
          Nine decades of Australian music charts, from today's streaming hits
          and 2000s pop anthems back through grunge, synth-pop, disco, and the
          rock'n'roll pioneers. Listen to the #1s and Top 10s and discover the
          songs that shaped each era.
        </p>
        <p class="mt-3 max-w-4xl text-sm leading-relaxed text-text-muted/60">
          {{ methodologyText }}
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
            class="rounded-xl p-4 backdrop-blur-[6px]"
            :style="{
              backgroundColor: group.theme.colors.background + 'c7',
              border: `1px solid ${group.theme.colors.primary}33`,
              boxShadow: '0 24px 48px rgb(0 0 0 / 24%)',
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
              <ul class="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-4">
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
    infinite;
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
  width: clamp(8rem, 14vw, 13rem);
  height: 100%;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
  filter: saturate(1.05) contrast(1.04) brightness(0.9);
}

.home-page-background-overlay {
  background:
    linear-gradient(
      180deg,
      rgb(0 0 0 / 44%) 0%,
      rgb(0 0 0 / 56%) 38%,
      rgb(0 0 0 / 70%) 100%
    ),
    linear-gradient(
      120deg,
      rgb(7 10 18 / 84%) 0%,
      rgb(7 10 18 / 58%) 42%,
      rgb(7 10 18 / 28%) 100%
    );
}

.home-page-background-vignette {
  background: radial-gradient(
    circle at top,
    transparent 0%,
    rgb(0 0 0 / 10%) 42%,
    rgb(0 0 0 / 24%) 100%
  );
}

@keyframes home-page-background-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
