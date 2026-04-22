<script setup lang="ts">
import { computed } from 'vue'
import { AlertTriangle, CircleCheck, CircleX, Info, X } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const topRightToasts = computed(() => toast.toasts)

const getWarningToastParts = (message: string) => {
  const [headline, songLine = ''] = message.split('\n')
  const match = songLine.match(/^\(<b>(.+)<\/b> by <b>(.+)<\/b>\)$/)
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

const getToastClass = (variant: string) => {
  if (variant === 'success')
    return 'pointer-events-auto flex w-fit max-w-full self-end items-center justify-center gap-2 whitespace-pre-line rounded-lg bg-emerald-600 px-4 py-2.5 text-left text-sm font-medium text-white shadow-lg'
  if (variant === 'warning')
    return 'pointer-events-auto flex w-fit max-w-full self-end items-start gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-left text-sm font-medium text-amber-950 shadow-lg ring-1 ring-amber-500/20'
  if (variant === 'error')
    return 'pointer-events-auto flex w-fit max-w-full self-end items-center justify-center gap-2 whitespace-pre-line rounded-lg bg-red-600 px-4 py-2.5 text-left text-sm font-medium text-white shadow-lg'
  return 'pointer-events-auto flex w-fit max-w-full self-end items-center gap-2 rounded-lg bg-surface px-4 py-2.5 text-left text-sm font-medium whitespace-pre-line text-text shadow-lg ring-1 ring-primary/25'
}
</script>

<template>
  <Teleport to="body">
    <div
      role="status"
      aria-live="polite"
      class="pointer-events-none fixed right-4 z-[9999] flex w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:w-auto"
      :style="{ top: 'calc(var(--sticky-bar-height, 0px) + 1rem)' }"
    >
      <TransitionGroup name="toast-right">
        <div
          v-for="t in topRightToasts"
          :key="t.id"
          :class="getToastClass(t.variant)"
        >
          <CircleCheck
            v-if="t.variant === 'success'"
            class="h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          />
          <AlertTriangle
            v-else-if="t.variant === 'warning'"
            class="h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          />
          <CircleX
            v-else-if="t.variant === 'error'"
            class="h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          />
          <Info
            v-else
            class="h-4 w-4 flex-shrink-0 text-primary"
            aria-hidden="true"
          />
          <div v-if="t.variant === 'warning'" class="min-w-0 flex-1">
            <p>{{ getWarningToastParts(t.message).headline }}</p>
            <p
              v-if="getWarningToastParts(t.message).hasStructuredSongLine"
              class="whitespace-pre-line"
            >
              <strong>{{ getWarningToastParts(t.message).title }}</strong>
              by
              <strong>{{ getWarningToastParts(t.message).artist }}</strong>
            </p>
          </div>
          <template v-else>
            {{ t.message }}
          </template>
          <button
            v-if="t.variant !== 'info'"
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
  </Teleport>
</template>

<style scoped>
.toast-right-enter-active,
.toast-right-leave-active {
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
</style>
