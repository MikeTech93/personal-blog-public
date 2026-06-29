import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import type { ReactNode } from 'react'
import appCss from '../globals.css?url'

function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center text-center px-4">
      <div>
        <p className="text-6xl font-extrabold text-blue-500 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Page not found</h1>
        <p className="text-slate-400 mb-6">The page you are looking for does not exist.</p>
        <a href="/" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors">
          Go home
        </a>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'DevOps & Platform Engineer sharing practical lessons on cloud, automation, Kubernetes, and modern infrastructure.',
      },
      { title: 'Mike Etherington — DevOps & Platform Engineer' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#030712] text-slate-100 antialiased">
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  )
}
