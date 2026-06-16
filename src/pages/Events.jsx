import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import GoldenButton from '../components/GoldenButton'
import { DecorativeCorner, FestoonLights } from '../components/FestivalAnimations'

const scheduleData = [
  {
    day: 'Main Event Day',
    date: 'Sunday, 30 August 2026',
    events: [
      { time: '11:00 AM', title: 'Festival Gates Open', description: 'The Bangla Mela officially begins! Welcome to a day of celebration.', location: 'Main Entrance', category: 'general' },
      { time: '11:30 AM', title: 'Inauguration Ceremony', description: 'Official opening with community leaders, dignitaries, and cultural blessings.', location: 'Main Stage', category: 'ceremony' },
      { time: '12:00 PM', title: 'Traditional Bengali Music', description: 'Opening performances featuring classical and folk Bengali music.', location: 'Main Stage', category: 'music' },
      { time: '12:00 PM', title: 'Cultural Dance Showcase', description: 'Mesmerising dance performances including traditional and contemporary styles.', location: 'Main Stage', category: 'dance' },
      { time: '1:00 PM', title: 'Bengali Calligraphy Workshop', description: 'Learn the art of Bengali calligraphy from expert artists.', location: 'Workshop Tent', category: 'workshop' },
      { time: '1:30 PM', title: 'Culinary Demonstration', description: 'Watch master chefs prepare authentic Bengali dishes live.', location: 'Food Zone', category: 'food' },
      { time: '2:00 PM', title: 'Children\'s Storytelling Session', description: 'Enchanting Bengali folk tales brought to life for our young visitors.', location: 'Kids\' Zone', category: 'kids' },
      { time: '2:30 PM', title: 'Baul Music Performance', description: 'Experience the soulful mystic music of the Baul tradition.', location: 'Main Stage', category: 'music' },
      { time: '3:30 PM', title: 'Henna Art Workshop', description: 'Get intricate henna designs from skilled artists.', location: 'Workshop Tent', category: 'workshop' },
      { time: '4:00 PM', title: 'Community Parade', description: 'A vibrant parade celebrating Bengali culture through the festival grounds.', location: 'Festival Grounds', category: 'general' },
      { time: '5:00 PM', title: 'Bengali Fashion Show', description: 'Showcasing traditional Bengali attire from classic to contemporary.', location: 'Main Stage', category: 'dance' },
      { time: '6:00 PM', title: 'Headline Music Performance', description: 'An spectacular headline performance to close the main programme.', location: 'Main Stage', category: 'music' },
      { time: '6:30 PM', title: 'Closing Ceremony', description: 'Thanksgiving address and closing celebrations with a spectacular finale.', location: 'Main Stage', category: 'ceremony' },
      { time: '7:00 PM', title: 'Festival Closes', description: 'Thank you for celebrating with us — see you next year!', location: 'Main Entrance', category: 'general' },
    ],
  },
]

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'music', label: 'Music' },
  { id: 'dance', label: 'Dance' },
  { id: 'ceremony', label: 'Ceremony' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'food', label: 'Food' },
  { id: 'kids', label: "Kids' Zone" },
  { id: 'general', label: 'General' },
]

function EventCard({ event, index }) {
  const categoryColors = {
    music: 'bg-purple-100 text-purple-700 border-purple-200',
    dance: 'bg-pink-100 text-pink-700 border-pink-200',
    ceremony: 'bg-amber-100 text-amber-700 border-amber-200',
    workshop: 'bg-blue-100 text-blue-700 border-blue-200',
    food: 'bg-orange-100 text-orange-700 border-orange-200',
    kids: 'bg-green-100 text-green-700 border-green-200',
    general: 'bg-gray-100 text-gray-700 border-gray-200',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex gap-4 md:gap-6 p-5 md:p-6 bg-white rounded-2xl border border-mela-cream hover:border-mela-gold/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Time Column */}
      <div className="w-20 md:w-24 shrink-0 pt-1">
        <span className="font-display text-sm md:text-base font-bold text-mela-magenta-dark">
          {event.time}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="font-display text-lg md:text-xl font-semibold text-mela-dark">
            {event.title}
          </h3>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[event.category] || categoryColors.general}`}>
            {categories.find(c => c.id === event.category)?.label || event.category}
          </span>
        </div>
        <p className="text-mela-dark/60 text-sm mb-2">{event.description}</p>
        <div className="flex items-center gap-2 text-xs text-mela-gray">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>
      </div>
    </motion.div>
  )
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredEvents = scheduleData[0].events.filter(
    (e) => activeCategory === 'all' || e.category === activeCategory
  )

  return (
    <>
      <PageHero
        subtitle="Event Schedule"
        title="Mela Programme"
        description="Plan your day at the Bangla Mela 2026. From live performances to cultural workshops, there's something for everyone."
      />

      {/* ══════ SCHEDULE ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Sunday 30 August 2026"
            title="Event Schedule"
            description="A full day of celebration awaits. Filter by category to find what interests you most."
          />

          {/* Day Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-mela-magenta to-mela-magenta-dark rounded-2xl p-6 md:p-8 mb-8 text-center"
          >
            <span className="font-sub text-mela-gold text-lg italic">Main Event</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">
              {scheduleData[0].day}
            </h3>
            <p className="text-white/70 text-sm mt-1">{scheduleData[0].date}</p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-mela-magenta text-white shadow-md'
                    : 'bg-white text-mela-dark/70 hover:bg-mela-cream border border-mela-cream'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, i) => (
                  <EventCard key={event.title + event.time} event={event} index={i} />
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-mela-gray py-12"
                >
                  No events found for this category.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════ INFO BOX ══════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-mela-cream to-white rounded-2xl p-8 md:p-10 border border-mela-cream">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mela-magenta/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-mela-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-display font-semibold text-mela-magenta-dark">Event Times</h4>
                <p className="text-mela-dark/60 text-sm mt-1">11:00 AM — 7:00 PM</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mela-magenta/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-mela-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-display font-semibold text-mela-magenta-dark">Location</h4>
                <p className="text-mela-dark/60 text-sm mt-1">Walsall Rugby Club</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mela-magenta/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-mela-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="font-display font-semibold text-mela-magenta-dark">Entry</h4>
                <p className="text-mela-dark/60 text-sm mt-1">Free for all</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}