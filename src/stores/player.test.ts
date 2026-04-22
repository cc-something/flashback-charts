// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { Song } from '@/types/song'

const youtubePlayerMocks = vi.hoisted(() => {
  const callbacks = {
    onError: undefined as ((errorCode: number | null) => void) | undefined,
    onReady: undefined as (() => void) | undefined,
    onStateChange: undefined as ((stateCode: number) => void) | undefined,
  }
  const state = {
    currentTime: 0,
    duration: 180,
    iframe: null as HTMLIFrameElement | null,
    playerState: 1,
    videoId: 'video-1',
  }
  const adapter = {
    cueVideoById: vi.fn(async () => undefined),
    destroy: vi.fn(async () => undefined),
    getCurrentTime: vi.fn(async () => state.currentTime),
    getDuration: vi.fn(async () => state.duration),
    getIframe: vi.fn(async () => state.iframe),
    getPlayerState: vi.fn(async () => state.playerState),
    getVideoData: vi.fn(async () => ({ video_id: state.videoId })),
    loadVideoById: vi.fn(async () => undefined),
    mute: vi.fn(async () => undefined),
    pauseVideo: vi.fn(async () => undefined),
    seekTo: vi.fn(async () => undefined),
    setVolume: vi.fn(async () => undefined),
    stopVideo: vi.fn(async () => undefined),
    unMute: vi.fn(async () => undefined),
  }
  const createYouTubePlayerAdapter = vi.fn(
    (
      _mountEl: HTMLElement,
      nextCallbacks?: {
        onError?: (errorCode: number | null) => void
        onReady?: () => void
        onStateChange?: (stateCode: number) => void
      },
    ) => {
      callbacks.onError = nextCallbacks?.onError
      callbacks.onReady = nextCallbacks?.onReady
      callbacks.onStateChange = nextCallbacks?.onStateChange
      return adapter
    },
  )

  return {
    adapter,
    callbacks,
    createYouTubePlayerAdapter,
    state,
  }
})

vi.mock('@/composables/usePlausibleAnalytics', () => ({
  usePlausibleAnalytics: () => ({
    loadScript: vi.fn(async () => undefined),
    trackEvent: vi.fn(),
    trackPageview: vi.fn(),
  }),
}))

vi.mock('@/utils/youtubePlayer', async () => {
  const actual = await vi.importActual<typeof import('@/utils/youtubePlayer')>(
    '@/utils/youtubePlayer',
  )

  return {
    ...actual,
    createYouTubePlayerAdapter: youtubePlayerMocks.createYouTubePlayerAdapter,
  }
})

import { getHasStartupSeekProgress, usePlayerStore } from '@/stores/player'

const createSong = (): Song => ({
  album: 'Test Album',
  artist: 'Test Artist',
  imageSelection: 'album',
  imageSources: {
    album: null,
    artist: null,
  },
  rank: 1,
  thumbnailPath: '/test.webp',
  title: 'Test Song',
  youtubeVideoId: 'video-1',
})

const flushPromises = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

const createLocalStorageMock = () => {
  const storage = new Map<string, string>()

  return {
    clear: () => storage.clear(),
    getItem: (key: string) => storage.get(key) ?? null,
    removeItem: (key: string) => storage.delete(key),
    setItem: (key: string, value: string) => storage.set(key, String(value)),
  }
}

describe('getHasStartupSeekProgress', () => {
  it('returns true for the first forward seek tick', () => {
    expect(getHasStartupSeekProgress(0.1, 0)).toBe(true)
  })

  it('returns false when the seek position has not moved forward', () => {
    expect(getHasStartupSeekProgress(0, 0)).toBe(false)
    expect(getHasStartupSeekProgress(4.9, 5)).toBe(false)
  })
})

describe('usePlayerStore startup recovery', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    setActivePinia(createPinia())
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createLocalStorageMock(),
    })
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: window.localStorage,
    })
    localStorage.clear()
    youtubePlayerMocks.state.currentTime = 0
    youtubePlayerMocks.state.duration = 180
    youtubePlayerMocks.state.iframe = document.createElement('iframe')
    youtubePlayerMocks.state.playerState = 1
    youtubePlayerMocks.state.videoId = 'video-1'
    youtubePlayerMocks.callbacks.onError = undefined
    youtubePlayerMocks.callbacks.onReady = undefined
    youtubePlayerMocks.callbacks.onStateChange = undefined
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true,
    })
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    localStorage.clear()
  })

  it('skips startup retry once playback progress has begun', async () => {
    const player = usePlayerStore()

    player.setPlayerContainer(document.createElement('div'))
    await player.play(createSong(), 1988)
    await flushPromises()

    expect(youtubePlayerMocks.adapter.loadVideoById).toHaveBeenCalledTimes(1)
    expect(player.playbackHealth).toBe('starting')

    youtubePlayerMocks.callbacks.onStateChange?.(1)
    await flushPromises()

    youtubePlayerMocks.state.currentTime = 0.1
    await vi.advanceTimersByTimeAsync(250)
    await flushPromises()

    expect(player.currentTimeSeconds).toBeCloseTo(0.1)
    expect(player.playbackHealth).toBe('healthy')

    await vi.advanceTimersByTimeAsync(8_000)
    await flushPromises()

    expect(youtubePlayerMocks.adapter.loadVideoById).toHaveBeenCalledTimes(1)
  })

  it('keeps the retry path when startup progress never moves', async () => {
    const player = usePlayerStore()

    player.setPlayerContainer(document.createElement('div'))
    await player.play(createSong(), 1988)
    await flushPromises()

    await vi.advanceTimersByTimeAsync(8_000)
    await flushPromises()

    expect(youtubePlayerMocks.adapter.loadVideoById).toHaveBeenCalledTimes(2)
  })
})
