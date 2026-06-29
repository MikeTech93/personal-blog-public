'use client'

import { useState } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import { LinkedInIcon } from '@/components/icons/BrandIcons'
import { NAV_LINKS, LINKEDIN_URL } from '@/config/nav'
import type { ReactNode } from 'react'

interface SiteLayoutProps {
  children: ReactNode
  currentPath?: string
}

export function SiteLayout({ children, currentPath = '/' }: SiteLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center h-16 gap-4" aria-label="Primary navigation">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 -m-1"
              aria-label="MikeTech93 — home"
            >
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                <img src="/images/logos/square-logo.png" alt="MikeTech93 logo" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-bold text-slate-100 leading-none">MikeTech93</div>
                <div className="text-[11px] text-slate-500 mt-0.5">DevOps Engineer · Platform Engineer · Educator</div>
              </div>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1 mx-auto" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = currentPath === link.href
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isActive
                          ? 'text-slate-100'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-500 rounded-full" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto lg:ml-0">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 ml-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
              >
                <LinkedInIcon className="w-4 h-4" aria-hidden="true" />
                Follow on LinkedIn
                <ExternalLink className="w-3 h-3 opacity-70" strokeWidth={2} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
              </button>
            </div>
          </nav>

          {mobileOpen && (
            <div id="mobile-menu" className="lg:hidden border-t border-slate-800/80 py-3 pb-4">
              <ul className="flex flex-col gap-1" role="list">
                {NAV_LINKS.map((link) => {
                  const isActive = currentPath === link.href
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'text-slate-100 bg-slate-800/60'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
                <li className="pt-2">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors w-fit"
                  >
                    <LinkedInIcon className="w-4 h-4" aria-hidden="true" />
                    Follow on LinkedIn
                    <ExternalLink className="w-3 h-3 opacity-70" strokeWidth={2} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
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
