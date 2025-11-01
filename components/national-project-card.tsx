'use client'

import { NationalProject } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface NationalProjectCardProps {
  project: NationalProject
}

export function NationalProjectCard({ project }: NationalProjectCardProps) {
  const externalLinks = project.links.filter(link => link.url && link.url.trim() !== '')

  return (
      <div className="mb-6 pb-6 border-b last:border-0">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          {/* Project Image */}
          {project.image && (
            <div className="w-full rounded-lg overflow-hidden bg-background flex-shrink-0 max-h-[320px] flex items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                loading="lazy"
                style={{ display: 'block', width: '80%', height: 'auto' }}
              />
            </div>
          )}
          
          {/* Project Content */}
          <div className="flex-1">
            <div className="mb-2">
              <div className="font-semibold text-lg mb-1">{project.title}</div>
              {project.role && (
                <div className="text-sm text-muted-foreground mb-1">
                  <strong>Role:</strong> {project.role}
                </div>
              )}
              {project.timeframe && (
                <div className="text-sm text-muted-foreground mb-1">
                  <strong>Time:</strong> {project.timeframe}
                </div>
              )}
              <div className="text-sm text-muted-foreground mb-2">
                <strong>Funder:</strong> {project.funder}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{project.summary}</p>
            
            {project.tech && project.tech.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.tech.length - 4} more
                  </Badge>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.website && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    Website
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              )}
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
          </div>
        </div>
      </div>
  )
}

