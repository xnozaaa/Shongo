import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About the Mela', path: '/about' },
  { label: 'Events Schedule', path: '/events' },
  { label: 'Photo Gallery', path: '/gallery' },
  { label: 'Sponsorship', path: '/sponsors' },
  { label: 'Venue Info', path: '/venue' },
  { label: 'Our Committee', path: '/committee' },
  { label: 'Contact Us', path: '/contact' },
]

const socialLinks = [
  { label: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', href: '#', icon: 'M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' },
  { label: 'YouTube', href: '#', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { label: 'Twitter/X', href: '#', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
]

export default function Footer() {
  return (
    <footer className="bg-mela-green-dark text-white/90">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-mela-gold/50">
                <img src="/logo.jpeg" alt="Shongo Shomithi" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-white leading-tight">
                  Shongo Shomithi
                </p>
                <p className="font-sub text-sm text-mela-gold -mt-0.5">
                  United Bangla Community
                </p>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              Celebrating Bengali culture, heritage, and community spirit in
              Walsall. Join us for the First Ever Bangla Mela 2026.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-mela-gold/20 flex items-center justify-center transition-all duration-300 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-white/70 group-hover:fill-mela-gold transition-colors"
                  >
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-mela-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-mela-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-5">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-mela-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Walsall Rugby Club<br />Delves Road, Walsall WS1 3JY
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-mela-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:joinus@shongoshomithi.co.uk" className="hover:text-mela-gold transition-colors">
                  joinus@shongoshomithi.co.uk
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-mela-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>07958 600 250 / 07817 176 637</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-5">
              Stay Updated
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe for the latest Mela updates and community news.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-mela-gold transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-mela-gold hover:bg-mela-gold-light text-mela-magenta-dark font-semibold rounded-lg text-sm transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Shongo Shomithi — United Bangla
            Community. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-mela-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-mela-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}