<script setup lang="ts">
import { computed } from 'vue'
import { brandFontFamily } from '@/themes/font'

const props = withDefaults(
  defineProps<{
    iconStyle?: Record<string, string>
    isSpinning?: boolean
    label: string
    size?: 'default' | 'home'
  }>(),
  {
    iconStyle: () => ({}),
    isSpinning: false,
    size: 'default',
  },
)

const rootClass = computed(() =>
  props.size === 'home'
    ? 'flex items-start gap-[0.25em] font-bold text-primary'
    : 'flex items-center gap-[0.25em] font-bold text-primary',
)
const rootStyle = computed(() => ({
  fontFamily: brandFontFamily,
  fontSize: props.size === 'home' ? 'clamp(1.6rem, 7vw, 3rem)' : '1.25rem',
  lineHeight:
    props.size === 'home' ? 'clamp(1.9rem, 7.5vw, 3.25rem)' : '1.75rem',
  transition: 'font-size 220ms ease, line-height 220ms ease',
}))
const defaultIconStyle = computed(() => ({
  width: props.size === 'home' ? 'clamp(1.5rem, 6vw, 2.5rem)' : '1.5rem',
  height: props.size === 'home' ? 'clamp(1.5rem, 6vw, 2.5rem)' : '1.5rem',
  marginTop: props.size === 'home' ? 'clamp(0.12rem, 0.8vw, 0.32rem)' : '0',
  transition: 'width 220ms ease, height 220ms ease',
}))
const mergedIconStyle = computed(() => ({
  ...defaultIconStyle.value,
  ...props.iconStyle,
}))
</script>

<template>
  <span :class="rootClass" :style="rootStyle">
    <img
      src="/cd.webp"
      alt=""
      :class="props.isSpinning && 'brand-wordmark-disc-spin'"
      :style="mergedIconStyle"
    />
    <span>{{ props.label }}</span>
  </span>
</template>

<style scoped>
@keyframes brand-wordmark-disc-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.brand-wordmark-disc-spin {
  animation: brand-wordmark-disc-spin 3s linear infinite;
}
</style>
