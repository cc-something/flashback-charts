import { ref } from 'vue'
import { defineStore } from 'pinia'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'

export type Toast = {
  id: number
  message: string
}

let nextId = 0

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const show = (message: string, durationMs = 4000) => {
    const id = nextId++
    toasts.value.push({ id, message })
    usePlausibleAnalytics().trackEvent('Error', { message })
    window.setTimeout(() => dismiss(id), durationMs)
  }

  const dismiss = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return { toasts, show, dismiss }
})
