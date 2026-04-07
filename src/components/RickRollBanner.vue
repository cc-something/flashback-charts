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
const REPEATED_TEXT = Array.from({ length: SEGMENT_COUNT }, (_, i) => {
  const emoji = DANCE_EMOJIS[i % DANCE_EMOJIS.length]
  return `Rick Astley mode activated ${emoji}`
}).join('     ')
</script>

<template>
  <div
    class="relative flex h-9 items-center overflow-hidden bg-red-600 text-white"
  >
    <div class="marquee-wrapper flex-1 overflow-hidden pr-28">
      <div
        class="marquee-track pointer-events-none select-none whitespace-nowrap text-sm font-semibold"
      >
        {{ REPEATED_TEXT }}
      </div>
    </div>
    <button
      type="button"
      class="absolute inset-y-1 right-1.5 rounded-md shrink-0 bg-white px-3 text-xs font-bold uppercase tracking-wide text-red-600 transition-colors duration-150 hover:bg-red-50"
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
