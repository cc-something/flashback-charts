<script setup lang="ts">
import { computed } from 'vue'
import { Info } from 'lucide-vue-next'
import type { Song } from '@/types/song'

const tooltipLabel =
  'The music video for this song does not support being embedded on other sites, so we used this one instead'

const props = withDefaults(
  defineProps<{
    song: Song
    size?: 'sm' | 'md'
  }>(),
  {
    size: 'sm',
  },
)

const shouldShowBadge = computed(
  () => props.song.embedIntegrity === 'suboptimal',
)
const badgeClass = computed(() =>
  props.size === 'md'
    ? 'relative -top-px inline-flex h-5.5 w-5.5 cursor-help items-center justify-center rounded-full bg-amber-400 text-amber-950 align-middle outline-none transition-colors hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300/70'
    : 'relative -top-px inline-flex h-[1.2rem] w-[1.2rem] cursor-help items-center justify-center rounded-full bg-amber-400 text-amber-950 align-middle outline-none transition-colors hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300/70',
)
const iconClass = computed(() =>
  props.size === 'md' ? 'h-3.5 w-3.5' : 'h-[0.8rem] w-[0.8rem]',
)
</script>

<template>
  <span
    v-if="shouldShowBadge"
    class="embed-badge-root group pointer-events-auto relative z-30 inline-flex align-middle"
    @pointerdown.stop
    @click.stop
  >
    <span
      :aria-label="tooltipLabel"
      role="img"
      tabindex="0"
      :class="badgeClass"
    >
      <Info :class="iconClass" aria-hidden="true" />
    </span>
    <span
      class="embed-badge-tooltip pointer-events-none absolute left-1/2 top-full z-40 mt-2 w-56 -translate-x-1/2 rounded-md bg-black/88 px-2.5 py-2 text-[0.68rem] font-medium leading-snug tracking-normal text-white opacity-0 shadow-lg transition-opacity duration-150"
    >
      {{ tooltipLabel }}
    </span>
  </span>
</template>

<style scoped>
.embed-badge-root:hover .embed-badge-tooltip,
.embed-badge-root:focus-within .embed-badge-tooltip {
  opacity: 1;
}
</style>
