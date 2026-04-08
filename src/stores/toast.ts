import { ref } from 'vue'
import { defineStore } from 'pinia'
import { usePlausibleAnalytics } from '@/composables/usePlausibleAnalytics'

export type ToastVariant = 'error' | 'info' | 'success'

export type Toast = {
  id: number
  message: string
  variant: ToastVariant
}

let nextId = 0

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const show = (message: string, durationMs = 4000) => {
    const id = nextId++
    toasts.value.push({ id, message, variant: 'error' })
    usePlausibleAnalytics().trackEvent('Error', { message })
    setTimeout(() => dismiss(id), durationMs)
  }

  const showInfo = (message: string, durationMs = 2500) => {
    const id = nextId++
    toasts.value.push({ id, message, variant: 'info' })
    setTimeout(() => dismiss(id), durationMs)
  }

  const showSuccess = (message: string, durationMs = 2500) => {
    const id = nextId++
    toasts.value.push({ id, message, variant: 'success' })
    setTimeout(() => dismiss(id), durationMs)
  }

  const dismiss = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return { toasts, show, showInfo, showSuccess, dismiss }
})
