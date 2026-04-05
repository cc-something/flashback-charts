<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useDecadeTheme } from '@/composables/useDecadeTheme'
import { usePlayerStore } from '@/stores/player'
import YearTabs from '@/components/YearTabs.vue'
import SongList from '@/components/SongList.vue'
import MiniPlayer from '@/components/MiniPlayer.vue'
import SearchOverlay from '@/components/SearchOverlay.vue'
import ErrorToast from '@/components/ErrorToast.vue'
import AdBanner from '@/components/AdBanner.vue'

useDecadeTheme()

const player = usePlayerStore()
const playerContainer = ref<HTMLDivElement | null>(null)
const isSearchOpen = ref(false)
const searchOverlay = ref<InstanceType<typeof SearchOverlay> | null>(null)

const openSearch = async () => {
  isSearchOpen.value = true
  await nextTick()
  searchOverlay.value?.focusInput()
}

onMounted(() => {
  if (playerContainer.value) player.setPlayerContainer(playerContainer.value)
})
</script>

<template>
  <!-- Mobile: top + bottom inset fixed banners -->
  <AdBanner
    label="AD TOP"
    class="fixed top-2 left-4 right-4 z-50 h-[50px] rounded shadow-lg lg:hidden"
  />
  <AdBanner
    label="AD BOTTOM"
    class="fixed bottom-2 left-4 right-4 z-50 h-[50px] rounded shadow-lg lg:hidden"
  />

  <div class="min-h-screen bg-background text-text">
    <YearTabs />

    <!-- Desktop: sticky side banners inside page flow -->
    <div class="flex">
      <aside class="hidden lg:block w-44 shrink-0 p-3">
        <AdBanner
          label="AD LEFT"
          class="sticky top-3 h-[300px] rounded shadow-lg"
        />
      </aside>

      <!-- Search toggle -->
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

      <div class="flex-1 min-w-0">
        <SongList />
      </div>

      <aside class="hidden lg:block w-44 shrink-0 p-3">
        <AdBanner
          label="AD RIGHT"
          class="sticky top-3 h-[300px] rounded shadow-lg"
        />
      </aside>
    </div>

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
