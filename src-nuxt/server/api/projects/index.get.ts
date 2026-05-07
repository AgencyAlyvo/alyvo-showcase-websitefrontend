import { projects } from '../../data/projects'
import type { Project } from '#src-nuxt/shared/types/project'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const status = (query.status as Project['status'] | undefined) ?? undefined

  return projects.filter((project) => {
    if (status && project.status !== status) return false
    return true
  })
})
