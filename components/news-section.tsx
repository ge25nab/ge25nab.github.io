import { getNews } from '@/lib/content'

export function NewsSection() {
  const newsItems = getNews()

  const renderContent = (item: typeof newsItems[0]) => {
    if (!item.links || item.links.length === 0) {
      return <>{item.content}</>
    }

    // Split content by link text and replace with links
    let content = item.content
    const parts: (string | React.ReactElement)[] = []
    let lastIndex = 0

    // Find all link positions
    item.links.forEach((link, index) => {
      const linkIndex = content.indexOf(link.text, lastIndex)
      if (linkIndex !== -1) {
        // Add text before link
        if (linkIndex > lastIndex) {
          parts.push(content.substring(lastIndex, linkIndex))
        }
        // Add link
        parts.push(
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {link.text}
          </a>
        )
        lastIndex = linkIndex + link.text.length
      }
    })

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    return <>{parts}</>
  }
  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl font-bold">
        News
      </h2>
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-4 pb-4">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-sm font-semibold text-muted-foreground mb-2">
                {item.date}
              </div>
              <div className="text-sm leading-relaxed">
                {renderContent(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

