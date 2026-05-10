import type { H3Event } from 'h3'
import type { QueryObject } from 'ufo'
import { projects } from '../../data/projects'
import type { Project } from '#src-nuxt/shared/types/project'

export default defineEventHandler((event: H3Event) => {
  const query: QueryObject = getQuery(event)
  const status: Project['status'] | undefined = (query.status as Project['status'] | undefined) ?? undefined

  return projects.filter((project: Project) => {
    if (status && project.status !== status) return false
    return true
  })
})
