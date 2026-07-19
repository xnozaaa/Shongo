import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About the Event', path: '/about' },
  { label: 'What’s On', path: '/events' },
  { label: 'Sponsorship Package', path: '/sponsors' },
  { label: 'Stall Applications', path: '/stall-applications' },
  { label: 'Contact', path: '/contact' },
  { label: 'Elite Partners', path: '/elite-partners' },
  { label: 'Charity Partner', path: '/charity-partner' },
  { label: 'Our Sponsors', path: '/our-sponsors' },
  { label: 'Gallery', path: '/gallery' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-mela-green-dark text-white relative overflow-hidden footer-glow">
      <div className="absolute inset-0 opacity-35 bg-cover bg-center" style={{ backgroundImage: "url('/site-images/footer-abstract.webp')" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <img src="/ss-logo-horizontal.webp" alt="Shongo Shomithi" className="h-14 sm:h-16 w-auto mb-4 rounded-full bg-mela-gold px-2 py-1 shadow-[0_12px_30px_rgba(0,0,0,0.16)]" />
            <p className="text-white/80 leading-relaxed max-w-xl">United Bangla Community</p>
            <p className="mt-4 text-mela-gold leading-relaxed">Connecting Generations <span className="text-mela-red">•</span> Preserving Heritage <span className="text-mela-red">•</span> Strengthening Community <span className="text-mela-red">•</span> Brighter Future</p>
          </div>
          <div>
            <p className="font-sub text-mela-gold text-xl mb-4">Quick Links</p>
            <div className="mb-4 h-px w-16 bg-mela-red/70" />
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block text-white/80 hover:text-white transition">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-sub text-mela-gold text-xl mb-4">Connect</p>
            <div className="mb-4 h-px w-16 bg-mela-red/70" />
            <div className="space-y-3 text-white/80">
              <a href="https://facebook.com/shongoshomithi" target="_blank" rel="noreferrer" className="block hover:text-white transition">Facebook</a>
              <a href="https://instagram.com/shongoshomithi" target="_blank" rel="noreferrer" className="block hover:text-white transition">Instagram</a>
              <a href="https://www.tiktok.com/@shongoshomithi" target="_blank" rel="noreferrer" className="block hover:text-white transition">TikTok</a>
              <span className="block text-white/50">YouTube (coming soon)</span>
              <a href="tel:07817176637" className="block hover:text-white transition">Nazrul: 07817 176637</a>
              <a href="tel:07958600250" className="block hover:text-white transition">Shab: 07958 600250</a>
              <a href="mailto:joinus@shongoshomithi.co.uk" className="block hover:text-white transition">joinus@shongoshomithi.co.uk</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center sm:justify-between">
            <p className="text-white/60 text-sm">© 2026 Shongo Shomithi</p>
            <button onClick={scrollToTop} className="rounded-full border border-mela-gold/30 bg-white/5 px-4 py-2 text-sm text-mela-gold hover:bg-white/10 transition">
              Back to top
            </button>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
