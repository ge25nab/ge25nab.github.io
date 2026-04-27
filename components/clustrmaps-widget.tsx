'use client'

import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * ClustrMaps globe widget.
 * We inject the script into a dedicated container because ClustrMaps renders
 * the iframe at the script insertion point.
 */
export function ClustrMapsWidget() {
  const siteId = siteConfig.clustrmaps?.globeSiteId

  const scriptId = 'clstr_globe'
  const containerId = 'clustrmaps-container'
  const scriptSrc = siteId ? `https://clustrmaps.com/globe.js?d=${siteId}` : ''
  const fallbackMapSrc = siteId ? `https://clustrmaps.com/map_v2.png?cl=ffffff&w=300&t=n&d=${siteId}` : ''

  useEffect(() => {
    if (!siteId) return
    const container = document.getElementById(containerId)
    if (!container) return

    if (document.getElementById(scriptId)) return

    container.innerHTML = ''

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'text/javascript'
    script.src = scriptSrc
    script.async = true
    script.defer = true
    container.appendChild(script)

    return () => {
      const existingScript = document.getElementById(scriptId)
      if (existingScript?.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [scriptSrc])

  if (!siteId) return null

  return (
    <div className="mt-8 border-t pt-8 pb-8">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold mb-4">Visitor Statistics</h3>

        <div className="mx-auto flex w-full max-w-[300px] justify-center overflow-hidden rounded-lg border bg-muted/30 p-2">
          <div
            id={containerId}
            className="flex min-h-[188px] w-full items-center justify-center"
          >
            <span className="text-xs text-muted-foreground">Loading visitor map...</span>
          </div>

          <noscript>
            <a
              href="https://clustrmaps.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View visitor statistics on ClustrMaps"
            >
              <img
                src={fallbackMapSrc}
                alt="Visitor location map"
                width={300}
                height={188}
                loading="lazy"
                className="h-auto w-full rounded-md"
              />
            </a>
          </noscript>
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
