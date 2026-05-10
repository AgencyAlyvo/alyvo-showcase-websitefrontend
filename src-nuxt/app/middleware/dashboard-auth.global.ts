import type { RouteLocationNormalized } from 'vue-router'

/**
 * Middleware global qui protège les routes /dashboard (sauf /dashboard/login).
 * Vérifie le cookie via /api/auth/me et redirige vers /dashboard/login si non autorisé.
 *
 * L'auth ne tourne que côté client : sur refresh en prod, le client appelle /me avec le cookie.
 */
export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  const path: string = to.path

  const isDashboardRoute: boolean = path.includes('/dashboard') && !path.includes('/dashboard/login')

  if (!isDashboardRoute) {
    return
  }

  if (import.meta.server) {
    return
  }

  try {
    await $fetch<{ ok: true }>('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      retry: 0,
    })
  } catch {
    return navigateTo('/dashboard/login')
  }
})
