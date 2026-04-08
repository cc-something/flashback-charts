<script setup lang="ts">
import { computed } from 'vue'
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
</script>

<template>
  <Teleport to="body">
    <!-- Error toasts — top right -->
    <div
      class="pointer-events-none fixed right-4 top-4 z-[9999] flex flex-col gap-2"
    >
      <TransitionGroup name="toast-right">
        <div
          v-for="t in successToasts"
          :key="t.id"
          class="pointer-events-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          <svg
            class="h-4 w-4 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 14-4-4 1.41-1.41L10 13.17l6.59-6.58L18 8l-8 8Z"
            />
          </svg>
          {{ t.message }}
          <button
            type="button"
            aria-label="Dismiss"
            class="ml-1 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
            @click="toast.dismiss(t.id)"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
        <div
          v-for="t in errorToasts"
          :key="t.id"
          class="pointer-events-auto flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          <svg
            class="h-4 w-4 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            />
          </svg>
          {{ t.message }}
          <button
            type="button"
            aria-label="Dismiss"
            class="ml-1 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
            @click="toast.dismiss(t.id)"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>

    <!-- Info toasts — top left -->
    <div
      class="pointer-events-none fixed left-4 top-4 z-[9999] flex flex-col gap-2"
    >
      <TransitionGroup name="toast-left">
        <div
          v-for="t in infoToasts"
          :key="t.id"
          class="pointer-events-auto flex items-center gap-2 rounded-lg bg-surface px-4 py-2.5 text-sm font-medium text-text shadow-lg ring-1 ring-primary/25"
        >
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
  transform: translateX(1rem);
}

.toast-left-enter-from,
.toast-left-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}
</style>
