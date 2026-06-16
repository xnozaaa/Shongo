import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

export default function Venue() {
  return (
    <>
      <PageHero
        subtitle="Find Us"
        title="Venue &amp; Location"
        description="Walsall Town Centre — the heart of our community, hosting Walsall's First Ever Bangla Mela 2026."
      />

      {/* ══════ VENUE OVERVIEW ══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-sub text-lg md:text-xl italic text-mela-gold font-medium block mb-4">
              The Location
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-mela-green leading-tight mb-6">
                Walsall Town Centre
              </h2>

              <div className="space-y-5">
                <p className="text-mela-dark/80 leading-relaxed">
                  The Bangla Mela 2026 will take place in the heart of Walsall
                  Town Centre, transforming the public square into a vibrant
                  celebration of Bengali culture.
                </p>
                <p className="text-mela-dark/80 leading-relaxed">
                  Easily accessible by road, rail, and bus, the venue offers a
                  central location that welcomes visitors from Walsall and
                  across the West Midlands. The town centre provides the perfect
                  backdrop for our festival of culture, music, and cuisine.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Date', value: '15 August 2026' },
                  { label: 'Time', value: '10:00 AM - 8:00 PM' },
                  { label: 'Entry', value: 'Free Admission' },
                  { label: 'Parking', value: 'Nearby Car Parks' },
                ].map((info) => (
                  <div key={info.label} className="bg-mela-cream/60 rounded-xl p-4">
                    <p className="text-mela-gray text-xs uppercase tracking-wider font-medium">{info.label}</p>
                    <p className="font-display text-base font-semibold text-mela-green mt-1">{info.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-mela-green/10 to-mela-cream overflow-hidden relative border border-mela-cream">
                {/* Stylized Map SVG */}
                <svg viewBox="0 0 400 300" className="w-full h-full opacity-40">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0A3D2A" strokeWidth="0.5" strokeOpacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="#F5F0E8" />
                  <rect width="400" height="300" fill="url(#grid)" />
                  {/* Roads */}
                  <rect x="0" y="130" width="400" height="8" fill="#C9A84C" opacity="0.5" rx="2" />
                  <rect x="180" y="0" width="8" height="300" fill="#C9A84C" opacity="0.5" rx="2" />
                  <rect x="60" y="80" width="7" height="150" fill="#C9A84C" opacity="0.3" rx="2" transform="rotate(-20, 63, 155)" />
                  {/* Main venue area */}
                  <rect x="120" y="100" width="120" height="70" rx="8" fill="#0A3D2A" opacity="0.15" stroke="#0A3D2A" strokeWidth="2" strokeOpacity="0.3" />
                  {/* Pin */}
                  <circle cx="180" cy="135" r="12" fill="#C9A84C" opacity="0.9" />
                  <circle cx="180" cy="135" r="6" fill="#0A3D2A" />
                  {/* Labels */}
                  <text x="180" y="260" textAnchor="middle" fill="#0A3D2A" fontFamily="Playfair Display" fontSize="11" fontWeight="bold" opacity="0.6">WALSALL TOWN CENTRE</text>
                  <text x="180" y="275" textAnchor="middle" fill="#6B7280" fontFamily="Inter" fontSize="8" opacity="0.5">West Midlands, UK</text>
                  {/* Compass */}
                  <circle cx="350" cy="40" r="15" fill="none" stroke="#0A3D2A" strokeWidth="1" opacity="0.3" />
                  <polygon points="350,25 345,40 355,40" fill="#0A3D2A" opacity="0.3" />
                  <text x="350" y="22" textAnchor="middle" fill="#0A3D2A" fontSize="8" opacity="0.3">N</text>
                </svg>

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg text-center">
                    <svg className="w-6 h-6 text-mela-gold mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="font-display text-sm font-semibold text-mela-green">Bangla Mela 2026</p>
                    <p className="text-xs text-mela-gray">Walsall Town Centre</p>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-mela-gold/40 rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-mela-green/30 rounded-bl-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ TRANSPORT ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Getting Here"
            title="Transport &amp; Accessibility"
            description="Walsall Town Centre is easily accessible by various modes of transport. Plan your journey to the Bangla Mela."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
                title: 'By Train',
                desc: 'Walsall Railway Station is a 10-minute walk from the town centre. Regular services from Birmingham New Street (20 mins) and other West Midlands stations.',
              },
              {
                icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
                title: 'By Bus',
                desc: 'Multiple bus routes serve Walsall Town Centre, with stops directly adjacent to the festival grounds. Check National Express West Midlands for routes.',
              },
              {
                icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
                title: 'By Car',
                desc: 'Several car parks are within walking distance of the town centre, including Hatherton Road, Bradford Place, and the Saddlers Centre car parks.',
              },
              {
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Opening Times',
                desc: 'The Mela runs from 10:00 AM to 8:00 PM on Saturday, 15 August 2026. We recommend arriving early to enjoy the full programme.',
              },
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Accessibility',
                desc: 'The venue is fully wheelchair accessible. Designated viewing areas, accessible toilets, and assistance points will be available throughout the festival.',
              },
              {
                icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
                title: 'Weather',
                desc: 'The event will go ahead rain or shine. Marquees and covered areas will be provided. Please dress appropriately for British summer weather.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-mela-cream"
              >
                <div className="w-12 h-12 rounded-xl bg-mela-green/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-mela-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-mela-green mb-2">{item.title}</h3>
                <p className="text-mela-dark/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ NEARBY AMENITIES ══════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="While You're Here"
            title="Nearby Amenities"
            description="Make a day of it — Walsall Town Centre offers plenty of amenities to complement your Mela experience."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'The Saddlers Centre', type: 'Shopping', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
              { name: 'Walsall Art Gallery', type: 'Culture', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { name: 'Walsall Arboretum', type: 'Park', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { name: 'Local Restaurants', type: 'Dining', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-mela-cream/50 rounded-xl p-5 hover:bg-white hover:shadow-md transition-all duration-300 border border-mela-cream text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-mela-green/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-mela-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h4 className="font-display font-semibold text-mela-green text-sm">{item.name}</h4>
                <p className="text-mela-gray text-xs mt-0.5">{item.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}