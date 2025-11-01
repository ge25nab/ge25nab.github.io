'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#publications', label: 'Publications' },
  { href: '/#national-projects', label: 'National Projects' },
  { href: '/#academic-service', label: 'Academic Service' },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hash, setHash] = useState('')

  useEffect(() => {
    setMounted(true)
    setHash(window.location.hash)
    
    const handleHashChange = () => {
      setHash(window.location.hash)
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            {siteConfig.author.name}
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:gap-1">
              {navItems.map((item) => {
                const isActive = item.href === '/' 
                  ? pathname === '/'
                  : item.href.startsWith('/#')
                    ? pathname === '/' && hash === item.href.slice(1)
                    : pathname === item.href
                
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (item.href.startsWith('/#')) {
                    const hash = item.href.slice(2)
                    // If already on home page, scroll to element
                    if (pathname === '/') {
                      e.preventDefault()
                      const element = document.getElementById(hash)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        window.history.pushState(null, '', `/#${hash}`)
                        setHash(`#${hash}`)
                      }
                    }
                  }
                }
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleClick}
                    className={`px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

