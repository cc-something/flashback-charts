let scriptAppended = false
let fathomReady = false

const SITE_ID = import.meta.env.VITE_FATHOM_SITE_ID as string | undefined

const loadScript = (): Promise<void> =>
  new Promise((resolve) => {
    if (typeof window === 'undefined' || !SITE_ID) return resolve()
    if (scriptAppended) return resolve()
    scriptAppended = true
    const script = document.createElement('script')
    script.src = 'https://cdn.usefathom.com/script.js'
    script.dataset.site = SITE_ID
    script.dataset.auto = 'false'
    script.onload = () => {
      fathomReady = true
      resolve()
    }
    ;(document.head ?? document.body)?.appendChild(script)
  })

const trackPageview = () => {
  if (!fathomReady) return
  window.fathom?.trackPageview()
}

const trackEvent = (name: string, value?: number) => {
  if (!fathomReady) return
  window.fathom?.trackEvent(
    name,
    value !== undefined ? { _value: value } : undefined,
  )
}

export const useFathomAnalytics = () => ({
  loadScript,
  trackPageview,
  trackEvent,
})
