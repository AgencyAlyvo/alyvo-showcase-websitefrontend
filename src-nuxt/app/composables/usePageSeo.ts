/**
 * Options de configuration des balises SEO de la page.
 */
interface PageSeoOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

/**
 * Configure les balises meta SEO pour la page courante.
 * @param {PageSeoOptions} options - Options SEO à appliquer.
 */
export function usePageSeo(options: PageSeoOptions): void {
  const config: ReturnType<typeof useRuntimeConfig> = useRuntimeConfig()
  const route: ReturnType<typeof useRoute> = useRoute()
  const siteUrl: string = ((config.public.siteUrl as string) || '').replace(/\/$/, '')
  const canonicalUrl: string | undefined = siteUrl ? `${siteUrl}${route.path}` : undefined
  const currentUrl: string | undefined = siteUrl ? `${siteUrl}${route.fullPath}` : undefined
  const imageUrl: string | undefined =
    siteUrl && options.image?.startsWith('/') ? `${siteUrl}${options.image}` : options.image

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type ?? 'website',
    ogUrl: currentUrl,
    ogImage: imageUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: imageUrl,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  if (canonicalUrl) {
    useHead({
      link: [{ rel: 'canonical', href: canonicalUrl }],
    })
  }
}
