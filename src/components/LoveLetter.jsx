import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { defaultLetter } from '../data/siteData'
import SectionTitle from './SectionTitle'

function LoveLetter() {
  const [opened, setOpened] = useState(false)
  const [customText, setCustomText] = useState('')
  const [typedText, setTypedText] = useState('')

  const letterText = useMemo(() => customText || defaultLetter, [customText])

  useEffect(() => {
    if (!opened) {
      setTypedText('')
      return undefined
    }

    setTypedText('')
    let index = 0

    const intervalId = window.setInterval(() => {
      index += 1
      setTypedText(letterText.slice(0, index))

      if (index >= letterText.length) {
        window.clearInterval(intervalId)
      }
    }, 24)

    return () => window.clearInterval(intervalId)
  }, [letterText, opened])

  return (
    <section className="section-shell" id="letter">
      <SectionTitle eyebrow="Письмо" title="То, что хочется сказать">
        Конверт открывается по клику, а письмо появляется постепенно, как будто
        слова печатаются прямо сейчас.
      </SectionTitle>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.button
          className="romantic-panel relative flex min-h-80 items-center justify-center overflow-hidden p-6 text-left"
          initial={{ opacity: 0, x: -28 }}
          onClick={() => setOpened(true)}
          transition={{ duration: 0.7 }}
          type="button"
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="relative h-44 w-72 max-w-full">
            <motion.div
              animate={{ rotateX: opened ? 180 : 0, y: opened ? -22 : 0 }}
              className="absolute left-0 top-0 h-1/2 w-full origin-bottom rounded-t-lg border border-violet/40 bg-violet/30"
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-36 rounded-lg border border-cyan/30 bg-gradient-to-br from-ink to-night shadow-glow" />
            <motion.div
              animate={{ y: opened ? -54 : 20, opacity: opened ? 1 : 0.72 }}
              className="absolute left-8 right-8 top-10 h-32 rounded-lg border border-white/10 bg-slate-100 p-4 text-night"
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Mail aria-hidden="true" className="mx-auto text-violet" size={38} />
              <p className="mt-4 text-center text-sm font-bold">Для тебя</p>
            </motion.div>
          </div>
        </motion.button>

        <motion.div
          className="romantic-panel p-5 sm:p-6"
          initial={{ opacity: 0, x: 28 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, x: 0 }}
        >

          <div className="mt-5 min-h-72 rounded-lg border border-white/10 bg-night/60 p-5">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200 sm:text-base">
              {opened ? typedText : '...'}
              {opened && typedText.length < letterText.length ? (
                <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-cyan align-middle" />
              ) : null}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LoveLetter
