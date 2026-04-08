let scriptAppended = false
let plausibleReady = false

const SCRIPT_SRC = import.meta.env.DEV
  ? 'https://plausible.io/js/script.manual.local.js'
  : 'https://plausible.io/js/script.manual.js'
const DATA_DOMAIN = 'flashbackcharts.com'

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
    script.dataset.domain = DATA_DOMAIN
    script.onload = () => {
      plausibleReady = true
      resolve()
    }
    script.onerror = () => resolve()
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
