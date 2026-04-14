<script setup lang="ts">
import { computed } from 'vue'
import { Info } from 'lucide-vue-next'
import type { Song } from '@/types/song'

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
  () => props.song.embedIntegrity !== 'confirmed',
)
const tooltipLabel = computed(() => {
  if (props.song.embedIntegrity === 'unplayable')
    return `Cannot play in the current YouTube embed flow. ${props.song.embedIntegrityReason ?? 'Documented HARD blocker.'}`
  return `Using a fallback embed. ${props.song.embedIntegrityReason ?? 'Sub-optimal embed.'}`
})
const badgeClass = computed(() =>
  props.size === 'md'
    ? 'inline-flex h-5.5 w-5.5 cursor-help items-center justify-center rounded-full bg-amber-400 text-amber-950 align-middle outline-none transition-colors hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300/70'
    : 'inline-flex h-[1.2rem] w-[1.2rem] cursor-help items-center justify-center rounded-full bg-amber-400 text-amber-950 align-middle outline-none transition-colors hover:bg-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300/70',
)
const iconClass = computed(() =>
  props.size === 'md' ? 'h-3.5 w-3.5' : 'h-[0.8rem] w-[0.8rem]',
)
</script>

<template>
  <span v-if="shouldShowBadge" class="group relative inline-flex align-middle">
    <span
      :aria-label="tooltipLabel"
      role="img"
      tabindex="0"
      :class="badgeClass"
    >
      <Info :class="iconClass" aria-hidden="true" />
    </span>
    <span
      class="pointer-events-none absolute left-1/2 top-full z-40 mt-2 w-56 -translate-x-1/2 rounded-md bg-black/88 px-2.5 py-2 text-[0.68rem] font-medium leading-snug tracking-normal text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      {{ tooltipLabel }}
    </span>
  </span>
</template>
