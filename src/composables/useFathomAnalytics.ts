let scriptAppended = false

export const useFathomAnalytics = () => {
  const loadFathom = () => {
    if (typeof window === 'undefined') return
    if (scriptAppended) return
    const siteId = import.meta.env.VITE_FATHOM_SITE_ID
    if (!siteId) return
    scriptAppended = true
    const script = document.createElement('script')
    script.src = 'https://cdn.usefathom.com/script.js'
    script.defer = true
    script.dataset.site = siteId
    script.dataset.spa = 'auto'
    ;(document.head ?? document.body)?.appendChild(script)
  }
  return { loadFathom }
}
