import { Volume2, VolumeX } from 'lucide-react'

function MusicToggle({ enabled, onToggle }) {
  const Icon = enabled ? Volume2 : VolumeX

  return (
    <button
      aria-label={enabled ? 'Выключить музыку' : 'Включить музыку'}
      className="icon-button fixed right-4 top-4 z-40 shadow-glow sm:right-6 sm:top-6"
      onClick={onToggle}
      title={enabled ? 'Выключить музыку' : 'Включить музыку'}
      type="button"
    >
      <Icon aria-hidden="true" size={20} />
    </button>
  )
}

export default MusicToggle
