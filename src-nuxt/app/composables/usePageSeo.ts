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
  const siteUrl: string = (config.public.siteUrl as string) || ''
  const url: string | undefined = siteUrl ? `${siteUrl}${route.fullPath}` : undefined

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type ?? 'website',
    ogUrl: url,
    ogImage: options.image,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: options.image,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow',
  })
}
