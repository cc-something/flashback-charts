<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  provide,
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
} from 'vue'
import { useHead } from '@unhead/vue'
import { useElementSize } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { Keyboard, Link, Mail, Mailbox } from 'lucide-vue-next'
import { useDecadeTheme } from '@/composables/useDecadeTheme'
import { useEmailSignup } from '@/composables/useEmailSignup'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'
import {
  useRickRollMode,
  RICK_ASTLEY_SONG,
  RICK_ASTLEY_YEAR,
} from '@/composables/useRickRollMode'
import { useHotkeys } from '@/composables/useHotkeys'
import { useChartStore } from '@/stores/chart'
import { usePlayerStore } from '@/stores/player'
import { useToastStore } from '@/stores/toast'
import { getHomeTheme, getThemeForYear } from '@/themes'
import {
  brandFontFamily,
  brandFontUrl,
  getBrandFontLinks,
  getThemeFontLinks,
} from '@/themes/font'
import YearTabs from '@/components/YearTabs.vue'
const MiniPlayer = defineAsyncComponent(
  () => import('@/components/MiniPlayer.vue'),
)
const ErrorToast = defineAsyncComponent(
  () => import('@/components/ErrorToast.vue'),
)
const RickRollBanner = defineAsyncComponent(
  () => import('@/components/RickRollBanner.vue'),
)

const SearchOverlay = defineAsyncComponent(
  () => import('@/components/SearchOverlay.vue'),
)
const HotkeysModal = defineAsyncComponent(
  () => import('@/components/HotkeysModal.vue'),
)
const EmailSignupModal = defineAsyncComponent(
  () => import('@/components/EmailSignupModal.vue'),
)
const ContactModal = defineAsyncComponent(
  () => import('@/components/ContactModal.vue'),
)

useDecadeTheme()
const emailSignup = useEmailSignup()
const { loadScript, trackPageview, trackEvent } = usePlausibleAnalytics()
const {
  isRickRollActive,
  setupKonamiListener,
  teardownKonamiListener,
  deactivate,
} = useRickRollMode()

const route = useRoute()
const router = useRouter()
const chart = useChartStore()
const player = usePlayerStore()
const toast = useToastStore()
const playerContainer = ref<HTMLDivElement | null>(null)
const stickyBar = ref<HTMLDivElement | null>(null)
const { height: stickyBarHeight } = useElementSize(stickyBar)
const isSearchOpen = ref(false)
const isHotkeysOpen = ref(false)
const isContactOpen = ref(false)
const isContactEmailRevealed = ref(false)
const searchOverlay = ref<InstanceType<typeof SearchOverlay> | null>(null)
const hasToasts = computed(() => toast.toasts.length > 0)
const isHomeRoute = computed(() => route.name === 'home')
const brandTheme = { fontFamily: brandFontFamily, fontUrl: brandFontUrl }
const socialLinks = [
  {
    href: 'https://www.facebook.com/people/Flashback-Charts/61572091223850/',
    label: 'Facebook',
    network: 'facebook',
  },
  {
    href: 'https://www.x.com/FlashbackCharts',
    label: 'X.com',
    network: 'x',
  },
] as const
const handleSocialLinkClick = (network: string) =>
  trackEvent('social_link_click', { network })
const revealContactEmail = () => {
  if (isContactEmailRevealed.value) return
  isContactEmailRevealed.value = true
  trackEvent('reveal email')
}
const getActiveTheme = () => {
  if (route.name === 'year') {
    const routeYear = Number(route.params.year)
    if (!Number.isNaN(routeYear)) return getThemeForYear(routeYear)
  }

  if (route.name === 'decade') {
    const routeDecade = Number.parseInt(String(route.params.decade), 10)
    if (!Number.isNaN(routeDecade)) return getThemeForYear(routeDecade)
  }

  return getHomeTheme()
}
const activeTheme = computed(() => getActiveTheme())
useHead(() => ({
  htmlAttrs: { lang: 'en-AU' },
  link:
    activeTheme.value.fontUrl === brandTheme.fontUrl
      ? getThemeFontLinks(activeTheme.value)
      : [
          ...getThemeFontLinks(activeTheme.value),
          ...getBrandFontLinks().map((link) => ({
            ...link,
            key: `brand-${link.key}`,
          })),
        ],
}))
const headerContainerClass = computed(() =>
  route.name === 'year'
    ? 'header-container mx-auto flex max-w-[50.4rem] items-center justify-between px-4 py-1'
    : 'header-container mx-auto flex max-w-[1300px] items-center justify-between px-4 py-1',
)
const headerWordmarkClass = computed(() =>
  isHomeRoute.value
    ? 'flex items-start gap-[0.25em] font-bold text-primary no-underline'
    : 'flex items-center gap-[0.25em] font-bold text-primary no-underline',
)
const headerWordmarkStyle = computed(() => ({
  fontFamily: brandTheme.fontFamily,
  fontSize: isHomeRoute.value ? 'clamp(1.6rem, 7vw, 3rem)' : '1.25rem',
  lineHeight: isHomeRoute.value ? 'clamp(1.9rem, 7.5vw, 3.25rem)' : '1.75rem',
  transition: 'font-size 220ms ease, line-height 220ms ease',
}))
const headerIconStyle = computed(() => ({
  width: isHomeRoute.value ? 'clamp(1.5rem, 6vw, 2.5rem)' : '1.5rem',
  height: isHomeRoute.value ? 'clamp(1.5rem, 6vw, 2.5rem)' : '1.5rem',
  marginTop: isHomeRoute.value ? 'clamp(0.12rem, 0.8vw, 0.32rem)' : '0',
  transition: 'width 220ms ease, height 220ms ease',
}))

