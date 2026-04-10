<script setup lang="ts">
import type { SearchMatch, SongSearchMatch } from '@/data'
import { ref, computed } from 'vue'
import { X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { searchCatalog } from '@/data'
import { getYearPath } from '@/utils/url'

const emit = defineEmits<{ close: [] }>()

const router = useRouter()
const player = usePlayerStore()
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const allResults = computed(() => searchCatalog(query.value))
const results = computed(() => allResults.value.slice(0, 50))

const goToSong = (year: number, rank: number) => {
  router.push({ path: getYearPath(year), query: { song: String(rank) } })
  emit('close')
}

const goToPath = (path: string) => {
  router.push(path)
  emit('close')
}

const goToResult = (result: SearchMatch) => {
  if (result.type === 'song') {
    goToSong(result.year, result.song.rank)
    return
  }

  goToPath(result.path)
}

const getResultKey = (result: SearchMatch, index: number) =>
  result.type === 'song'
    ? `${result.year}-${result.song.rank}-${index}`
    : `${result.type}-${result.path}`

const getTargetTitle = (result: Exclude<SearchMatch, SongSearchMatch>) =>
  result.type === 'year' ? String(result.year) : result.decade

const getTargetDescription = (result: Exclude<SearchMatch, SongSearchMatch>) =>
  result.type === 'year' ? 'Open the yearly chart page' : 'Open the decade page'

const getTargetBadge = (result: Exclude<SearchMatch, SongSearchMatch>) =>
  result.type === 'year' ? 'Year' : 'Decade'

const getTargetAriaLabel = (result: Exclude<SearchMatch, SongSearchMatch>) =>
  result.type === 'year'
    ? `Go to ${result.year} chart`
    : `Go to ${result.decade} page`

const playSong = (song: SongSearchMatch['song'], year: number) =>
  player.play(song, year, 'search')
const primePlayback = () => void player.preload()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

const focusInput = () => inputRef.value?.focus()

defineExpose({ focusInput })
</script>

<template>
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Search songs, years, and decades"
    class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
    @click.self="emit('close')"
    @keydown="handleKeydown"
  >
    <div class="mx-auto flex h-full max-w-[900px] flex-col px-4 pt-8">
      <!-- Search bar -->
      <div class="z-10 flex flex-shrink-0 flex-col gap-2">
        <p
          aria-live="polite"
          :class="[
            'px-1 text-xs text-text-muted transition-opacity',
            query ? 'opacity-100' : 'opacity-0',
          ]"
        >
          {{ allResults.length }} results
        </p>

        <div class="flex items-center gap-3">
          <div class="min-w-0 flex-1 border-b border-primary/20 bg-surface">
            <div class="flex items-center gap-3 px-4 py-3">
              <div class="flex flex-1 items-center gap-3">
                <input
                  ref="inputRef"
                  v-model="query"
                  type="text"
                  aria-label="Search songs, artists, albums, years, or decades"
                  placeholder="Search songs, artists, albums, years…"
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
            </div>
          </div>
          <button
            type="button"
            aria-label="Close search"
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface/88 text-text-muted shadow-lg shadow-black/10 ring-1 ring-primary/20 transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            @click="emit('close')"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>

      <!-- Results -->
      <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <p
          v-if="query && !results.length"
          class="py-12 text-center text-text-muted"
        >
          No results for "{{ query }}"
        </p>

        <div v-else class="flex flex-col gap-2 pb-8 pt-3">
          <div
            v-for="(result, i) in results"
            :key="getResultKey(result, i)"
            class="group flex cursor-pointer items-center gap-3 rounded-lg border border-transparent bg-surface p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-surface/75 hover:shadow-lg hover:shadow-black/10 focus-visible:-translate-y-0.5 focus-visible:border-primary/30 focus-visible:bg-surface/75 focus-visible:shadow-lg focus-visible:shadow-black/10"
            role="button"
            tabindex="0"
            :aria-label="
              result.type === 'song'
                ? `Go to ${result.song.title} in ${result.year}`
                : getTargetAriaLabel(result)
            "
            @click="goToResult(result)"
            @keydown.enter="goToResult(result)"
            @keydown.space.prevent="goToResult(result)"
          >
            <template v-if="result.type === 'song'">
              <!-- Thumbnail / play -->
              <button
                type="button"
                :aria-label="`Play ${result.song.title} by ${result.song.artist}`"
                class="relative h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md ring-1 ring-black/10 transition duration-150 group-hover:scale-[1.03] group-hover:shadow-lg group-hover:shadow-black/20 hover:ring-primary/35 touch-manipulation"
                @pointerdown="primePlayback"
                @click.stop="playSong(result.song, result.year)"
              >
                <img
                  :src="result.song.thumbnailPath"
                  :alt="result.song.title"
                  class="block h-full w-full object-cover"
                  @error="
                    (e: Event) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }
                  "
                />
                <div
                  class="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-150 group-hover:bg-black/55"
                >
                  <svg
                    v-if="
                      player.isSongActive(result.song, result.year) &&
                      player.playerState === 'playing'
                    "
                    class="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>

              <!-- Song info -->
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold leading-tight text-text">
                  {{ result.song.title }}
                </p>
                <p class="truncate text-xs text-text-muted">
                  {{ result.song.artist }}
                  <span
                    v-if="result.song.album"
                    class="italic text-text-muted/60"
                  >
                    · {{ result.song.album }}
                  </span>
                </p>
              </div>

              <!-- Year badge + go-to -->
              <button
                type="button"
                :aria-label="`Go to ${result.year} chart`"
                class="flex-shrink-0 cursor-pointer rounded bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/30"
                @click.stop="goToSong(result.year, result.song.rank)"
              >
                {{ result.year }}
              </button>
            </template>

            <template v-else>
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-primary/12 text-sm font-bold text-primary ring-1 ring-primary/15"
              >
                {{ getTargetBadge(result).slice(0, 1) }}
              </div>

              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold leading-tight text-text">
                  {{ getTargetTitle(result) }}
                </p>
                <p class="truncate text-xs text-text-muted">
                  {{ getTargetDescription(result) }}
                </p>
              </div>

              <span
                class="flex-shrink-0 rounded bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary"
              >
                {{ getTargetBadge(result) }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
