import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/sponsors', label: 'Sponsors' },
  { path: '/venue', label: 'Venue' },
  { path: '/committee', label: 'Committee' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-mela-green to-mela-green-light flex items-center justify-center text-mela-gold font-display font-bold text-lg md:text-xl shadow-md group-hover:shadow-lg transition-shadow">
              SS
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg md:text-xl font-bold leading-tight text-mela-green">
                Shongo Shomithi
              </p>
              <p className="font-sub text-xs md:text-sm text-mela-green-light -mt-0.5">
                United Bangla Community
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-body ${
                    isActive
                      ? 'text-mela-gold bg-mela-gold/10'
                      : scrolled || !isHome
                        ? 'text-mela-dark/80 hover:text-mela-green hover:bg-mela-green/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="ml-3 px-5 py-2.5 bg-mela-gold hover:bg-mela-gold-light text-mela-green font-semibold rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg"
            >
              Get Involved
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className={`block h-0.5 w-full rounded-full transition-colors ${
                  scrolled || !isHome ? 'bg-mela-dark' : 'bg-white'
                }`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block h-0.5 w-full rounded-full transition-colors ${
                  scrolled || !isHome ? 'bg-mela-dark' : 'bg-white'
                }`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className={`block h-0.5 w-full rounded-full transition-colors ${
                  scrolled || !isHome ? 'bg-mela-dark' : 'bg-white'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-mela-cream overflow-hidden shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'text-mela-gold bg-mela-gold/10'
                        : 'text-mela-dark/70 hover:text-mela-green hover:bg-mela-green/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                className="block mt-3 px-4 py-3 bg-mela-gold text-mela-green font-semibold rounded-xl text-center"
              >
                Get Involved
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}