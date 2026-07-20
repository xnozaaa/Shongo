import PageHero from '../components/PageHero'

const sections = [
  {
    title: 'Who We Are',
    body: 'Shongo Shomithi is a community organisation serving the Bangla community. This website is used to share information about our work, community activities, sponsorship opportunities, stall applications and ways to get involved.',
  },
  {
    title: 'What Information We Collect',
    body: 'We may collect personal information that you choose to give us through forms on this website. This can include your name, email address, phone number, business details, stall application details and any documents you upload in support of an application.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use the information you provide to respond to enquiries, manage event registrations, review stall applications, communicate with applicants and supporters, and administer our community activities. We only use your information for purposes connected with Shongo Shomithi’s work.',
  },
  {
    title: 'Lawful Basis',
    body: 'Where applicable under UK data protection law, we process your information because you have asked us to take steps at your request, because it is necessary for the administration of an event or application, or because we have a legitimate interest in operating and improving our community services and communications.',
  },
  {
    title: 'Who We Share Information With',
    body: 'We do not sell your personal information. We may share information with trusted service providers who help us run the website, process forms or send emails on our behalf, but only where this is necessary and appropriate. We may also disclose information if required to do so by law.',
  },
  {
    title: 'How We Store and Protect It',
    body: 'Stall application details and supporting documents are stored in private online storage and are available only through an authenticated administration area. Authorised organisers may also receive application information by email so that applications can be reviewed and managed.',
  },
  {
    title: 'How Long We Keep It',
    body: 'We keep personal information only for as long as reasonably necessary for the purpose for which it was collected, including to administer events, deal with enquiries, maintain records and meet legal or regulatory obligations.',
  },
  {
    title: 'Your Rights',
    body: 'Depending on your circumstances, you may have rights to request access to your personal information, ask for corrections, request deletion, object to certain processing, or ask us to restrict how your data is used. You may also have the right to complain to the Information Commissioner’s Office (ICO).',
  },
  {
    title: 'Contact About Privacy',
    body: 'If you have any questions about this Privacy Policy or how your information is handled, please contact Shongo Shomithi at joinus@shongoshomithi.co.uk.',
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        landmark="contact"
        subtitle="Privacy Policy"
        title="Privacy Policy"
        description="How Shongo Shomithi collects, uses and protects personal information shared through this website."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-mela-gold/15 shadow-sm p-6 md:p-8 lg:p-10 space-y-8">
            <div className="rounded-2xl bg-mela-cream/40 border border-mela-gold/15 px-5 py-4 text-mela-dark/75 leading-relaxed">
              This policy applies to information collected through <span className="font-semibold text-mela-green-dark">shongoshomithi.co.uk</span>.
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
