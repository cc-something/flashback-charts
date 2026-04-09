import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStorage } from '@vueuse/core'
import { usePlayerStore } from '@/stores/player'

const DELAY_MS = 60_000

export const useEmailSignup = () => {
  const dismissed = useStorage('email-signup-dismissed', false)
  const subscribedEmail = useStorage<string | null>('email-signup-email', null)
  const hasSongPlayed = useStorage('email-signup-has-played', false)
  const hasWaited = ref(false)
  const show = ref(false)
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)
  const player = usePlayerStore()

  const shouldShow = computed(
    () =>
      !dismissed.value &&
      !subscribedEmail.value &&
      hasSongPlayed.value &&
      hasWaited.value &&
      player.playerState !== 'loading',
  )

  const startTimerIfEligible = () => {
    if (
      timer.value ||
      hasWaited.value ||
      dismissed.value ||
      subscribedEmail.value
    )
      return
    if (!hasSongPlayed.value) return
    timer.value = setTimeout(() => {
      hasWaited.value = true
    }, DELAY_MS)
  }

  watch(
    () => player.playerState,
    (state) => {
      if (state === 'playing' && !hasSongPlayed.value) {
        hasSongPlayed.value = true
      }
      if (state === 'loading') show.value = false
    },
  )

  watch(hasSongPlayed, startTimerIfEligible)

  watch(shouldShow, (val) => {
    if (val) show.value = true
  })

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

  onMounted(startTimerIfEligible)

  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value)
  })

  return { show, dismiss, submit }
}
