<script setup lang="ts">
import { inject } from 'vue'
import { useHead } from '@unhead/vue'
import { Home, Search, TriangleAlert } from 'lucide-vue-next'
import { getHomePath } from '@/utils/url'

const openSearch = inject<() => void>('openSearch')

useHead({
  title: 'Page not found | Flashback Charts Australia',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <main class="flex w-full items-center justify-center px-4 py-10">
    <section
      class="mx-auto flex min-h-[calc(100dvh-var(--sticky-bar-height,0px)-var(--footer-height,0px)-4rem)] max-w-2xl flex-col items-center justify-center text-center"
    >
      <h1
        class="flex items-center justify-center gap-3 text-4xl font-bold text-primary sm:text-5xl"
      >
        <TriangleAlert class="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
        <span>Page not found</span>
      </h1>

      <p class="mt-4 max-w-xl text-lg text-text-muted">
        It doesn't exist or has been moved.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <router-link
          :to="getHomePath()"
          class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <Home class="h-4 w-4" />
          <span>Home</span>
        </router-link>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          @click="openSearch?.()"
        >
          <Search class="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </section>
  </main>
</template>
