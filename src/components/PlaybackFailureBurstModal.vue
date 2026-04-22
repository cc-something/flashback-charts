<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { AlertTriangle, ShieldAlert, Wifi, X } from 'lucide-vue-next'

const emit = defineEmits<{ close: [] }>()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
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
      aria-labelledby="playback-failure-burst-title"
      class="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="relative mx-4 mt-[14vh] w-full max-w-lg rounded-xl bg-surface p-8 shadow-2xl"
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
          <AlertTriangle class="h-5 w-5 text-primary" />
          <h2
            id="playback-failure-burst-title"
            class="text-lg font-bold text-text"
          >
            Playback stopped after repeated failures
          </h2>
        </div>

        <div class="space-y-4 text-sm leading-relaxed text-text-muted">
          <p>
            We stopped playback after several consecutive embed failures to
            avoid skipping rapidly through the chart.
          </p>
          <p>
            Please check your network configuration before trying again. YouTube
            can sometimes block embedded playback if your connection looks
            unusual.
          </p>
          <div class="rounded-xl bg-background/70 p-4">
            <p class="mb-3 font-bold text-text">Things to check</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <ShieldAlert
                  class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                />
                <span>
                  Disable any VPN, proxy, privacy relay, or similar
                  traffic-routing tool.
                </span>
              </li>
              <li class="flex items-start gap-2">
                <Wifi class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>
                  Retry on a standard home or mobile connection if you are on a
                  filtered, corporate, or unusual network.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            type="button"
            class="inline-flex cursor-pointer items-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-background transition-opacity hover:opacity-90"
            @click="emit('close')"
          >
            OK
          </button>
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
