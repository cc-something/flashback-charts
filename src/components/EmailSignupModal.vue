<script setup lang="ts">
import { ref, nextTick } from 'vue'

const emit = defineEmits<{
  dismiss: []
  submit: [email: string]
}>()

const email = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const submitted = ref(false)
const error = ref('')

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const handleSubmit = () => {
  if (!isValidEmail(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }
  error.value = ''
  submitted.value = true
  setTimeout(() => emit('submit', email.value), 1500)
}

const focusInput = async () => {
  await nextTick()
  inputEl.value?.focus()
}

defineExpose({ focusInput })
</script>

<template>
  <Transition name="modal" appear @after-enter="focusInput">
    <div
      class="fixed inset-0 z-40 flex items-start justify-center bg-background/80 backdrop-blur-sm"
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
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <template v-if="!submitted">
          <h2 class="text-xl font-bold text-text">Stay in the loop</h2>
          <p class="mt-2 text-sm text-text-muted">
            Get notified when we add new charts, decades, and features. No spam,
            just the hits.
          </p>

          <form
            class="mt-5 flex flex-col gap-2 sm:flex-row"
            @submit.prevent="handleSubmit"
          >
            <input
              ref="inputEl"
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="min-w-0 flex-1 rounded-lg border border-text-muted/20 bg-background px-3.5 py-2.5 text-sm text-text placeholder-text-muted/50 outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              class="w-full cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90 sm:w-auto"
            >
              Subscribe
            </button>
          </form>
          <p v-if="error" class="mt-2 text-xs text-red-400">{{ error }}</p>
        </template>

        <template v-else>
          <h2 class="text-xl font-bold text-text">You're on the list!</h2>
          <p class="mt-2 text-sm text-text-muted">
            We'll keep you posted on new charts and features.
          </p>
        </template>
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
