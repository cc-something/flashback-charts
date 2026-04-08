import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStorage } from '@vueuse/core'

const DELAY_MS = 45_000

export const useEmailSignup = () => {
  const dismissed = useStorage('email-signup-dismissed', false)
  const subscribedEmail = useStorage<string | null>('email-signup-email', null)
  const show = ref(false)
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  const shouldShow = computed(() => !dismissed.value && !subscribedEmail.value)

  const dismiss = () => {
    dismissed.value = true
    show.value = false
  }

  const submit = async (email: string) => {
    await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${import.meta.env.VITE_BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    })
    subscribedEmail.value = email
    show.value = false
  }

  onMounted(() => {
    if (!shouldShow.value) return
    timer.value = setTimeout(() => {
      if (shouldShow.value) show.value = true
    }, DELAY_MS)
  })

  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value)
  })

  return { show, dismiss, submit }
}
