import { projects } from '../../data/projects'
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

/**
 * Lien hreflang pour une entrée de sitemap projet.
 */
interface SitemapLink {
  lang: ProjectLocale
  url: string
}

const projectPathByLocale: Record<ProjectLocale, string> = {
  fr: '/projets',
  en: '/en/projects',
  es: '/es/proyectos',
}

const localeKeys: ProjectLocale[] = Object.keys(projectPathByLocale) as ProjectLocale[]

export default defineEventHandler(() => {
  return projects
    .filter((project: Project) => project.status === 'published')
    .flatMap((project: Project) => {
      const links: SitemapLink[] = localeKeys.map((lang: ProjectLocale) => ({
        lang,
        url: `${projectPathByLocale[lang]}/${project.translations[lang].slug}`,
      }))

      return links.map((link: SitemapLink) => ({
        loc: link.url,
        _i18nTransform: false,
        alternatives: links.map((alt: SitemapLink) => ({
          hreflang: alt.lang,
          href: alt.url,
        })),
      }))
    })
})
