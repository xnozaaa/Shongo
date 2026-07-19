import { motion } from 'framer-motion'
import { useState } from 'react'
import GoldenButton from '../components/GoldenButton'
import SectionTitle from '../components/SectionTitle'
import Countdown from '../components/Countdown'
import { GoldParticles, AnimatedCounter } from '../components/FestivalAnimations'

const values = [
  {
    title: 'Connecting\nGenerations',
    description: 'Bringing elders, parents and young people together through events, activities and shared community spaces.',
  },
  {
    title: 'Preserving\nHeritage',
    description: 'Keeping Bangla language, culture, history and traditions alive for the next generation.',
  },
  {
    title: 'Strengthening\nCommunity',
    description: 'Creating support, advice, opportunity and unity for families across Walsall.',
  },
  {
    title: 'Brighter\nFuture',
    description: 'Building pathways for our youth. Education, opportunity, and a community that believes in their potential.',
  },
]

const involvementOptions = [
  'Attend Community Day',
  'Volunteer',
  'Stall Holder',
  'Sponsor / Support',
  'Bangla Classes',
  'Youth Activities',
  'Elderly Support',
  'General Updates',
]

const stats = [
  { value: 3000, suffix: '+', label: 'Expected visitors' },
  { value: 25000, suffix: '+', label: 'Digital impressions', numberClass: 'text-[1.4rem] sm:text-[1.55rem] lg:text-[1.4rem] xl:text-[1.55rem]' },
  { value: 40, suffix: '+', label: 'Traders and exhibitors' },
]

const initialInterestForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  involvement: '',
  message: '',
}