const openSearch = async () => {
  isSearchOpen.value = true
  await nextTick()
  searchOverlay.value?.focusInput()
}

provide('openSearch', openSearch)
useHotkeys(
  openSearch,
  () => isSearchOpen.value || isHotkeysOpen.value,
  deactivate,
)

const discRotation = ref(0)
const isDiscSpinning = ref(false)
let discRafId: number | null = null
let discLastTime: number | null = null
const DISC_SPEED = 120 // degrees per second

const spinDisc = (timestamp: number) => {
  if (discLastTime !== null) {
    discRotation.value += ((timestamp - discLastTime) / 1000) * DISC_SPEED
  }
  discLastTime = timestamp
  discRafId = requestAnimationFrame(spinDisc)
}

const startDiscSpin = () => {
  if (isDiscSpinning.value) return
  isDiscSpinning.value = true
  discLastTime = null
  discRafId = requestAnimationFrame(spinDisc)
}

const stopDiscSpin = () => {
  if (!isDiscSpinning.value) return
  isDiscSpinning.value = false
  if (discRafId !== null) cancelAnimationFrame(discRafId)
  discRafId = null
  discLastTime = null
  discRotation.value = 0
}

const discStyle = computed(() => ({
  ...headerIconStyle.value,
  transform: `rotate(${discRotation.value % 360}deg)`,
  transition: isDiscSpinning.value ? 'none' : 'transform 0.6s ease-out',
}))

watch(
  () => player.playerState,
  (state) => {
    if (state === 'playing') startDiscSpin()
    else stopDiscSpin()
  },
  { immediate: true },
)

onUnmounted(() => {
  if (discRafId !== null) cancelAnimationFrame(discRafId)
})

watch(
  () => chart.selectedYear,
  (year) => {
    if (route.name === 'year' && Number(route.params.year) === year) return
    router.push(`/au/${year}`)
  },
)

watch(
  () => route.fullPath,
  () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'instant' })
  },
)

watch(isRickRollActive, (isActive) => {
  if (isActive) {
    trackEvent('rickroll_activated')
    player.play(RICK_ASTLEY_SONG, RICK_ASTLEY_YEAR)
  }
})

onMounted(async () => {
  if (playerContainer.value) player.setPlayerContainer(playerContainer.value)
  setupKonamiListener()
  await loadScript()
  trackPageview()
  watch(
    () => route.path,
    () => trackPageview(),
  )
})

onUnmounted(() => teardownKonamiListener())
</script>

<template>
  <div
    class="min-h-screen bg-background text-text pb-20"
    :style="{ '--sticky-bar-height': stickyBarHeight + 'px' }"
  >
    <div ref="stickyBar" class="sticky top-0 z-40">
      <header class="border-b border-primary/15 bg-surface">
        <div :class="headerContainerClass">
          <router-link
            to="/au"
            :class="headerWordmarkClass"
            :style="headerWordmarkStyle"
          >
            <img src="/cd.png" alt="" :style="discStyle" />
            Flashback Charts Australia
          </router-link>
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
        </div>
      </header>

      <YearTabs />
      <RickRollBanner v-if="isRickRollActive" @deactivate="deactivate" />
    </div>

    <router-view v-slot="{ Component }">
      <component :is="Component" :key="route.fullPath" />
    </router-view>

    <footer
      class="relative z-20 mx-auto flex w-full max-w-[1300px] flex-wrap items-center justify-center gap-6 px-4 py-6"
    >
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-sm text-text-muted underline underline-offset-4 transition-colors hover:text-text"
        @click="emailSignup.show.value = true"
      >
        <Mailbox class="h-3.5 w-3.5" />
        Sign up for our Newsletter
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-sm text-text-muted underline underline-offset-4 transition-colors hover:text-text"
        @click="isContactOpen = true"
      >
        <Mail class="h-3.5 w-3.5" />
        Contact us
      </button>
      <div class="flex items-center gap-4">
        <a
          v-for="{ href, label, network } in socialLinks"
          :key="href"
          :href="href"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-1.5 text-sm text-text-muted underline underline-offset-4 transition-colors hover:text-text"
          @click="handleSocialLinkClick(network)"
        >
          <Link class="h-3.5 w-3.5" />
          {{ label }}
        </a>
      </div>
      <button
        type="button"
        class="hidden items-center gap-1.5 text-sm text-text-muted underline underline-offset-4 transition-colors hover:text-text sm:inline-flex"
        @click="isHotkeysOpen = true"
      >
        <Keyboard class="h-3.5 w-3.5" />
        Shortcuts
      </button>
    </footer>

    <MiniPlayer v-if="player.isActive" />
    <SearchOverlay
      v-if="isSearchOpen"
      ref="searchOverlay"
      @close="isSearchOpen = false"
    />
    <HotkeysModal v-if="isHotkeysOpen" @close="isHotkeysOpen = false" />
    <EmailSignupModal
      v-if="emailSignup.show.value"
      @dismiss="emailSignup.dismiss"
      @submit="emailSignup.submit"
    />
    <ContactModal
      v-if="isContactOpen"
      :revealed="isContactEmailRevealed"
      @close="isContactOpen = false"
      @reveal="revealContactEmail"
    />
    <div
      ref="playerContainer"
      class="fixed bottom-0 left-0 h-px w-px opacity-[0.01]"
    />
    <ErrorToast v-if="hasToasts" />
  </div>
</template>

<style scoped>
.header-container {
  transition: max-width 220ms ease;
}
</style>
