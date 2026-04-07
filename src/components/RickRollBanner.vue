<script setup lang="ts">
const emit = defineEmits<{ deactivate: [] }>()

const DANCE_EMOJIS = [
  '🕺',
  '💃',
  '🎉',
  '🎊',
  '🪩',
  '🎶',
  '🎵',
  '🤩',
  '😎',
  '🙌',
  '✨',
  '🎤',
  '🎸',
  '🥳',
  '🫶',
]
const SEGMENT_COUNT = 20
const GAP = '\u00a0\u00a0\u00a0\u00a0\u00a0'
const REPEATED_TEXT = Array.from({ length: SEGMENT_COUNT }, (_, i) => {
  const emoji = DANCE_EMOJIS[i % DANCE_EMOJIS.length]
  return `Rick Astley mode activated${GAP}${emoji}${GAP}`
}).join('')
</script>

<template>
  <div
    class="relative flex h-10 items-center overflow-hidden bg-red-600 text-white"
  >
    <div class="marquee-wrapper flex flex-1 items-center overflow-hidden pr-36">
      <div
        class="marquee-track pointer-events-none select-none whitespace-nowrap text-sm font-normal leading-none"
      >
        {{ REPEATED_TEXT }}
      </div>
    </div>
    <button
      type="button"
      class="absolute inset-y-1.5 right-2 rounded-md shrink-0 bg-red-900 px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-950"
      @click="emit('deactivate')"
    >
      Deactivate
    </button>
  </div>
</template>

<style scoped>
.marquee-track {
  display: inline-block;
  animation: marquee 40s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0%);
  }
}
</style>