export default function Home() {
  const [interestForm, setInterestForm] = useState(initialInterestForm)
  const [interestSubmitted, setInterestSubmitted] = useState(false)
  const [interestSubmitting, setInterestSubmitting] = useState(false)
  const [interestError, setInterestError] = useState('')

  const handleInterestChange = (event) => {
    const { name, value } = event.target
    setInterestForm((current) => ({ ...current, [name]: value }))
  }

  const handleInterestSubmit = async (event) => {
    event.preventDefault()
    setInterestError('')
    setInterestSubmitting(true)

    try {
      const response = await fetch('/api/register-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interestForm),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to submit your interest at this time.')

      setInterestSubmitted(true)
      setInterestForm(initialInterestForm)
    } catch (error) {
      setInterestError(error.message)
    } finally {
      setInterestSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[radial-gradient(circle_at_22%_30%,rgba(255,250,245,0.96)_0%,rgba(247,240,228,0.98)_28%,rgba(232,224,205,0.78)_42%,rgba(7,54,43,0.22)_62%,rgba(1,68,55,0.96)_100%)]">
        <GoldParticles count={26} />
        <div className="absolute inset-0 bengali-pattern-bg opacity-45" />
        <div className="absolute top-16 right-[6%] w-[32rem] h-[32rem] bg-mela-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-4rem] w-[24rem] h-[24rem] bg-mela-red/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_46%,rgba(4,72,58,0.18),transparent_28%),radial-gradient(circle_at_88%_26%,rgba(201,168,76,0.08),transparent_18%),radial-gradient(circle_at_78%_78%,rgba(1,68,55,0.18),transparent_24%)]" />
          <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] bg-[linear-gradient(90deg,rgba(251,245,234,0)_0%,rgba(251,245,234,0.03)_18%,rgba(18,70,56,0.14)_34%,rgba(5,53,43,0.48)_62%,rgba(1,68,55,0.9)_100%)]" />
          <div className="absolute inset-y-0 right-0 hidden md:block w-[52%] bg-[radial-gradient(circle_at_58%_40%,rgba(212,175,55,0.12),transparent_18%),radial-gradient(circle_at_72%_70%,rgba(212,175,55,0.07),transparent_24%)]" />
          <div className="absolute inset-y-0 right-0 hidden lg:block w-[58%] shimmer-overlay opacity-45 mix-blend-screen z-0 [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.2)_12%,rgba(0,0,0,0.7)_30%,black_48%,black_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.2)_12%,rgba(0,0,0,0.7)_30%,black_48%,black_100%)]" />
          <div className="absolute inset-y-0 right-[-28%] hidden lg:flex items-center pointer-events-none z-10"><img src="/hero-art/home-hero-main.webp" alt="" aria-hidden="true" className="relative z-10 h-[112%] w-auto max-w-none opacity-[0.62] sepia-[0.98] saturate-[1.34] brightness-[1.24] contrast-[1.1] mix-blend-screen drop-shadow-[0_0_34px_rgba(212,175,55,0.24)] [mask-image:radial-gradient(circle_at_center,black_36%,rgba(0,0,0,0.84)_68%,transparent_92%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_36%,rgba(0,0,0,0.84)_68%,transparent_92%)]" /></div>
          <div className="absolute inset-y-0 right-0 hidden lg:block w-[36%] bg-[linear-gradient(90deg,rgba(1,68,55,0)_0%,rgba(1,68,55,0.05)_24%,rgba(1,68,55,0.22)_46%,rgba(1,68,55,0.65)_100%)]" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 w-full">
          <div className="grid gap-6 sm:gap-8 lg:gap-14 lg:grid-cols-[1.08fr_0.92fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center mb-4 md:mb-6 drop-shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                <motion.img
                  src="/ss-logo-stacked.webp"
                  alt="Shongo Shomithi"
                  className="w-32 sm:w-40 md:w-52 h-auto"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <h1 className="font-display text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold text-mela-green-dark leading-[1.04] sm:leading-tight text-balance">
                Connecting Generations.<br />
                <span className="text-mela-gold">Preserving Heritage.</span>
              </h1>
              <p className="mt-4 text-mela-dark/80 text-[15px] sm:text-lg leading-relaxed max-w-2xl text-pretty">
                Shongo Shomithi is a community movement created to bring families together, celebrate Bangladeshi heritage, support our elders, inspire our youth and build something lasting for future generations.
              </p>
              <p className="mt-2.5 font-sub text-mela-gold text-lg sm:text-xl">Together we grow stronger.</p>
              <p className="mt-4 font-display text-2xl sm:text-3xl text-mela-red">Our Current Project</p>
              <div className="mt-3.5 space-y-2 sm:space-y-2.5 text-mela-dark/80 text-[15px] sm:text-lg leading-relaxed max-w-2xl text-pretty">
                <p className="font-display text-2xl sm:text-3xl text-mela-green-dark">Walsall’s First Ever Bangla Community Day 2026</p>
                <p>Sunday 30 August 2026</p>
                <p>12:00pm – 6:00pm</p>
                <p>Walsall Rugby Club, Delves Road, Walsall WS1 3JY</p>
                <p>FREE community event — open to all</p>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-4">
                <GoldenButton to="/stall-applications" size="lg">Stall Applications</GoldenButton>
                <GoldenButton to="/sponsors" variant="red" size="lg">Sponsorship Package</GoldenButton>
                <GoldenButton to="/contact" variant="secondary" size="lg" className="!text-mela-green-dark !border-mela-green-dark/15 !bg-white/80">Contact Us</GoldenButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="glass-dark gold-edge rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 bg-mela-green-dark/92 shadow-[0_24px_60px_rgba(2,39,31,0.26)] backdrop-blur-xl relative overflow-hidden z-30"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)] pointer-events-none" />
              <p className="relative text-white text-center font-display text-[1.7rem] sm:text-3xl mb-4 sm:mb-5">Countdown to Community Day</p>
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

      <section className="py-12 md:py-16 lg:py-18 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="What Shongo Shomithi Stands For"
            title="Shongo Shomithi is built around four simple but powerful aims"
            description=""
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => (
              <div key={value.title.split('\n').map((line, lineIndex) => (<span key={lineIndex} className="block">{line}</span>))} className="rounded-3xl bg-white p-6 md:p-7 border border-mela-red/20 shadow-sm red-accent-ring">
                <div className="w-12 h-12 rounded-full bg-mela-red/10 text-mela-red flex items-center justify-center mb-4 font-display text-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl text-mela-green-dark mb-3 leading-[1.18] text-balance">{value.title.split('\n').map((line, lineIndex) => (<span key={lineIndex} className="block">{line}</span>))}</h3>
                <p className="text-mela-dark/70 leading-relaxed text-pretty">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Register Your Interest"
            title="Be part of the journey"
            description="Whether you want to attend Community Day, volunteer, become a stall holder or simply stay informed — let us know and we’ll be in touch."
          />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div className="rounded-3xl bg-mela-green-dark text-white p-6 md:p-8 shadow-xl">
              <p className="font-sub text-mela-gold text-xl mb-3">Community Interest</p>
              <h3 className="font-display text-4xl mb-5 leading-[1.12] text-balance">Register your interest and stay connected</h3>
              <div className="space-y-3 text-white/80 leading-relaxed">
                <p>Attend Community Day</p>
                <p>Volunteer</p>
                <p>Stall Holder</p>
                <p>Sponsor / Support</p>
                <p>Bangla Classes</p>
                <p>Youth Activities</p>
                <p>Elderly Support</p>
                <p>General Updates</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-mela-gold/15 p-6 md:p-8 shadow-sm">
              {interestSubmitted ? (
                <div className="rounded-2xl bg-mela-cream/60 border border-mela-gold/15 p-6 text-center">
                  <p className="font-display text-3xl text-mela-green-dark mb-2">Thank you!</p>
                  <p className="text-mela-dark/70 leading-relaxed">We’ve received your interest. A member of the team will be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleInterestSubmit} className="space-y-4">
                  {interestError && <p className="rounded-2xl border border-mela-red/20 bg-mela-red/5 px-5 py-4 text-mela-red font-medium">{interestError}</p>}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-mela-green-dark">First Name <span className="text-mela-red text-xl font-black leading-none align-middle">*</span></span>
                      <input name="firstName" value={interestForm.firstName} onChange={handleInterestChange} required className="w-full rounded-2xl border border-mela-gold/15 bg-mela-cream/25 px-4 py-3 outline-none focus:border-mela-gold/40" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-mela-green-dark">Last Name <span className="text-mela-red text-xl font-black leading-none align-middle">*</span></span>
                      <input name="lastName" value={interestForm.lastName} onChange={handleInterestChange} required className="w-full rounded-2xl border border-mela-gold/15 bg-mela-cream/25 px-4 py-3 outline-none focus:border-mela-gold/40" />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-mela-green-dark">Email Address <span className="text-mela-red text-xl font-black leading-none align-middle">*</span></span>
                      <input type="email" name="email" value={interestForm.email} onChange={handleInterestChange} required className="w-full rounded-2xl border border-mela-gold/15 bg-mela-cream/25 px-4 py-3 outline-none focus:border-mela-gold/40" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-mela-green-dark">Phone Number</span>
                      <input name="phone" value={interestForm.phone} onChange={handleInterestChange} className="w-full rounded-2xl border border-mela-gold/15 bg-mela-cream/25 px-4 py-3 outline-none focus:border-mela-gold/40" />
                    </label>
                  </div>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-mela-green-dark">How would you like to get involved? <span className="text-mela-red text-xl font-black leading-none align-middle">*</span></span>
                    <select name="involvement" value={interestForm.involvement} onChange={handleInterestChange} required className="w-full rounded-2xl border border-mela-gold/15 bg-mela-cream/25 px-4 py-3 outline-none focus:border-mela-gold/40">
                      <option value="">Select an option</option>
                      {involvementOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <textarea name="message" value={interestForm.message} onChange={handleInterestChange} rows={5} placeholder="Any message for us?" className="w-full rounded-2xl border border-mela-gold/15 bg-mela-cream/25 px-4 py-3 outline-none focus:border-mela-gold/40" />
                  <button type="submit" disabled={interestSubmitting} className="inline-flex items-center rounded-2xl bg-mela-gold px-6 py-3 text-mela-green-dark font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed">{interestSubmitting ? 'Submitting…' : 'Register My Interest →'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
