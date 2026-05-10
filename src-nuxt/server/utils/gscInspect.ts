const GSC_INSPECT_URL: string = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect'
const REQUEST_TIMEOUT_MS: number = 12_000

/**
 *
 */
export type GscInspectResult = {
  verdict?: string
  coverageState?: string
  lastCrawlTime?: string
  inspectionResultLink?: string
  googleCanonical?: string
}

/**
 * Une seule inspection d'URL (1 requête). À appeler dans un job avec rate limit.
 * @param {string} inspectionUrl - URL Ã  inspecter.
 * @param {string} accessToken - Bearer token Google Search Console.
 * @param {string} quotaProjectId - Projet de quota GCP optionnel.
 * @param {string} siteUrl - Identifiant de site GSC (sc-domain:... ou https://.../).
 * @returns {Promise<GscInspectResult>} RÃ©sultat normalisÃ© de l'inspection.
 */
export async function inspectUrl(
  inspectionUrl: string,
  accessToken: string,
  quotaProjectId: string,
  siteUrl: string,
): Promise<GscInspectResult> {
  const controller: AbortController = new AbortController()
  const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
    if (quotaProjectId) {
      headers['x-goog-user-project'] = quotaProjectId
    }
    const res: Response = await fetch(GSC_INSPECT_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inspectionUrl,
        siteUrl,
        languageCode: 'fr-FR',
      }),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    if (!res.ok) {
      const err: string = await res.text()
      throw new Error(`GSC inspect ${res.status}: ${err.slice(0, 300)}`)
    }
    const data: {
      inspectionResult?: {
        indexStatusResult?: {
          verdict?: string
          coverageState?: string
          lastCrawlTime?: string
          googleCanonical?: string
        }
        inspectionResultLink?: string
      }
    } = (await res.json()) as {
      inspectionResult?: {
        indexStatusResult?: {
          verdict?: string
          coverageState?: string
          lastCrawlTime?: string
          googleCanonical?: string
        }
        inspectionResultLink?: string
      }
    }
    const indexStatus:
      | {
          verdict?: string
          coverageState?: string
          lastCrawlTime?: string
          googleCanonical?: string
        }
      | undefined = data.inspectionResult?.indexStatusResult
    return {
      verdict: indexStatus?.verdict,
      coverageState: indexStatus?.coverageState,
      lastCrawlTime: indexStatus?.lastCrawlTime,
      inspectionResultLink: data.inspectionResult?.inspectionResultLink,
      googleCanonical: indexStatus?.googleCanonical,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
