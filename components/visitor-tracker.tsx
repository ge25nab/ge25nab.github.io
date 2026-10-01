export function VisitorTracker() {
  return (
    // The plain image records a visit without loading the provider's JavaScript widget.
    // Keep it off screen, but let the browser request it on every page load.
    <img
      src="https://mapmyvisitors.com/map.png?d=rcJbGLdGnQy1Kcj_q-BW0oXXynxHFC5ZwQhobriDD_4&cl=ffffff"
      alt=""
      width={180}
      height={113}
      loading="eager"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-hidden="true"
      className="pointer-events-none fixed -left-[10000px] top-0"
    />
  )
}
