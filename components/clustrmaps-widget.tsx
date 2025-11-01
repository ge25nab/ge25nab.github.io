'use client'

import { useEffect } from 'react'

/**
 * ClustrMaps Visitor Map Widget
 * 
 * Client component for loading ClustrMaps visitor map
 */
export function ClustrMapsWidget() {
  useEffect(() => {
    // ClustrMaps Site ID
    const siteId = 'vgBpPJGbj9WH3nfc_5fBn1LFYpP9JZ-CrGbwArHRQTg'

    // Dynamically load ClustrMaps script
    const scriptId = 'clustrmaps-script'
    
    // Check if script already exists
    if (document.getElementById(scriptId)) {
      return
    }

    // Ensure container exists
    const container = document.getElementById('clustrmaps-container')
    if (!container) {
      console.warn('ClustrMaps container not found')
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = scriptId
    // ClustrMaps script with your Site ID
    script.src = `https://clustrmaps.com/map_v2.js?d=${siteId}&cl=ffffff&w=a`
    script.async = true
    script.defer = true

    // Append script to document body (ClustrMaps typically expects it in body)
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById(scriptId)
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="mt-8 border-t pt-8 pb-8">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold mb-4">Visitor Statistics</h3>
        
        {/* ClustrMaps container */}
        <div 
          id="clustrmaps-container" 
          className="min-h-[300px] bg-muted/30 rounded-lg flex items-center justify-center"
        >
          {/* ClustrMaps map will be injected here by the script */}
          <div className="text-sm text-muted-foreground">Loading visitor map...</div>
        </div>

        {/* Visitor map powered by ClustrMaps */}
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

