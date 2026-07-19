import PageHero from '../components/PageHero'

export default function CharityPartner() {
  return (
    <>
      <PageHero
        landmark="charityPartner"
        subtitle="Charity Partner"
        title="Official charity partner"
        description="A dedicated page for the official charity partner supporting this community celebration."
      />
      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <div className="rounded-3xl bg-white border border-mela-gold/15 p-6 shadow-sm">
            <div className="rounded-2xl bg-mela-cream/70 h-56 border border-dashed border-mela-gold/30 flex items-center justify-center text-mela-dark/50">Charity Logo</div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-mela-gold/15 p-6 md:p-8 shadow-sm">
              <h2 className="font-display text-3xl text-mela-green-dark">Charity introduction</h2>
              <p className="mt-4 text-mela-dark/70 leading-relaxed">Full charity partner information will be provided here, including its story, work and community mission.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white border border-mela-gold/15 p-6 shadow-sm">
                <h3 className="font-display text-2xl text-mela-green-dark">Mission</h3>
                <p className="mt-3 text-mela-dark/70 leading-relaxed">Placeholder charity mission summary.</p>
              </div>
              <div className="rounded-3xl bg-white border border-mela-gold/15 p-6 shadow-sm">
                <h3 className="font-display text-2xl text-mela-green-dark">Why this partner</h3>
                <p className="mt-3 text-mela-dark/70 leading-relaxed">Placeholder explanation for why this charity is the official partner.</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-mela-gold/15 p-6 shadow-sm">
              <h3 className="font-display text-2xl text-mela-green-dark">Website / Contact</h3>
              <p className="mt-3 text-mela-red font-medium">Official charity website and contact details will be added later.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
