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
          ? 'bg-mela-green-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-md ring-2 ring-mela-gold/50 group-hover:ring-mela-gold transition-all">
              <img src="/logo.jpeg" alt="Shongo Shomithi" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className={`font-display text-lg md:text-xl font-bold leading-tight ${
                  scrolled || !isHome ? 'text-white' : 'text-white'
                }`}>
                Shongo Shomithi
              </p>
              <p className={`font-sub text-xs md:text-sm -mt-0.5 ${
                  scrolled || !isHome ? 'text-mela-gold' : 'text-mela-gold'
                }`}>
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
                  `px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-body relative ${
                    isActive
                      ? 'text-mela-gold bg-mela-gold/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-mela-gold to-mela-gold-light text-mela-green-dark font-semibold rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:shadow-mela-gold/30 relative overflow-hidden group"
            >
              <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Get Involved</span>
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
                className="block h-0.5 w-full rounded-full bg-white transition-colors"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-full rounded-full bg-white transition-colors"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full rounded-full bg-white transition-colors"
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
            className="lg:hidden bg-mela-green-dark overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-lg font-medium transition-all font-display ${
                        isActive
                          ? 'text-mela-gold bg-mela-gold/10'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                  {i < navLinks.length - 1 && (
                    <div className="mx-4 h-px bg-gradient-to-r from-transparent via-mela-gold/20 to-transparent" />
                  )}
                </motion.div>
              ))}
              <div className="pt-4">
                <NavLink
                  to="/contact"
                  className="block px-4 py-3.5 bg-gradient-to-r from-mela-gold to-mela-gold-light text-mela-green-dark font-semibold rounded-xl text-center"
                >
                  Get Involved
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}