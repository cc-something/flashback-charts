<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { ExternalLink, Info, X } from 'lucide-vue-next'

const emit = defineEmits<{ close: [] }>()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="about-modal-title"
    class="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="relative mx-4 mt-[20vh] w-full max-w-md rounded-xl bg-surface p-8 shadow-2xl"
    >
      <button
        type="button"
        aria-label="Close"
        class="absolute right-3 top-3 cursor-pointer rounded-full p-1.5 text-text-muted transition-colors hover:text-text"
        @click="emit('close')"
      >
        <X class="h-5 w-5" />
      </button>

      <div class="mb-5 flex items-center justify-center gap-2.5">
        <Info class="h-5 w-5 text-primary" />
        <h2 id="about-modal-title" class="text-lg font-bold text-text">
          About
        </h2>
      </div>

      <div
        class="flex flex-col gap-6 text-center text-sm leading-relaxed text-text-muted"
      >
        <div class="flex flex-col items-center gap-2">
          <p>Source links are on each page. Summary:</p>
          <p>
            1940-1949: Australian Chart Book, linked to Wikipedia's 1940s
            Australia singles overview.
          </p>
          <p>
            1950-1952: Australian Chart Book, linked to Wikipedia's 1950s
            Australia singles overview.
          </p>
          <p>
            1953-1959: Australian Chart Book, linked to Wikipedia year pages for
            Australia's top 25 singles.
          </p>
          <p>
            1960-1986: Kent Music Report, linked to Wikipedia year pages for
            Australia's top 25 singles.
          </p>
          <p>
            1987: Australian Music Report, linked to the matching Wikipedia year
            page.
          </p>
          <p>
            1988-1989: ARIA Charts, linked to official ARIA year singles pages.
          </p>
          <p>
            1990-1999: ARIA End of Year singles chart, linked to official ARIA
            year singles pages.
          </p>
          <p>
            2000-2009: ARIA Charts, linked to official ARIA year singles pages.
          </p>
          <p>
            2010-2019: ARIA End of Year Singles Chart, linked to official ARIA
            year singles pages.
          </p>
          <p>
            2020-2025: ARIA Top 100 Singles, linked to official ARIA year
            singles pages.
          </p>
        </div>

        <div class="flex flex-col items-center gap-4">
          <p>
            Thanks to Matt &amp; Simon for the inspiration.
            <br />
            Credit to
            <a
              href="https://lucide.dev/license"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1 text-primary transition-opacity hover:opacity-80"
            >
              Lucide
              <ExternalLink class="h-3.5 w-3.5" />
            </a>
            for the icons.
          </p>

          <p>© CC Something {{ new Date().getFullYear() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
