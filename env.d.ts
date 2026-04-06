/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FATHOM_SITE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface YTPlayerEvent {
  data: number
}

interface YTPlayer {
  pauseVideo(): void
  playVideo(): void
  seekTo(seconds: number, allowSeekAhead?: boolean): void
  getCurrentTime(): number
  getDuration(): number
  destroy(): void
}

interface YTPlayerOptions {
  width?: string
  height?: string
  videoId?: string
  host?: string
  playerVars?: Record<string, string | number>
  events?: {
    onReady?: (event: { target: YTPlayer }) => void
    onStateChange?: (event: YTPlayerEvent) => void
    onError?: (event: YTPlayerEvent) => void
  }
}

interface YTPlayerConstructor {
  new (el: HTMLElement, options: YTPlayerOptions): YTPlayer
}

interface YT {
  Player: YTPlayerConstructor
}

interface FathomClient {
  trackPageview(): void
  trackEvent(name: string, opts?: { _value?: number }): void
}

interface Window {
  YT?: YT
  onYouTubeIframeAPIReady?: () => void
  fathom?: FathomClient
}
