import type { H3Event } from 'h3'
import { projects } from '../../../data/projects'
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const supportedLocales: ProjectLocale[] = ['fr', 'en', 'es']

export default defineEventHandler((event: H3Event) => {
  const locale: ProjectLocale | undefined = getRouterParam(event, 'locale') as ProjectLocale | undefined
  const slug: string | undefined = getRouterParam(event, 'slug')

  if (!locale || !supportedLocales.includes(locale)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid locale' })
  }

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const project: Project | undefined = projects.find(
    (entry: Project) => entry.status === 'published' && entry.translations[locale].slug === slug,
  )

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  return project
})
