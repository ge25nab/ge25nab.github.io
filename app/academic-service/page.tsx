import { getWorkshops, getServiceReviewer, Workshop } from '@/lib/content'
import { WorkshopCard } from '@/components/workshop-card'

export default function AcademicServicePage() {
  const workshops = getWorkshops()
  const service = getServiceReviewer()

  return (
    <div className="container mx-auto px-3 py-12">
      <h1 className="mb-8 text-4xl font-bold">Academic Service</h1>
      
      {/* Workshops Section */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Workshops</h2>
        <div className="space-y-6">
          {workshops.map((workshop, index) => (
            <WorkshopCard key={index} workshop={workshop} />
          ))}
        </div>
      </section>

      {/* Service Section */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Reviewer</h2>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {service.reviewer_or_committee_for.map((venue, index) => (
              <span key={index} className="text-sm px-3 py-1 rounded border bg-muted">
                {venue}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              ...workshops.map((workshop: Workshop) => ({
                '@type': 'Event',
                name: workshop.title,
                description: workshop.theme,
                startDate: `${workshop.year}`,
                location: {
                  '@type': 'Place',
                  name: workshop.venue
                },
                organizer: {
                  '@type': 'Person',
                  name: 'Xingcheng Zhou',
                  role: workshop.role
                }
              })),
              ...service.reviewer_or_committee_for.map((venue: string) => ({
                '@type': 'Role',
                roleName: 'Reviewer or Committee Member',
                description: `Reviewer or committee member for ${venue}`,
                identifier: venue
              }))
            ]
          })
        }}
      />
    </div>
  )
}

