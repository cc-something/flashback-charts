<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { Copy, Mail, X } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const props = defineProps<{
  revealed: boolean
}>()

const emit = defineEmits<{
  close: []
  reveal: []
}>()
const toast = useToastStore()

const emailParts = ['contact', 'flashbackcharts', 'com'] as const
const revealedEmail = computed(() =>
  props.revealed ? `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}` : '',
)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

const copyEmail = async () => {
  if (!revealedEmail.value) return

  try {
    await navigator.clipboard.writeText(revealedEmail.value)
    toast.showSuccess('Email copied to clipboard')
  } catch {
    toast.show('Unable to copy email right now')
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-modal-title"
    class="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="relative mx-4 mt-[20vh] w-full max-w-md rounded-xl bg-surface p-8 shadow-2xl"
    >
      <button
        type="button"
        aria-label="Close"
        class="absolute top-0 right-0 inline-flex h-8 w-8 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full border border-white/15 bg-background/90 text-text/65 shadow-[0_10px_24px_rgb(0_0_0_/_0.2)] ring-1 ring-primary/15 transition-colors hover:bg-background hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-10 sm:w-10"
        @click="emit('close')"
      >
        <X class="h-5 w-5" />
      </button>

      <div class="mb-5 flex items-center gap-2.5">
        <Mail class="h-5 w-5 text-primary" />
        <h2 id="contact-modal-title" class="text-lg font-bold text-text">
          Get in contact
        </h2>
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

      <div
        v-else
        class="mt-5 flex items-center justify-between gap-3 rounded-lg bg-background px-4 py-3"
      >
        <p class="min-w-0 font-mono text-sm text-text">{{ revealedEmail }}</p>
        <button
          type="button"
          aria-label="Copy email address"
          class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text"
          @click="copyEmail"
        >
          <Copy class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
