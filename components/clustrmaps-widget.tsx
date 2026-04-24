import Script from 'next/script'
import { siteConfig } from '@/lib/config'

/**
 * ClustrMaps widget using the current official body-script embed code.
 * A static image fallback is kept for users who block or disable JavaScript.
 */
export function ClustrMapsWidget() {
  const siteId = siteConfig.clustrmaps?.globeSiteId

  if (!siteId) {
    return null
  }

  const scriptSrc = `https://cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=n&d=${siteId}`
  const fallbackMapSrc = `https://clustrmaps.com/map_v2.png?cl=ffffff&w=300&t=n&d=${siteId}`

  return (
    <div className="mt-8 border-t pt-8 pb-8">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold mb-4">Visitor Statistics</h3>

        <div className="mx-auto flex w-full max-w-[300px] justify-center overflow-hidden rounded-lg border bg-muted/30 p-2">
          <Script
            id="clustrmaps"
            src={scriptSrc}
            strategy="afterInteractive"
          />

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
