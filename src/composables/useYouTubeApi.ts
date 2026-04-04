let resolveReady: (() => void) | null = null
const readyPromise = new Promise<void>((resolve) => {
  resolveReady = resolve
})
let scriptAppended = false

export const useYouTubeApi = () => {
  const ensureLoaded = (): Promise<void> => {
    if (window.YT?.Player) return Promise.resolve()
    if (!scriptAppended) {
      scriptAppended = true
      window.onYouTubeIframeAPIReady = () => resolveReady?.()
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
    return readyPromise
  }

  return { ensureLoaded }
}
