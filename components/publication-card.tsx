import Link from 'next/link'
import { Publication } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function PublicationCard({ publication }: { publication: Publication }) {
  const authorsList = publication.authors.map((author, index) => {
    const isHighlighted = author === 'Xingcheng Zhou' || author === 'Xingcheng Zhou*' || author.startsWith('Xingcheng Zhou')
    return (
      <span key={index}>
        {isHighlighted ? (
          <strong>{author}</strong>
        ) : (
          <span>{author}</span>
        )}
        {index < publication.authors.length - 1 && ', '}
      </span>
    )
  })

  return (
    <div className="mb-6 pb-6 border-b last:border-0">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Publication Image */}
        {publication.image && (
          <div className="w-full rounded-lg overflow-hidden bg-background flex-shrink-0 max-h-[400px] flex items-center justify-center">
            <img
              src={publication.image}
              alt={publication.title}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              loading="lazy"
              style={{ display: 'block' }}
            />
          </div>
        )}
        
        {/* Publication Content */}
        <div className="flex-1">
          <div className="mb-2">
            <div className="font-semibold text-lg mb-1">{publication.title}</div>
            <div className="text-sm text-muted-foreground mb-1">{authorsList}</div>
            <div className="text-sm italic text-muted-foreground mb-2">
              <em>{publication.venue}</em>, {publication.year}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {Object.entries(publication.links).map(([key, url]) => (
              <Button key={key} variant="outline" size="sm" asChild>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs"
                >
                  {key === 'arxiv' ? 'arXiv' : key === 'code' ? 'Code' : key === 'project' ? 'Project' : key.charAt(0).toUpperCase() + key.slice(1)}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            ))}
          </div>
          {publication.highlights && (
            <p className="text-sm text-muted-foreground mt-2">
              {publication.highlights.join(' ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

