<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import { searchSongs } from '@/data'

const emit = defineEmits<{ close: [] }>()

const chart = useChartStore()
const player = usePlayerStore()
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const results = computed(() => searchSongs(query.value).slice(0, 50))

const goToYear = (year: number) => {
  chart.selectYear(year)
  emit('close')
}

const playSong = (song: (typeof results.value)[0]['song'], year: number) =>
  player.play(song, year)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

const focusInput = () => inputRef.value?.focus()

defineExpose({ focusInput })
</script>

<template>
  <div
    class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
    @click.self="emit('close')"
    @keydown="handleKeydown"
  >
    <div class="mx-auto flex max-w-[900px] flex-col px-4 pt-0">
      <!-- Search bar -->
      <div
        class="sticky top-0 z-10 flex items-center gap-3 border-b border-primary/20 bg-surface px-4 py-3"
      >
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Search songs, artists, albums…"
          class="flex-1 bg-transparent text-lg text-text placeholder-text-muted/50 outline-none"
          @keydown.escape="emit('close')"
        />
        <!-- Search icon -->
        <svg
          class="h-5 w-5 flex-shrink-0 text-text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Results -->
      <div
        class="overflow-y-auto overscroll-contain"
        style="max-height: calc(100vh - 60px)"
      >
        <p
          v-if="query && !results.length"
          class="py-12 text-center text-text-muted"
        >
          No results for "{{ query }}"
        </p>

        <div v-else class="flex flex-col gap-2 py-3">
          <div
            v-for="({ song, year }, i) in results"
            :key="`${year}-${song.rank}-${i}`"
            class="flex items-center gap-3 rounded-lg bg-surface p-3 transition-colors hover:bg-surface/80"
          >
            <!-- Thumbnail / play -->
            <button
              type="button"
              class="relative h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md touch-manipulation"
              @click="playSong(song, year)"
            >
              <img
                :src="song.thumbnailPath"
                :alt="song.title"
                class="block h-full w-full object-cover"
                @error="
                  (e: Event) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }
                "
              />
              <div
                class="absolute inset-0 flex items-center justify-center bg-black/40"
              >
                <svg
                  v-if="
                    player.isSongActive(song, year) &&
                    player.playerState === 'playing'
                  "
                  class="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>

            <!-- Song info -->
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-bold leading-tight text-text">
                {{ song.title }}
              </p>
              <p class="truncate text-xs text-text-muted">
                {{ song.artist }}
                <span v-if="song.album" class="italic text-text-muted/60">
                  · {{ song.album }}
                </span>
              </p>
            </div>

            <!-- Year badge + go-to -->
            <button
              class="flex-shrink-0 cursor-pointer rounded bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/30"
              @click="goToYear(year)"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
