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
    const siteId = 'G1uK8RAGNiM708eP6pxOLpptVgfkoWrbhFMPSt5m89c'

    // Dynamically load ClustrMaps script
    const scriptId = 'clstr_globe'
    
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

    // Clear loading message
    container.innerHTML = ''

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = scriptId
    // ClustrMaps globe script with your Site ID - use https protocol
    script.src = `https://clustrmaps.com/globe.js?d=${siteId}`
    script.async = true
    script.defer = true

    // Handle script load events
    script.onload = () => {
      // Script loaded successfully
      console.log('ClustrMaps globe.js loaded')
      // Wait for iframe to be created and ensure it scales correctly
      const checkForIframe = () => {
        const iframe = container.querySelector('iframe')
        if (iframe) {
          iframe.style.width = '100%'
          iframe.style.height = '100%'
          iframe.style.border = 'none'
        } else {
          // Retry after a short delay if iframe not found yet
          setTimeout(checkForIframe, 100)
        }
      }
      checkForIframe()
    }
    
    script.onerror = () => {
      console.error('Failed to load ClustrMaps globe.js')
      // Show error message if script fails to load
      if (container) {
        container.innerHTML = '<div class="text-sm text-muted-foreground text-center py-4">Failed to load visitor map. Please refresh the page.</div>'
      }
    }

    // Append script to container so globe renders inside it
    // ClustrMaps globe.js will create the iframe/div at the script location
    container.appendChild(script)

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
          className="w-full max-w-[432px] mx-auto h-[576px] bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center"
        >
          {/* ClustrMaps map will be injected here by the script */}
          <div className="text-sm text-muted-foreground text-center py-4">Loading visitor map...</div>
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

