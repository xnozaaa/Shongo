import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import { FestoonLights, DecorativeCorner } from '../components/FestivalAnimations'

/* ─── Gallery Data ─── */
const galleryImages = [
  { id: 1, title: 'Cultural Dance Performance', category: 'performances', aspect: 'portrait' },
  { id: 2, title: 'Traditional Music Session', category: 'performances', aspect: 'landscape' },
  { id: 3, title: 'Community Gathering', category: 'community', aspect: 'landscape' },
  { id: 4, title: 'Bengali Cuisine Stall', category: 'food', aspect: 'portrait' },
  { id: 5, title: 'Children\'s Workshop', category: 'community', aspect: 'landscape' },
  { id: 6, title: 'Art Exhibition', category: 'culture', aspect: 'portrait' },
  { id: 7, title: 'Henna Art Session', category: 'workshops', aspect: 'landscape' },
  { id: 8, title: 'Stage Performance', category: 'performances', aspect: 'landscape' },
  { id: 9, title: 'Community Parade', category: 'community', aspect: 'portrait' },
  { id: 10, title: 'Calligraphy Workshop', category: 'workshops', aspect: 'landscape' },
  { id: 11, title: 'Traditional Attire', category: 'culture', aspect: 'portrait' },
  { id: 12, title: 'Food Festival', category: 'food', aspect: 'landscape' },
]

const filters = [
  { id: 'all', label: 'All Photos' },
  { id: 'performances', label: 'Performances' },
  { id: 'community', label: 'Community' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'food', label: 'Food' },
  { id: 'culture', label: 'Culture' },
]

/* ─── Gallery Image Gradient Generator ─── */
function galleryGradient(id, title) {
  const palettes = [
    ['#0A3D2A', '#4A7C5C', '#C9A84C'],
    ['#1a365d', '#2d5a8e', '#e2c374'],
    ['#4a1a2e', '#8b2d4e', '#c9a84c'],
    ['#1a2e1a', '#3d6b3d', '#d4b85a'],
    ['#2d1a4a', '#5a2d8b', '#c9a84c'],
    ['#1a1a3d', '#2d2d8b', '#e0c872'],
    ['#3d1a1a', '#6b2d2d', '#d4b85a'],
    ['#0d2d1a', '#2d6b4a', '#c9a84c'],
    ['#2d1a0d', '#6b3d2d', '#e2c374'],
    ['#1a0d2d', '#3d2d6b', '#d4b85a'],
    ['#0d2d2d', '#2d6b6b', '#c9a84c'],
    ['#2d2d0d', '#6b6b2d', '#e0c872'],
  ]
  const palette = palettes[id % palettes.length]
  return `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 50%, ${palette[2]} 100%)`
}

/* ─── Lightbox ─── */
function Lightbox({ image, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8 cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div
          className="w-full aspect-video rounded-2xl flex items-center justify-center shadow-2xl"
          style={{ background: galleryGradient(image.id, image.title) }}
        >
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/15 flex items-center justify-center">
              <svg className="w-10 h-10 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-white font-semibold">{image.title}</h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxImage, setLightboxImage] = useState(null)

  const filtered = galleryImages.filter(
    (img) => activeFilter === 'all' || img.category === activeFilter
  )

  return (
    <>
      <PageHero
        subtitle="Moments in Time"
        title="Photo Gallery"
        description="A visual journey through Bengali culture and community celebrations. Preview our upcoming Bangla Mela 2026."
      />

      {/* ══════ GALLERY GRID ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Visual Journey"
            title="A Glimpse of What's to Come"
            description="Browse through highlights from our community events and get a taste of what awaits at the Bangla Mela 2026."
          />

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.id
                    ? 'bg-mela-magenta text-white shadow-md'
                    : 'bg-white text-mela-dark/70 hover:bg-mela-cream border border-mela-cream'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightboxImage(img)}
                  className="break-inside-avoid cursor-pointer group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <div
                    className={`relative ${img.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                    style={{ background: galleryGradient(img.id, img.title) }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <svg className="w-12 h-12 mx-auto mb-2 text-white/30 group-hover:text-white/60 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                          {img.category}
                        </span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div>
                        <h3 className="font-display text-white font-semibold text-lg">{img.title}</h3>
                        <span className="text-white/70 text-sm capitalize">{img.category}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-mela-gray py-12">No images found for this category.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
        )}
      </AnimatePresence>

      {/* ══════ CTA ─ SHARE YOUR PHOTOS ══════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-mela-magenta-dark mb-4">
              Share Your Moments
            </h2>
            <p className="text-mela-dark/70 mb-8">
              Will you be joining us at the Bangla Mela 2026? Tag your photos with{' '}
              <span className="text-mela-gold font-semibold">#BanglaMela2026</span> and{' '}
              <span className="text-mela-gold font-semibold">#ShongoShomithi</span> for a
              chance to be featured in our gallery.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mela-magenta hover:bg-mela-magenta-light text-white font-semibold rounded-xl transition-all duration-300 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Follow on Facebook
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-xl transition-all duration-300 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Follow on Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}