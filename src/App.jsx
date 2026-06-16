import { useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import SplashIntro from './components/SplashIntro'
import { CustomCursor } from './components/FestivalAnimations'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Sponsors from './pages/Sponsors'
import Venue from './pages/Venue'
import Committee from './pages/Committee'
import Contact from './pages/Contact'

function AnimatedRoutes({ showIntro }) {
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/contact" element={<Contact />} />
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
      <AnimatedRoutes showIntro={showIntro} />
    </Router>
  )
}

export default App