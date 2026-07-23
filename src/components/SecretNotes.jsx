import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, KeyRound, Sparkles } from 'lucide-react'
import { secretMessages } from '../data/siteData'
import SectionTitle from './SectionTitle'

const icons = [Heart, Sparkles, KeyRound]

function SecretNotes() {
  const [activeMessage, setActiveMessage] = useState(null)
  const timerRef = useRef(null)

  const reveal = (message) => {
    window.clearTimeout(timerRef.current)
    setActiveMessage(message)
  }

  const holdToReveal = (message) => {
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setActiveMessage(message), 520)
  }

  const clearHold = () => {
    window.clearTimeout(timerRef.current)
  }

  return (
    <section className="section-shell" id="secrets">
      <SectionTitle eyebrow="Секреты" title="Маленькие знаки между строк" />

      <div className="relative mx-auto min-h-80 max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-ink/80 via-night/90 to-ink/80 p-6 shadow-violet">
        <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
        <div className="absolute inset-y-8 left-1/2 w-px bg-gradient-to-b from-transparent via-violet/50 to-transparent" />

        {secretMessages.map((message, index) => {
          const Icon = icons[index]
          const positions = [
            'left-[14%] top-[20%]',
            'right-[18%] top-[34%]',
            'left-[42%] bottom-[18%]',
          ]

          return (
            <button
              aria-label={`Секрет ${index + 1}`}
              className={`icon-button absolute ${positions[index]} h-12 w-12 opacity-55 hover:opacity-100`}
              key={message}
              onClick={() => reveal(message)}
              onMouseEnter={() => reveal(message)}
              onPointerCancel={clearHold}
              onPointerDown={() => holdToReveal(message)}
              onPointerLeave={clearHold}
              onPointerUp={clearHold}
              title={`Секрет ${index + 1}`}
              type="button"
            >
              <Icon aria-hidden="true" size={20} />
            </button>
          )
        })}

        <AnimatePresence mode="wait">
          {activeMessage ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-4 right-4 mx-auto max-w-2xl rounded-lg border border-blush/30 bg-night/80 p-5 text-center text-lg font-semibold leading-8 text-white backdrop-blur-md"
              exit={{ opacity: 0, y: 14 }}
              initial={{ opacity: 0, y: 14 }}
              key={activeMessage}
            >
              {activeMessage}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SecretNotes
