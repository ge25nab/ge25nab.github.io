import fs from 'fs'
import path from 'path'
import { generateSitemap } from '../lib/sitemap'

async function main() {
  const sitemap = generateSitemap()
  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  console.log('Sitemap generated at public/sitemap.xml')
}

main().catch(console.error)

