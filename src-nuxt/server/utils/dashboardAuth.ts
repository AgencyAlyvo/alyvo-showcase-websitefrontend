import type { H3Event } from 'h3'
import { createError, getCookie } from 'h3'

export const DASHBOARD_SESSION_COOKIE_NAME: 'dashboard_session' = 'dashboard_session'

/**
 * Vérifie le cookie de session du dashboard. Throw 401 si absent ou invalide.
 * À appeler en début de chaque handler API du dashboard.
 * @param {H3Event} event - RequÃªte serveur Ã  contrÃ´ler.
 */
export function requireDashboardAuth(event: H3Event): void {
  const config: ReturnType<typeof useRuntimeConfig> = useRuntimeConfig(event)
  const sessionToken: string = String(config.dashboardSessionToken)

  if (!sessionToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Dashboard auth is not configured.',
    })
  }

  const cookieValue: string | undefined = getCookie(event, DASHBOARD_SESSION_COOKIE_NAME)

  if (cookieValue !== sessionToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized.',
    })
  }
}
