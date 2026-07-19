import { useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import SplashIntro from './components/SplashIntro'
import { CustomCursor } from './components/FestivalAnimations'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Sponsors from './pages/Sponsors'
import Contact from './pages/Contact'
import Traders from './pages/Traders'
import ElitePartners from './pages/ElitePartners'
import CharityPartner from './pages/CharityPartner'
import OurSponsors from './pages/OurSponsors'
import Gallery from './pages/Gallery'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <Layout>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/stall-applications" element={<Traders />} />
            <Route path="/traders" element={<Navigate to="/stall-applications" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/elite-partners" element={<ElitePartners />} />
            <Route path="/charity-partner" element={<CharityPartner />} />
            <Route path="/our-sponsors" element={<OurSponsors />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  return (
    <Router>
      {showIntro && <SplashIntro onComplete={handleIntroComplete} />}
      <CustomCursor />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
