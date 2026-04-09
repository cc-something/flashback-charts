<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PlaybackSeekBar from './PlaybackSeekBar.vue'
import { usePlayerStore } from '@/stores/player'
import { getThemeForYear } from '@/themes'
import { getYearPath } from '@/utils/url'

const props = withDefaults(
  defineProps<{
    layout?: 'mobile' | 'desktop'
  }>(),
  {
    layout: 'mobile',
  },
)
const player = usePlayerStore()
const route = useRoute()
const router = useRouter()
const themeVars = ref<Record<string, string>>({})

const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC')
const mod = isMac ? '⌘' : 'Ctrl'
const miniPlayerButtonClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full text-text/55 transition-colors hover:bg-black/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
const shouldRenderMiniPlayer = computed(() => {
  if (!player.isMiniPlayerVisible || !player.playingSong) return false
  return !(
    route.name === 'year' && Number(route.params.year) === player.playingYear
  )
})
const miniPlayerContainerClass = computed(() =>
  props.layout === 'desktop'
    ? 'relative px-4 pt-2 pb-2.5'
    : route.name === 'year'
      ? 'relative mx-auto max-w-[50.4rem] px-4 pt-1.5 pb-2.5'
      : 'relative mx-auto max-w-[1300px] px-4 pt-1.5 pb-2.5',
)
const updateThemeVars = (year: number | null) => {
  if (year === null) return
  const theme = getThemeForYear(year)
  themeVars.value = {
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--color-accent': theme.colors.accent,
    '--color-tab-active': theme.colors.tabActive,
    '--color-tab-inactive': theme.colors.tabInactive,
    'font-family': theme.bodyFontFamily ?? theme.fontFamily,
  }
}
const scrollToPlayingSongRow = async () => {
  const year = player.playingYear
  const song = player.playingSong
  if (typeof window === 'undefined' || year === null || !song) return
  await nextTick()
  requestAnimationFrame(() => {
    document
      .getElementById(`song-${year}-${song.rank}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}
watch(() => player.playingYear, updateThemeVars, { immediate: true })
const goToPlayingSong = async () => {
  const year = player.playingYear
  const song = player.playingSong
  if (year === null || !song) return
  const routeSong = Array.isArray(route.query.song)
    ? route.query.song[0]
    : route.query.song
  if (
    route.name === 'year' &&
    Number(route.params.year) === year &&
    Number(routeSong) === song.rank
  ) {
    await scrollToPlayingSongRow()
    return
  }
  await router.push({
    path: getYearPath(year),
    query: { song: String(song.rank) },
  })
}
</script>

<template>
  <Transition name="mini-player">
    <aside
      v-if="
        shouldRenderMiniPlayer &&
        player.playingSong &&
        props.layout === 'mobile'
      "
      aria-label="Music player"
      :style="themeVars"
      class="group bg-surface/95 backdrop-blur-sm transition-colors duration-150 hover:bg-primary/10"
    >
      <div :class="miniPlayerContainerClass">
        <div class="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            :aria-label="`Toggle playback for ${player.playingSong.title}`"
            class="relative h-8 w-8 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10"
            @click="player.togglePlayback"
          >
            <img
              :src="player.playingSong.thumbnailPath"
              :alt="player.playingSong.title"
              class="block h-full w-full object-cover"
            />
          </button>

          <button
            type="button"
            title="Go to song (G)"
            aria-label="Go to song"
            class="min-w-0 flex-1 cursor-pointer rounded-md px-1 py-0.5 text-left transition-colors duration-150 group-hover:bg-black/5 hover:bg-black/5"
            @click="goToPlayingSong"
          >
            <span
              class="flex min-w-0 items-baseline gap-1.5 overflow-hidden sm:gap-2"
            >
              <span
                class="shrink-0 text-[0.95rem] font-bold leading-tight text-primary sm:text-base"
              >
                {{ player.playingYear }} #{{ player.playingSong.rank }}
              </span>
              <span
                class="min-w-0 truncate text-[0.82rem] leading-tight sm:text-sm"
              >
                <span class="font-semibold text-text">
                  {{ player.playingSong.title }}
                </span>
                <span class="ml-1.5 font-medium text-text/55 sm:ml-2">
                  {{ player.playingSong.artist }}
                </span>
              </span>
            </span>
          </button>

          <span
            v-if="player.showSeekBar"
            class="hidden shrink-0 font-mono text-[0.66rem] tabular-nums text-text-muted sm:inline"
          >
            {{ player.formattedCurrentTime }}/{{ player.formattedDuration }}
          </span>

          <div class="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              :title="`Previous song (${mod}+←)`"
              aria-label="Previous song"
              :class="miniPlayerButtonClass"
              @click="player.playPrev()"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button
              type="button"
              title="Play / pause (Space or K)"
              aria-label="Toggle playback"
              :class="miniPlayerButtonClass"
              @click="player.togglePlayback"
            >
              <svg
                v-if="player.playerState === 'loading'"
                class="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <svg
                v-else-if="player.playerState === 'playing'"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              type="button"
              :title="`Next song (${mod}+→)`"
              aria-label="Next song"
              :class="miniPlayerButtonClass"
              @click="player.playNext()"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            <button
              type="button"
              title="Stop playback (Esc)"
              aria-label="Stop playback"
              :class="miniPlayerButtonClass"
              @click="player.stop"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
        </div>

        <PlaybackSeekBar
          v-if="player.showSeekBar"
          root-class="absolute right-4 bottom-0 left-4 h-1.5"
        />
      </div>
    </aside>
  </Transition>

  <Transition name="mini-player">
    <aside
      v-if="
        shouldRenderMiniPlayer &&
        player.playingSong &&
        props.layout === 'desktop'
      "
      aria-label="Music player"
      :style="themeVars"
      class="fixed right-4 bottom-4 z-30 flex w-80 flex-col overflow-visible rounded-t-xl bg-surface shadow-2xl shadow-black/40 ring-1 ring-white/10"
    >
      <div
        class="flex items-center gap-0 overflow-hidden rounded-t-xl border-b border-white/5 bg-surface px-1"
      >
        <button
          type="button"
          :title="`Previous song (${mod}+←)`"
          aria-label="Previous song"
          :class="miniPlayerButtonClass"
          @click="player.playPrev()"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button
          type="button"
          title="Play / pause (Space or K)"
          aria-label="Toggle playback"
          :class="miniPlayerButtonClass"
          @click="player.togglePlayback"
        >
          <svg
            v-if="player.playerState === 'loading'"
            class="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <svg
            v-else-if="player.playerState === 'playing'"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <button
          type="button"
          :title="`Next song (${mod}+→)`"
          aria-label="Next song"
          :class="miniPlayerButtonClass"
          @click="player.playNext()"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        <div class="mx-1 h-3 w-px bg-white/10" />

        <button
          type="button"
          title="Go to song (G)"
          aria-label="Go to song"
          :class="miniPlayerButtonClass"
          @click="goToPlayingSong"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
        </button>

        <div class="flex-1" />

        <p
          v-if="player.showSeekBar"
          class="font-mono text-[0.7rem] tabular-nums text-text-muted"
        >
          {{ player.formattedCurrentTime }}/{{ player.formattedDuration }}
        </p>

        <div class="mx-1 h-3 w-px bg-white/10" />

        <button
          type="button"
          title="Stop playback (Esc)"
          aria-label="Stop playback"
          :class="miniPlayerButtonClass"
          @click="player.stop"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-3 p-2.5">
        <button
          type="button"
          :aria-label="`Toggle playback for ${player.playingSong.title}`"
          class="relative h-10 w-10 shrink-0 overflow-hidden rounded shadow-md touch-manipulation"
          @click="player.togglePlayback"
        >
          <img
            :src="player.playingSong.thumbnailPath"
            :alt="player.playingSong.title"
            class="block h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
          >
            <svg
              v-if="player.playerState === 'playing'"
              class="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            <svg
              v-else
              class="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>

        <button
          type="button"
          title="Go to song (G)"
          aria-label="Go to song"
          class="min-w-0 flex-1 cursor-pointer text-left"
          @click="goToPlayingSong"
        >
          <p class="truncate text-base font-bold leading-snug text-text">
            {{ player.playingSong.title }}
          </p>
          <p class="truncate text-sm leading-snug text-text-muted">
            {{ player.playingSong.artist }}
            <span class="text-primary/60">
              · {{ player.playingYear }} #{{ player.playingSong.rank }}
            </span>
          </p>
        </button>
      </div>

      <div class="relative h-1.5 overflow-visible">
        <PlaybackSeekBar
          v-if="player.showSeekBar"
          root-class="absolute inset-0"
        />
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.mini-player-enter-active,
.mini-player-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.mini-player-enter-from,
.mini-player-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}
</style>
