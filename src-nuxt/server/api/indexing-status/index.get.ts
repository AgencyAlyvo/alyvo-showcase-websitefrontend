import type { H3Event } from 'h3'
import { requireDashboardAuth } from '~~/server/utils/dashboardAuth'
import { getIndexingRows, getRefreshState } from '~~/server/utils/indexingStorage'
import { getIndexingSources } from '~~/server/utils/indexingSources'
import type { IndexingRefreshState, IndexingStatusRow } from '~~/server/types/indexing'

type IndexingStatusResponse = {
  items: IndexingStatusRow[]
  refresh: IndexingRefreshState
  gscConnected: boolean
}

/**
 * GET /api/indexing-status
 * Retourne la liste depuis le cache + fusion avec les sources pour avoir toutes les URLs.
 */
export default defineEventHandler(async (event: H3Event): Promise<IndexingStatusResponse> => {
  requireDashboardAuth(event)
  const config = useRuntimeConfig(event)
  const siteBaseUrl: string = String(config.indexingSiteUrl ?? '').replace(/\/$/, '')

  const [sources, rows, refresh]: [IndexingStatusRow[], Record<string, IndexingStatusRow>, IndexingRefreshState] =
    await Promise.all([getIndexingSources(siteBaseUrl), getIndexingRows(), getRefreshState()])

  const items: IndexingStatusRow[] = sources.map((source: IndexingStatusRow) => {
    const cached: IndexingStatusRow | undefined = rows[source.url]
    return {
      ...source,
      ...cached,
      url: source.url,
      title: source.title,
      type: source.type,
    }
  })

  let gscConnected: boolean = false
  try {
    const { getGscAccessToken } = await import('~~/server/utils/gscAuth')
    await getGscAccessToken({
      gscServiceAccountJson: config.gscServiceAccountJson as string,
      googleClientId: config.googleClientId as string,
      googleClientSecret: config.googleClientSecret as string,
      gscRefreshToken: config.gscRefreshToken as string,
    })
    gscConnected = true
  } catch {
    // GSC non configuré
  }

  return {
    items,
    refresh: {
      status: refresh.status,
      startedAt: refresh.startedAt,
      finishedAt: refresh.finishedAt,
      currentUrl: refresh.currentUrl,
      currentIndex: refresh.currentIndex,
      totalCount: refresh.totalCount,
    },
    gscConnected,
  }
})
