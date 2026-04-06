<script setup lang="ts">
import { provide, ref, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { applyPendingTheme, useDecadeTheme } from '@/composables/useDecadeTheme'
import { useEmailSignup } from '@/composables/useEmailSignup'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import YearTabs from '@/components/YearTabs.vue'
import MiniPlayer from '@/components/MiniPlayer.vue'
import SearchOverlay from '@/components/SearchOverlay.vue'
import EmailSignupModal from '@/components/EmailSignupModal.vue'
import ErrorToast from '@/components/ErrorToast.vue'

useDecadeTheme()
const emailSignup = useEmailSignup()
const { loadScript, trackPageview } = usePlausibleAnalytics()

const route = useRoute()
const router = useRouter()
const chart = useChartStore()
const player = usePlayerStore()
const playerContainer = ref<HTMLDivElement | null>(null)
const isSearchOpen = ref(false)
const searchOverlay = ref<InstanceType<typeof SearchOverlay> | null>(null)
const resetPageScroll = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const openSearch = async () => {
  isSearchOpen.value = true
  await nextTick()
  searchOverlay.value?.focusInput()
}

provide('openSearch', openSearch)

watch(
  () => chart.selectedYear,
  (year) => {
    if (route.name === 'year' && Number(route.params.year) === year) return
    router.push(`/${year}`)
  },
)

onMounted(async () => {
  if (playerContainer.value) player.setPlayerContainer(playerContainer.value)
  await loadScript()
  trackPageview()
  watch(
    () => route.path,
    () => trackPageview(),
  )
})
</script>

<template>
  <div class="min-h-screen bg-background text-text">
    <YearTabs />

    <router-link
      v-if="route.path !== '/'"
      to="/"
      aria-label="Home"
      class="fixed left-4 top-20 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-surface/88 text-text shadow-lg shadow-black/15 ring-1 ring-primary/25 backdrop-blur-md transition duration-200 hover:scale-[1.04] hover:bg-surface hover:text-primary hover:ring-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <svg
        class="h-5 w-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M3 11 12 3l9 8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 10v10h14V10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </router-link>

    <button
      v-if="route.path !== '/'"
      type="button"
      aria-label="Search songs"
      class="fixed right-4 top-20 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-surface/88 text-text shadow-lg shadow-black/15 ring-1 ring-primary/25 backdrop-blur-md transition duration-200 hover:scale-[1.04] hover:bg-surface hover:text-primary hover:ring-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      @click="openSearch"
    >
      <svg
        class="h-5 w-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" stroke-linecap="round" />
      </svg>
    </button>

    <router-view v-slot="{ Component }">
      <Transition
        name="page"
        mode="out-in"
        @after-enter="resetPageScroll"
        @after-leave="applyPendingTheme"
      >
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </router-view>

    <MiniPlayer />
    <SearchOverlay
      v-if="isSearchOpen"
      ref="searchOverlay"
      @close="isSearchOpen = false"
    />
    <EmailSignupModal
      v-if="emailSignup.show.value"
      @dismiss="emailSignup.dismiss"
      @submit="emailSignup.submit"
    />
    <div
      ref="playerContainer"
      class="fixed bottom-0 left-0 h-px w-px opacity-[0.01]"
    />
    <ErrorToast />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.22s ease;
  will-change: opacity;
}

.page-enter-from {
  opacity: 0;
}

.page-enter-to {
  opacity: 1;
}

.page-leave-to {
  opacity: 0;
}
</style>
