<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDecadeTheme } from '@/composables/useDecadeTheme'
import { useFathomAnalytics } from '@/composables/useFathomAnalytics'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import YearTabs from '@/components/YearTabs.vue'
import MiniPlayer from '@/components/MiniPlayer.vue'
import SearchOverlay from '@/components/SearchOverlay.vue'
import ErrorToast from '@/components/ErrorToast.vue'

useDecadeTheme()
const { loadFathom } = useFathomAnalytics()

const route = useRoute()
const router = useRouter()
const chart = useChartStore()
const player = usePlayerStore()
const playerContainer = ref<HTMLDivElement | null>(null)
const isSearchOpen = ref(false)
const searchOverlay = ref<InstanceType<typeof SearchOverlay> | null>(null)

const openSearch = async () => {
  isSearchOpen.value = true
  await nextTick()
  searchOverlay.value?.focusInput()
}

watch(
  () => chart.selectedYear,
  (year) => {
    if (route.name === 'year' && Number(route.params.year) === year) return
    router.push(`/${year}`)
  },
)

onMounted(() => {
  if (playerContainer.value) player.setPlayerContainer(playerContainer.value)
  loadFathom()
})
</script>

<template>
  <div class="min-h-screen bg-background text-text">
    <YearTabs />

    <router-link
      to="/"
      aria-label="Home"
      class="fixed left-4 top-16 z-20 cursor-pointer rounded-full bg-surface/80 p-2 text-text-muted shadow-md backdrop-blur transition-colors hover:text-text"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M3 11 12 3l9 8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 10v10h14V10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </router-link>

    <button
      type="button"
      aria-label="Search songs"
      class="fixed right-4 top-16 z-20 cursor-pointer rounded-full bg-surface/80 p-2 text-text-muted shadow-md backdrop-blur transition-colors hover:text-text"
      @click="openSearch"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" stroke-linecap="round" />
      </svg>
    </button>

    <router-view />

    <MiniPlayer />
    <SearchOverlay
      v-if="isSearchOpen"
      ref="searchOverlay"
      @close="isSearchOpen = false"
    />
    <div
      ref="playerContainer"
      class="fixed bottom-0 left-0 h-px w-px opacity-[0.01]"
    />
    <ErrorToast />
  </div>
</template>
