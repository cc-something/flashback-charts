<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Mail, X } from 'lucide-vue-next'

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-signup-title"
      class="fixed inset-0 z-40 flex items-start justify-center bg-background/80 backdrop-blur-sm"
      @click.self="emit('dismiss')"
      @keydown.escape="emit('dismiss')"
    >
      <div
        class="relative mx-4 mt-[20vh] w-full max-w-md rounded-xl border border-white/12 bg-surface p-8 shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          class="absolute top-0 right-0 inline-flex h-8 w-8 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full border border-white/15 bg-background/90 text-text/65 shadow-[0_10px_24px_rgb(0_0_0_/_0.2)] ring-1 ring-primary/15 transition-colors hover:bg-background hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-10 sm:w-10"
          @click="emit('dismiss')"
        >
          <X class="h-5 w-5" />
        </button>

        <template v-if="!submitted">
          <div class="flex items-center gap-2.5">
            <Mail class="h-5 w-5 text-primary" />
            <h2 id="email-signup-title" class="text-xl font-bold text-text">
              Sign up for our Newsletter
            </h2>
          </div>
          <p class="mt-2 text-sm text-text-muted">
            Get occasional updates from us, including when new features or
            charts are added.
            <br />
            <br />
            We don't share your email with anyone, and you can unsubscribe at
            any time.
          </p>

          <form
            class="mt-5 flex flex-col gap-2 sm:flex-row"
            @submit.prevent="handleSubmit"
          >
            <input
              ref="inputEl"
              v-model="email"
              type="email"
              aria-label="Email address"
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
            We'll keep you posted with occasional updates from Flashback Charts.
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
