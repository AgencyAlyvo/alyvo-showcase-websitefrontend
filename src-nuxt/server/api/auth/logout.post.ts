import type { H3Event } from 'h3'
import { deleteCookie } from 'h3'
import { DASHBOARD_SESSION_COOKIE_NAME } from '~~/server/utils/dashboardAuth'

/**
 * POST /api/auth/logout
 * Supprime le cookie de session du dashboard.
 */
export default defineEventHandler((event: H3Event): { ok: true } => {
  deleteCookie(event, DASHBOARD_SESSION_COOKIE_NAME, { path: '/' })
  return { ok: true }
})
