<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { useDecadeTheme } from '@/composables/useDecadeTheme'
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
const pageTransitionName = ref('page')

const getDecadeStartYear = (
  routeLocation: Pick<RouteLocationNormalizedLoaded, 'name' | 'params'> | null,
) => {
  if (routeLocation?.name !== 'decade') return null
  const decade = Number.parseInt(String(routeLocation.params.decade), 10)
  return Number.isNaN(decade) ? null : decade
}

const getPageTransitionName = (
  fromRoute: Pick<RouteLocationNormalizedLoaded, 'name' | 'params'> | null,
  toRoute: Pick<RouteLocationNormalizedLoaded, 'name' | 'params'>,
) => {
  if (
    (fromRoute?.name === 'home' && toRoute.name === 'decade') ||
    (fromRoute?.name === 'decade' && toRoute.name === 'home')
  )
    return 'page-home-decade'

  if (fromRoute?.name === 'decade' && toRoute.name === 'decade') {
    const fromDecadeStartYear = getDecadeStartYear(fromRoute)
    const toDecadeStartYear = getDecadeStartYear(toRoute)
    if (fromDecadeStartYear !== null && toDecadeStartYear !== null)
      return toDecadeStartYear > fromDecadeStartYear
        ? 'page-decade-forward'
        : 'page-decade-back'
  }

  return 'page'
}

const pageTransitionKey = computed(() => route.fullPath)
const resetPageScroll = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const openSearch = async () => {
  isSearchOpen.value = true
  await nextTick()
  searchOverlay.value?.focusInput()
}

watch(
  () => chart.selectedYear,
  (year) => {
    if (route.name === 'year' && Number(route.params.year) === year) return
    router.push(`/${year}`)
  },
)

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    const fromRoute = oldPath ? router.resolve(oldPath) : null
    const toRoute = router.resolve(newPath)
    pageTransitionName.value = getPageTransitionName(fromRoute, toRoute)
  },
  { immediate: true },
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
      class="fixed left-4 top-16 z-20 cursor-pointer rounded-full bg-surface/80 p-2 text-text-muted shadow-md backdrop-blur transition-colors hover:text-text"
    >
      <svg
        class="h-5 w-5"
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
      type="button"
      aria-label="Search songs"
      class="fixed right-4 top-16 z-20 cursor-pointer rounded-full bg-surface/80 p-2 text-text-muted shadow-md backdrop-blur transition-colors hover:text-text"
      @click="openSearch"
    >
      <svg
        class="h-5 w-5"
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
        :name="pageTransitionName"
        mode="out-in"
        @after-enter="resetPageScroll"
      >
        <component :is="Component" :key="pageTransitionKey" />
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
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.page-home-decade-enter-active,
.page-home-decade-leave-active,
.page-decade-forward-enter-active,
.page-decade-forward-leave-active,
.page-decade-back-enter-active,
.page-decade-back-leave-active {
  transition:
    opacity 0.34s ease,
    transform 0.34s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.34s ease;
}

.page-home-decade-enter-from,
.page-home-decade-leave-to {
  opacity: 0;
  filter: blur(10px);
}

.page-home-decade-enter-from {
  transform: translateY(24px) scale(0.985);
}

.page-home-decade-leave-to {
  transform: translateY(-18px) scale(1.01);
}

.page-decade-forward-enter-from,
.page-decade-back-enter-from,
.page-decade-forward-leave-to,
.page-decade-back-leave-to {
  opacity: 0;
  filter: blur(6px);
}

.page-decade-forward-enter-from {
  transform: translateX(36px);
}

.page-decade-forward-leave-to {
  transform: translateX(-28px);
}

.page-decade-back-enter-from {
  transform: translateX(-36px);
}

.page-decade-back-leave-to {
  transform: translateX(28px);
}
</style>
