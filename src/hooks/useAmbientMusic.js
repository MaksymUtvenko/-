import { useEffect, useRef, useState } from 'react'

export function useAmbientMusic() {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef(null)

  const stop = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    const { context, gain, oscillators } = audio
    const now = context.currentTime
    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(gain.gain.value, now)
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.45)

    window.setTimeout(() => {
      oscillators.forEach((oscillator) => oscillator.stop())
      context.close()
    }, 520)

    audioRef.current = null
    setEnabled(false)
  }

  const start = async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext

    if (!AudioContext || audioRef.current) {
      return
    }

    // Tiny Web Audio pad so the music toggle works without shipping an audio file.
    const context = new AudioContext()
    const gain = context.createGain()
    const filter = context.createBiquadFilter()
    const frequencies = [261.63, 329.63, 392, 523.25]

    gain.gain.value = 0.0001
    filter.type = 'lowpass'
    filter.frequency.value = 900
    filter.Q.value = 0.6
    filter.connect(gain)
    gain.connect(context.destination)

    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator()
      const voiceGain = context.createGain()

      oscillator.type = index % 2 === 0 ? 'sine' : 'triangle'
      oscillator.frequency.value = frequency
      oscillator.detune.value = index * 3
      voiceGain.gain.value = 0.12
      oscillator.connect(voiceGain)
      voiceGain.connect(filter)
      oscillator.start()

      return oscillator
    })

    await context.resume()
    gain.gain.linearRampToValueAtTime(0.08, context.currentTime + 0.8)
    audioRef.current = { context, gain, oscillators }
    setEnabled(true)
  }

  const toggle = () => {
    if (enabled) {
      stop()
      return
    }

    start()
  }

  useEffect(() => stop, [])

  return { enabled, toggle }
}
