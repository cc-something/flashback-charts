import { describe, expect, it } from 'vitest'
import { getMuteHotkeyToastMessage } from '@/composables/useHotkeys'

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
