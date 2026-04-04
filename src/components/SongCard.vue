<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import type { Song } from '@/types/song'
import { useYouTubeApi } from '@/composables/useYouTubeApi'

const props = defineProps<{ song: Song }>()

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused'

const getFallbackImageUrl = (rank: number) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="#333"/><text x="40" y="44" fill="#aaa" font-size="28" text-anchor="middle" font-family="system-ui, sans-serif">${rank}</text></svg>`,
  )}`

const isHovered = ref(false)
const playerState = ref<PlayerState>('idle')
const playerContainer = ref<HTMLDivElement>()
let ytPlayer: YTPlayer | null = null

const { ensureLoaded, registerActive, clearActive } = useYouTubeApi()

const showOverlay = computed(
  () => isHovered.value || playerState.value !== 'idle',
)

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.dataset.fallbackApplied) return
  img.dataset.fallbackApplied = 'true'
  img.src = getFallbackImageUrl(props.song.rank)
}

const stopPlayback = () => {
  ytPlayer?.destroy()
  ytPlayer = null
  playerState.value = 'idle'
  clearActive()
}

const handleAlbumClick = async () => {
  if (!props.song.youtubeVideoId) return

  if (playerState.value === 'playing') {
    ytPlayer?.pauseVideo()
    return
  }
  if (playerState.value === 'paused') {
    ytPlayer?.playVideo()
    return
  }
  if (playerState.value === 'loading') {
    stopPlayback()
    return
  }

  playerState.value = 'loading'
  registerActive(stopPlayback)

  try {
    await ensureLoaded()
  } catch {
    stopPlayback()
    return
  }

  if (playerState.value !== 'loading') return
  if (!playerContainer.value) {
    stopPlayback()
    return
  }

  ytPlayer = new window.YT!.Player(playerContainer.value, {
    width: '320',
    height: '180',
    videoId: props.song.youtubeVideoId,
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      origin: window.location.origin,
    },
    events: {
      onReady: (event) => {
        event.target.playVideo()
      },
      onStateChange: (event: YTPlayerEvent) => {
        if (event.data === 1) playerState.value = 'playing'
        else if (event.data === 2) playerState.value = 'paused'
        else if (event.data === 3) playerState.value = 'loading'
        else if (event.data === 0) stopPlayback()
      },
      onError: () => stopPlayback(),
    },
  })
}

onUnmounted(() => {
  stopPlayback()
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
        :src="song.thumbnailPath"
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
      style="
        position: fixed;
        top: -400px;
        left: 0;
        width: 320px;
        height: 180px;
        pointer-events: none;
      "
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
