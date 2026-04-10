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
  loadVideoById(videoId: string, startSeconds?: number): void
  pauseVideo(): void
  playVideo(): void
  seekTo(seconds: number, allowSeekAhead?: boolean): void
  getCurrentTime(): number
  getDuration(): number
  mute(): void
  unMute(): void
  stopVideo(): void
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

type PlaybackIntegrityAttemptStatus = 'passed' | 'failed'

type PlaybackIntegrityAttemptReason =
  | 'playing'
  | 'embed-blocked'
  | 'youtube-error'
  | 'timeout'
  | 'api-load-failed'
  | 'player-load-failed'
  | 'aborted'

interface PlaybackIntegrityAttemptOptions {
  videoId: string
  title: string
  artist: string
  timeoutMs: number
}

interface PlaybackIntegrityAttemptResult {
  status: PlaybackIntegrityAttemptStatus
  reason: PlaybackIntegrityAttemptReason
  errorCode: number | null
  message: string
  durationMs: number
  stateSequence: number[]
}

interface PlaybackIntegrityHarnessApi {
  initialize: () => Promise<void>
  runAttempt: (
    options: PlaybackIntegrityAttemptOptions,
  ) => Promise<PlaybackIntegrityAttemptResult>
  reset: () => void
  getLastAttempt: () => PlaybackIntegrityAttemptResult | null
}

interface PlausibleFn {
  (...args: unknown[]): void
  init?: (options?: Record<string, unknown>) => void
  o?: Record<string, unknown>
  q?: unknown[][]
}

interface Window {
  YT?: YT
  __FLASHBACK_YT_API_READY__?: boolean
  __FLASHBACK_YT_API_NOTIFY__?: () => void
  __FLASHBACK_PLAYBACK_INTEGRITY__?: PlaybackIntegrityHarnessApi
  onYouTubeIframeAPIReady?: () => void
  plausible?: PlausibleFn
}
