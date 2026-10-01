import { assetPath } from '@/lib/utils'

export function VisitorTracker() {
  return (
    <iframe
      title="Visitor statistics"
      src={assetPath('/mapmyvisitors-globe.html')}
      sandbox="allow-scripts"
      loading="eager"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none fixed -left-[10000px] top-0 h-[250px] w-[250px] border-0"
    />
  )
}
