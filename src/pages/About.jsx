import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

/* ─── Value Card ─── */
function ValueCard({ icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-mela-cream hover:border-mela-gold/30 transition-all duration-500 group"
    >
      <div className="w-12 h-12 rounded-xl bg-mela-green/10 flex items-center justify-center mb-5 group-hover:bg-mela-green/20 transition-colors">
        <svg className="w-6 h-6 text-mela-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <h3 className="font-display text-lg font-semibold text-mela-green mb-2">{title}</h3>
      <p className="text-mela-dark/70 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        subtitle="Our Story"
        title="About Shongo Shomithi"
        description="Discover the heart and soul behind Walsall's United Bangla Community and our mission to bring people together through culture."
      />

      {/* ══════ OUR STORY ══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-sub text-lg md:text-xl italic text-mela-gold font-medium block mb-4">
                Our Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-mela-green leading-tight mb-6">
                A Community Built on Heritage &amp; Unity
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5"
            >
              <p className="text-mela-dark/80 leading-relaxed">
                Shongo Shomithi — United Bangla Community was founded by a group
                of passionate individuals who recognised the need for a unified
                platform to celebrate and preserve Bengali culture in Walsall.
              </p>
              <p className="text-mela-dark/80 leading-relaxed">
                What began as small community gatherings has blossomed into a
                thriving organisation that brings together people from all walks
                of life. Our name, "Shongo Shomithi," means "Together in
                Association" — reflecting our core belief that community grows
                stronger when we stand united.
              </p>
              <p className="text-mela-dark/80 leading-relaxed">
                The Bangla Mela 2026 represents our proudest achievement yet —
                Walsall's first-ever festival dedicated entirely to Bengali
                culture. It is a dream realised through the dedication of our
                committee members, volunteers, and the unwavering support of the
                local community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ MISSION & VISION ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Purpose"
            title="Mission &amp; Vision"
            description="Guided by our values, we strive to create meaningful cultural experiences that unite communities."
          />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-mela-green/10 to-mela-gold/10 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-mela-cream">
                <div className="w-16 h-16 rounded-full bg-mela-green flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-mela-green mb-4">Our Mission</h3>
                <p className="text-mela-dark/70 leading-relaxed">
                  To promote, preserve, and celebrate Bengali culture, language,
                  and heritage within the Walsall community. We aim to create
                  inclusive spaces where people from all backgrounds can
                  experience the richness of Bengali traditions and build lasting
                  connections across communities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-mela-gold/10 to-mela-green/10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
              <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-mela-cream">
                <div className="w-16 h-16 rounded-full bg-mela-gold flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-mela-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-mela-green mb-4">Our Vision</h3>
                <p className="text-mela-dark/70 leading-relaxed">
                  A Walsall where Bengali culture is celebrated, understood, and
                  cherished by all. We envision the Bangla Mela becoming an
                  annual cornerstone event that enriches the cultural fabric of
                  our town and serves as a bridge between communities for
                  generations to come.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ WHAT TO EXPECT ══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="The Experience"
            title="What to Expect at Bangla Mela 2026"
            description="A day filled with colour, flavour, music, and community spirit — here's a taste of what awaits you."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
                title: 'Live Performances',
                desc: 'Traditional music, dance, and cultural showcases on the main stage throughout the day.',
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
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-mela-cream/60 rounded-2xl p-6 lg:p-8 hover:bg-white hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-mela-gold/20"
              >
                <div className="w-12 h-12 rounded-lg bg-mela-green/10 flex items-center justify-center mb-4 group-hover:bg-mela-green/20 transition-colors">
                  <svg className="w-6 h-6 text-mela-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-mela-green mb-2">{item.title}</h3>
                <p className="text-mela-dark/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ VALUES ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Principles"
            title="Core Values"
            description="The principles that guide everything we do as a community organisation."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard
              index={0}
              icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              title="Community First"
              description="We place the needs and aspirations of our community at the heart of everything we do."
            />
            <ValueCard
              index={1}
              icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              title="Cultural Preservation"
              description="We are dedicated to keeping Bengali traditions, language, and heritage alive for future generations."
            />
            <ValueCard
              index={2}
              icon="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              title="Inclusivity"
              description="We welcome everyone, regardless of background, to experience and celebrate Bengali culture."
            />
            <ValueCard
              index={3}
              icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              title="Collaboration"
              description="We believe in the power of working together — with local organisations, businesses, and community groups."
            />
            <ValueCard
              index={4}
              icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              title="Excellence"
              description="We strive to deliver exceptional cultural experiences that enrich and inspire our community."
            />
            <ValueCard
              index={5}
              icon="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              title="Passion"
              description="Our work is driven by genuine love for our culture and a deep commitment to our community."
            />
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-mela-magenta to-mela-magenta-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Be Part of Our Story?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Whether you'd like to volunteer, sponsor, or simply learn more,
              we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-mela-gold hover:bg-mela-gold-light text-mela-magenta-dark font-semibold rounded-xl transition-all duration-300 shadow-lg"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}