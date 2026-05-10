import type { H3Event } from 'h3'
import { requireDashboardAuth } from '~~/server/utils/dashboardAuth'

/**
 * GET /api/auth/me
 * Vérifie le cookie de session. 401 si non authentifié.
 */
export default defineEventHandler((event: H3Event): { ok: true } => {
  requireDashboardAuth(event)
  return { ok: true }
})
