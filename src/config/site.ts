export const SITE_NAME = 'MikeTech93'
export const SITE_SUBTITLE = 'DevOps Engineer · Platform Engineer · Educator'
export const SITE_URL = 'https://miketech93.co.uk'
export const SITE_TITLE = 'Mike Etherington — DevOps & Platform Engineer'
export const SITE_DESCRIPTION =
  'DevOps & Platform Engineer sharing practical lessons on cloud, automation, Kubernetes, and modern infrastructure.'
export const SITE_AUTHOR = 'Mike Etherington'
export const SITE_OG_IMAGE = `${SITE_URL}/images/logos/square-logo.png`

export function buildPageMeta({
  title,
  description,
  path,
  type = 'website',
  ogImage = SITE_OG_IMAGE,
}: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  ogImage?: string
}) {
  const url = `${SITE_URL}${path}`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
