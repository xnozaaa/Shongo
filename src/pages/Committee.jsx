import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const committeeMembers = [
  {
    name: 'Abdul Rahman',
    role: 'Chairperson',
    bio: 'Leading the vision and strategy for Shongo Shomithi with over 15 years of community leadership experience.',
    initials: 'AR',
    color: 'from-mela-green to-mela-green-light',
  },
  {
    name: 'Fatima Begum',
    role: 'Vice Chairperson',
    bio: 'Dedicated to community engagement and ensuring inclusive representation across all our programmes.',
    initials: 'FB',
    color: 'from-mela-green-light to-mela-green',
  },
  {
    name: 'Mohammed Ali',
    role: 'Secretary',
    bio: 'Managing organisational operations and coordinating the dedicated team behind Bangla Mela 2026.',
    initials: 'MA',
    color: 'from-mela-gold to-yellow-600',
  },
  {
    name: 'Shahida Khanom',
    role: 'Treasurer',
    bio: 'Overseeing financial planning and sponsorship management with transparency and integrity.',
    initials: 'SK',
    color: 'from-mela-green-dark to-mela-green',
  },
  {
    name: 'Rafiq Uddin',
    role: 'Events Coordinator',
    bio: 'Bringing years of event management expertise to deliver an unforgettable Bangla Mela experience.',
    initials: 'RU',
    color: 'from-emerald-600 to-mela-green-light',
  },
  {
    name: 'Nasrin Akhtar',
    role: 'Cultural Programme Lead',
    bio: 'Curating the artistic and cultural programme, ensuring authentic representation of Bengali heritage.',
    initials: 'NA',
    color: 'from-amber-600 to-mela-gold',
  },
  {
    name: 'Tariq Hossain',
    role: 'Marketing & Communications',
    bio: 'Driving awareness and engagement through strategic communications and community outreach.',
    initials: 'TH',
    color: 'from-teal-600 to-emerald-600',
  },
  {
    name: 'Jahanara Parvin',
    role: 'Volunteer Coordinator',
    bio: 'Leading our wonderful team of volunteers who are the backbone of the Bangla Mela.',
    initials: 'JP',
    color: 'from-mela-green to-teal-700',
  },
  {
    name: 'Shahjahan Miah',
    role: 'Food & Hospitality Lead',
    bio: 'Coordinating the culinary experience, bringing authentic Bengali flavours to the Mela.',
    initials: 'SM',
    color: 'from-orange-600 to-amber-600',
  },
  {
    name: 'Sayeeda Islam',
    role: 'Community Liaison',
    bio: 'Building bridges between Shongo Shomithi and the wider Walsall community.',
    initials: 'SI',
    color: 'from-cyan-600 to-teal-600',
  },
  {
    name: 'Faruq Ahmed',
    role: 'Logistics & Operations',
    bio: 'Ensuring everything runs smoothly behind the scenes on the day of the Mela.',
    initials: 'FA',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'Rokeya Khatun',
    role: 'Youth Engagement Lead',
    bio: 'Creating opportunities for young people to engage with and celebrate their cultural heritage.',
    initials: 'RK',
    color: 'from-violet-600 to-purple-600',
  },
]

export default function Committee() {
  return (
    <>
      <PageHero
        subtitle="Meet the Team"
        title="Our Committee"
        description="The dedicated individuals working tirelessly to bring Bangla Mela 2026 to life. Get to know the team behind Shongo Shomithi."
      />

      {/* ══════ COMMITTEE MEMBERS ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Leadership"
            title="Meet the Committee"
            description="A passionate group of community leaders, each bringing unique skills and dedication to make Bangla Mela 2026 a reality."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {committeeMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-mela-cream hover:border-mela-gold/30"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className={`h-32 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-white">{member.initials}</span>
                    </div>
                  </div>
                  {/* Decorative wave */}
                  <svg className="absolute bottom-0 left-0 right-0 w-full h-6 text-white" viewBox="0 0 1440 48" preserveAspectRatio="none">
                    <path d="M0 48h1440V0c-120 24-360 48-720 48S120 24 0 0v48z" fill="white" />
                  </svg>
                </div>

                {/* Info */}
                <div className="p-5 text-center -mt-2">
                  <h3 className="font-display text-lg font-semibold text-mela-magenta-dark">
                    {member.name}
                  </h3>
                  <p className="text-mela-gold text-sm font-medium font-sub italic">
                    {member.role}
                  </p>
                  <p className="text-mela-dark/60 text-sm mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ VOLUNTEER CTA ══════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-mela-magenta via-mela-magenta-dark to-[#6E0F3A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-mela-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sub text-lg md:text-xl italic text-mela-gold font-medium block mb-4">
              Join the Team
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Want to Volunteer?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              We're always looking for enthusiastic volunteers to help make the
              Bangla Mela a success. Whether you can spare a few hours or the
              whole day, your support makes a difference.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-mela-gold hover:bg-mela-gold-light text-mela-green font-semibold rounded-xl transition-all duration-300 shadow-lg"
            >
              Sign Up to Volunteer
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