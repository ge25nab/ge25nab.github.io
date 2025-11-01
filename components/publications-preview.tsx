import Link from 'next/link'
import { getPublications } from '@/lib/content'
import { PublicationCard } from '@/components/publication-card'

export function PublicationsPreview() {
  const publications = getPublications().slice(0, 6) // Show first 6 publications

  return (
    <section id="publications" className="py-8 scroll-mt-20">
      <h2 className="mb-4 text-2xl font-bold">
        <Link href="/#publications" className="hover:text-primary">
          Selected Publications
        </Link>
      </h2>
      <div className="space-y-6">
        {publications.map((pub) => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>
    </section>
  )
}

