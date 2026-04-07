<script setup lang="ts">
const emit = defineEmits<{ deactivate: [] }>()

const REPEATED_TEXT = Array.from(
  { length: 20 },
  () => '🕺 Rick Astley mode activated',
).join('   \u00a0\u00a0\u00a0   ')
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
      class="absolute right-0 h-full shrink-0 bg-red-700 px-3 text-xs font-bold uppercase tracking-wide transition-colors duration-150 hover:bg-red-800"
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
