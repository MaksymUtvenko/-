import { useEffect, useRef, useState } from 'react'

const MUSIC_SRC = `${import.meta.env.BASE_URL}kids.mp3`

export function useAmbientMusic() {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef(null)

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_SRC)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = 0.55
      audioRef.current = audio
    }

    return audioRef.current
  }

  const stop = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.pause()
    audio.currentTime = 0
    setEnabled(false)
  }

  const start = async () => {
    const audio = getAudio()

    try {
      await audio.play()
      setEnabled(true)
    } catch {
      setEnabled(false)
    }
  }

  const toggle = () => {
    if (enabled) {
      stop()
      return
    }

    start()
  }

  useEffect(
    () => () => {
      const audio = audioRef.current

      if (!audio) {
        return
      }

      audio.pause()
      audioRef.current = null
    },
    [],
  )

  return { enabled, toggle }
}
