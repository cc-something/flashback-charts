/// <reference types="vite/client" />

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface YTPlayerEvent {
  data: number
}

interface YTPlayer {
  pauseVideo(): void
  playVideo(): void
  destroy(): void
}

interface YTPlayerOptions {
  width?: string
  height?: string
  playerVars?: Record<string, string | number>
  events?: {
    onStateChange?: (event: YTPlayerEvent) => void
  }
}

interface YTPlayerConstructor {
  new (el: HTMLElement, options: YTPlayerOptions): YTPlayer
}

interface YT {
  Player: YTPlayerConstructor
}

interface Window {
  YT?: YT
  onYouTubeIframeAPIReady?: () => void
}
