import { getNationalProjects, getNationalProjectsIntro, NationalProject } from '@/lib/content'
import { NationalProjectCard } from '@/components/national-project-card'

export default function NationalProjectsPage() {
  const projects = getNationalProjects()
  const intro = getNationalProjectsIntro()

  return (
    <div className="container mx-auto px-3 py-12">
      <h1 className="mb-8 text-4xl font-bold">National Projects</h1>
      
      {intro && (
        <div className="mb-8 prose prose-lg max-w-none dark:prose-invert">
          <p className="text-muted-foreground whitespace-pre-line">{intro}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
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
    </div>
  )
}

