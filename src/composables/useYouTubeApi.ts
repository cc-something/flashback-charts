let resolveReady: (() => void) | null = null
let rejectReady: ((reason: Error) => void) | null = null
let readyPromise: Promise<void>
const YOUTUBE_API_SRC = 'https://www.youtube.com/iframe_api'

const resetPromise = () => {
  readyPromise = new Promise<void>((resolve, reject) => {
    resolveReady = resolve
    rejectReady = reject
  })
}
resetPromise()

let scriptAppended = false
let activeStop: (() => void) | null = null

export const useYouTubeApi = () => {
  const ensureLoaded = (): Promise<void> => {
    if (window.YT?.Player) return Promise.resolve()
    if (window.__FLASHBACK_YT_API_READY__) return Promise.resolve()
    window.__FLASHBACK_YT_API_NOTIFY__ = () => resolveReady?.()
    if (!scriptAppended) {
      scriptAppended = true
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${YOUTUBE_API_SRC}"]`,
      )
      const script = existingScript ?? document.createElement('script')
      const parentElement = document.head ?? document.body

      script.src = YOUTUBE_API_SRC
      script.async = true

      script.onerror = () => {
        scriptAppended = false
        const err = new Error('YouTube API script failed to load')
        rejectReady?.(err)
        resetPromise()
      }

      if (!parentElement) {
        scriptAppended = false
        return Promise.reject(new Error('YouTube API parent element missing'))
      }

      if (!existingScript) parentElement.appendChild(script)
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
