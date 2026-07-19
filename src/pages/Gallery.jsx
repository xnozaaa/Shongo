import PageHero from '../components/PageHero'

const groups = [
  'Sponsor Videos',
  'Promotion Videos',
  'Nasheed Artist Videos',
]

export default function Gallery() {
  return (
    <>
      <PageHero
        landmark="gallery"
        subtitle="Gallery"
        title="Video gallery"
        description="A premium gallery space for sponsor videos, promotional videos and nasheed artist content."
      />
      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {groups.map((group) => (
            <div key={group} className="rounded-[2rem] bg-white border border-mela-gold/15 p-6 md:p-8 shadow-sm">
              <h2 className="font-display text-3xl text-mela-green-dark mb-6">{group}</h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-3xl border border-mela-gold/15 overflow-hidden bg-mela-warm">
                    <div className="h-48 bg-mela-green-dark/95 flex items-center justify-center text-mela-gold">Video Placeholder</div>
                    <div className="p-5">
                      <p className="font-display text-2xl text-mela-green-dark">{group} {item}</p>
                      <p className="mt-2 text-mela-dark/70 leading-relaxed">This area is ready for future uploads and embedded video content.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
