import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const values = ['Unity', 'Respect', 'Inclusion', 'Community Pride', 'Heritage', 'Opportunity', 'Togetherness']

export default function About() {
  return (
    <>
      <PageHero
        landmark="ahsan"
        subtitle="About the Event"
        title="Walsall’s First Ever Bangla Community Day 2026"
        description="A landmark family-friendly event celebrating Bangladeshi culture, heritage, food, community, family activities and togetherness."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <SectionTitle
              align="left"
              subtitle="Shongo Shomithi"
              title="A celebration rooted in culture, inclusion and community pride"
              description="Shongo Shomithi is proud to present Walsall’s First Ever Bangla Community Day 2026, a landmark family-friendly event bringing together families, businesses, community organisations and residents across Walsall and the wider West Midlands. The event celebrates Bangladeshi culture, heritage, food, community, family activities and togetherness."
            />
          </div>
          <div className="rounded-3xl bg-white border border-mela-gold/15 p-6 md:p-8 shadow-sm">
            <h3 className="font-display text-3xl text-mela-green-dark mb-4">Event Details</h3>
            <div className="space-y-3 text-mela-dark/75">
              <p><strong>Organisation:</strong> Shongo Shomithi</p>
              <p><strong>Tagline:</strong> United Bangla Community</p>
              <p><strong>Date:</strong> Sunday 30 August 2026</p>
              <p><strong>Time:</strong> 12:00pm to 6:00pm</p>
              <p><strong>Venue:</strong> Walsall Rugby Club, Delves Road, Walsall, WS1 3JY</p>
              <p><strong>Event type:</strong> Free community event, open to all</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm">
            <p className="font-sub text-mela-gold text-xl mb-3">Vision</p>
            <p className="text-mela-dark/75 leading-relaxed text-pretty">
              To establish Walsall’s premier annual cultural celebration, bringing communities together through heritage, inclusion and shared experiences while creating a lasting legacy for future generations.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm">
            <p className="font-sub text-mela-gold text-xl mb-3">Mission</p>
            <p className="text-mela-dark/75 leading-relaxed text-pretty">
              To deliver an inspiring, inclusive and professionally organised community event that celebrates culture, promotes unity, supports local businesses and traders, and provides meaningful opportunities for families and residents to connect, engage and celebrate together.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Values"
            title="Guided by heritage, respect and togetherness"
            description="Everything about the event is designed to feel welcoming, professional and rooted in community benefit."
          />
          <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value} className="rounded-2xl bg-white border border-mela-gold/15 p-5 md:p-6 text-center shadow-sm">
                <p className="font-display text-2xl text-mela-green-dark">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
