import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About the Event', path: '/about' },
  { label: 'What’s On', path: '/events' },
  { label: 'Sponsorship', path: '/sponsors' },
  { label: 'Stalls / Traders', path: '/traders' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-mela-green-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14 lg:py-16">
        <div className="h-px bg-gradient-to-r from-transparent via-mela-gold/30 to-transparent mb-10 md:mb-12" />

        <div className="grid gap-7 md:gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="mb-4 md:mb-5 inline-block rounded-[1.25rem] bg-[#fbf6ee] px-4 py-3 shadow-[0_16px_36px_rgba(0,0,0,0.14)] ring-1 ring-mela-gold/30">
              <img src="/ss-logo-horizontal.webp" alt="Shongo Shomithi" className="h-14 md:h-16 w-auto" />
            </div>
            <p className="text-white/75 max-w-xl leading-relaxed text-sm md:text-base">
              Shongo Shomithi – United Bangla Community Presents Walsall’s First Ever
              Bangla Community Day 2026, a free community event celebrating heritage,
              togetherness and family-friendly experiences.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg md:text-xl font-semibold mb-3 md:mb-4 text-mela-red">Explore</h3>
            <div className="space-y-2.5 md:space-y-3">
              {quickLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block text-white/75 hover:text-white transition-colors text-sm md:text-base leading-relaxed">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg md:text-xl font-semibold mb-3 md:mb-4 text-mela-red">Contact</h3>
            <div className="space-y-2.5 md:space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>joinus@shongoshomithi.co.uk</p>
              <p>07958 600250 / 07817 176637</p>
              <p>www.shongoshomithi.co.uk</p>
              <p>Facebook: shongoshomithi</p>
              <p>Instagram: @shongoshomithi</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-mela-gold/30 to-transparent my-8 md:my-10" />

        <div className="flex flex-col gap-2.5 md:gap-4 md:flex-row md:items-center md:justify-between text-sm text-white/70">
          <p className="leading-relaxed text-sm">Connecting Generations · Preserving Heritage · Strengthening Community · Brighter Future</p>
          <p>© 2026 Shongo Shomithi</p>
        </div>
      </div>
    </footer>
  )
}
