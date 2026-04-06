import { ref, computed, onUnmounted } from 'vue'
import { useStorage } from '@vueuse/core'

const DELAY_MS = 45_000

export const useEmailSignup = () => {
  const dismissed = useStorage('email-signup-dismissed', false)
  const subscribedEmail = useStorage<string | null>('email-signup-email', null)
  const show = ref(false)

  const shouldShow = computed(() => !dismissed.value && !subscribedEmail.value)

  const timer = shouldShow.value
    ? setTimeout(() => {
        if (shouldShow.value) show.value = true
      }, DELAY_MS)
    : null

  const dismiss = () => {
    dismissed.value = true
    show.value = false
  }

  const submit = (email: string) => {
    subscribedEmail.value = email
    show.value = false
  }

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { show, dismiss, submit }
}
