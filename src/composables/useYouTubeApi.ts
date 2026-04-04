let resolveReady: (() => void) | null = null
const readyPromise = new Promise<void>((resolve) => {
  resolveReady = resolve
})
let scriptAppended = false
let activeStop: (() => void) | null = null

export const useYouTubeApi = () => {
  const ensureLoaded = (): Promise<void> => {
    if (window.YT?.Player) return Promise.resolve()
    if (!scriptAppended) {
      scriptAppended = true
      window.onYouTubeIframeAPIReady = () => resolveReady?.()
      const script = document.createElement('script')
      const parentElement = document.head ?? document.body

      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true

      if (!parentElement) {
        scriptAppended = false
        return Promise.reject(new Error('YouTube API parent element missing'))
      }

      parentElement.appendChild(script)
    }
    return readyPromise
  }

  const registerActive = (stop: () => void) => {
    activeStop?.()
    activeStop = stop
  }

  const clearActive = () => {
    activeStop = null
  }

  return { ensureLoaded, registerActive, clearActive }
}
