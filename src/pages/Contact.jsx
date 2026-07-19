import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import GoldenButton from '../components/GoldenButton'

const contactItems = [
  { label: 'Email', value: 'joinus@shongoshomithi.co.uk', href: 'mailto:joinus@shongoshomithi.co.uk' },
  { label: 'Facebook', value: 'shongoshomithi', href: 'https://facebook.com/shongoshomithi' },
  { label: 'Instagram', value: '@shongoshomithi', href: 'https://instagram.com/shongoshomithi' },
]

export default function Contact() {
  return (
    <>
      <PageHero
        landmark="contact"
        subtitle="Contact"
        title="Be Part of the Journey"
        description="Whether you are a parent, elder, young person, volunteer, business owner or supporter, Shongo Shomithi belongs to the whole community."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
          <div>
            <SectionTitle
              align="left"
              subtitle="We’d Love to Hear From You"
              title="For stalls and sponsorships get in touch with the Shongo Shomithi team"
              description="Whether you want to become a sponsor, apply for a stall or simply connect with the organisers, the Shongo Shomithi team is ready to help through email and social media."
            />
            <div className="space-y-4">
              {contactItems.map((item) => (
                <a key={item.label} href={item.href} className="block rounded-2xl bg-white border border-mela-gold/15 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-sub text-mela-gold text-lg">{item.label}</p>
                  <p className="text-mela-green-dark text-xl font-medium mt-1 break-words leading-relaxed text-pretty">{item.value}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-mela-green-dark text-white p-6 md:p-8 shadow-xl h-fit lg:sticky lg:top-32 overflow-hidden relative">
            <img src="/hero-art/hero-shaheed-minar.webp" alt="" aria-hidden="true" className="absolute right-[-8%] bottom-[-4%] hidden md:block w-56 opacity-[0.12] sepia-[0.98] saturate-[1.2] brightness-[1.15] mix-blend-screen" />
            <p className="relative font-sub text-mela-gold text-xl mb-3">Event Summary</p>
            <h3 className="relative font-display text-4xl mb-5 leading-[1.12] text-balance">Walsall’s First Ever Bangla Community Day 2026</h3>
            <div className="relative space-y-3 text-white/80 mb-8">
              <p>Sunday 30 August 2026</p>
              <p>12:00pm to 6:00pm</p>
              <p>Walsall Rugby Club, Delves Road, Walsall WS1 3JY</p>
              <p>FREE community event — open to all</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <GoldenButton to="/sponsors">Sponsorship Package</GoldenButton>
              <GoldenButton to="/stall-applications" variant="secondary">Stall Applications</GoldenButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
