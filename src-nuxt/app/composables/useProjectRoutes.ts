import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const projectPathByLocale: Record<ProjectLocale, string> = {
  fr: '/fr/projets',
  en: '/en/projects',
  es: '/es/proyectos',
}

/**
 * Construit le chemin localisé d'un projet.
 * @param {ProjectLocale} locale - Locale cible.
 * @param {string} slug - Slug du projet.
 * @returns {string} Chemin complet vers la page projet.
 */
export function projectDetailPath(locale: ProjectLocale, slug: string): string {
  return `${projectPathByLocale[locale]}/${slug}`
}

/**
 * Génère la liste des routes à pré-rendre pour tous les projets.
 * @param {Project[]} projects - Liste des projets.
 * @returns {string[]} Routes à pré-rendre, toutes locales confondues.
 */
export function buildPrerenderRoutes(projects: Project[]): string[] {
  return projects.flatMap((project: Project) => [
    projectDetailPath('fr', project.translations.fr.slug),
    projectDetailPath('en', project.translations.en.slug),
    projectDetailPath('es', project.translations.es.slug),
  ])
}

/**
 * Définit les paramètres i18n localisés pour la page projet courante.
 * @param {Project} project - Projet courant.
 */
export function useProjectI18nParams(project: Project): void {
  const setI18nParams: ReturnType<typeof useSetI18nParams> = useSetI18nParams()
  setI18nParams({
    fr: { slug: project.translations.fr.slug },
    en: { slug: project.translations.en.slug },
    es: { slug: project.translations.es.slug },
  })
}
