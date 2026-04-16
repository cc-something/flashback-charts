import { describe, expect, it, vi } from 'vitest'
import {
  ESCAPE_CONSUMER_SELECTOR,
  getHasEscapeConsumer,
  getMuteHotkeyToastMessage,
} from '@/composables/useHotkeys'

describe('getMuteHotkeyToastMessage', () => {
  it('returns null when playback is not playing', () => {
    expect(getMuteHotkeyToastMessage(false, true)).toBeNull()
    expect(getMuteHotkeyToastMessage(false, false)).toBeNull()
  })

  it('returns a muted message when playback is playing and muted', () => {
    expect(getMuteHotkeyToastMessage(true, true)).toBe('Playback muted')
  })

  it('returns an unmuted message when playback is playing and unmuted', () => {
    expect(getMuteHotkeyToastMessage(true, false)).toBe('Playback unmuted')
  })
})

describe('getHasEscapeConsumer', () => {
  it('returns false when no query root is available', () => {
    expect(getHasEscapeConsumer(null)).toBe(false)
  })

  it('returns true when the query root finds an escape consumer', () => {
    const querySelector = vi.fn(() => ({}) as Element)
    expect(getHasEscapeConsumer({ querySelector })).toBe(true)
    expect(querySelector).toHaveBeenCalledWith(ESCAPE_CONSUMER_SELECTOR)
  })

  it('returns false when the query root finds no escape consumer', () => {
    const querySelector = vi.fn(() => null)
    expect(getHasEscapeConsumer({ querySelector })).toBe(false)
    expect(querySelector).toHaveBeenCalledWith(ESCAPE_CONSUMER_SELECTOR)
  })
})
