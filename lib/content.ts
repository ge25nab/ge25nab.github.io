import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory =
  typeof process !== 'undefined' && process.cwd
    ? path.join(process.cwd(), 'content')
    : path.join(process.cwd(), 'content')

export interface SiteConfig {
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

export interface Publication {
  id: string
  title: string
  authors: string[]
  year: number
  venue: string
  links: Record<string, string>
  highlights?: string[]
  image?: string
}

export interface Project {
  id: string
  title: string
  summary: string
  links: Record<string, string>
  badges: string[]
  period?: string
  organization?: string
}

export interface Dataset {
  id: string
  title: string
  summary: string
  scale?: Record<string, number>
  links: Record<string, string>
}

export interface Teaching {
  code: string
  title: string
}

export interface Supervision {
  student: string
  topic: string
  type: string
  year: number
}

export interface Service {
  id: string
  title: string
  venue: string
  role: string
  link: string
}

export interface NewsItem {
  date: string
  content: string
  links?: Array<{ text: string; url: string }>
}

export interface Workshop {
  title: string
  role: string
  venue: string
  year: string
  theme: string
  links: Array<{ label: string; url: string }>
}

export interface ServiceReviewer {
  reviewer_or_committee_for: string[]
}

export interface NationalProject {
  title: string
  role: string
  timeframe: string
  funder: string
  summary: string
  responsibilities?: string[]
  outcomes?: string[]
  tech?: string[]
  links: Array<{ label: string; url: string }>
  image?: string
  website?: string
}

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(contentDirectory, 'config.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

export function getPublications(): Publication[] {
  try {
    const filePath = path.join(contentDirectory, 'publications.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getPublication(id: string): Publication | undefined {
  const publications = getPublications()
  return publications.find((p) => p.id === id)
}

export function getProjects(): Project[] {
  try {
    const filePath = path.join(contentDirectory, 'projects.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getDatasets(): Dataset[] {
  try {
    const filePath = path.join(contentDirectory, 'datasets.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getTeaching(): Teaching[] {
  try {
    const filePath = path.join(contentDirectory, 'teaching.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getSupervision(): Supervision[] {
  try {
    const filePath = path.join(contentDirectory, 'supervision.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getService(): Service[] {
  try {
    const filePath = path.join(contentDirectory, 'service.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getHomeContent() {
  try {
    const aboutPath = path.join(contentDirectory, 'about.mdx')
    const fileContents = fs.readFileSync(aboutPath, 'utf8')
    const { content } = matter(fileContents)
    return { about: content }
  } catch {
    return { about: '' }
  }
}

export function getNationalProjects(): NationalProject[] {
  try {
    const filePath = path.join(contentDirectory, 'projects-national.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getNationalProjectsIntro() {
  try {
    const introPath = path.join(contentDirectory, 'national-projects-intro.mdx')
    const fileContents = fs.readFileSync(introPath, 'utf8')
    const { content } = matter(fileContents)
    return content
  } catch {
    return ''
  }
}

export function getNews(): NewsItem[] {
  try {
    const filePath = path.join(contentDirectory, 'news.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export function getWorkshops(): Workshop[] {
  try {
    const filePath = path.join(contentDirectory, 'academic-service.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return data.workshops || []
  } catch {
    return []
  }
}

export function getServiceReviewer(): ServiceReviewer {
  try {
    const filePath = path.join(contentDirectory, 'academic-service.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return { reviewer_or_committee_for: data.reviewer_or_committee_for || [] }
  } catch {
    return { reviewer_or_committee_for: [] }
  }
}

