<script setup lang="ts">
import { provide, ref, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { applyPendingTheme, useDecadeTheme } from '@/composables/useDecadeTheme'
import { useEmailSignup } from '@/composables/useEmailSignup'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import { getHomeTheme } from '@/themes'
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
const handlePageAfterLeave = () => {
  if (typeof window === 'undefined') return
  applyPendingTheme()
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const openSearch = async () => {
  isSearchOpen.value = true
  await nextTick()
  searchOverlay.value?.focusInput()
}

provide('openSearch', openSearch)

const homeTheme = getHomeTheme()

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
    <div class="sticky top-0 z-40">
      <header
        class="flex items-center justify-between border-b border-primary/15 bg-surface px-4 py-1"
      >
        <div class="flex items-center gap-2">
          <router-link
            v-if="route.path !== '/'"
            to="/"
            aria-label="Home"
            class="flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors duration-150 hover:text-primary"
          >
            <svg
              class="h-4 w-4"
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
          <router-link
            to="/"
            class="flex items-center gap-1.5 text-sm font-bold text-primary no-underline"
            :style="{ fontFamily: homeTheme.fontFamily }"
          >
            <img src="/cd.png" alt="" class="h-4 w-4" />
            Flashback Charts
          </router-link>
        </div>
        <button
          type="button"
          aria-label="Search songs"
          class="flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors duration-150 hover:text-primary"
          @click="openSearch"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <YearTabs />
    </div>

    <router-view v-slot="{ Component }">
      <Transition name="page" mode="out-in" @after-leave="handlePageAfterLeave">
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
