<script setup lang="ts">
import { Keyboard } from 'lucide-vue-next'

const emit = defineEmits<{ close: [] }>()

const isMac = navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'

const hotkeys = [
  {
    keys: ['Space'],
    description: 'Play / pause (or play top song on year page)',
  },
  { keys: [mod, '←'], description: 'Previous song' },
  { keys: [mod, '→'], description: 'Next song' },
  { keys: [mod, 'F'], description: 'Open search' },
]

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    @click.self="emit('close')"
    @keydown="handleKeydown"
  >
    <div class="w-full max-w-sm rounded-xl bg-surface p-6 shadow-xl">
      <div class="mb-5 flex items-center gap-2.5">
        <Keyboard class="h-5 w-5 text-primary" />
        <h2 class="text-lg font-bold text-text">Keyboard Shortcuts</h2>
      </div>

      <ul class="flex flex-col gap-3">
        <li
          v-for="{ keys, description } in hotkeys"
          :key="description"
          class="flex items-center justify-between gap-4"
        >
          <span class="text-sm text-text-muted">{{ description }}</span>
          <span class="flex flex-shrink-0 items-center gap-1">
            <kbd
              v-for="key in keys"
              :key="key"
              class="rounded bg-background px-2 py-0.5 font-mono text-xs font-semibold text-text shadow-sm ring-1 ring-primary/20"
            >
              {{ key }}
            </kbd>
          </span>
        </li>
      </ul>

      <button
        type="button"
        class="mt-6 w-full rounded-lg bg-background py-2 text-sm text-text-muted transition-colors hover:text-text"
        @click="emit('close')"
      >
        Close
      </button>
    </div>
  </div>
</template>
