let scriptAppended = false
let plausibleReady = false

const SCRIPT_SRC = 'https://plausible.io/js/pa-gD0FxLEq89YQCoqWIxRMg.js'

const loadScript = (): Promise<void> =>
  new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve()
    if (scriptAppended) return resolve()
    scriptAppended = true

    window.plausible =
      window.plausible ||
      function (...args: unknown[]) {
        ;(window.plausible!.q = window.plausible!.q || []).push(args)
      }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => {
      plausibleReady = true
      resolve()
    }
    ;(document.head ?? document.body)?.appendChild(script)
  })

const trackPageview = () => {
  if (!plausibleReady) return
  window.plausible?.('pageview')
}

const trackEvent = (name: string, props?: Record<string, string | number>) => {
  window.plausible?.(name, props ? { props } : undefined)
}

export const usePlausibleAnalytics = () => ({
  loadScript,
  trackPageview,
  trackEvent,
})
