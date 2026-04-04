<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useDecadeTheme } from '@/composables/useDecadeTheme'
import { usePlayerStore } from '@/stores/player'
import YearTabs from '@/components/YearTabs.vue'
import SongList from '@/components/SongList.vue'
import MiniPlayer from '@/components/MiniPlayer.vue'
import SearchOverlay from '@/components/SearchOverlay.vue'

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
  <div class="min-h-screen bg-background text-text">
    <YearTabs />

    <!-- Search toggle -->
    <button
      type="button"
      aria-label="Search songs"
      class="fixed right-4 top-2.5 z-20 cursor-pointer rounded-full bg-surface/80 p-2 text-text-muted shadow-md backdrop-blur transition-colors hover:text-text"
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
  </div>
</template>
