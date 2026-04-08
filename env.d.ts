/// <reference types="vite/client" />

declare const __SOCIAL_IMAGE_VERSION__: string

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
  seekTo(seconds: number, allowSeekAhead?: boolean): void
  getCurrentTime(): number
  getDuration(): number
  mute(): void
  unMute(): void
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

interface PlausibleFn {
  (...args: unknown[]): void
  q?: unknown[][]
}

interface Window {
  YT?: YT
  onYouTubeIframeAPIReady?: () => void
  plausible?: PlausibleFn
}
