import { HeroNav } from '@/components/hero/HeroNav'
import { NAV_LINKS, LINKEDIN_URL } from '@/config/nav'
import { SITE_NAME, SITE_SUBTITLE } from '@/config/site'
import type { ReactNode } from 'react'

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col">
      <HeroNav
        logoInitials="ME"
        siteName={SITE_NAME}
        siteSubtitle={SITE_SUBTITLE}
        navLinks={NAV_LINKS}
        linkedInUrl={LINKEDIN_URL}
      />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-800 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-600 text-center">
            © {new Date().getFullYear()} Mike Etherington. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
