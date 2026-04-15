let resolveReady: (() => void) | null = null
let rejectReady: ((reason: Error) => void) | null = null
let readyPromise: Promise<void>
const YOUTUBE_API_SRC = 'https://www.youtube.com/iframe_api'
const logYouTubeApi = (
  eventLabel: string,
  details: Record<string, unknown> = {},
) => console.info('[yt-api]', eventLabel, details)

const resetPromise = () => {
  logYouTubeApi('reset-promise')
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
    logYouTubeApi('ensure-loaded:start', {
      hasPlayerCtor: !!window.YT?.Player,
      isReadyFlagSet: !!window.__FLASHBACK_YT_API_READY__,
      hasNotifyHook: !!window.__FLASHBACK_YT_API_NOTIFY__,
      scriptAppended,
    })
    if (window.YT?.Player) {
      logYouTubeApi('ensure-loaded:ctor-ready')
      return Promise.resolve()
    }
    if (window.__FLASHBACK_YT_API_READY__) {
      logYouTubeApi('ensure-loaded:ready-flag')
      return Promise.resolve()
    }
    window.__FLASHBACK_YT_API_NOTIFY__ = () => {
      logYouTubeApi('notify-ready')
      resolveReady?.()
    }
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
        logYouTubeApi('script:error')
        scriptAppended = false
        const err = new Error('YouTube API script failed to load')
        rejectReady?.(err)
        resetPromise()
      }

      if (!parentElement) {
        logYouTubeApi('script:missing-parent')
        scriptAppended = false
        return Promise.reject(new Error('YouTube API parent element missing'))
      }

      if (!existingScript) {
        logYouTubeApi('script:append', {
          parentTagName: parentElement.tagName,
        })
        parentElement.appendChild(script)
      } else logYouTubeApi('script:reuse-existing')
    }
    logYouTubeApi('ensure-loaded:await-ready')
    return readyPromise
  }

  const registerActive = (stop: () => void) => {
    logYouTubeApi('register-active', { hasPreviousActiveStop: !!activeStop })
    activeStop?.()
    activeStop = stop
  }

  const clearActive = () => {
    logYouTubeApi('clear-active', { hadActiveStop: !!activeStop })
    activeStop = null
  }

  return { ensureLoaded, registerActive, clearActive }
}
