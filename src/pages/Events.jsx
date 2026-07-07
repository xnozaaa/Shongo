import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const items = [
  'Main stage with nasheed artists and cultural performances',
  'Children’s activities and family attractions',
  'Cultural showcase and heritage exhibitions',
  'Trader business marketplace',
  'Food stalls and traditional snacks',
  'Community stalls and local organisations',
]

export default function Events() {
  return (
    <>
      <PageHero
        landmark="shaheedMinar"
        subtitle="What’s On"
        title="A full day of culture, community and family-friendly experiences"
        description="Plan your visit and explore the experiences that make Bangla Community Day a welcoming celebration for all ages."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Highlights"
            title="Designed for families, residents, visitors and local organisations"
            description="From the main stage to the trader marketplace, every part of the event is curated to celebrate heritage, showcase talent and bring communities together."
          />
          <div className="grid gap-5 lg:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <div key={item} className="rounded-3xl bg-white p-6 md:p-7 border border-mela-gold/15 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-mela-red/10 text-mela-red flex items-center justify-center mb-4 font-display text-lg">
                  {index + 1}
                </div>
                <h3 className="font-display text-2xl text-mela-green-dark mb-3 leading-[1.18] text-balance">{item}</h3>
                <p className="text-mela-dark/70 leading-relaxed text-pretty">
                  A carefully planned part of the wider community celebration, created to feel inclusive, engaging and memorable.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-5 lg:gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm text-center">
            <p className="font-sub text-mela-gold text-xl mb-2">Date</p>
            <p className="font-display text-3xl text-mela-green-dark">Sunday 30 August 2026</p>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm text-center">
            <p className="font-sub text-mela-gold text-xl mb-2">Time</p>
            <p className="font-display text-3xl text-mela-green-dark">12:00pm – 6:00pm</p>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm text-center">
            <p className="font-sub text-mela-gold text-xl mb-2">Entry</p>
            <p className="font-display text-3xl text-mela-green-dark">Free community event</p>
          </div>
        </div>
      </section>
    </>
  )
}
