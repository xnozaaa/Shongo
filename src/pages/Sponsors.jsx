import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import GoldenButton from '../components/GoldenButton'

const packages = [
  { name: 'Gold Partner', fee: '£5,000' },
  { name: 'Silver Partner', fee: '£2,500' },
  { name: 'Bronze Partner', fee: '£1,000' },
  { name: 'Community Partner', fee: '£500' },
]

const zones = [
  { name: 'Entrance Gateway Sponsor', fee: '£2,000' },
  { name: 'Food Court Zone Sponsor', fee: '£2,500' },
  { name: 'Children’s Zone Sponsor', fee: '£2,000' },
  { name: 'Traders Zone Sponsor', fee: '£2,000' },
  { name: 'Volunteer Team Sponsor', fee: '£1,500' },
  { name: 'Event Programme Sponsor', fee: '£1,500' },
]

const benefits = [
  'Increase brand visibility',
  'Connect with a diverse audience',
  'Showcase your commitment to community',
  'Build strong relationships',
  'Enhance your brand reputation',
  'Support local growth',
]

const stats = [
  '3,000+ expected visitors',
  '25,000+ digital impressions',
  '40+ traders and exhibitors',
  'Main stage with nasheeds and cultural performances',
  'Regional media exposure',
]

export default function Sponsors() {
  return (
    <>
      <PageHero
        landmark="lalbagh"
        subtitle="Sponsorship"
        title="Professional, community-focused sponsorship opportunities"
        description="Sponsoring Walsall’s First Ever Bangla Community Day places your brand at the heart of a landmark community celebration that brings people together, promotes culture and creates lasting memories."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-mela-green-dark text-white p-6 md:p-8 lg:p-10 shadow-xl">
            <p className="font-sub text-mela-gold text-xl mb-3">Platinum Headline Sponsor</p>
            <h2 className="font-display text-4xl mb-4 leading-tight text-balance">Laxmi Jewellers</h2>
            <p className="text-white/80 leading-relaxed text-pretty">
              Proudly recognised as the Platinum Headline Sponsor for Walsall’s First Ever Bangla Community Day 2026.
            </p>
          </div>
          <div>
            <SectionTitle
              align="left"
              subtitle="Why Sponsor"
              title="Support a landmark celebration with visible local impact"
              description="Your support helps deliver an inspiring and inclusive event while positioning your organisation alongside a premium, trusted and community-led cultural celebration."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl bg-white border border-mela-gold/15 p-4 md:p-5 shadow-sm text-mela-dark/75 leading-relaxed text-pretty">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Packages" title="Available sponsorship packages" description="Choose the level that best matches your organisation’s goals and community engagement ambitions." />
          <div className="grid gap-5 lg:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((item) => (
              <div key={item.name} className="rounded-3xl bg-white p-6 md:p-7 border border-mela-gold/15 shadow-sm">
                <p className="font-display text-2xl text-mela-green-dark mb-3 leading-[1.18] text-balance">{item.name}</p>
                <p className="text-3xl text-mela-red font-semibold">{item.fee}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle align="left" subtitle="Area Sponsorship" title="Targeted opportunities across the event" description="Ideal for brands seeking focused presence in high-traffic areas and key visitor touchpoints." />
            <div className="space-y-4">
              {zones.map((zone) => (
                <div key={zone.name} className="rounded-2xl bg-white border border-mela-gold/15 p-4 md:p-5 shadow-sm flex items-center justify-between gap-4">
                  <span className="text-mela-dark/80 leading-relaxed text-pretty">{zone.name}</span>
                  <span className="font-semibold text-mela-red">{zone.fee}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-mela-green-dark text-white p-6 md:p-8 lg:p-10 shadow-xl">
            <p className="font-sub text-mela-gold text-xl mb-3">Event Reach</p>
            <h3 className="font-display text-4xl mb-6 leading-[1.12] text-balance">Meaningful visibility before, during and after the event</h3>
            <div className="space-y-4 mb-8">
              {stats.map((stat) => (
                <div key={stat} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white/85 leading-relaxed text-pretty">
                  {stat}
                </div>
              ))}
            </div>
            <GoldenButton to="/contact">Become a Sponsor</GoldenButton>
          </div>
        </div>
      </section>
    </>
  )
}
