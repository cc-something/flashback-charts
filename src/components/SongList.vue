<script setup lang="ts">
import { onUnmounted } from 'vue'
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-vue-next'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import SongCard from './SongCard.vue'

const store = useChartStore()
const player = usePlayerStore()

player.setOnEnded(() => player.playNext())
onUnmounted(() => player.setOnEnded(null))
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-6">
    <header class="mb-6 flex items-start justify-between">
      <div>
        <h1 class="text-3xl font-bold text-primary">
          {{ store.selectedYear }}
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
        class="flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5 text-sm font-medium text-text-muted transition-colors duration-150 hover:text-text"
        :title="store.sortOrder === 'asc' ? 'Sorted 1 → 10' : 'Sorted 10 → 1'"
        @click="store.toggleSortOrder()"
      >
        <ArrowUpNarrowWide v-if="store.sortOrder === 'asc'" class="h-4 w-4" />
        <ArrowDownNarrowWide v-else class="h-4 w-4" />
        {{ store.sortOrder === 'asc' ? '1 → 10' : '10 → 1' }}
      </button>
    </header>

    <Transition name="year-content" mode="out-in">
      <div :key="store.selectedYear" class="year-content">
        <div v-if="store.hasData" class="flex flex-col gap-3">
          <SongCard
            v-for="song in store.currentSongs"
            :key="`${store.selectedYear}-${song.rank}`"
            :song="song"
            :year="store.selectedYear"
          />
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center gap-3 py-24 text-center"
        >
          <span class="text-5xl opacity-30">🎵</span>
          <p class="text-lg text-text-muted">
            No data yet for {{ store.selectedYear }}
          </p>
          <p class="text-sm text-text-muted/60">Chart data coming soon</p>
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
</style>
