import FinalScreen from './components/FinalScreen'
import HeartGame from './components/HeartGame'
import Hero from './components/Hero'
import LoveLetter from './components/LoveLetter'
import MusicToggle from './components/MusicToggle'
import PhotoPuzzle from './components/PhotoPuzzle'
import PhotoSlider from './components/PhotoSlider'
import SecretNotes from './components/SecretNotes'
import StarBackground from './components/StarBackground'
import Timeline from './components/Timeline'
import { useAmbientMusic } from './hooks/useAmbientMusic'

function App() {
  const music = useAmbientMusic()

  return (
    <div className="min-h-screen overflow-x-hidden bg-night text-slate-100">
      <StarBackground />
      <MusicToggle enabled={music.enabled} onToggle={music.toggle} />

      <main className="relative z-10">
        <Hero />
        <Timeline />
        <PhotoPuzzle />
        <HeartGame />
        <LoveLetter />
        <PhotoSlider />
        <SecretNotes />
        <FinalScreen />
      </main>
    </div>
  )
}

export default App
