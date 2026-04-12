<script setup lang="ts">
import SongRow from './SongRow.vue'
import type { Song } from '@/types/song'

defineProps<{ song: Song; year: number }>()
</script>

<template>
  <SongRow :song="song" :year="year" variant="card" />
</template>
