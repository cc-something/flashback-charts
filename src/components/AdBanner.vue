<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div
    class="flex items-center justify-center bg-red-500 text-white text-xs font-bold select-none"
  >
    <span>{{ label ?? 'AD' }}</span>
  </div>
</template>
