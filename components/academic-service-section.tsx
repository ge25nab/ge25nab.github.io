import Link from 'next/link'
import { getWorkshops, getServiceReviewer } from '@/lib/content'
import { WorkshopCard } from '@/components/workshop-card'

export function AcademicServiceSection() {
  const workshops = getWorkshops()
  const service = getServiceReviewer()

  return (
    <section id="academic-service" className="py-8 scroll-mt-20">
      <h2 className="mb-4 text-2xl font-bold">
        <Link href="/#academic-service" className="hover:text-primary">
          Academic Service
        </Link>
      </h2>
      
      {/* Workshops Preview */}
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Workshops</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((workshop, index) => (
            <WorkshopCard key={index} workshop={workshop} />
          ))}
        </div>
      </div>

      {/* Service Preview */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">Reviewer</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {service.reviewer_or_committee_for.map((venue, index) => (
              <span key={index} className="text-sm px-3 py-1 rounded border bg-muted">
                {venue}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

