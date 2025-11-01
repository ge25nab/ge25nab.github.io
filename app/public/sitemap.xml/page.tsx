import { generateSitemap } from '@/lib/sitemap'

export default function SitemapPage() {
  const sitemap = generateSitemap()
  return (
    <pre className="whitespace-pre-wrap break-all p-4">
      {sitemap}
    </pre>
  )
}

