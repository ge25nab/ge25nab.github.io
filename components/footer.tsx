import { siteConfig } from '@/lib/config'
import { ClustrMapsWidget } from '@/components/clustrmaps-widget'

export function Footer() {

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
      </div>
      <ClustrMapsWidget />
    </footer>
  )
}

