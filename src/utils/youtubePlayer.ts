import createYouTubePlayer from 'youtube-player'

export const EMBED_BLOCKED_ERROR_CODES = new Set([101, 150, 153])

export const getYouTubeWatchUrl = (videoId: string) =>
  `https://www.youtube.com/watch?v=${videoId}`

export const getIsEmbedBlockedError = (errorCode?: number | null) =>
  errorCode !== undefined &&
  errorCode !== null &&
  EMBED_BLOCKED_ERROR_CODES.has(errorCode)

export const createYouTubePlayerAdapter = (
  mountEl: HTMLElement,
  {
    onError,
    onReady,
    onStateChange,
  }: {
    onError?: (errorCode: number | null) => void
    onReady?: () => void
    onStateChange?: (stateCode: number) => void
  } = {},
) => {
  const player = createYouTubePlayer(mountEl, {
    height: '100%',
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      origin: window.location.origin,
      playsinline: 1,
      rel: 0,
    },
    width: '100%',
  })

  if (onReady) player.on('ready', () => onReady())
  if (onStateChange)
    player.on('stateChange', (event) => onStateChange(event.data))
  if (onError)
    player.on('error', (event) =>
      onError(typeof event.data === 'number' ? event.data : null),
    )

  return player
}
