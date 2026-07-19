import PageHero from '../components/PageHero'

const sections = [
  {
    title: 'What Are Cookies?',
    body: 'Cookies are small text files that can be stored on your device when you visit a website. They are commonly used to help websites function properly, improve performance and understand how visitors use a site.',
  },
  {
    title: 'How This Website Uses Cookies',
    body: 'Shongo Shomithi aims to keep website tracking to a minimum. At present, this website does not use non-essential analytics, advertising or marketing cookies. It mainly uses essential website technologies and limited browser storage needed for the site to load and operate properly. If analytics, embedded content or additional third-party tools are added in future, this policy should be updated accordingly and any required consent mechanism should be reviewed.',
  },
  {
    title: 'Essential Cookies',
    body: 'Essential cookies and similar technologies are required for core website functionality, such as security, routing, basic performance and user-requested interface behaviour. This site may also use limited browser storage for essential functions, such as controlling whether a one-time notice or intro has already been shown. Where these technologies are strictly necessary for the service you request, separate opt-in consent is generally not required.',
  },
  {
    title: 'Third-Party Services',
    body: 'Some services linked from this website, such as social media platforms or email providers, may place their own cookies when you visit their services. Those cookies are controlled by the relevant third party and are subject to their own privacy and cookie policies.',
  },
  {
    title: 'Managing Cookies',
    body: 'Most browsers let you control or delete cookies through browser settings. You can usually block or remove cookies at any time, although doing so may affect how some websites function.',
  },
  {
    title: 'Updates To This Policy',
    body: 'We may update this Cookie Policy from time to time to reflect changes to the website or legal requirements. We recommend checking this page occasionally for the latest version.',
  },
  {
    title: 'Contact',
    body: 'If you have any questions about this Cookie Policy, please contact Shongo Shomithi at joinus@shongoshomithi.co.uk.',
  },
]

export default function CookiePolicy() {
  return (
    <>
      <PageHero
        landmark="contact"
        subtitle="Cookie Policy"
        title="Cookie Policy"
        description="Information about how cookies and similar technologies may be used on the Shongo Shomithi website."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-mela-gold/15 shadow-sm p-6 md:p-8 lg:p-10 space-y-8">
            <div className="rounded-2xl bg-mela-cream/40 border border-mela-gold/15 px-5 py-4 text-mela-dark/75 leading-relaxed">
              This policy applies to the use of cookies on <span className="font-semibold text-mela-green-dark">shongoshomithi.co.uk</span>.
            </div>
            {sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h2 className="font-display text-3xl text-mela-green-dark leading-tight">{section.title}</h2>
                <p className="text-mela-dark/75 leading-relaxed text-pretty">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
