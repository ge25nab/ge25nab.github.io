import { ProfileSection } from '@/components/profile-section'
import { NewsSection } from '@/components/news-section'
import { PublicationsPreview } from '@/components/publications-preview'
import { NationalProjectsSection } from '@/components/national-projects-section'
import { AcademicServiceSection } from '@/components/academic-service-section'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileSection />
      <NewsSection />
      <PublicationsPreview />
      <NationalProjectsSection />
      <AcademicServiceSection />
    </div>
  )
}

