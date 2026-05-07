import type { Project } from '#src-nuxt/shared/types/project'

export function useProjects() {
  return useAsyncData<Project[]>('projects-published', () =>
    $fetch<Project[]>('/api/projects' as never, {
      query: { status: 'published' },
    }),
  )
}

export function useProject(locale: string, slug: string) {
  return useAsyncData<Project | null>(`project-${locale}-${slug}`, async () => {
    try {
      return await $fetch<Project>(`/api/projects/${locale}/${slug}` as never)
    } catch (error) {
      const status = (error as { statusCode?: number })?.statusCode
      if (status === 404) return null
      throw error
    }
  })
}
