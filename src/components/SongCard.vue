<script setup lang="ts">
import type { Song } from '@/types/song'

const props = defineProps<{ song: Song }>()

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = `https://placehold.co/80x80/333/aaa?text=${encodeURIComponent(props.song.rank.toString())}`
}
</script>

<template>
  <article
    class="flex items-center gap-4 p-4 rounded-lg bg-surface hover:bg-surface/80 transition-colors duration-150"
  >
    <span class="text-2xl font-bold text-primary w-8 text-center flex-shrink-0">
      {{ song.rank }}
    </span>
    <img
      :src="
        song.coverUrl ||
        `https://placehold.co/80x80/333/aaa?text=${encodeURIComponent(song.rank.toString())}`
      "
      :alt="`${song.title} by ${song.artist}`"
      class="w-20 h-20 rounded object-cover flex-shrink-0 shadow-md"
      @error="handleImageError"
    />
    <div class="flex flex-col gap-1 min-w-0">
      <h2 class="text-text font-bold text-base leading-tight truncate">
        {{ song.title }}
      </h2>
      <p class="text-text-muted text-sm truncate">{{ song.artist }}</p>
      <p v-if="song.album" class="text-text-muted/60 text-xs truncate italic">
        {{ song.album }}
      </p>
    </div>
  </article>
</template>
