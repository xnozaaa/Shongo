import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'

/* ─── Countdown Timer ─── */
function Countdown({ targetDate }) {
  const calcRemaining = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calcRemaining)

  useEffect(() => {
    const timer = setInterval(() => setTime(calcRemaining), 1000)
    return () => clearInterval(timer)
  }, [])

  const items = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className="flex gap-3 md:gap-5 justify-center">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-medium mt-1.5 uppercase tracking-wider">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ─── Highlight Card ─── */
function HighlightCard({ icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-mela-cream hover:border-mela-gold/30"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mela-green to-mela-green-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-7 h-7 text-mela-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <h3 className="font-display text-xl font-semibold text-mela-green mb-3">
        {title}
      </h3>
      <p className="text-mela-dark/70 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <>
      {/* ══════ HERO SECTION ══════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-mela-green via-mela-green-dark to-[#041a0e]">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[50rem] h-[50rem] bg-mela-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] bg-mela-green-light/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[30rem] h-[30rem] bg-mela-gold/3 rounded-full blur-3xl" />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-pattern)" />
            </svg>
          </div>
        </div>

        {/* Diagonal accent */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-mela-gold to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <span className="inline-block px-4 py-2 rounded-full bg-mela-gold/15 border border-mela-gold/30 text-mela-gold text-sm font-medium mb-6 font-sub tracking-wider uppercase">
              Walsall's First Ever
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-4">
              Bangla Mela
              <span className="block text-mela-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mt-2 font-sub italic">
                2026
              </span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed font-body">
              A spectacular celebration of Bengali culture, heritage, and
              community — bringing Walsall together for an unforgettable
              experience.
            </p>

            {/* Countdown */}
            <div className="mt-10 mb-8">
              <p className="text-white/50 text-sm uppercase tracking-widest mb-4 font-medium">
                Coming In
              </p>
              <Countdown targetDate="2026-08-15T10:00:00" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                to="/events"
                className="px-8 py-3.5 bg-mela-gold hover:bg-mela-gold-light text-mela-green font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Explore Events
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 border-2 border-white/30 hover:border-white/50 text-white font-medium rounded-xl transition-all duration-300 text-sm md:text-base backdrop-blur-sm"
              >
                Get Involved
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ ABOUT THE MELA ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="About the Celebration"
            title="Walsall's First Ever Bangla Mela"
            description="The Bangla Mela is a vibrant festival that showcases the rich cultural tapestry of Bangladesh through music, dance, food, art, and community togetherness."
          />

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-mela-green/20 to-mela-gold/20 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-mela-green flex items-center justify-center">
                      <svg className="w-12 h-12 text-mela-gold" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <p className="font-display text-lg text-mela-green font-semibold">
                      Celebrating Bengali Heritage
                    </p>
                    <p className="text-mela-dark/60 text-sm mt-2">
                      A day of cultural performances, authentic cuisine, and community spirit
                    </p>
                  </div>
                </div>
                {/* Decorative corner */}
                <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-mela-gold/40 rounded-tr-xl" />
                <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-mela-green/30 rounded-bl-xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              <p className="text-mela-dark/80 leading-relaxed">
                Shongo Shomithi — United Bangla Community proudly presents
                Walsall's inaugural Bangla Mela. This landmark event brings
                together the vibrant Bengali community and the wider Walsall
                public for a day of celebration, connection, and cultural
                exchange.
              </p>
              <p className="text-mela-dark/80 leading-relaxed">
                From traditional music and dance performances to mouth-watering
                Bengali cuisine, from art exhibitions to family-friendly
                activities — the Bangla Mela promises something for everyone.
              </p>
              <p className="text-mela-dark/80 leading-relaxed">
                Join us as we create history and build bridges between
                communities through the universal language of culture.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-mela-green font-semibold hover:text-mela-green-light transition-colors mt-2 group"
              >
                Learn More About Us
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ HIGHLIGHTS ══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="What Awaits You"
            title="Mela Highlights"
            description="Immerse yourself in a world of colour, flavour, and tradition with our carefully curated programme."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <HighlightCard
              index={0}
              icon="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              title="Live Music & Dance"
              description="Experience mesmerising performances featuring traditional Bengali folk music, Baul songs, and classical dance throughout the day."
            />
            <HighlightCard
              index={1}
              icon="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
              title="Cultural Workshops"
              description="Participate in hands-on sessions exploring Bengali art, calligraphy, traditional crafts, and henna application."
            />
            <HighlightCard
              index={2}
              icon="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              title="Authentic Cuisine"
              description="Savour the rich flavours of Bangladesh with a wide variety of traditional dishes, from spicy curries to sweet treats."
            />
            <HighlightCard
              index={3}
              icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              title="Community Village"
              description="Meet local community groups, discover cultural organisations, and connect with fellow community members."
            />
            <HighlightCard
              index={4}
              icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              title="Art & Heritage"
              description="Explore exhibitions showcasing Bengali heritage, traditional attire, historical photographs, and contemporary art."
            />
            <HighlightCard
              index={5}
              icon="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              title="Kids' Activities"
              description="A dedicated zone with face painting, storytelling, traditional games, and creative workshops for our younger visitors."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-mela-green hover:bg-mela-green-light text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              View Full Schedule
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════ SPONSOR CTA ══════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-mela-green via-mela-green-dark to-[#041a0e] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-mela-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-sub text-lg md:text-xl italic text-mela-gold font-medium mb-4">
              Support the Community
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
              Partner with Us as a Sponsor
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
              Join us in making Walsall's First Ever Bangla Mela a resounding
              success. Your sponsorship will help us deliver an unforgettable
              cultural experience for the entire community.
            </p>
            <div className="flex flex-col sm:row gap-4 justify-center mt-10">
              <Link
                to="/sponsors"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-mela-gold hover:bg-mela-gold-light text-mela-green font-semibold rounded-xl transition-all duration-300 shadow-lg"
              >
                View Sponsorship Packages
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ NEWSLETTER ══════ */}
      <section className="py-16 lg:py-20 bg-mela-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-mela-green mb-3">
              Stay in the Loop
            </h3>
            <p className="text-mela-dark/70 text-sm md:text-base mb-8">
              Subscribe to receive the latest updates about Mela events, ticket
              releases, and community news.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white border border-mela-cream focus:border-mela-gold focus:outline-none text-sm transition-colors shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-mela-green hover:bg-mela-green-light text-white font-semibold rounded-xl transition-all duration-300 text-sm whitespace-nowrap"
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