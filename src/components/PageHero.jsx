import { motion } from 'framer-motion'

export default function PageHero({ title, subtitle, description }) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[55vh] bg-gradient-to-br from-mela-magenta via-mela-magenta-dark to-[#6E0F3A] flex items-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-mela-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-mela-magenta-light/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mela-gold/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          {subtitle && (
            <span className="inline-block font-sub text-lg md:text-xl italic text-mela-gold font-medium mb-4">
              {subtitle}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}