import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashIntro({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem('community-day-intro-seen')
    if (seen) {
      setVisible(false)
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('community-day-intro-seen', 'true')
      setVisible(false)
      onComplete()
    }, 2600)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#02271f] flex items-center justify-center overflow-hidden"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.14] mix-blend-screen"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/media/splash-background.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-[#02271f]/88 via-[#02271f]/78 to-[#02271f]/92" />
          <div className="absolute inset-0 bengali-pattern-bg opacity-15" />
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(159,29,32,0.22) 0%, transparent 70%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.35 }}
          >
            <div className="inline-flex items-center rounded-full bg-[#fbf6ee] px-2 py-1.5 md:px-2.5 md:py-2 shadow-[0_22px_50px_rgba(0,0,0,0.18)] ring-1 ring-mela-gold/20 mb-6">
              <img src="/ss-logo-stacked.webp" alt="Shongo Shomithi" className="w-44 md:w-52 h-auto" />
            </div>

            <p className="font-display text-3xl md:text-5xl text-white leading-tight max-w-4xl">
              Shongo Shomithi
            </p>
            <p className="font-sub text-mela-gold text-xl md:text-2xl mt-2">
              United Bangla Community
            </p>
            <p className="text-white/75 mt-4 max-w-2xl">
              Walsall’s First Ever Bangla Community Day 2026
            </p>
          </motion.div>

          <button
            onClick={() => {
              sessionStorage.setItem('community-day-intro-seen', 'true')
              setVisible(false)
              onComplete()
            }}
            className="absolute bottom-8 right-8 text-white/50 hover:text-mela-gold text-xs tracking-widest uppercase transition-colors"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
