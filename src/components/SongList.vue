<script setup lang="ts">
import { useChartStore } from '@/stores/chart'
import SongCard from './SongCard.vue'

const store = useChartStore()
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-6">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-primary">{{ store.selectedYear }}</h1>
      <p class="text-text-muted text-sm mt-1">Australia's Top 10 Songs</p>
    </header>

    <TransitionGroup
      v-if="store.hasData"
      name="list"
      tag="div"
      class="flex flex-col gap-3"
    >
      <SongCard
        v-for="song in store.currentSongs"
        :key="song.rank"
        :song="song"
      />
    </TransitionGroup>

    <div
      v-else
      class="flex flex-col items-center justify-center py-24 text-center gap-3"
    >
      <span class="text-5xl opacity-30">🎵</span>
      <p class="text-text-muted text-lg">
        No data yet for {{ store.selectedYear }}
      </p>
      <p class="text-text-muted/60 text-sm">Chart data coming soon</p>
    </div>
  </main>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
