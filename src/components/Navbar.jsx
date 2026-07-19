import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About the Event' },
  { path: '/events', label: 'What’s On' },
  { path: '/sponsors', label: 'Sponsorship Package' },
  { path: '/stall-applications', label: 'Stall Applications' },
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
scrolled || !isHome ? 'bg-[rgba(248,242,231,0.84)] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-b border-white/30' : 'bg-[linear-gradient(180deg,rgba(248,242,231,0.82)_0%,rgba(248,242,231,0.68)_48%,rgba(248,242,231,0.18)_100%)] backdrop-blur-lg'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem] md:h-20 lg:h-[5.5rem]">
          <Link to="/" className="flex items-center gap-3 group min-w-0 pr-3 sm:pr-4">
            <div className="inline-flex items-center px-0.5 py-0.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 drop-shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
              <img src="/ss-logo-horizontal.webp" alt="Shongo Shomithi" className="h-12 sm:h-14 md:h-[4rem] w-auto" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 xl:px-3.5 py-2 rounded-lg text-sm font-medium leading-none transition-all duration-300 relative ${
                    isActive
                      ? 'text-white bg-mela-red/90 shadow-sm'
                      : 'text-mela-green-dark/88 font-semibold hover:text-mela-green-dark hover:bg-white/45'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="ml-2 xl:ml-3 px-4 xl:px-5 py-2.5 bg-gradient-to-r from-mela-gold to-mela-gold-light text-mela-green-dark font-semibold rounded-lg transition-all duration-300 text-sm leading-none shadow-md hover:shadow-lg hover:shadow-mela-gold/30 relative overflow-hidden group border border-white/40"
            >
              <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Contact Us</span>
            </NavLink>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 -mr-2 flex items-center justify-center shrink-0"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full rounded-full bg-mela-green-dark"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-full rounded-full bg-mela-green-dark"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full rounded-full bg-mela-green-dark"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[rgba(248,242,231,0.96)] backdrop-blur-xl overflow-hidden shadow-xl border-t border-mela-gold/10"
          >
            <div className="px-4 sm:px-6 py-3.5 sm:py-5 space-y-1.5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                        isActive ? 'bg-mela-red/85 text-white' : 'text-mela-green-dark/90 hover:bg-mela-red/10'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-2">
                <NavLink
                  to="/contact"
                  className="block px-4 py-3 rounded-xl bg-mela-gold text-mela-green-dark text-[15px] font-semibold text-center"
                >
                  Contact Us
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
