import PageHero from '../components/PageHero'

const sponsors = Array.from({ length: 8 }, (_, index) => index + 1)

export default function OurSponsors() {
  return (
    <>
      <PageHero
        landmark="ourSponsors"
        subtitle="Our Sponsors"
        title="Our Sponsors"
        description="We are grateful to all of our sponsors and partners for supporting Walsall’s First Ever Bangla Community Day 2026."
      />
      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sponsors.map((item) => (
              <div key={item} className="rounded-3xl bg-white border border-mela-gold/15 p-6 shadow-sm">
                <div className="rounded-2xl bg-mela-cream/70 h-32 border border-dashed border-mela-gold/30 flex items-center justify-center text-mela-dark/50">Sponsor Logo</div>
                <p className="mt-4 text-center font-medium text-mela-green-dark">Sponsor {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
