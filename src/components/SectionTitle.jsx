import { motion } from 'framer-motion'

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center',
  dark = false,
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  const containerClass = align === 'left' ? 'max-w-3xl mr-auto' : 'max-w-3xl mx-auto'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`${containerClass} mb-10 md:mb-12 lg:mb-14 ${alignClass}`}
    >
      {subtitle && (
        <span
          className={`inline-block font-sub text-lg md:text-xl italic font-medium tracking-wide mb-3 ${
            dark ? 'text-mela-gold' : 'text-mela-red'
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] text-balance ${
          dark ? 'text-white' : 'text-mela-green-dark'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed text-pretty max-w-2xl ${alignClass === 'text-center' ? 'mx-auto' : ''} ${
            dark ? 'text-white/70' : 'text-mela-dark/70'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
