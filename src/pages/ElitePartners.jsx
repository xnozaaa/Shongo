import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const partners = [1, 2, 3, 4]

export default function ElitePartners() {
  return (
    <>
      <PageHero
        landmark="elitePartners"
        subtitle="Elite Partners"
        title="Our headline sponsor and elite partners"
        description="A premium showcase for the organisations supporting Walsall’s First Ever Bangla Community Day 2026."
      />
      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Partner Showcase"
            title="Elite partner information will be updated here"
            description="This page will later include partner logos, short service introductions and direct links to each partner’s website."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner} className="rounded-3xl bg-white border border-mela-gold/15 p-6 shadow-sm">
                <div className="rounded-2xl bg-mela-cream/70 h-36 border border-dashed border-mela-gold/30 flex items-center justify-center text-mela-dark/50">Partner Logo</div>
                <h3 className="mt-5 font-display text-2xl text-mela-green-dark">Elite Partner {partner}</h3>
                <p className="mt-3 text-mela-dark/70 leading-relaxed">Placeholder description for elite partner services and community support.</p>
                <p className="mt-4 text-sm text-mela-red font-medium">Website link to be added</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
