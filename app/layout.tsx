import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Xingcheng Zhou | TUM',
  description:
    'Vision Language Action research for autonomous driving and intelligent infrastructure',
  keywords: [
    'autonomous driving',
    'vision language model',
    'world model',
    'trajectory planning',
    'cooperative perception',
    'dataset',
    'TUM',
  ],
  authors: [{ name: 'Xingcheng Zhou' }],
  openGraph: {
    title: 'Xingcheng Zhou | TUM',
    description:
      'Vision Language Action research for autonomous driving and intelligent infrastructure',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xingcheng Zhou | TUM',
    description:
      'Vision Language Action research for autonomous driving and intelligent infrastructure',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

