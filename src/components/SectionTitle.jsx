import { motion } from 'framer-motion'

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center',
  dark = false,
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mx-auto mb-12 lg:mb-16 ${alignClass}`}
    >
      {subtitle && (
        <span
          className={`inline-block font-sub text-lg md:text-xl italic font-medium tracking-wide mb-3 ${
            dark ? 'text-mela-gold' : 'text-mela-gold'
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
          dark ? 'text-white' : 'text-mela-green'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${alignClass === 'text-center' ? 'mx-auto' : ''} ${
            dark ? 'text-white/70' : 'text-mela-dark/70'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}