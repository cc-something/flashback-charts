<script setup lang="ts">
import discoBallImage from '@/assets/disco-ball.png'
import { computed } from 'vue'

const props = defineProps<{ isActive: boolean; topOffset: number }>()
const discoBallShellStyle = computed(() => ({
  top: `calc(${props.topOffset}px + 0.25rem)`,
}))
</script>

<template>
  <Transition name="disco-ball">
    <div
      v-if="isActive"
      aria-hidden="true"
      class="disco-ball-shell"
      :style="discoBallShellStyle"
    >
      <div class="disco-ball-pendulum">
        <div class="disco-ball-glow" />
        <img :src="discoBallImage" alt="" class="disco-ball-image" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.disco-ball-shell {
  position: fixed;
  left: clamp(1rem, 2.8vw, 2.35rem);
  z-index: 30;
  pointer-events: none;
}

.disco-ball-pendulum {
  position: relative;
  transform-origin: top center;
  animation: disco-ball-sway 4.6s ease-in-out infinite alternate;
}

.disco-ball-image {
  width: clamp(10rem, 24vw, 14rem);
  height: auto;
  filter: drop-shadow(0 0.8rem 1.2rem rgb(0 0 0 / 18%));
}

.disco-ball-glow {
  position: absolute;
  top: 5.5rem;
  left: 50%;
  width: 80%;
  aspect-ratio: 1;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    rgb(255 255 255 / 55%) 0%,
    rgb(255 255 255 / 18%) 34%,
    rgb(255 255 255 / 0%) 76%
  );
  transform: translateX(-50%);
  filter: blur(0.9rem);
}

.disco-ball-enter-active,
.disco-ball-leave-active {
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 280ms ease;
}

.disco-ball-enter-from,
.disco-ball-leave-to {
  opacity: 0;
  transform: translate3d(0, -13rem, 0);
}

.disco-ball-enter-to,
.disco-ball-leave-from {
  opacity: 1;
  transform: translate3d(0, 1rem, 0);
}

@keyframes disco-ball-sway {
  0% {
    transform: rotate(-4deg);
  }

  100% {
    transform: rotate(4deg);
  }
}
</style>
