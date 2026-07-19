import { motion } from 'framer-motion'

const landmarkImages = {
  homePrimary: '/hero-art/hero-palace.webp',
  homeSecondary: '/hero-art/hero-monument.webp',
  about: '/hero-art/hero-palace.webp',
  events: '/hero-art/whats-on-hero.webp',
  sponsors: '/hero-art/hero-bridge.webp',
  traders: '/hero-art/hero-mosque.webp',
  contact: '/hero-art/hero-boat.webp',
  elitePartners: '/hero-art/hero-domes-light.webp',
  charityPartner: '/hero-art/hero-domes.webp',
  ourSponsors: '/hero-art/hero-monument.webp',
  gallery: '/hero-art/hero-shaheed-minar.webp',
}

const landmarkStyles = {
  homePrimary: 'w-[66rem] right-[0%] top-[2%] opacity-[0.28]',
  homeSecondary: 'w-[42rem] right-[10%] bottom-[0%] opacity-[0.24]',
  about: 'w-[72rem] right-[-2%] bottom-[-10%] opacity-[0.34]',
  events: 'w-[60rem] right-[2%] bottom-[-5%] opacity-[0.36]',
  sponsors: 'w-[74rem] right-[-2%] bottom-[-12%] opacity-[0.33]',
  traders: 'w-[68rem] right-[0%] bottom-[-8%] opacity-[0.34]',
  contact: 'w-[60rem] right-[8%] bottom-[-5%] opacity-[0.32]',
  elitePartners: 'w-[68rem] right-[0%] bottom-[-5%] opacity-[0.34]',
  charityPartner: 'w-[66rem] right-[0%] bottom-[-5%] opacity-[0.35]',
  ourSponsors: 'w-[58rem] right-[10%] bottom-[-4%] opacity-[0.32]',
  gallery: 'w-[66rem] right-[0%] bottom-[-5%] opacity-[0.34]',
}

function HeroArtwork({ variant }) {
  const src = landmarkImages[variant]
  const style = landmarkStyles[variant]

  if (!src || !style) return null

  return (
    <div className={`absolute block h-auto pointer-events-none ${style}`.replace("hidden lg:block", "") }>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="relative z-10 w-full h-auto sepia-[0.98] saturate-[1.28] brightness-[1.2] contrast-[1.04] mix-blend-screen drop-shadow-[0_0_26px_rgba(212,175,55,0.18)] opacity-20 sm:opacity-24 lg:opacity-100 [mask-image:radial-gradient(circle_at_center,black_34%,rgba(0,0,0,0.82)_66%,transparent_90%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_34%,rgba(0,0,0,0.82)_66%,transparent_90%)]"
      />
      <div className="absolute inset-0 z-20 mix-blend-screen opacity-60 shimmer-overlay [mask-image:radial-gradient(circle_at_center,black_34%,rgba(0,0,0,0.82)_66%,transparent_90%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_34%,rgba(0,0,0,0.82)_66%,transparent_90%)]" />
    </div>
  )
}

export default function PageHero({ title, subtitle, description, landmark = 'about' }) {
  return (
    <section className="relative min-h-[38vh] md:min-h-[44vh] bg-[#014437] flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bengali-pattern-bg opacity-18 sm:opacity-22" />
        <div className="absolute bottom-[-8rem] left-[-8rem] w-[24rem] h-[24rem] sm:w-[34rem] sm:h-[34rem] bg-[#9f1d20]/32 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[#014437] sm:bg-[linear-gradient(90deg,rgba(255,250,245,0.98)_0%,rgba(247,240,228,0.94)_7%,rgba(232,224,205,0.62)_13%,rgba(109,128,103,0.22)_18%,rgba(24,84,69,0.64)_26%,rgba(1,68,55,0.9)_38%,rgba(1,68,55,0.97)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(201,168,76,0.08),transparent_18%),radial-gradient(circle_at_78%_66%,rgba(255,250,245,0.02),transparent_20%),radial-gradient(circle_at_10%_88%,rgba(159,29,32,0.3),transparent_20%)] sm:bg-[radial-gradient(circle_at_76%_24%,rgba(201,168,76,0.08),transparent_18%),radial-gradient(circle_at_78%_66%,rgba(255,250,245,0.08),transparent_20%),radial-gradient(circle_at_10%_88%,rgba(159,29,32,0.3),transparent_20%)]" />
        <div className="absolute inset-y-0 right-0 w-full sm:w-[78%] bg-[linear-gradient(90deg,rgba(1,68,55,0.16)_0%,rgba(1,68,55,0.34)_18%,rgba(1,68,55,0.66)_42%,rgba(1,68,55,0.9)_68%,rgba(1,68,55,0.98)_100%)] sm:bg-[linear-gradient(90deg,rgba(1,68,55,0)_0%,rgba(1,68,55,0.3)_14%,rgba(1,68,55,0.62)_28%,rgba(1,68,55,0.88)_48%,rgba(1,68,55,0.98)_100%)]" />
        <HeroArtwork variant={landmark} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mela-red/70 to-transparent" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl relative"
        >
          <div className="absolute -inset-x-4 -inset-y-5 rounded-[2rem] bg-[linear-gradient(135deg,rgba(1,68,55,0.76),rgba(1,68,55,0.54)_35%,rgba(1,68,55,0.12)_75%,transparent_100%)] blur-2xl md:hidden" />
          <div className="absolute -inset-x-6 -inset-y-8 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(1,68,55,0.58),rgba(1,68,55,0.26)_55%,transparent_100%)] blur-3xl hidden md:block lg:hidden" />
          {subtitle && (
            <span className="relative inline-block font-sub text-base md:text-lg text-mela-gold font-medium mb-3">
              {subtitle}
            </span>
          )}
          <h1 className="relative font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] drop-shadow-[0_3px_10px_rgba(0,0,0,0.22)]">
            {title}
          </h1>
          {description && (
            <p className="relative mt-4 md:mt-5 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
