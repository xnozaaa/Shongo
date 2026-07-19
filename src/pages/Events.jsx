import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const highlights = [
  {
    title: 'Main stage with nasheed artists and family-friendly programme',
    description:
      'A welcoming main stage programme featuring nasheed artists, community moments and family-friendly entertainment for all ages to enjoy together.',
  },
  {
    title: 'Children’s activities and family attractions',
    description:
      'Fun, engaging and safe activities for children and families, creating a welcoming space where young people can play and enjoy the day together.',
  },
  {
    title: 'Cultural showcase and heritage exhibitions',
    description:
      'A meaningful showcase of Bangladeshi culture, heritage and traditions, offering visitors the chance to learn, connect and celebrate the rich identity of the community.',
  },
  {
    title: 'Trader business marketplace',
    description:
      'A vibrant marketplace supporting local traders, small businesses and community entrepreneurs, offering visitors a wide range of products, services and unique finds.',
  },
  {
    title: 'Food stalls and traditional snacks',
    description:
      'A delicious selection of food stalls and traditional snacks, celebrating authentic flavours and offering families and visitors a taste of Bangladeshi hospitality.',
  },
  {
    title: 'Community stalls and local organisations',
    description:
      'A welcoming space for community groups, charities and local organisations to connect with visitors, share valuable information and support families across the wider community.',
  },
]

export default function Events() {
  return (
    <>
      <PageHero
        landmark="events"
        subtitle="What’s On"
        title="A full day of culture, community and family-friendly experiences"
        description="Plan your visit and explore the experiences that make Bangla Community Day a welcoming celebration for all ages."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Highlights"
            title="A Celebration for Families, Residents, Visitors and Local Organisations"
            description="From the main programme to the trader marketplace, every part of the event has been thoughtfully curated to celebrate heritage, welcome families and bring communities together in a warm, inclusive and professional setting."
          />
          <div className="grid gap-5 lg:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {highlights.map((item, index) => (
              <div key={item.title} className="rounded-3xl bg-white p-6 md:p-7 border border-mela-gold/15 shadow-sm red-accent-ring">
                <div className="w-12 h-12 rounded-full bg-mela-red/10 text-mela-red flex items-center justify-center mb-4 font-display text-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl text-mela-green-dark mb-3 leading-[1.18] text-balance">{item.title}</h3>
                <p className="text-mela-dark/70 leading-relaxed text-pretty">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-2 items-start">
          <div className="rounded-[2rem] overflow-hidden border border-mela-gold/15 shadow-xl bg-white p-2">
            <img src="/site-images/cultural-showcase.webp" alt="Nasheed programme and cultural showcase" className="w-full h-[320px] md:h-[430px] object-cover rounded-[1.5rem]" />
          </div>
          <div className="grid gap-5">
            <div className="rounded-[2rem] overflow-hidden border border-mela-gold/15 shadow-sm bg-white p-2">
              <img src="/site-images/volunteers.webp" alt="Volunteers supporting families" className="w-full h-52 object-cover rounded-[1.5rem]" />
            </div>
            <div className="rounded-[2rem] overflow-hidden border border-mela-gold/15 shadow-sm bg-white p-2">
              <img src="/site-images/about-community.webp" alt="Community marketplace and visitors" className="w-full h-52 object-cover rounded-[1.5rem]" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-5 lg:gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm text-center">
            <p className="font-sub text-mela-gold text-xl mb-2">Date</p>
            <p className="font-display text-3xl text-mela-green-dark">Sunday 30 August 2026</p>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm text-center">
            <p className="font-sub text-mela-gold text-xl mb-2">Time</p>
            <p className="font-display text-3xl text-mela-green-dark">12:00pm – 6:00pm</p>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-mela-gold/15 shadow-sm text-center">
            <p className="font-sub text-mela-gold text-xl mb-2">Entry</p>
            <p className="font-display text-3xl text-mela-green-dark">Free community event</p>
          </div>
        </div>
      </section>
    </>
  )
}
