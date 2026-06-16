import { useState, useEffect } from 'react'

export default function Countdown({ targetDate }) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return
      setRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex items-center gap-4 md:gap-6">
      {[
        { value: remaining.days, label: 'Days' },
        { value: remaining.hours, label: 'Hours' },
        { value: remaining.minutes, label: 'Mins' },
        { value: remaining.seconds, label: 'Secs' },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="font-display text-xl md:text-2xl font-bold text-mela-gold tabular-nums">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider mt-0.5">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}