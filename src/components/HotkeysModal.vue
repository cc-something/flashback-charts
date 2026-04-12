<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { Component } from 'vue'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Keyboard,
  X,
} from 'lucide-vue-next'

const emit = defineEmits<{ close: [] }>()

const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'
const keyIconByLabel: Record<string, Component> = {
  '↑': ArrowUp,
  '↓': ArrowDown,
  '←': ArrowLeft,
  '→': ArrowRight,
}

const sections = [
  {
    label: 'Playback',
    rows: [
      { keyGroups: [['Space'], ['K']], description: 'Play / pause' },
      { keyGroups: [[mod, '←']], description: 'Previous song' },
      { keyGroups: [[mod, '→']], description: 'Next song' },
      { keyGroups: [['J']], description: 'Rewind 10s' },
      { keyGroups: [['L']], description: 'Fast-forward 10s' },
      { keyGroups: [['F']], description: 'Toggle player full-screen' },
      {
        keyGroups: [['Esc']],
        description: 'Exit full-screen or stop playback',
      },
    ],
  },
  {
    label: 'Navigation',
    rows: [
      { keyGroups: [[mod, '[']], description: 'Previous year' },
      { keyGroups: [[mod, ']']], description: 'Next year' },
      { keyGroups: [['G']], description: 'Go to playing song' },
    ],
  },
  {
    label: 'App',
    rows: [
      { keyGroups: [[mod, 'F']], description: 'Open search' },
      { keyGroups: [['S']], description: 'Toggle sort order' },
    ],
  },
]

const konamiKeys = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A']
const getKeyIcon = (key: string) => keyIconByLabel[key] ?? null

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="hotkeys-modal-title"
    class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div class="relative w-full max-w-lg rounded-xl bg-surface p-6 shadow-xl">
      <button
        type="button"
        aria-label="Close"
        class="absolute right-3 top-3 cursor-pointer rounded-full p-1.5 text-text-muted transition-colors hover:text-text"
        @click="emit('close')"
      >
        <X class="h-5 w-5" />
      </button>

      <div class="mb-5 flex items-center gap-2.5">
        <Keyboard class="h-5 w-5 text-primary" />
        <h2 id="hotkeys-modal-title" class="text-lg font-bold text-text">
          Keyboard Shortcuts
        </h2>
      </div>

      <div class="flex flex-col gap-5">
        <div v-for="section in sections" :key="section.label">
          <p
            class="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted/70"
          >
            {{ section.label }}
          </p>
          <ul class="flex flex-col gap-2.5">
            <li
              v-for="{ keyGroups, description } in section.rows"
              :key="description"
              class="flex items-center justify-between gap-4"
            >
              <span class="text-sm text-text-muted">{{ description }}</span>
              <span class="flex flex-shrink-0 items-center gap-1.5">
                <template v-for="(group, gi) in keyGroups" :key="gi">
                  <span v-if="gi > 0" class="text-xs text-text-muted/50">
                    or
                  </span>
                  <span class="flex items-center gap-1">
                    <kbd
                      v-for="key in group"
                      :key="key"
                      class="inline-flex h-8 min-w-8 items-center justify-center rounded-md bg-background px-2.5 font-mono text-sm font-semibold text-text shadow-sm ring-1 ring-primary/20"
                    >
                      <component
                        :is="getKeyIcon(key)"
                        v-if="getKeyIcon(key)"
                        class="h-3.5 w-3.5"
                      />
                      <template v-else>{{ key }}</template>
                    </kbd>
                  </span>
                </template>
              </span>
            </li>
          </ul>
        </div>

        <!-- Konami easter egg -->
        <ul class="mt-1 list-none border-t border-primary/10 pt-4">
          <li class="flex items-center justify-between gap-4">
            <span class="text-3xl">🪩🕺?</span>
            <span
              class="flex flex-shrink-0 flex-wrap items-center justify-end gap-1"
            >
              <kbd
                v-for="key in konamiKeys"
                :key="key"
                class="inline-flex h-8 min-w-8 items-center justify-center rounded-md bg-background px-2.5 font-mono text-sm font-semibold text-text shadow-sm ring-1 ring-primary/20"
              >
                <component
                  :is="getKeyIcon(key)"
                  v-if="getKeyIcon(key)"
                  class="h-3.5 w-3.5"
                />
                <template v-else>{{ key }}</template>
              </kbd>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
