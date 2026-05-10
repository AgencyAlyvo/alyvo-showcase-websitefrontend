import type { AsyncData, NuxtError } from '#app'
import type { Project } from '#src-nuxt/shared/types/project'

/**
 * Charge la liste des projets publiés.
 * @returns {AsyncData<Project[] | undefined, NuxtError | undefined>} État de chargement asynchrone des projets.
 */
export function useProjects(): AsyncData<Project[] | undefined, NuxtError | undefined> {
  return useAsyncData<Project[]>('projects-published', () =>
    $fetch<Project[]>('/api/projects' as never, {
      query: { status: 'published' },
    }),
  )
}

/**
 * Charge un projet par locale et slug.
 * @param {string} locale - Locale du projet.
 * @param {string} slug - Slug localisé du projet.
 * @returns {AsyncData<Project | null | undefined, NuxtError | undefined>} État de chargement asynchrone du projet.
 */
export function useProject(locale: string, slug: string): AsyncData<Project | null | undefined, NuxtError | undefined> {
  return useAsyncData<Project | null>(`project-${locale}-${slug}`, async () => {
    try {
      return await $fetch<Project>(`/api/projects/${locale}/${slug}` as never)
    } catch (error) {
      const status: number | undefined = (error as { statusCode?: number }).statusCode
      if (status === 404) return null
      throw error
    }
  })
}
