import { useEffect, useState, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ════════════════════════════════
   FLOATING GOLD PARTICLES
   ════════════════════════════════ */
export function GoldParticles({ count = 20, className = '' }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
    })),
  [count])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.size > 3
              ? 'radial-gradient(circle, rgba(201,168,76,0.6) 0%, rgba(201,168,76,0) 70%)'
              : 'rgba(201,168,76,0.8)',
            boxShadow: p.size > 3 ? '0 0 6px rgba(201,168,76,0.3)' : 'none',
          }}
          animate={{
            y: [0, -20, 0, -10, 0],
            opacity: [0.3, 0.8, 0.4, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ════════════════════════════════
   FESTOON LIGHTS
   ════════════════════════════════ */
export function FestoonLights({ className = '', color = 'warm' }) {
  const colors = {
    warm: ['#F4A830', '#D4942E', '#C9A84C', '#E8C44A', '#F0D878'],
    festival: ['#C1352B', '#F4A830', '#C9A84C', '#1A9E8E', '#C61C6B'],
    green: ['#C9A84C', '#E8C44A', '#F0D878', '#D4942E'],
  }

  const bulbColors = colors[color] || colors.warm

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Curved light string */}
      <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
        {[0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95].map((x, i) => {
          const cy = i % 2 === 0 ? 40 + Math.sin(i * 1.5) * 20 : 30 + Math.sin(i * 1.2) * 15
          return (
            <motion.circle
              key={i}
              cx={x * 1440}
              cy={cy}
              r={3 + (i % 3)}
              fill={bulbColors[i % bulbColors.length]}
              opacity={0.7}
              animate={{ opacity: [0.5, 1, 0.6, 0.9, 0.5] }}
              transition={{
                duration: 2 + (i % 3) * 0.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
        {/* Wire connecting them */}
        <path
          d="M 0 50 Q 180 20 360 50 Q 540 80 720 50 Q 900 20 1080 50 Q 1260 80 1440 50"
          fill="none"
          stroke="rgba(201,168,76,0.15)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

/* ════════════════════════════════
   BUNTING DECORATION
   ════════════════════════════════ */
export function BuntingDecoration({ className = '', count = 16 }) {
  const flags = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i / (count - 1)) * 100,
      delay: Math.random() * 2,
      rotation: (Math.random() - 0.5) * 4,
    })),
  [count])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* String */}
      <svg className="w-full h-full" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path
          d="M 0 40 Q 360 120 720 60 Q 1080 0 1440 80"
          fill="none"
          stroke="rgba(201,168,76,0.12)"
          strokeWidth="0.8"
        />
        {flags.map((f) => {
          const cx = (f.x / 100) * 1440
          const cy = 40 + Math.sin(f.x * Math.PI) * 60
          const isRed = f.id % 3 === 0
          return (
            <motion.g
              key={f.id}
              transform={`translate(${cx}, ${cy}) rotate(${f.rotation})`}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              <polygon
                points="0,0 -8,18 8,18"
                fill={isRed ? '#C1352B' : '#0A3D2A'}
                opacity={0.6}
              />
              {isRed && (
                <circle cx="0" cy="9" r="3" fill="rgba(201,168,76,0.3)" />
              )}
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

/* ════════════════════════════════
   SCROLL INDICATOR
   ════════════════════════════════ */
export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
    >
      <span className="text-white/40 text-xs tracking-widest uppercase font-medium">
        Scroll
      </span>
      <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
        <motion.div
          className="w-1 h-2 rounded-full bg-mela-gold"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════
   ANIMATED COUNTER
   ════════════════════════════════ */
export function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2, className = '' }) {
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    const startTime = Date.now()
    const startVal = 0

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const current = Math.floor(startVal + (end - startVal) * eased)
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [inView, end, duration])

  // Handle ranges like "3,000–5,000"
  if (typeof end === 'string') return <span className={className}>{prefix}{end}{suffix}</span>

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* ════════════════════════════════
   CUSTOM CURSOR
   ════════════════════════════════ */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    setVisible(true)

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })

    const onHoverIn = () => setHovering(true)
    const onHoverOut = () => setHovering(false)

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden lg:block"
      style={{
        left: pos.x - 15,
        top: pos.y - 15,
      }}
      animate={{
        width: hovering ? 40 : 30,
        height: hovering ? 40 : 30,
        opacity: 0.5,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          border: '1px solid rgba(201,168,76,0.4)',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}

/* ════════════════════════════════
   DECORATIVE SECTION DIVIDER
   ════════════════════════════════ */
export function SectionDivider({ variant = 'curve', className = '' }) {
  return (
    <div className={`relative h-16 md:h-24 overflow-hidden -mb-1 ${className}`}>
      {variant === 'curve' && (
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 0 Q 360 100 720 50 T 1440 0 L 1440 100 L 0 100 Z" fill="currentColor" />
        </svg>
      )}
      {variant === 'wave' && (
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 40 Q 240 120 480 60 T 960 60 T 1440 40 L 1440 120 L 0 120 Z" fill="currentColor" />
        </svg>
      )}
    </div>
  )
}

/* ════════════════════════════════
   DECORATIVE CORNER ART
   ════════════════════════════════ */
export function DecorativeCorner({ position = 'top-right', className = '' }) {
  const isRight = position.includes('right')
  const isBottom = position.includes('bottom')
  const rotate = isRight && isBottom ? '180' : isRight ? '90' : isBottom ? '-90' : '0'

  return (
    <div className={`absolute ${position} ${className}`}>
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: `rotate(${rotate}deg)` }}>
        <path
          d="M 0 10 Q 10 10 10 0"
          fill="none"
          stroke="rgba(201,168,76,0.25)"
          strokeWidth="1.5"
        />
        <path
          d="M 0 5 Q 15 5 15 20 Q 15 35 25 35"
          fill="none"
          stroke="rgba(201,168,76,0.15)"
          strokeWidth="1"
        />
        <path
          d="M 30 0 C 30 15, 15 30, 0 30"
          fill="none"
          stroke="rgba(201,168,76,0.08)"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  )
}

/* ════════════════════════════════
   AMBER GLOW
   ════════════════════════════════ */
export function AmberGlow({ className = '' }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <div className="w-72 h-72 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(244,168,48,0.08) 0%, transparent 70%)',
      }} />
    </div>
  )
}
