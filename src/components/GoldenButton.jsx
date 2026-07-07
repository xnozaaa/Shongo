import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function GoldenButton({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group max-sm:w-full max-sm:min-h-12'

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-sm md:text-base',
    lg: 'px-6 py-3.5 text-sm sm:px-8 sm:text-base md:px-10 md:py-4 md:text-lg',
  }

  const variants = {
    primary:
      'bg-gradient-to-r from-mela-gold to-mela-gold-light text-mela-green-dark shadow-lg hover:shadow-xl hover:shadow-mela-gold/30',
    secondary:
      'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20',
    dark: 'bg-mela-green-dark text-mela-gold border border-mela-gold/30 hover:bg-mela-green',
    red: 'bg-gradient-to-r from-mela-red to-mela-red-light text-white shadow-lg hover:shadow-xl hover:shadow-mela-red/30',
  }

  const content = (
    <>
      {/* Gold shimmer sweep */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <span className="absolute inset-0 animate-shimmer" />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon !== false && (
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </span>
    </>
  )

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
