import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { sliderPhotos } from '../data/siteData'
import SectionTitle from './SectionTitle'

function PhotoSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = sliderPhotos[activeIndex]

  const goTo = (index) => {
    const nextIndex = (index + sliderPhotos.length) % sliderPhotos.length
    setActiveIndex(nextIndex)
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % sliderPhotos.length)
    }, 4800)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="section-shell" id="photos">
      <SectionTitle eyebrow="Фото" title="Моменты, в которые хочется вернуться">
        Это тебе напоминание
      </SectionTitle>

      <motion.div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-ink/70 shadow-violet"
        initial={{ opacity: 0, y: 34 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.25 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="relative aspect-[4/5] sm:aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.img
              alt={activePhoto.caption}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 h-full w-full object-cover"
              exit={{ opacity: 0, scale: 1.03 }}
              initial={{ opacity: 0, scale: 1.03 }}
              key={activePhoto.image}
              src={activePhoto.image}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <p className="max-w-2xl text-xl font-bold leading-8 text-white sm:text-3xl">
              {activePhoto.caption}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 p-4">
          <button
            aria-label="Предыдущее фото"
            className="icon-button"
            onClick={() => goTo(activeIndex - 1)}
            title="Предыдущее фото"
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>

          <div className="flex gap-2">
            {sliderPhotos.map((photo, index) => (
              <button
                aria-label={`Показать фото ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-9 bg-cyan' : 'w-2.5 bg-white/25'
                }`}
                key={photo.image}
                onClick={() => goTo(index)}
                type="button"
              />
            ))}
          </div>

          <button
            aria-label="Следующее фото"
            className="icon-button"
            onClick={() => goTo(activeIndex + 1)}
            title="Следующее фото"
            type="button"
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default PhotoSlider
