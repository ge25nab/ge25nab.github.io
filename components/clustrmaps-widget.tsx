'use client'

import { useEffect, useRef } from 'react'
import { siteConfig } from '@/lib/config'

export function ClustrMapsWidget() {
  const siteId = siteConfig.clustrmaps?.globeSiteId
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!siteId || !containerRef.current) return
    if (document.getElementById('clstr_globe')) return

    const script = document.createElement('script')
    script.id = 'clstr_globe'
    script.type = 'text/javascript'
    script.src = `//clustrmaps.com/globe.js?d=${siteId}`
    containerRef.current.appendChild(script)

    return () => {
      document.getElementById('clstr_globe')?.remove()
    }
  }, [siteId])

  if (!siteId) return null

  return (
    <div className="mt-8 border-t pt-8 pb-8">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold mb-4">Visitor Statistics</h3>

        <div className="mx-auto flex w-full max-w-[300px] justify-center overflow-hidden rounded-lg border bg-muted/30 p-2">
          <div ref={containerRef} className="min-h-[188px] w-full" />
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            Visitor location map powered by{' '}
            <a
              href="https://clustrmaps.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              ClustrMaps
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
