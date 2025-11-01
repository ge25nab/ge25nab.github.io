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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {newsItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 pr-8 font-medium align-top min-w-[120px]">
                  {item.date}
                </td>
                <td className="py-2">{renderContent(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

