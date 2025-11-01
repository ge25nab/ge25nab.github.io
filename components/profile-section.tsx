import React from 'react'
import { siteConfig } from '@/lib/config'
import { SocialLinks } from '@/components/social-links'

export function ProfileSection() {
  const profile = siteConfig.profile
  const profileLinks = profile?.links || {}

  // Helper function to render paragraph with links
  const renderParagraph = (text: string) => {
    if (!profileLinks.chair && !profileLinks.tum && !profileLinks.supervisor && !profileLinks.siemens) {
      return <p>{text}</p>
    }

    // Create a mapping of text to links
    const linkMap: Record<string, string> = {}
    if (profileLinks.chair) {
      linkMap['Chair of Robotics, Artificial Intelligence and Real time Systems'] = profileLinks.chair
    }
    if (profileLinks.tum) {
      linkMap['Technical University of Munich'] = profileLinks.tum
    }
    if (profileLinks.supervisor) {
      linkMap['Prof. Dr. Ing. habil. Alois Christian Knoll'] = profileLinks.supervisor
    }
    if (profileLinks.siemens) {
      linkMap['Siemens'] = profileLinks.siemens
    }

    // Split text and replace with links
    let parts: (string | JSX.Element)[] = []
    let remainingText = text
    let keyIndex = 0

    // Sort linkMap by length (longest first) to avoid partial matches
    const sortedEntries = Object.entries(linkMap).sort((a, b) => b[0].length - a[0].length)

    for (const [linkText, linkUrl] of sortedEntries) {
      const index = remainingText.indexOf(linkText)
      if (index !== -1) {
        // Add text before link
        if (index > 0) {
          parts.push(remainingText.substring(0, index))
        }
        // Add link
        parts.push(
          <a
            key={keyIndex++}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {linkText}
          </a>
        )
        // Update remaining text
        remainingText = remainingText.substring(index + linkText.length)
      }
    }

    // Add remaining text
    if (remainingText) {
      parts.push(remainingText)
    }

    // Process italic text for "Vision Language Action" and "End to End Autonomous Driving"
    const processedParts = parts.map((part, index) => {
      if (typeof part === 'string') {
        const italicParts: (string | JSX.Element)[] = []
        let text = part
        const italicRegex = /(Vision Language Action|End to End Autonomous Driving)/g
        let lastIndex = 0
        let match

        while ((match = italicRegex.exec(text)) !== null) {
          if (match.index > lastIndex) {
            italicParts.push(text.substring(lastIndex, match.index))
          }
          italicParts.push(<em key={`italic-${index}-${match.index}`}>{match[0]}</em>)
          lastIndex = match.index + match[0].length
        }

        if (lastIndex < text.length) {
          italicParts.push(text.substring(lastIndex))
        }

        return italicParts.length > 1 ? <>{italicParts}</> : italicParts[0] || part
      }
      return part
    })

    return <p>{processedParts}</p>
  }

  return (
    <section className="py-12 border-b">
      <div className="grid gap-8 md:grid-cols-[1fr_250px]">
        {/* Profile Content */}
        <div className="space-y-6">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {profile?.paragraphs.map((paragraph, index) => (
              <React.Fragment key={index}>{renderParagraph(paragraph)}</React.Fragment>
            ))}
          </div>

          {/* Contact List */}
          <ul className="space-y-1 text-sm">
            <li>
              email:{' '}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.author.emailDisplay || siteConfig.author.email}
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <SocialLinks />
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center md:items-end">
          <div className="relative w-full aspect-square max-w-[250px] rounded-lg overflow-hidden shadow-lg mb-4 bg-background">
            <img
              src="/assets/img/profile.jpg"
              alt={siteConfig.author.nameWithChinese || siteConfig.author.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

