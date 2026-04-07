<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { usePlayerStore } from '@/stores/player'

defineProps<{
  rootClass?: string
}>()

const player = usePlayerStore()
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
      class="playback-seek-track relative h-1.5 w-full overflow-hidden rounded-bl-lg rounded-br-lg bg-black/10"
    >
      <SliderRange
        as="div"
        class="playback-seek-range absolute inset-y-0 left-0 bg-primary"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
      />
    </SliderTrack>
    <SliderThumb
      class="playback-seek-thumb block h-3 w-3 rounded-full border border-white/90 bg-primary shadow-[0_1px_3px_rgb(0_0_0_/_0.25)] outline-none"
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
  isolation: isolate;
}

.playback-seek-range[data-orientation='horizontal'] {
  left: 0;
}

.playback-seek-range {
  border-bottom-left-radius: inherit;
  transform: translateZ(0);
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
