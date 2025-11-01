// Client-safe config that can be imported in client components
// This file contains a static config that mirrors content/config.json
// For server components, use getSiteConfig() from content.ts directly
// For client components, use this exported config

// Import the JSON directly - this works in both server and client components
import configData from '@/content/config.json'

// Type-safe config export
export const siteConfig = configData as {
  site: {
    title: string
    description: string
    keywords: string
  }
  author: {
    name: string
    nameWithChinese?: string
    email: string
    emailDisplay?: string
    location: string
    office: string
  }
  links: {
    googleScholar: string
    tumProfile: string
    githubPersonal: string
    githubOrg: string
    openReview: string
    linkedin?: string
  }
  profile?: {
    paragraphs: string[]
    links?: {
      chair?: string
      tum?: string
      supervisor?: string
      siemens?: string
    }
  }
}
