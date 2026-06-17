'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const DOWNLOAD_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx',
  'zip', 'rar', '7z', 'tar', 'gz', 'csv', 'txt', 'bib',
]

function getFileExtension(pathname: string): string | null {
  const match = pathname.toLowerCase().match(/\.([a-z0-9]+)$/)
  return match ? match[1] : null
}

export function AnalyticsTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const rawHref = anchor.getAttribute('href')
      if (!rawHref) return

      if (typeof window.gtag !== 'function') return

      const linkText = (anchor.textContent || anchor.getAttribute('aria-label') || '').trim().slice(0, 100)

      if (rawHref.startsWith('mailto:')) {
        window.gtag('event', 'email_click', {
          link_url: rawHref,
          email: rawHref.replace('mailto:', ''),
        })
        return
      }

      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      const ext = getFileExtension(url.pathname)
      const isDownload = anchor.hasAttribute('download') || (ext !== null && DOWNLOAD_EXTENSIONS.includes(ext))

      if (isDownload) {
        const fileName = url.pathname.split('/').pop() || url.pathname
        window.gtag('event', 'file_download', {
          link_url: url.href,
          file_name: fileName,
          file_extension: ext || '',
          link_text: linkText,
        })
        return
      }

      const isOutbound = url.hostname !== window.location.hostname
      if (isOutbound) {
        window.gtag('event', 'outbound_click', {
          link_url: url.href,
          link_domain: url.hostname,
          link_text: linkText,
        })
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  return null
}
