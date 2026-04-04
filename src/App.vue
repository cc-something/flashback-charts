<script setup lang="ts">
import { useDecadeTheme } from '@/composables/useDecadeTheme'
import YearTabs from '@/components/YearTabs.vue'
import SongList from '@/components/SongList.vue'

useDecadeTheme()
</script>

<template>
  <div class="min-h-screen bg-background text-text">
    <YearTabs />
    <SongList />
  </div>
</template>
