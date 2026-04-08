<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { Mail, X } from 'lucide-vue-next'

const props = defineProps<{
  revealed: boolean
}>()

const emit = defineEmits<{
  close: []
  reveal: []
}>()

const emailParts = ['contact', 'flashbackcharts', 'com'] as const
const revealedEmail = computed(() =>
  props.revealed ? `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}` : '',
)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="relative mx-4 mt-[20vh] w-full max-w-md rounded-xl bg-surface p-8 shadow-2xl"
    >
      <button
        type="button"
        aria-label="Close"
        class="absolute right-3 top-3 cursor-pointer rounded-full p-1.5 text-text-muted transition-colors hover:text-text"
        @click="emit('close')"
      >
        <X class="h-5 w-5" />
      </button>

      <div class="mb-5 flex items-center gap-2.5">
        <Mail class="h-5 w-5 text-primary" />
        <h2 class="text-lg font-bold text-text">Get in contact</h2>
      </div>

      <p class="text-sm leading-relaxed text-text-muted">
        If you want to contact us, report a problem, or flag an inaccuracy, you
        can get in touch with us by email.
      </p>

      <button
        v-if="!revealed"
        type="button"
        class="mt-5 inline-flex cursor-pointer items-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-background transition-opacity hover:opacity-90"
        @click="emit('reveal')"
      >
        Reveal email
      </button>

      <div v-else class="mt-5 rounded-lg bg-background px-4 py-3">
        <p class="font-mono text-sm text-text">{{ revealedEmail }}</p>
      </div>
    </div>
  </div>
</template>
