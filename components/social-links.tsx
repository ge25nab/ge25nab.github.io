import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { Mail, GraduationCap, Github, Linkedin, Building2 } from 'lucide-react'

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Link
        href={`mailto:${siteConfig.author.email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-foreground hover:text-primary transition-colors"
        aria-label="Email"
      >
        <Mail className="h-6 w-6" />
      </Link>
      <Link
        href={siteConfig.links.googleScholar}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-foreground hover:text-primary transition-colors"
        aria-label="Google Scholar"
      >
        <GraduationCap className="h-6 w-6" />
      </Link>
      <Link
        href={siteConfig.links.githubPersonal}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-foreground hover:text-primary transition-colors"
        aria-label="GitHub"
      >
        <Github className="h-6 w-6" />
      </Link>
      <Link
        href={siteConfig.links.tumProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl text-foreground hover:text-primary transition-colors"
        aria-label="TUM Profile"
      >
        <Building2 className="h-6 w-6" />
      </Link>
      {siteConfig.links.linkedin && (
        <Link
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-foreground hover:text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-6 w-6" />
        </Link>
      )}
    </div>
  )
}

