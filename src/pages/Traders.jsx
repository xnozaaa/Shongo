import GoldenButton from '../components/GoldenButton'
import PageHero from '../components/PageHero'

export default function Traders() {
  return (
    <>
      <PageHero
        landmark="traders"
        subtitle="Bangla Community Day 2026"
        title="Stall Applications Closed"
        description="Stall applications for Walsall’s First Ever Bangla Community Day 2026 are now closed."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-mela-gold/20 p-7 sm:p-10 md:p-14 text-center shadow-sm red-accent-ring">
            <span className="inline-flex rounded-full bg-mela-red/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-mela-red">
              Applications closed
            </span>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl text-mela-green-dark leading-tight text-balance">
              Thank you to every trader who joined us
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mela-dark/70 text-pretty">
              Walsall’s First Ever Bangla Community Day took place on Sunday 30 August 2026. We are incredibly grateful to the traders and exhibitors who helped make it such a memorable celebration.
            </p>
            <p className="mt-4 leading-relaxed text-mela-dark/65 text-pretty">
              Existing application records and supporting documents remain securely available to the organising team. No new stall applications or document uploads are being accepted for this event.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <GoldenButton to="/" size="lg">Return Home</GoldenButton>
              <GoldenButton to="/contact" variant="secondary" size="lg">Contact the Organisers</GoldenButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
