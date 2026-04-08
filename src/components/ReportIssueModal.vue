<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X, Mail } from 'lucide-vue-next'
import type { Song } from '@/types/song'

const props = defineProps<{ song: Song; year: number }>()
const emit = defineEmits<{ dismiss: [] }>()

const isEmailRevealed = ref(false)

const mailtoHref = computed(() => {
  const subject = `Issue report: #${props.song.rank} in ${props.year}`
  const albumLine = props.song.album ? `Album: ${props.song.album}\n` : ''
  const body = [
    `Song: "${props.song.title}" by ${props.song.artist}`,
    albumLine.trimEnd(),
    `URL: ${window.location.href}`,
    '',
    'Issue:',
    '',
  ]
    .filter((line) => line !== undefined)
    .join('\n')
  return `mailto:contact@flashbackcharts.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('dismiss')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Transition name="modal" appear>
    <div
      data-esc-closes
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-issue-title"
      class="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm"
      @click.self="emit('dismiss')"
      @keydown.escape="emit('dismiss')"
    >
      <div
        class="relative mx-4 mt-[20vh] w-full max-w-md rounded-xl bg-surface p-8 shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          class="absolute right-3 top-3 cursor-pointer rounded-full p-1.5 text-text-muted transition-colors hover:text-text"
          @click="emit('dismiss')"
        >
          <X class="h-5 w-5" />
        </button>

        <h2 id="report-issue-title" class="text-xl font-bold text-text">
          Report an issue with this song
        </h2>
        <p class="mt-2 text-sm text-text-muted">
          Is there a problem or inaccuracy with this song? Let us know and we'll
          get it fixed up.
        </p>

        <div class="mt-5">
          <button
            v-if="!isEmailRevealed"
            type="button"
            class="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
            @click="isEmailRevealed = true"
          >
            <Mail class="h-4 w-4" />
            Contact us
          </button>
          <a
            v-else
            :href="mailtoHref"
            class="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            <Mail class="h-4 w-4 flex-shrink-0" />
            contact@flashbackcharts.com
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative {
  opacity: 0;
  transform: translateY(1rem) scale(0.97);
}

.modal-leave-to .relative {
  opacity: 0;
  transform: translateY(-0.5rem) scale(0.97);
}
</style>
