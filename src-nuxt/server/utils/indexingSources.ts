import type { IndexingStatusRow, IndexingUrlType } from '~~/server/types/indexing'

const SITEMAP_INDEX_PATH: string = '/sitemap.xml'

/**
 * Récupère le type d'indexation à partir de l'URL.
 * @param {string} url - URL absolue Ã  classifier.
 * @returns {IndexingUrlType} Type fonctionnel de la page.
 */
function inferTypeFromUrl(url: string): IndexingUrlType {
  const pathname: string = new URL(url).pathname

  if (/\/blog\/[^/]+$/.test(pathname)) return 'blog'
  if (/\/(?:projets|projects|proyectos)\/[^/]+$/.test(pathname)) return 'project'
  if (/\/(?:categorie|category|categoria)\/[^/]+$/.test(pathname)) return 'category'
  if (/\/(?:secteur|sector)\/[^/]+$/.test(pathname)) return 'sector'

  return 'page'
}

/**
 * Génère un titre lisible à partir du slug (dernier segment du path).
 * @param {string} slug - Segment final de chemin d'URL.
 * @returns {string} Titre lisible pour l'interface.
 */
function slugToTitle(slug: string): string {
  const formatted: string = slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string): string => c.toUpperCase())
  return formatted.trim() || slug
}

/**
 * Extrait le titre affichable pour une URL donnée.
 * @param {string} url - URL absolue de la page.
 * @returns {string} Titre prÃ©sentable en UI.
 */
function urlToTitle(url: string): string {
  const pathname: string = new URL(url).pathname
  const segments: string[] = pathname.split('/').filter((s: string): boolean => s.length > 0)
  const lastSegment: string | undefined = segments[segments.length - 1]
  if (!lastSegment) return 'Accueil'
  return slugToTitle(lastSegment)
}

/**
 * Parse un sitemap XML et extrait les URLs <loc>.
 * @param {string} xmlText - Contenu XML brut du sitemap.
 * @returns {string[]} Liste des URLs trouvÃ©es dans les balises <loc>.
 */
function parseSitemapUrls(xmlText: string): string[] {
  const urls: string[] = []
  const locRegex: RegExp = /<loc[^>]*>([^<]+)<\/loc>/gi
  let match: RegExpExecArray | null = locRegex.exec(xmlText)
  while (match !== null) {
    const rawLoc: string | undefined = match[1]
    const loc: string = typeof rawLoc === 'string' ? rawLoc.trim() : ''
    if (loc.length > 0) urls.push(loc)
    match = locRegex.exec(xmlText)
  }
  return urls
}

/**
 *
 * @param {string} url - URL de la ressource Ã  tÃ©lÃ©charger.
 * @returns {Promise<string>} Corps de la rÃ©ponse en texte.
 */
async function fetchText(url: string): Promise<string> {
  const res: Response = await fetch(url, {
    headers: { Accept: 'application/xml, text/xml, */*' },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`)
  }
  return res.text()
}

/**
 * Récupère toutes les URLs depuis le sitemap du site.
 * Gère un sitemap simple (liste d'URLs) ET un sitemap index (liste de sitemaps).
 * @param {string} siteBaseUrl - URL de base du site Ã  auditer.
 * @returns {Promise<IndexingStatusRow[]>} Lignes de statut initiales dÃ©duites du sitemap.
 */
export async function getIndexingSources(siteBaseUrl: string): Promise<IndexingStatusRow[]> {
  const rows: IndexingStatusRow[] = []
  const indexUrl: string = `${siteBaseUrl.replace(/\/$/, '')}${SITEMAP_INDEX_PATH}`

  try {
    const text: string = await fetchText(indexUrl)
    const isIndex: boolean = /<sitemapindex/i.test(text)

    if (isIndex) {
      const sitemapUrls: string[] = parseSitemapUrls(text)
      for (const sitemapUrl of sitemapUrls) {
        try {
          const sitemapText: string = await fetchText(sitemapUrl)
          for (const url of parseSitemapUrls(sitemapText)) {
            const type: IndexingUrlType = inferTypeFromUrl(url)
            const title: string = urlToTitle(url)
            rows.push({ url, title, type })
          }
        } catch {
          // Ignorer les sitemaps partiels en erreur, continuer avec les autres
        }
      }
    } else {
      for (const url of parseSitemapUrls(text)) {
        const type: IndexingUrlType = inferTypeFromUrl(url)
        const title: string = urlToTitle(url)
        rows.push({ url, title, type })
      }
    }
  } catch {
    return []
  }

  return rows
}
