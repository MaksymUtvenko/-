import { motion } from 'framer-motion'
import { timelineItems } from '../data/siteData'
import SectionTitle from './SectionTitle'

function Timeline() {
  return (
    <section className="section-shell" id="timeline">
      <SectionTitle eyebrow="История" title="Как началось все? ">
        Тут я бы хотел тебе показать, как сильно я тебя люблю и помню все наши моменты.
        Как мы встретились как начали общаться и как все развивалось.
      </SectionTitle>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-cyan/0 via-cyan/50 to-violet/0 sm:block" />

        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <motion.article
              className="romantic-panel overflow-hidden sm:ml-12 sm:grid sm:grid-cols-[0.9fr_1.1fr]"
              initial={{ opacity: 0, y: 34 }}
              key={item.title}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.35 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="relative min-h-56">
                <img
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent sm:bg-gradient-to-r" />
              </div>

              <div className="relative p-6 sm:p-8">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan/40 bg-cyan/15 text-sm font-bold text-cyan shadow-glow">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
