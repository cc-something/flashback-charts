<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import type { Song } from '@/types/song'
import { useYouTubeApi } from '@/composables/useYouTubeApi'

const props = defineProps<{ song: Song }>()

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused'

const isHovered = ref(false)
const playerState = ref<PlayerState>('idle')
const playerContainer = ref<HTMLDivElement>()
let ytPlayer: YTPlayer | null = null

const { ensureLoaded } = useYouTubeApi()

const showOverlay = computed(
  () => isHovered.value || playerState.value !== 'idle',
)

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = `https://placehold.co/80x80/333/aaa?text=${encodeURIComponent(props.song.rank.toString())}`
}

const handleAlbumClick = async () => {
  if (playerState.value === 'playing') {
    ytPlayer?.pauseVideo()
    return
  }
  if (playerState.value === 'paused') {
    ytPlayer?.playVideo()
    return
  }
  if (playerState.value === 'loading') return

  playerState.value = 'loading'
  await ensureLoaded()

  ytPlayer = new window.YT!.Player(playerContainer.value!, {
    width: '1',
    height: '1',
    playerVars: {
      listType: 'search',
      list: `${props.song.artist} ${props.song.title} song`,
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
    },
    events: {
      onReady: (event) => {
        event.target.playVideo()
      },
      onStateChange: (event: YTPlayerEvent) => {
        if (event.data === 1) playerState.value = 'playing'
        else if (event.data === 2) playerState.value = 'paused'
        else if (event.data === 3) playerState.value = 'loading'
        else if (event.data === 0) playerState.value = 'idle'
      },
    },
  })
}

onUnmounted(() => {
  ytPlayer?.destroy()
})
</script>

<template>
  <article
    class="relative flex items-center gap-4 p-4 rounded-lg bg-surface hover:bg-surface/80 transition-colors duration-150"
  >
    <span class="text-2xl font-bold text-primary w-8 text-center flex-shrink-0">
      {{ song.rank }}
    </span>

    <div
      class="relative w-20 h-20 flex-shrink-0 cursor-pointer"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="handleAlbumClick"
    >
      <img
        :src="
          song.coverUrl ||
          `https://placehold.co/80x80/333/aaa?text=${encodeURIComponent(song.rank.toString())}`
        "
        :alt="`${song.title} by ${song.artist}`"
        class="w-20 h-20 rounded object-cover shadow-md"
        @error="handleImageError"
      />

      <Transition name="overlay">
        <div
          v-if="showOverlay"
          class="absolute inset-0 rounded bg-black/50 flex items-center justify-center"
        >
          <!-- spinner -->
          <svg
            v-if="playerState === 'loading'"
            class="w-7 h-7 text-white animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>

          <!-- pause icon -->
          <svg
            v-else-if="playerState === 'playing'"
            class="w-7 h-7 text-white drop-shadow"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>

          <!-- play icon -->
          <svg
            v-else
            class="w-7 h-7 text-white drop-shadow"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </Transition>
    </div>

    <div class="flex flex-col gap-1 min-w-0">
      <h2 class="text-text font-bold text-base leading-tight truncate">
        {{ song.title }}
      </h2>
      <p class="text-text-muted text-sm truncate">{{ song.artist }}</p>
      <p v-if="song.album" class="text-text-muted/60 text-xs truncate italic">
        {{ song.album }}
      </p>
    </div>

    <div
      ref="playerContainer"
      class="absolute overflow-hidden w-px h-px"
      style="left: -9999px"
    />
  </article>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.15s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
