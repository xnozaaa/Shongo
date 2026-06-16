import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import Countdown from '../components/Countdown'
import GoldenButton from '../components/GoldenButton'
import {
  GoldParticles,
  FestoonLights,
  BuntingDecoration,
  ScrollIndicator,
  AnimatedCounter,
  DecorativeCorner,
  AmberGlow,
} from '../components/FestivalAnimations'

/* ─── Word-by-word text reveal ─── */
function AnimatedReveal({ text, className = '', delay = 0, stagger = 0.04 }) {
  const words = text.split(' ')
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: 'easeOut' }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}

/* ─── Event Feature Card ─── */
function EventCard({ icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-mela-cream hover:border-mela-gold/40"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-mela-gold/5 to-transparent" />
      </div>

      <div className="p-8 relative z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mela-red to-mela-red-dark flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-mela-green-dark mb-3 group-hover:text-mela-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-mela-dark/70 text-sm leading-relaxed">{desc}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mela-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  )
}

/* ─── Timeline Phase ─── */
function TimelinePhase({ index, active }) {
  const data = [
    {
      title: 'Before the Event',
      sub: 'Building Anticipation',
      color: 'from-mela-green to-mela-green-dark',
      benefits: ['Pre-event marketing campaign', 'Social media buzz', 'Press coverage', 'Community engagement'],
    },
    {
      title: 'During the Event',
      sub: 'Maximum Visibility',
      color: 'from-mela-red to-mela-red-dark',
      benefits: ['Stage branding & banners', 'On-site stall', 'Live social media mentions', 'Attendee engagement'],
    },
    {
      title: 'After the Event',
      sub: 'Lasting Impact',
      color: 'from-mela-green-dark to-[#062618]',
      benefits: ['Post-event report', 'Social media highlights', 'Ongoing logo presence', 'First-refusal for next year'],
    },
  ][index]

  return (
    <motion.div
      className={`p-6 md:p-8 rounded-2xl border transition-all duration-700 ${
        active
          ? 'bg-gradient-to-br border-mela-gold/40 shadow-xl shadow-mela-gold/10'
          : 'bg-white/40 border-mela-cream opacity-50'
      }`}
      animate={{ scale: active ? 1 : 0.95 }}
    >
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${data.color} flex items-center justify-center mb-4`}>
        <span className="text-white font-display font-bold text-lg">{index + 1}</span>
      </div>
      <h3 className={`font-display text-xl md:text-2xl font-bold mb-1 transition-colors ${
        active ? 'text-mela-green-dark' : 'text-mela-dark/60'
      }`}>
        {data.title}
      </h3>
      <p className={`font-sub text-lg italic mb-4 ${active ? 'text-mela-gold' : 'text-mela-dark/40'}`}>
        {data.sub}
      </p>
      {active && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2 mt-4"
        >
          {data.benefits.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-sm text-mela-dark/70"
            >
              <svg className="w-4 h-4 text-mela-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {b}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  )
}

/* ═══════════════════════════
   HOME PAGE
   ═══════════════════════════ */
export default function Home() {
  const [timelinePhase, setTimelinePhase] = useState(0)
  const timelineRef = useRef(null)

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight || 1
      const scrolled = Math.max(window.innerHeight - rect.top, 0)
      const progress = Math.min(scrolled / (total + window.innerHeight), 1)
      setTimelinePhase(Math.min(Math.floor(progress * 3), 2))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ══════════════════════════════════
          HERO — Full-Screen Festival Spectacle
          ══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-mela-green via-mela-green-dark to-[#062618]">
        <GoldParticles count={30} />
        <FestoonLights count={16} />
        <BuntingDecoration count={20} />

        <div className="absolute top-1/3 right-0 w-[60rem] h-[60rem] bg-mela-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-mela-gold/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bengali-pattern-bg" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden ring-4 ring-mela-gold/50 shadow-2xl">
              <img src="/logo.jpeg" alt="Shongo Shomithi" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.p
            className="font-sub text-mela-gold text-base md:text-lg italic tracking-wide mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            United Bangla Community Presents
          </motion.p>

          <AnimatedReveal
            text="WALSALL'S FIRST EVER"
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 tracking-wide mb-2"
            delay={1.2}
            stagger={0.06}
          />
          <AnimatedReveal
            text="BANGLA MELA 2026"
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight gold-shimmer-text mb-6"
            delay={2}
            stagger={0.08}
          />

          <motion.p
            className="text-white/60 text-sm md:text-base font-medium tracking-wide mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.6 }}
          >
            Sunday 30 August 2026 &middot; Walsall Rugby Club
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-block glass-dark rounded-2xl px-6 py-3">
              <Countdown targetDate="2026-08-30T11:00:00" />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.6 }}
          >
            <GoldenButton variant="primary" to="/events">
              Explore the Festival
            </GoldenButton>
            <GoldenButton variant="secondary" to="/sponsors">
              Become a Sponsor
            </GoldenButton>
          </motion.div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ══════════════════════════════════
          ABOUT SNAP
          ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-mela-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="font-sub text-lg md:text-xl italic text-mela-red font-medium block mb-4">
                About the Festival
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-mela-green-dark leading-tight mb-6">
                A Celebration of Bengali Culture
              </h2>
              <div className="space-y-4">
                <p className="text-mela-dark/80 leading-relaxed">
                  Shongo Shomithi invites you to Walsall's first-ever Bangla
                  Mela — a spectacular day of music, dance, food, and community
                  spirit at Walsall Rugby Club.
                </p>
                <p className="text-mela-dark/80 leading-relaxed">
                  Experience the warmth of Bengali hospitality, savour authentic
                  cuisine, enjoy vibrant performances, and discover the rich
                  cultural heritage that makes our community unique.
                </p>
              </div>
              <div className="mt-8">
                <GoldenButton variant="red" to="/about">
                  Discover More
                </GoldenButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-mela-green to-mela-red/20 relative">
                <div className="absolute inset-0 bengali-pattern-bg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-mela-gold/50">
                      <img src="/logo.jpeg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-display text-2xl text-white font-bold">
                      Walsall's<br />First Ever
                    </p>
                    <p className="font-display text-3xl text-mela-gold font-bold mt-2 gold-shimmer-text">
                      Bangla Mela
                    </p>
                    <div className="mt-6 inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <span className="text-white/80 font-sub italic text-lg">
                        30 August 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <DecorativeCorner position="top-right -top-3 -right-3" />
              <DecorativeCorner position="bottom-left -bottom-3 -left-3" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          EVENT STATISTICS
          ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-mela-green via-mela-green-dark to-[#062618] relative overflow-hidden">
        <GoldParticles count={15} className="opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="By the Numbers"
            title="What to Expect"
            description="Walsall's first Bangla Mela promises to be a landmark celebration of culture and community."
            dark
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8">
            {[
              { end: 5000, suffix: '+', label: 'Expected Visitors', accent: 'text-mela-gold' },
              { end: 25, suffix: '+', label: 'Event Stallholders', accent: 'text-mela-red-light' },
              { end: 50, suffix: '+', label: 'Volunteer Team', accent: 'text-mela-gold-light' },
              { end: 12, suffix: '+', label: 'Cultural Performances', accent: 'text-mela-saffron' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-6 md:p-8 rounded-2xl glass-dark"
              >
                <div className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold ${stat.accent}`}>
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-sm mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHAT TO EXPECT
          ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="The Experience"
            title="What Awaits You"
            description="A day filled with colour, flavour, music, and community spirit."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
                title: 'Live Performances',
                desc: 'Traditional Bengali music, dance, and cultural showcases on the main stage throughout the day.',
              },
              {
                icon: 'M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z',
                title: 'Workshops & Activities',
                desc: 'Hands-on sessions in Bengali art, calligraphy, crafts, and henna for all ages.',
              },
              {
                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Food & Cuisine',
                desc: 'Authentic Bengali culinary delights from traditional curries to sweet delicacies.',
              },
              {
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Community Village',
                desc: 'Meet local groups, explore cultural organisations, and connect with your community.',
              },
            ].map((item, i) => (
              <EventCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SPONSORSHIP PREVIEW
          ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-mela-red to-mela-red-dark relative overflow-hidden">
        <AmberGlow className="top-0 right-0" />
        <AmberGlow className="bottom-0 left-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Partner With Us"
            title="Sponsorship Opportunities"
            description="Join us in making Walsall's first Bangla Mela an unforgettable celebration."
            dark
          />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                tier: 'Platinum', price: '£10,000',
                desc: 'Headline sponsorship with maximum visibility across all event materials, stage branding, and media coverage.',
                popular: true, gradient: 'from-mela-green to-mela-green-dark',
              },
              {
                tier: 'Gold', price: '£5,000',
                desc: 'Premium package with prominent logo placement, dedicated stall, and extensive social media coverage.',
                gradient: 'from-yellow-700 to-amber-700',
              },
              {
                tier: 'Silver', price: '£3,000',
                desc: 'Strong brand presence with logo on banners, programme listing, and social media features.',
                gradient: 'from-gray-500 to-gray-600',
              },
            ].map((pkg, i) => (
              <motion.div
                key={pkg.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-2xl overflow-hidden border ${
                  pkg.popular
                    ? 'border-mela-gold/50 shadow-xl shadow-mela-gold/20 scale-105'
                    : 'border-white/10'
                } bg-white/10 backdrop-blur-sm`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-0">
                    <div className="bg-mela-gold text-mela-green-dark text-xs font-bold px-4 py-1.5 rounded-l-full">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div className={`bg-gradient-to-br ${pkg.gradient} p-6 text-center`}>
                  <h3 className="font-display text-xl font-bold text-white">{pkg.tier}</h3>
                  <div className="mt-3">
                    <span className="text-3xl md:text-4xl font-display font-bold text-mela-gold-light">{pkg.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white/80 text-sm leading-relaxed">{pkg.desc}</p>
                  <Link to="/sponsors" className="mt-5 inline-flex items-center gap-2 text-mela-gold text-sm font-semibold hover:text-mela-gold-light transition-colors group">
                    View full package
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <GoldenButton variant="primary" to="/sponsors">
              View All Packages
            </GoldenButton>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BEFORE / DURING / AFTER TIMELINE
          ══════════════════════════════════ */}
      <section ref={timelineRef} className="py-20 lg:py-28 bg-mela-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Sponsorship Journey"
            title="Before, During &amp; After"
            description="See how your sponsorship comes to life across the entire event journey."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[0, 1, 2].map((i) => (
              <TimelinePhase key={i} index={i} active={timelinePhase === i} />
            ))}
          </div>
          <div className="relative h-1 bg-mela-cream rounded-full mt-10 max-w-2xl mx-auto overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-mela-gold via-mela-red to-mela-green"
              style={{ width: `${((timelinePhase + 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 space-y-2"
          >
            {['LOCAL ROOTS', 'REGIONAL STRENGTH', 'NATIONAL REACH'].map((line, i) => (
              <motion.p
                key={line}
                className="font-display text-2xl md:text-4xl font-bold tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                style={{ color: i === 0 ? '#0A3D2A' : i === 1 ? '#C1352B' : '#C9A84C' }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA
          ══════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-mela-green via-mela-green-dark to-[#062618] relative overflow-hidden">
        <GoldParticles count={20} />
        <BuntingDecoration count={12} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
              Be Part of<br />
              <span className="gold-shimmer-text">Bangla Mela 2026</span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Whether you'd like to volunteer, sponsor, or simply join the
              celebration — we'd love to have you with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GoldenButton variant="primary" to="/contact">
                Get Involved
              </GoldenButton>
              <GoldenButton variant="secondary" to="/about">
                Learn More
              </GoldenButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          NEWSLETTER
          ══════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-mela-ivory border-t border-mela-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-sub text-mela-gold text-lg italic mb-2">Stay Connected</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-mela-green-dark mb-3">
              Join Our Mailing List
            </h3>
            <p className="text-mela-dark/60 text-sm mb-6 max-w-md mx-auto">
              Be the first to hear about event updates, ticket information, and community news.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-xl border border-mela-cream bg-white text-sm focus:outline-none focus:border-mela-gold focus:ring-2 focus:ring-mela-gold/20 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-mela-green-dark hover:bg-mela-green text-white font-semibold rounded-xl transition-all duration-300 text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}