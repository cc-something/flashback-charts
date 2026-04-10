<script setup lang="ts">
import { computed } from 'vue'
import { AlertTriangle, CircleCheck, CircleX, Info, X } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const errorToasts = computed(() =>
  toast.toasts.filter((t) => t.variant === 'error'),
)
const successToasts = computed(() =>
  toast.toasts.filter((t) => t.variant === 'success'),
)
const infoToasts = computed(() =>
  toast.toasts.filter((t) => t.variant === 'info'),
)
const warningToasts = computed(() =>
  toast.toasts.filter((t) => t.variant === 'warning'),
)

const getWarningToastParts = (message: string) => {
  const [headline, songLine = ''] = message.split('\n')
  const match = songLine.match(/^(.+) by (.+)$/)
  if (!match)
    return {
      headline,
      title: songLine,
      artist: '',
      hasStructuredSongLine: false,
    }
  return {
    headline,
    title: match[1],
    artist: match[2],
    hasStructuredSongLine: true,
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Status toasts — top right -->
    <div
      role="status"
      aria-live="polite"
      class="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[calc(100vw-2rem)] flex-col items-stretch gap-2 sm:w-auto"
    >
      <TransitionGroup name="toast-right">
        <div
          v-for="t in successToasts"
          :key="t.id"
          class="pointer-events-auto flex items-center justify-center gap-2 whitespace-pre-line rounded-lg bg-emerald-600 px-4 py-2.5 text-left text-sm font-medium text-white shadow-lg"
        >
          <CircleCheck class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {{ t.message }}
          <button
            type="button"
            aria-label="Dismiss"
            class="ml-1 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
            @click="toast.dismiss(t.id)"
          >
            <X class="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <div
          v-for="t in warningToasts"
          :key="t.id"
          class="pointer-events-auto flex items-start gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-left text-sm font-medium text-amber-950 shadow-lg ring-1 ring-amber-500/20"
        >
          <AlertTriangle class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <div class="min-w-0 flex-1">
            <p>{{ getWarningToastParts(t.message).headline }}</p>
            <p
              v-if="getWarningToastParts(t.message).hasStructuredSongLine"
              class="whitespace-pre-line"
            >
              <strong>{{ getWarningToastParts(t.message).title }}</strong>
              by
              {{ getWarningToastParts(t.message).artist }}
            </p>
            <p v-else class="whitespace-pre-line">{{ t.message }}</p>
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            class="ml-1 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
            @click="toast.dismiss(t.id)"
          >
            <X class="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <div
          v-for="t in errorToasts"
          :key="t.id"
          class="pointer-events-auto flex items-center justify-center gap-2 whitespace-pre-line rounded-lg bg-red-600 px-4 py-2.5 text-left text-sm font-medium text-white shadow-lg"
        >
          <CircleX class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {{ t.message }}
          <button
            type="button"
            aria-label="Dismiss"
            class="ml-1 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
            @click="toast.dismiss(t.id)"
          >
            <X class="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>

    <!-- Info toasts — top left -->
    <div
      role="status"
      aria-live="polite"
      class="pointer-events-none fixed left-4 top-4 z-[9999] flex flex-col gap-2"
    >
      <TransitionGroup name="toast-left">
        <div
          v-for="t in infoToasts"
          :key="t.id"
          class="pointer-events-auto flex items-center gap-2 rounded-lg bg-surface px-4 py-2.5 text-left text-sm font-medium whitespace-pre-line text-text shadow-lg ring-1 ring-primary/25"
        >
          <Info class="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
          {{ t.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-right-enter-active,
.toast-right-leave-active,
.toast-left-enter-active,
.toast-left-leave-active {
  transition: all 0.25s ease;
}

.toast-right-enter-from,
.toast-right-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

@media (width >= 640px) {
  .toast-right-enter-from,
  .toast-right-leave-to {
    transform: translateX(1rem);
  }
}

.toast-left-enter-from,
.toast-left-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}
</style>
