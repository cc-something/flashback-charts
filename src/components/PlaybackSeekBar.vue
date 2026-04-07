<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { usePlayerStore } from '@/stores/player'

defineProps<{
  rootClass?: string
}>()

const player = usePlayerStore()
const progressPercent = computed(() => {
  if (player.durationSeconds <= 0) return 0
  const displayedSeconds = player.seekSliderValue[0] ?? 0
  const clampedPercent = (displayedSeconds / player.durationSeconds) * 100
  return Math.min(Math.max(clampedPercent, 0), 100)
})
</script>

<template>
  <SliderRoot
    :key="player.playingSong?.youtubeVideoId"
    :max="player.durationSeconds"
    :min="0"
    :model-value="player.seekSliderValue"
    :step="0.1"
    aria-label="Seek playback"
    :class="[
      'playback-seek flex w-full touch-manipulation items-center',
      rootClass,
    ]"
    @update:model-value="player.handleSeekInput"
    @value-commit="player.handleSeekCommit"
  >
    <SliderTrack
      as="div"
      :style="{ '--playback-seek-progress': `${progressPercent}%` }"
      class="playback-seek-track relative h-1 w-full overflow-hidden rounded-bl-lg rounded-br-lg bg-black/10"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
      />
    </SliderTrack>
    <SliderThumb
      class="playback-seek-thumb block h-2.5 w-2.5 rounded-full border border-white/90 bg-primary shadow-[0_1px_3px_rgb(0_0_0_/_0.25)] outline-none"
    />
  </SliderRoot>
</template>

<style scoped>
.playback-seek[data-orientation='horizontal'] {
  display: flex;
}

.playback-seek-track[data-orientation='horizontal'] {
  flex: 1;
}

.playback-seek-track {
  background: linear-gradient(
    to right,
    var(--color-primary) 0%,
    var(--color-primary) var(--playback-seek-progress),
    rgb(0 0 0 / 10%) var(--playback-seek-progress),
    rgb(0 0 0 / 10%) 100%
  );
}

.playback-seek-thumb {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.playback-seek-thumb:hover {
  transform: scale(1.08);
}

.playback-seek-thumb:focus-visible {
  box-shadow:
    0 0 0 2px rgb(255 255 255 / 90%),
    0 0 0 4px rgb(0 0 0 / 18%);
}
</style>
