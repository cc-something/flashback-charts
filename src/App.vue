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
  <!-- Mobile: top + bottom banners -->
  <AdBanner
    label="AD TOP"
    class="fixed top-0 left-0 right-0 z-50 h-[50px] lg:hidden"
  />
  <AdBanner
    label="AD BOTTOM"
    class="fixed bottom-0 left-0 right-0 z-50 h-[50px] lg:hidden"
  />

  <!-- Desktop: left + right banners -->
  <AdBanner
    label="AD LEFT"
    class="fixed top-0 left-0 bottom-0 z-50 w-40 hidden lg:flex"
  />
  <AdBanner
    label="AD RIGHT"
    class="fixed top-0 right-0 bottom-0 z-50 w-40 hidden lg:flex"
  />

  <div
    class="min-h-screen bg-background text-text pt-[50px] pb-[50px] lg:pt-0 lg:pb-0 lg:mx-40"
  >
    <YearTabs />

    <!-- Search toggle -->
    <button
      type="button"
      aria-label="Search songs"
      class="fixed right-4 top-[calc(4rem+50px)] lg:top-16 z-20 cursor-pointer rounded-full bg-surface/80 p-2 text-text-muted shadow-md backdrop-blur transition-colors hover:text-text"
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

    <SongList />
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
