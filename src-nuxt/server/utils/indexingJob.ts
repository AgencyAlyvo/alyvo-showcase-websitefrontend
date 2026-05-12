import type { IndexingRefreshState, IndexingStatusRow } from '~~/server/types/indexing'
import { getGscAccessToken } from '~~/server/utils/gscAuth'
import { inspectUrl } from '~~/server/utils/gscInspect'
import { getIndexingRows, getRefreshState, setIndexingRows, setRefreshState } from '~~/server/utils/indexingStorage'
import { getIndexingSources } from '~~/server/utils/indexingSources'

const DELAY_BETWEEN_REQUESTS_MS: number = 1500

/**
 * Attend un dÃ©lai non-bloquant.
 * @param {number} ms - DurÃ©e d'attente en millisecondes.
 * @returns {Promise<void>} RÃ©solu une fois le dÃ©lai terminÃ©.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve: () => void) => setTimeout(resolve, ms))
}

/**
 * Job asynchrone : met à jour le cache d'indexation pour toutes les URLs (rate limit).
 * À lancer sans await depuis POST /api/indexing-status/refresh.
 */
export async function runIndexingRefreshJob(): Promise<void> {
  const config: ReturnType<typeof useRuntimeConfig> = useRuntimeConfig()
  const siteBaseUrl: string = String(config.indexingSiteUrl).replace(/\/$/, '')
  const gscSiteUrl: string = String(config.gscSiteUrl)

  let accessToken: string
  try {
    accessToken = await getGscAccessToken({
      googleClientId: config.googleClientId as string,
      googleClientSecret: config.googleClientSecret as string,
      gscRefreshToken: config.gscRefreshToken as string,
    })
  } catch {
    await setRefreshState({ status: 'idle' })
    return
  }

  const quotaProjectId: string = String(config.gscQuotaProjectId).trim()
  const sources: IndexingStatusRow[] = await getIndexingSources(siteBaseUrl)
  const rows: Record<string, IndexingStatusRow> = await getIndexingRows()

  const totalCount: number = sources.length
  for (const [index, source] of sources.entries()) {
    const refreshState: IndexingRefreshState = await getRefreshState()
    if (refreshState.cancelled) {
      await setRefreshState({
        status: 'idle',
        finishedAt: new Date().toISOString(),
        currentUrl: undefined,
        currentIndex: undefined,
        totalCount: undefined,
        cancelled: undefined,
      })
      return
    }
    await setRefreshState({
      ...refreshState,
      status: 'running',
      currentUrl: source.url,
      currentIndex: index + 1,
      totalCount,
    })

    const existing: IndexingStatusRow | undefined = rows[source.url]
    const row: IndexingStatusRow = {
      ...source,
      ...existing,
      url: source.url,
      title: source.title,
      type: source.type,
    }
    try {
      const result: Awaited<ReturnType<typeof inspectUrl>> = await inspectUrl(
        source.url,
        accessToken,
        quotaProjectId,
        gscSiteUrl,
      )
      row.verdict = result.verdict
      row.coverageState = result.coverageState
      row.lastCrawlTime = result.lastCrawlTime
      row.inspectionResultLink = result.inspectionResultLink
      row.googleCanonical = result.googleCanonical
      row.checkedAt = new Date().toISOString()
    } catch (err) {
      console.error('[indexing-job]', source.url, err)
      row.checkedAt = existing?.checkedAt
    }
    rows[source.url] = row
    await setIndexingRows(rows)

    if (index < sources.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS_MS)
    }
  }

  await setRefreshState({
    status: 'idle',
    finishedAt: new Date().toISOString(),
    currentUrl: undefined,
    currentIndex: undefined,
    totalCount: undefined,
    cancelled: undefined,
  })
}
