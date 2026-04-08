<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Page not found | Flashback Charts Australia',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-24 text-center">
    <h1 class="text-4xl font-bold text-primary">Page not found</h1>
    <p class="mt-4 text-text-muted">
      We couldn't find that page. Try the home page to browse by year.
    </p>
    <router-link
      to="/au"
      class="mt-6 inline-block rounded-md bg-surface px-4 py-2 text-sm font-medium text-text hover:bg-tab-inactive"
    >
      Back to home
    </router-link>
  </main>
</template>
