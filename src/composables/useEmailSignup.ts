import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStorage } from '@vueuse/core'
import { useRoute } from 'vue-router'

const DELAY_MS = 60_000

export const useEmailSignup = () => {
  const dismissed = useStorage('email-signup-dismissed', false)
  const subscribedEmail = useStorage<string | null>('email-signup-email', null)
  const hasVisitedYearPage = useStorage('email-signup-visited-year', false)
  const hasWaited = ref(false)
  const show = ref(false)
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)
  const route = useRoute()

  const shouldShow = computed(
    () => !dismissed.value && !subscribedEmail.value && hasVisitedYearPage.value && hasWaited.value,
  )

  watch(() => route.name, (name) => { if (name === 'year') hasVisitedYearPage.value = true }, { immediate: true })
  watch(shouldShow, (val) => { if (val) show.value = true })

  const dismiss = () => {
    dismissed.value = true
    show.value = false
  }

  const submit = async (email: string) => {
    await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${import.meta.env.VITE_BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    })
    subscribedEmail.value = email
    show.value = false
  }

  onMounted(() => {
    if (!dismissed.value && !subscribedEmail.value)
      timer.value = setTimeout(() => { hasWaited.value = true }, DELAY_MS)
  })

  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value)
  })

  return { show, dismiss, submit }
}
