import { projects } from '../../../data/projects'
import type { ProjectLocale } from '#src-nuxt/shared/types/project'

const supportedLocales: ProjectLocale[] = ['fr', 'en', 'es']

export default defineEventHandler((event) => {
  const locale = getRouterParam(event, 'locale') as ProjectLocale | undefined
  const slug = getRouterParam(event, 'slug')

  if (!locale || !supportedLocales.includes(locale)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid locale' })
  }

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const project = projects.find((entry) => entry.status === 'published' && entry.translations[locale].slug === slug)

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  return project
})
