import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashIntro({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('mela-intro-seen')
    if (seen) {
      setVisible(false)
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('mela-intro-seen', 'true')
      setVisible(false)
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (skip) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#062618] flex items-center justify-center overflow-hidden"
        >
          {/* Decorative gold lines animating outward */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.circle
              cx="500" cy="350" r="120"
              fill="none"
              stroke="rgba(201,168,76,0.15)"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <motion.circle
              cx="500" cy="350" r="180"
              fill="none"
              stroke="rgba(201,168,76,0.1)"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            />
            <motion.circle
              cx="500" cy="350" r="250"
              fill="none"
              stroke="rgba(201,168,76,0.06)"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut', delay: 0.4 }}
            />
            {/* Decorative arched lines */}
            {[320, 380].map((r, i) => (
              <motion.path
                key={i}
                d={`M ${500 - r} 350 A ${r} ${r} 0 0 1 ${500 + r} 350`}
                fill="none"
                stroke="rgba(201,168,76,0.08)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 + i * 0.3 }}
              />
            ))}
          </svg>

          {/* Red circular glow */}
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(193,53,43,0.2) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-mela-gold/50 shadow-2xl mb-6">
              <img src="/logo.jpeg" alt="Shongo Shomithi" className="w-full h-full object-cover" />
            </div>

            <motion.p
              className="font-sub text-mela-gold text-lg md:text-xl italic tracking-wide"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Culture, Community &amp; Togetherness
            </motion.p>

            {/* Animated gold line under tagline */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-mela-gold/60 to-transparent mt-4"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            />
          </motion.div>

          {/* Skip button */}
          <button
            onClick={() => {
              sessionStorage.setItem('mela-intro-seen', 'true')
              setVisible(false)
              onComplete()
            }}
            className="absolute bottom-8 right-8 text-white/40 hover:text-mela-gold text-xs tracking-widest uppercase transition-colors"
          >
            Skip Intro &#8594;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}