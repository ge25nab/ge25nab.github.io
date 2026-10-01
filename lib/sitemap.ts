export function generateSitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://xingcheng-zhou.com').replace(/\/$/, '')

  const pages = [
    '/',
    '/national-projects/',
    '/academic-service/',
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
      .map(
        (page) => `  <url>
        <loc>${baseUrl}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page === '/' ? '1.0' : '0.8'}</priority>
      </url>`
      )
  .join('\n')}
</urlset>`

  return sitemap
}
