<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDecadeTheme } from '@/composables/useDecadeTheme'
import { usePlayerStore } from '@/stores/player'
import YearTabs from '@/components/YearTabs.vue'
import SongList from '@/components/SongList.vue'
import MiniPlayer from '@/components/MiniPlayer.vue'

useDecadeTheme()

const player = usePlayerStore()
const playerContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (playerContainer.value) player.setPlayerContainer(playerContainer.value)
})
</script>

<template>
  <div class="min-h-screen bg-background text-text">
    <YearTabs />
    <SongList />
    <MiniPlayer />
    <div
      ref="playerContainer"
      class="fixed bottom-0 left-0 h-px w-px opacity-[0.01]"
    />
  </div>
</template>
