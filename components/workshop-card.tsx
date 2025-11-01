'use client'

import { Workshop } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const externalLinks = workshop.links.filter(link => link.url && link.url.trim() !== '')

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="mb-2">
        <div className="font-semibold text-lg mb-1">{workshop.title}</div>
        <div className="text-sm text-muted-foreground mb-2">
          {workshop.role} • {workshop.venue} • {workshop.year}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{workshop.theme}</p>
      
      {/* Links */}
      {externalLinks.length > 0 && (
        <div className="flex items-start gap-2">
          {externalLinks.map((link, index) => (
            <Button key={index} variant="outline" size="sm" asChild>
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

