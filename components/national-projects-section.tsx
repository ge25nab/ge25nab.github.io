import { getNationalProjects, getNationalProjectsIntro, NationalProject } from '@/lib/content'
import { NationalProjectCard } from '@/components/national-project-card'
import Link from 'next/link'

export function NationalProjectsSection() {
  const projects = getNationalProjects()
  const intro = getNationalProjectsIntro()

  return (
    <section id="national-projects" className="py-8 scroll-mt-20">
      <h2 className="mb-4 text-2xl font-bold">
        <Link href="/#national-projects" className="hover:text-primary">
          National Projects
        </Link>
      </h2>
      
      {intro && (
        <div className="mb-4 prose prose-lg max-w-none dark:prose-invert">
          <p className="text-muted-foreground whitespace-pre-line">{intro}</p>
        </div>
      )}

      <div className="space-y-6">
        {projects.map((project, index) => (
          <NationalProjectCard key={index} project={project} />
        ))}
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': projects.map((project: NationalProject) => {
              // Parse timeframe - default to safe values if parsing fails
              let startDate = '2023-05'
              let endDate = '2025-10'
              
              if (project.timeframe) {
                const [startMonth, startYear] = project.timeframe.split(' ')[0] === 'May' ? ['05', '2023'] : ['10', '2020']
                const [endMonth, endYear] = project.timeframe.includes('Oct') ? ['10', '2025'] : ['06', '2021']
                startDate = `${startYear}-${startMonth}`
                endDate = `${endYear}-${endMonth}`
              }
              
              return {
                '@type': 'Project',
                name: project.title,
                startDate,
                endDate,
                funder: {
                  '@type': 'Organization',
                  name: project.funder
                },
                description: project.summary,
                ...(project.links.find(l => l.url)?.url && {
                  url: project.links.find(l => l.url)?.url
                })
              }
            })
          })
        }}
      />
    </section>
  )
}

