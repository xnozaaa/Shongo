import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const packages = [
  {
    name: 'Title Sponsor',
    price: '£10,000',
    color: 'from-mela-magenta via-mela-magenta-dark to-[#6E0F3A]',
    accent: 'text-pink-200',
    badge: 'Premium Package',
    popular: true,
    perks: [
      'Title sponsorship recognition — "Sponsored by [Your Name]" across all materials',
      'Prominent logo placement on main stage backdrop & event banners',
      'Dedicated exhibition stall at prime location',
      'Speaking opportunity at opening ceremony (5 mins)',
      'Full-page colour advertisement in event programme',
      'Social media campaign featuring your brand (8 posts across platforms)',
      'Logo on all digital marketing materials & website homepage',
      'VIP access for 15 representatives',
      'Named mention in all press releases & media coverage',
      'Personalised recognition plaque',
      'First right of refusal for next year\'s sponsorship',
    ],
  },
  {
    name: 'Gold Sponsor',
    price: '£5,000',
    color: 'from-yellow-700 via-yellow-600 to-yellow-500',
    accent: 'text-yellow-200',
    badge: 'Gold Tier',
    popular: false,
    perks: [
      'Logo on main stage backdrop & event banners',
      'Dedicated exhibition stall',
      'Half-page colour advertisement in event programme',
      'Social media features (5 posts across platforms)',
      'Logo on website sponsor page & digital materials',
      'VIP access for 8 representatives',
      'Named mention in press releases',
      'Recognition certificate',
    ],
  },
  {
    name: 'Silver Sponsor',
    price: '£3,000',
    color: 'from-gray-500 via-gray-400 to-gray-300',
    accent: 'text-gray-100',
    badge: 'Silver Tier',
    popular: false,
    perks: [
      'Logo on sponsor banners at venue',
      'Quarter-page colour advertisement in event programme',
      'Social media features (3 posts)',
      'Logo on website sponsor page',
      'VIP access for 4 representatives',
      'Recognition certificate',
    ],
  },
  {
    name: 'Bronze Sponsor',
    price: '£1,000',
    color: 'from-amber-800 via-amber-700 to-amber-600',
    accent: 'text-amber-200',
    badge: 'Bronze Tier',
    popular: false,
    perks: [
      'Name on sponsor banners at venue',
      'Listing in event programme',
      'Social media mention (1 post)',
      'Name on website sponsor page',
      'General admission for 2 representatives',
    ],
  },
]

const currentSponsors = [
  { name: 'Walsall Council', tier: 'Platinum', initials: 'WC' },
  { name: 'Bengali Cultural Trust', tier: 'Gold', initials: 'BT' },
  { name: 'Community First UK', tier: 'Gold', initials: 'CF' },
  { name: 'Local Business Alliance', tier: 'Silver', initials: 'LB' },
  { name: 'Heritage Foundation', tier: 'Silver', initials: 'HF' },
  { name: 'Unity Media Group', tier: 'Bronze', initials: 'UM' },
]

function SponsorTier({ tier, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative bg-white rounded-2xl border ${
        tier.popular ? 'border-mela-gold shadow-xl ring-1 ring-mela-gold/30' : 'border-mela-cream shadow-lg'
      } overflow-hidden`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute top-5 right-0">
          <div className="bg-mela-gold text-mela-magenta-dark text-xs font-bold px-4 py-1.5 rounded-l-full shadow-md">
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-gradient-to-br ${tier.color} p-6 md:p-8 text-center`}>
        <span className={`inline-block text-xs font-semibold uppercase tracking-widest ${tier.accent} opacity-80`}>
          {tier.badge}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-2">{tier.name}</h3>
        <div className="mt-4">
          <span className="text-4xl md:text-5xl font-display font-bold text-white">{tier.price}</span>
        </div>
      </div>

      {/* Perks */}
      <div className="p-6 md:p-8">
        <ul className="space-y-3.5">
          {tier.perks.map((perk, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <svg
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  tier.popular ? 'text-mela-gold' : 'text-mela-magenta'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-mela-dark/80">{perk}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className={`mt-8 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 inline-block text-center ${
            tier.popular
              ? 'bg-mela-gold hover:bg-mela-gold-light text-mela-magenta-dark shadow-md hover:shadow-lg'
              : 'bg-mela-magenta hover:bg-mela-magenta-light text-white shadow-md hover:shadow-lg'
          }`}
        >
          Enquire About This Package
        </Link>
      </div>
    </motion.div>
  )
}

export default function Sponsors() {
  return (
    <>
      <PageHero
        subtitle="Become a Partner"
        title="Sponsorship Opportunities"
        description="Join us in making Walsall's First Ever Bangla Mela a landmark event. Your support helps us celebrate Bengali culture and unite our community."
      />

      {/* ══════ WHY SPONSOR ══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="The Opportunity"
            title="Why Sponsor Bangla Mela 2026?"
            description="Sponsoring the Bangla Mela offers unparalleled visibility and connection within the Walsall community."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Community Impact', desc: 'Directly support a landmark cultural event that brings together diverse communities in Walsall.' },
              { icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055zM20.488 9H15V3.512A9.025 9.025 0 0120.488 9z', title: 'Brand Visibility', desc: 'Gain exposure to thousands of attendees through multiple branding and promotional channels.' },
              { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title: 'Networking', desc: 'Connect with community leaders, local businesses, and cultural organisations in a vibrant setting.' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'CSR Excellence', desc: 'Demonstrate your commitment to cultural diversity and community cohesion through meaningful support.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-mela-magenta/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-mela-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-mela-green mb-2">{item.title}</h3>
                <p className="text-mela-dark/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SPONSORSHIP PACKAGES ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Choose Your Level"
            title="Sponsorship Packages"
            description="Select the sponsorship tier that best aligns with your organisation's goals. Each package offers increasing levels of visibility and engagement."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
            {packages.map((pkg, i) => (
              <SponsorTier key={pkg.name} tier={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CURRENT SPONSORS ══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Partners"
            title="Current Sponsors"
            description="We are proud to be supported by these wonderful organisations."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSponsors.map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-5 p-6 bg-mela-cream/50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-mela-cream"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mela-magenta to-mela-magenta-dark flex items-center justify-center text-white font-display font-bold text-xl shrink-0">
                  {sponsor.initials}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-mela-magenta-dark">{sponsor.name}</h4>
                  <span className="text-xs text-mela-gold font-medium">{sponsor.tier} Sponsor</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-mela-magenta hover:bg-mela-magenta-light text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
            >
              Become a Sponsor
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