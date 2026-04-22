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
  return `mailto:issues@flashbackcharts.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
          class="absolute top-0 right-0 inline-flex h-8 w-8 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full border border-white/15 bg-background/90 text-text/65 shadow-[0_10px_24px_rgb(0_0_0_/_0.2)] ring-1 ring-primary/15 transition-colors hover:bg-background hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-10 sm:w-10"
          @click="emit('dismiss')"
        >
          <X class="h-5 w-5" />
        </button>

        <h2 id="report-issue-title" class="text-xl font-bold text-text">
          Report an issue with this song
        </h2>

        <div class="mt-3 space-y-0.5 text-sm leading-tight text-text-muted">
          <p
            class="text-xs font-bold uppercase tracking-[0.08em] text-primary/80"
          >
            #{{ props.song.rank }} in {{ props.year }}
          </p>
          <p class="font-bold text-text">
            {{ props.song.title }}
          </p>
          <p>
            {{ props.song.artist }}
          </p>
          <p v-if="props.song.album">
            {{ props.song.album }}
          </p>
        </div>

        <p class="mt-4 text-sm text-text-muted">
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
            issues@flashbackcharts.com
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
