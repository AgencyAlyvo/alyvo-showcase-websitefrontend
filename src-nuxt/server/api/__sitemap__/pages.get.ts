/**
 * Lien hreflang pour une page statique du sitemap.
 */
interface SitemapLink {
  lang: string
  url: string
}

const homeLinks: SitemapLink[] = [
  { lang: 'fr', url: '/' },
  { lang: 'en', url: '/en' },
  { lang: 'es', url: '/es' },
]

export default defineEventHandler(() => {
  return homeLinks.map((link: SitemapLink) => ({
    loc: link.url,
    _i18nTransform: false,
    alternatives: homeLinks.map((alt: SitemapLink) => ({
      hreflang: alt.lang,
      href: alt.url,
    })),
  }))
})
