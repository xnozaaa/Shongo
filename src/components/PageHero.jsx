import { motion } from 'framer-motion'

const landmarkImages = {
  savar: '/landmarks/savar.webp',
  ahsan: '/landmarks/ahsan.webp',
  shaheedMinar: '/landmarks/shaheed-minar.webp',
  lalbagh: '/landmarks/lalbagh.webp',
  mosque: '/landmarks/mosque.webp',
  padma: '/landmarks/padma.webp',
}

const landmarkStyles = {
  savar: 'w-[118%] sm:w-[98%] md:w-[74%] mr-[-18%] sm:mr-[-12%] md:mr-[-2%] mb-[-2%] sm:mb-[-3%] md:mb-[-1%] opacity-[0.76] sm:opacity-[0.58] md:opacity-[0.58]',
  ahsan: 'w-[122%] sm:w-[104%] md:w-[80%] mr-[-20%] sm:mr-[-16%] md:mr-[-4%] mb-[-2%] sm:mb-[-3%] md:mb-[-1%] opacity-[0.78] sm:opacity-[0.6] md:opacity-[0.6]',
  shaheedMinar: 'w-[98%] sm:w-[80%] md:w-[54%] mr-[-4%] sm:mr-[2%] md:mr-[10%] mb-0 opacity-[0.72] sm:opacity-[0.54] md:opacity-[0.52]',
  lalbagh: 'w-[118%] sm:w-[100%] md:w-[76%] mr-[-18%] sm:mr-[-14%] md:mr-[-3%] mb-[-2%] sm:mb-[-3%] md:mb-[-1%] opacity-[0.76] sm:opacity-[0.58] md:opacity-[0.58]',
  mosque: 'w-[118%] sm:w-[102%] md:w-[79%] mr-[-18%] sm:mr-[-16%] md:mr-[-4%] mb-[-2%] sm:mb-[-3%] md:mb-[-1%] opacity-[0.76] sm:opacity-[0.58] md:opacity-[0.58]',
  padma: 'w-[142%] sm:w-[128%] md:w-[94%] mr-[-38%] sm:mr-[-22%] md:mr-[-8%] mb-[-4%] sm:mb-[-4%] md:mb-[-2%] opacity-[0.68] sm:opacity-[0.5] md:opacity-[0.5]',
}

const blendMask = {
  WebkitMaskImage:
    'radial-gradient(120% 100% at 70% 72%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 82%, rgba(0,0,0,0.02) 100%), linear-gradient(to right, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 18%, rgba(0,0,0,0.52) 34%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0) 72%), linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 76%, rgba(0,0,0,0.34) 90%, rgba(0,0,0,0) 100%)',
  maskImage:
    'radial-gradient(120% 100% at 70% 72%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 82%, rgba(0,0,0,0.02) 100%), linear-gradient(to right, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 18%, rgba(0,0,0,0.52) 34%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0) 72%), linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 76%, rgba(0,0,0,0.34) 90%, rgba(0,0,0,0) 100%)',
}

function AnimatedLandmark({ variant = 'ahsan', className = '' }) {
  const src = landmarkImages[variant] || landmarkImages.ahsan
  const imageClass = landmarkStyles[variant] || landmarkStyles.ahsan

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_58%,rgba(212,175,55,0.16),transparent_34%)] blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02271f]/72 via-[#02271f]/34 to-[#02271f]/10 sm:from-[#02271f]/86 sm:via-[#02271f]/48 sm:to-[#02271f]/14 md:from-[#02271f]/88 md:via-[#02271f]/58 md:to-[#02271f]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#02271f]/58 via-[#02271f]/8 to-transparent sm:from-[#02271f]/74 md:from-[#02271f]/82" />

      <svg viewBox="0 0 520 320" className="absolute inset-0 h-full w-full opacity-80" aria-hidden="true">
        <defs>
          <linearGradient id="heroGoldWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6C76A" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#C9A24D" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0 290C82 254 158 238 240 238C332 238 420 254 520 292"
          stroke="url(#heroGoldWave)"
          strokeWidth="1.15"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.08 }}
          animate={{ pathLength: 1, opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="relative h-full w-full" style={blendMask}>
          <div className="absolute inset-0 flex items-end justify-end">
            <motion.img
              src={src}
              alt=""
              aria-hidden="true"
              className={`h-auto object-contain object-right-bottom saturate-[0.68] brightness-[0.84] contrast-[0.96] sepia-[0.16] blur-[0.2px] ${imageClass}`}
              animate={{ opacity: [0.68, 0.84, 0.72], y: [0, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#02271f]/92 via-[#02271f]/58 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-mela-gold/18 via-mela-gold/8 to-transparent mix-blend-screen" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#02271f] via-[#02271f]/72 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

export default function PageHero({ title, subtitle, description, landmark = 'ahsan' }) {
  return (
    <section className="relative min-h-[38vh] md:min-h-[44vh] bg-gradient-to-br from-mela-green via-mela-green-dark to-[#02271f] flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[38rem] h-[38rem] bg-mela-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-mela-red/18 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <AnimatedLandmark variant={landmark} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mela-red/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-18 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          {subtitle && (
            <span className="inline-block font-sub text-base md:text-lg text-mela-gold font-medium mb-3">
              {subtitle}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 md:mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
