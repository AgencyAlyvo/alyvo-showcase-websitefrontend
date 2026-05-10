import type { IndexingStatusRow, IndexingRefreshState } from '~~/server/types/indexing'

const PREFIX: string = 'indexing'
const ROWS_KEY: string = `${PREFIX}:rows`
const REFRESH_KEY: string = `${PREFIX}:refresh`

/**
 * Returns the Nitro storage instance used by indexing utilities.
 * @returns {object} Storage driver used by the data layer.
 */
function getStorage(): ReturnType<typeof useStorage> {
  return useStorage('data')
}

/**
 * Reads all cached indexing rows.
 * @returns {Promise<Record<string, IndexingStatusRow>>} Indexed rows keyed by URL.
 */
export async function getIndexingRows(): Promise<Record<string, IndexingStatusRow>> {
  const storage: ReturnType<typeof getStorage> = getStorage()
  const raw: Record<string, IndexingStatusRow> | null =
    await storage.getItem<Record<string, IndexingStatusRow>>(ROWS_KEY)
  return raw ?? {}
}

/**
 * Stores one indexing row.
 * @param {IndexingStatusRow} row - Indexing row to persist.
 */
export async function setIndexingRow(row: IndexingStatusRow): Promise<void> {
  const storage: ReturnType<typeof getStorage> = getStorage()
  const rows: Record<string, IndexingStatusRow> = await getIndexingRows()
  rows[row.url] = row
  await storage.setItem(ROWS_KEY, rows)
}

/**
 * Stores many indexing rows at once.
 * @param {Record<string, IndexingStatusRow>} rows - Rows map to persist.
 */
export async function setIndexingRows(rows: Record<string, IndexingStatusRow>): Promise<void> {
  const storage: ReturnType<typeof getStorage> = getStorage()
  await storage.setItem(ROWS_KEY, rows)
}

/**
 * Reads refresh job state.
 * @returns {Promise<IndexingRefreshState>} Current refresh state.
 */
export async function getRefreshState(): Promise<IndexingRefreshState> {
  const storage: ReturnType<typeof getStorage> = getStorage()
  const raw: IndexingRefreshState | null = await storage.getItem<IndexingRefreshState>(REFRESH_KEY)
  return raw ?? { status: 'idle' }
}

/**
 * Writes refresh job state.
 * @param {IndexingRefreshState} state - State to persist.
 */
export async function setRefreshState(state: IndexingRefreshState): Promise<void> {
  const storage: ReturnType<typeof getStorage> = getStorage()
  await storage.setItem(REFRESH_KEY, state)
}
