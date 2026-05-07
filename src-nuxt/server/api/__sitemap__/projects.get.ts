import { projects } from '../../data/projects'
import type { ProjectLocale } from '#src-nuxt/shared/types/project'

const projectPathByLocale: Record<ProjectLocale, string> = {
  fr: '/fr/projets',
  en: '/en/projects',
  es: '/es/proyectos',
}

const localeKeys = Object.keys(projectPathByLocale) as ProjectLocale[]

export default defineEventHandler(() => {
  return projects
    .filter((project) => project.status === 'published')
    .flatMap((project) => {
      const links = localeKeys.map((lang) => ({
        lang,
        url: `${projectPathByLocale[lang]}/${project.translations[lang].slug}`,
      }))

      return links.map((link) => ({
        loc: link.url,
        _i18nTransform: false,
        alternatives: links.map((alt) => ({
          hreflang: alt.lang,
          href: alt.url,
        })),
      }))
    })
})
