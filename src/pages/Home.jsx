import { motion } from 'framer-motion'
import GoldenButton from '../components/GoldenButton'
import SectionTitle from '../components/SectionTitle'
import Countdown from '../components/Countdown'
import { GoldParticles, AnimatedCounter } from '../components/FestivalAnimations'

const highlights = [
  'Nasheed artists',
  'Cultural performances',
  'Family-friendly activities',
  'Community celebration',
  'Heritage showcase',
  'Food stalls',
  'Trader marketplace',
  'Children’s activities',
]

const stats = [
  { value: 3000, suffix: '+', label: 'Expected visitors' },
  { value: 25000, suffix: '+', label: 'Digital impressions', numberClass: 'text-[1.4rem] sm:text-[1.55rem] lg:text-[1.4rem] xl:text-[1.55rem]' },
  { value: 40, suffix: '+', label: 'Traders and exhibitors' },
]

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-mela-green via-mela-green-dark to-[#02271f]">
        <GoldParticles count={26} />
        <div className="absolute inset-0 bengali-pattern-bg opacity-70" />
        <div className="absolute top-20 right-0 w-[34rem] h-[34rem] bg-mela-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-mela-red/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 overflow-hidden"><div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_58%,rgba(212,175,55,0.16),transparent_34%)] blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#02271f]/72 via-[#02271f]/34 to-[#02271f]/10 sm:from-[#02271f]/86 sm:via-[#02271f]/48 sm:to-[#02271f]/14 md:from-[#02271f]/88 md:via-[#02271f]/58 md:to-[#02271f]/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02271f]/58 via-[#02271f]/8 to-transparent sm:from-[#02271f]/74 md:from-[#02271f]/82" />
          <svg viewBox="0 0 520 320" className="absolute inset-0 h-full w-full opacity-80" aria-hidden="true">
            <defs>
              <linearGradient id="homeGoldWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E6C76A" />
                <stop offset="45%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#C9A24D" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 290C82 254 158 238 240 238C332 238 420 254 520 292"
              stroke="url(#homeGoldWave)"
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
            <div
              className="relative h-full w-full"
              style={{
                WebkitMaskImage:
                  'radial-gradient(120% 100% at 70% 72%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 82%, rgba(0,0,0,0.02) 100%), linear-gradient(to right, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 18%, rgba(0,0,0,0.52) 34%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0) 72%), linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 76%, rgba(0,0,0,0.34) 90%, rgba(0,0,0,0) 100%)',
                maskImage:
                  'radial-gradient(120% 100% at 70% 72%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.7) 62%, rgba(0,0,0,0.3) 82%, rgba(0,0,0,0.02) 100%), linear-gradient(to right, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 18%, rgba(0,0,0,0.52) 34%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0) 72%), linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 76%, rgba(0,0,0,0.34) 90%, rgba(0,0,0,0) 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-end justify-end">
                <motion.img
                  src="/landmarks/savar.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-[122%] sm:w-[102%] md:w-[76%] h-auto mr-[-20%] sm:mr-[-14%] md:mr-[-4%] mb-[-2%] sm:mb-[-3%] md:mb-[-1%] object-contain object-right-bottom saturate-[0.68] brightness-[0.84] contrast-[0.96] sepia-[0.16] blur-[0.2px] opacity-[0.74] sm:opacity-[0.56] md:opacity-[0.56]"
                  animate={{ opacity: [0.68, 0.84, 0.72], y: [0, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#02271f]/92 via-[#02271f]/58 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-mela-gold/18 via-mela-gold/8 to-transparent mix-blend-screen" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#02271f] via-[#02271f]/72 to-transparent" />
            </div>
          </motion.div>
        </div></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 w-full">
          <div className="grid gap-8 sm:gap-10 lg:gap-14 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block rounded-[1.75rem] bg-[#fbf6ee] px-6 py-4 md:px-7 md:py-5 shadow-[0_20px_48px_rgba(0,0,0,0.16)] ring-1 ring-mela-gold/35 mb-5 md:mb-6">
                <img
                  src="/ss-logo-horizontal.webp"
                  alt="Shongo Shomithi"
                  className="w-52 sm:w-60 md:w-72 h-auto"
                />
                <div className="mt-3 h-px bg-gradient-to-r from-transparent via-mela-gold/45 to-transparent" />
              </div>
              <p className="font-sub text-mela-gold text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 leading-tight">
                Shongo Shomithi – United Bangla Community
              </p>
              <h1 className="font-display text-[2.2rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] sm:leading-tight text-balance">
                Presents Walsall’s First Ever Bangla Community Day 2026
              </h1>
              <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl text-pretty">
                <p>Sunday 30 August 2026</p>
                <p>12:00pm – 6:00pm</p>
                <p>Walsall Rugby Club, Delves Road, Walsall, WS1 3JY</p>
                <p>Free community event, open to all</p>
              </div>
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-4">
                <GoldenButton to="/sponsors" size="lg">Become a Sponsor</GoldenButton>
                <GoldenButton to="/traders" variant="secondary" size="lg">Apply for a Stall</GoldenButton>
                <GoldenButton to="/contact" variant="secondary" size="lg">Contact Us</GoldenButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="glass-dark gold-edge rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10"
            >
              <p className="text-white/70 uppercase tracking-[0.22em] sm:tracking-[0.28em] text-[11px] sm:text-xs mb-4 sm:mb-5">Countdown to Community Day</p>
              <Countdown targetDate="2026-08-30T12:00:00" />
              <div className="h-px bg-gradient-to-r from-transparent via-mela-gold/40 to-transparent my-6 sm:my-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 items-stretch max-w-2xl mx-auto">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 text-center min-w-0 min-h-[132px] flex flex-col items-center justify-center">
                    <div className={`font-display ${stat.numberClass ?? 'text-[1.55rem] sm:text-[1.7rem] lg:text-[1.55rem] xl:text-[1.7rem]'} text-mela-gold mb-2 leading-none tracking-[-0.02em] whitespace-nowrap text-center w-full`}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed text-pretty text-center max-w-[10rem]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="A Landmark Celebration"
            title="A premium, community-led day for Walsall and the wider West Midlands"
            description="Shongo Shomithi is proud to bring families, local businesses, community organisations and residents together for a warm, cultural and professionally organised celebration."
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-3xl bg-white border border-mela-gold/15 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-mela-gold/10 text-mela-green flex items-center justify-center mb-4">
                  <span className="font-display text-lg">0{index + 1}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-mela-green-dark leading-snug">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:gap-6 lg:gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-8 border border-mela-gold/15 shadow-sm">
              <p className="font-sub text-mela-gold text-xl mb-3">Sponsorship</p>
              <h3 className="font-display text-[1.75rem] md:text-3xl text-mela-green-dark mb-3 leading-[1.15] text-balance">Put your brand at the heart of the celebration</h3>
              <p className="text-mela-dark/70 mb-6 leading-relaxed text-pretty">Support a landmark community celebration while increasing visibility, building trust and showing meaningful commitment to local growth.</p>
              <GoldenButton to="/sponsors">Become a Sponsor</GoldenButton>
            </div>
            <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-8 border border-mela-gold/15 shadow-sm">
              <p className="font-sub text-mela-gold text-xl mb-3">Stalls / Traders</p>
              <h3 className="font-display text-[1.75rem] md:text-3xl text-mela-green-dark mb-3 leading-[1.15] text-balance">Join the trader marketplace</h3>
              <p className="text-mela-dark/70 mb-6 leading-relaxed text-pretty">Showcase your products, food or services as part of a vibrant family-friendly event with strong community reach.</p>
              <GoldenButton to="/traders">Apply for a Stall</GoldenButton>
            </div>
            <div className="rounded-3xl bg-white p-5 sm:p-6 md:p-8 border border-mela-gold/15 shadow-sm">
              <p className="font-sub text-mela-gold text-xl mb-3">Contact</p>
              <h3 className="font-display text-[1.75rem] md:text-3xl text-mela-green-dark mb-3 leading-[1.15] text-balance">Get involved and stay connected</h3>
              <p className="text-mela-dark/70 mb-6 leading-relaxed text-pretty">Contact the Shongo Shomithi team for sponsorship, stalls, partnerships, volunteer interest or general enquiries.</p>
              <GoldenButton to="/contact">Contact Us</GoldenButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
