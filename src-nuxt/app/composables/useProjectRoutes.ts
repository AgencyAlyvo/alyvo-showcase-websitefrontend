import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const projectPathByLocale: Record<ProjectLocale, string> = {
  fr: '/fr/projets',
  en: '/en/projects',
  es: '/es/proyectos',
}

export function projectDetailPath(locale: ProjectLocale, slug: string): string {
  return `${projectPathByLocale[locale]}/${slug}`
}

export function buildPrerenderRoutes(projects: Project[]): string[] {
  return projects.flatMap((project) => [
    projectDetailPath('fr', project.translations.fr.slug),
    projectDetailPath('en', project.translations.en.slug),
    projectDetailPath('es', project.translations.es.slug),
  ])
}

export function useProjectI18nParams(project: Project) {
  const setI18nParams = useSetI18nParams()
  setI18nParams({
    fr: { slug: project.translations.fr.slug },
    en: { slug: project.translations.en.slug },
    es: { slug: project.translations.es.slug },
  })
}
