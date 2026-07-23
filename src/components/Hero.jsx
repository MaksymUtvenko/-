import { motion } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'

const words = 'Дождалась умница❤️'.split(' ')

function Hero() {
  const scrollToStory = () => {
    document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-[calc(100svh-36px)] items-center overflow-hidden px-4 py-20 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan shadow-glow"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.7 }}
          >
            <Heart aria-hidden="true" size={16} />
            Наш второй годик
          </motion.p>

          <h1 className="max-w-4xl text-4xl font-black leading-[1.12] text-white sm:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <motion.span
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                className="mr-3 inline-block bg-gradient-to-r from-white via-cyan to-blush bg-[length:180%_100%] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 34, filter: 'blur(12px)' }}
                key={`${word}-${index}`}
                transition={{
                  delay: 0.08 * index,
                  duration: 0.62,
                  ease: 'easeOut',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            Думаю стоит показать тебе, что я чуствовал когда читал эту йобаную книгу.
          </motion.p>

          <motion.button
            animate={{ opacity: 1, y: 0 }}
            className="soft-button mt-8"
            initial={{ opacity: 0, y: 20 }}
            onClick={scrollToStory}
            transition={{ delay: 0.95, duration: 0.7 }}
            type="button"
          >
          Ну шо погнали?
            <ChevronDown aria-hidden="true" size={18} />
          </motion.button>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border border-white/10 bg-ink shadow-violet sm:max-w-md"
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          transition={{ delay: 0.45, duration: 0.85, ease: 'easeOut' }}
        >
          <img
            alt="Романтический placeholder"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1100&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-night/72 p-4 backdrop-blur-md">
            <p className="text-sm font-semibold text-white"></p>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Моя зайка❤️.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
