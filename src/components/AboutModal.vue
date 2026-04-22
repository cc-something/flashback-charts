<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { ExternalLink, Heart, Info, Music, X } from 'lucide-vue-next'

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
        class="absolute top-0 right-0 inline-flex h-8 w-8 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full border border-white/15 bg-background/90 text-text/65 shadow-[0_10px_24px_rgb(0_0_0_/_0.2)] ring-1 ring-primary/15 transition-colors hover:bg-background hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-10 sm:w-10"
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
        <div class="flex flex-col items-center">
          <p>Source links are on each page. Summary:</p>
          <ul class="list-none">
            <li>1940-1949: Australian Chart Book</li>
            <li>1950-1959: Australian Chart Book</li>
            <li>1960-1986: Kent Music Report</li>
            <li>1987: Australian Music Report</li>
            <li>1988-1989: ARIA Charts</li>
            <li>1990-1999: ARIA End of Year singles chart</li>
            <li>2000-2009: ARIA Charts</li>
            <li>2010-2019: ARIA End of Year Singles Chart</li>
            <li>2020-2025: ARIA Top 100 Singles</li>
          </ul>
        </div>

        <div class="flex flex-col items-center gap-4">
          <p>
            <span class="inline-flex items-center gap-2">
              <Heart class="h-4 w-4 text-primary" />
              <span>Thanks to Matt &amp; Simon for the inspiration</span>
            </span>
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
            for the icons
          </p>
        </div>

        <p class="inline-flex items-center justify-center gap-2">
          <Music class="h-4 w-4 text-primary" />
          <span>Made by music lovers in Australia</span>
          <Music class="h-4 w-4 text-primary" />
        </p>
      </div>
    </div>
  </div>
</template>
