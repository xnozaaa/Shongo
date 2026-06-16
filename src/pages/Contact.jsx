import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactInfo = [
    {
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      label: 'Email',
      value: 'joinus@shongoshomithi.co.uk',
      href: 'mailto:joinus@shongoshomithi.co.uk',
    },
    {
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      label: 'Phone',
      value: '07958 600 250 / 07817 176 637',
      href: 'tel:+447958600250',
    },
    {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      label: 'Address',
      value: 'Walsall Rugby Club, Delves Road, WS1 3JY',
      href: null,
    },
  ]

  return (
    <>
      <PageHero
        subtitle="Get in Touch"
        title="Contact Us"
        description="Have a question, want to sponsor, or interested in volunteering? We'd love to hear from you."
      />

      {/* ══════ CONTACT SECTION ══════ */}
      <section className="py-20 lg:py-28 bg-mela-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <SectionTitle
                subtitle="Connect With Us"
                title="Let's Talk"
                description="Whether you're interested in sponsorship, volunteering, or just want to learn more — we're here to help."
                align="left"
              />

              <div className="space-y-6 mt-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-mela-magenta/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-mela-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-mela-gray text-xs uppercase tracking-wider font-medium">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-display text-base font-semibold text-mela-magenta-dark hover:text-mela-magenta transition-colors mt-0.5 block"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-display text-base font-semibold text-mela-green mt-0.5">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <p className="text-mela-gray text-xs uppercase tracking-wider font-medium mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { label: 'Facebook', color: 'hover:bg-blue-600', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                    { label: 'Instagram', color: 'hover:bg-pink-600', icon: 'M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' },
                    { label: 'YouTube', color: 'hover:bg-red-600', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      className={`w-11 h-11 rounded-full bg-white border border-mela-cream flex items-center justify-center ${s.color} hover:text-white transition-all duration-300 shadow-sm`}
                      aria-label={s.label}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d={s.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-mela-cream">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-mela-magenta/10 flex items-center justify-center">
                      <svg className="w-10 h-10 text-mela-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-mela-magenta-dark mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-mela-dark/70">
                      Thank you for reaching out. We'll get back to you within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-mela-dark/80 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-mela-cream/50 border border-mela-cream focus:border-mela-gold focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-mela-dark/80 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-mela-cream/50 border border-mela-cream focus:border-mela-gold focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-mela-dark/80 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="+44 (0) ..."
                          className="w-full px-4 py-3 rounded-xl bg-mela-cream/50 border border-mela-cream focus:border-mela-gold focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-mela-dark/80 mb-1.5">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-mela-cream/50 border border-mela-cream focus:border-mela-gold focus:outline-none transition-colors text-sm"
                        >
                          <option value="">Select a subject</option>
                          <option value="General Enquiry">General Enquiry</option>
                          <option value="Sponsorship">Sponsorship</option>
                          <option value="Volunteering">Volunteering</option>
                          <option value="Performers/Artists">Performers / Artists</option>
                          <option value="Media/Press">Media / Press</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-mela-dark/80 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 rounded-xl bg-mela-cream/50 border border-mela-cream focus:border-mela-gold focus:outline-none transition-colors text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-mela-magenta hover:bg-mela-magenta-light text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}