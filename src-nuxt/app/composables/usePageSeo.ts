interface PageSeoOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

export function usePageSeo(options: PageSeoOptions) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = (config.public.siteUrl as string) || ''
  const url = siteUrl ? `${siteUrl}${route.fullPath}` : undefined

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
