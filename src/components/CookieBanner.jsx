import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const COOKIE_KEY = 'shongo-cookie-notice-seen'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(COOKIE_KEY)
    if (!saved) setVisible(true)
  }, [])

  const dismissNotice = () => {
    window.localStorage.setItem(COOKIE_KEY, 'seen')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-[70] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-xl">
      <div className="rounded-3xl border border-mela-gold/20 bg-[rgba(248,242,231,0.96)] backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] p-5 md:p-6">
        <p className="font-display text-2xl text-mela-green-dark mb-2">Cookie Notice</p>
        <p className="text-mela-dark/75 leading-relaxed text-sm md:text-base">
          We use essential website technologies to help this site function properly. You can read more in our{' '}
          <Link to="/cookie-policy" className="text-mela-red font-semibold hover:text-mela-green-dark transition">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link to="/privacy-policy" className="text-mela-red font-semibold hover:text-mela-green-dark transition">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            onClick={dismissNotice}
            className="inline-flex items-center justify-center rounded-2xl bg-mela-gold px-5 py-3 text-mela-green-dark font-semibold shadow-md hover:shadow-lg transition"
          >
            Dismiss
          </button>
          <Link
            to="/cookie-policy"
            className="inline-flex items-center justify-center rounded-2xl border border-mela-gold/25 bg-white/70 px-5 py-3 text-mela-green-dark font-medium hover:bg-white transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
