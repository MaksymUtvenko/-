import { motion } from 'framer-motion'

function SectionTitle({ eyebrow, title, children }) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
      initial={{ opacity: 0, y: 22 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.45 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p className="mb-3 text-xs font-bold uppercase text-cyan sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {children ? (
        <p className="mt-4 text-base leading-7 text-slate-300">{children}</p>
      ) : null}
    </motion.div>
  )
}

export default SectionTitle
