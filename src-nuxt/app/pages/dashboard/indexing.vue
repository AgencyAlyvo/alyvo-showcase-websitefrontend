<template>
  <div class="flex min-w-0 flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
    <div class="min-w-0">
      <h1 class="text-highlighted text-2xl font-semibold">Indexation Google</h1>
      <p class="text-default mt-1">
        Liste des pages du site et statut d'indexation dans Google Search Console. Les données sont lues depuis le cache
        ; utilise « Actualiser » pour mettre à jour.
      </p>
    </div>

    <UAlert v-if="error" color="error" variant="subtle" :description="error" />

    <div class="flex w-full flex-col gap-4">
      <div class="flex w-full flex-col gap-4 md:flex-row md:flex-wrap md:items-end md:justify-between">
        <div class="flex w-full flex-col flex-wrap items-end gap-3 sm:flex-row sm:gap-4 md:min-w-0 md:flex-1">
          <div class="w-full min-w-0 md:max-w-[200px]">
            <BaseSelect v-model="selectedVerdict" label="Verdict" :options="verdictOptions" />
          </div>
          <div class="w-full min-w-0 md:max-w-[200px]">
            <BaseSelect v-model="selectedType" label="Type" :options="typeOptions" />
          </div>
        </div>
        <div class="w-full min-w-0 flex-1 md:max-w-md">
          <UFormField label="Recherche" :ui="{ label: 'text-highlighted' }">
            <UInput
              v-model="searchText"
              icon="i-lucide-search"
              placeholder="Titre ou URL…"
              size="xl"
              color="neutral"
              variant="outline"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>
      <div class="flex w-full flex-wrap items-center justify-end gap-3 sm:justify-start">
        <BaseButton :disabled="loading || refreshStatus === 'running'" @click="startRefresh">
          <UIcon v-if="refreshStatus === 'running'" name="i-lucide-loader-2" class="mr-2 size-4 animate-spin" />
          {{
            refreshStatus === 'running' && refreshCurrentIndex != null && refreshTotalCount != null
              ? `Mise à jour ${refreshCurrentIndex}/${refreshTotalCount}`
              : refreshStatus === 'running'
                ? 'Mise à jour…'
                : 'Actualiser'
          }}
        </BaseButton>
        <BaseButton v-if="refreshStatus === 'running'" variant="secondary" @click="cancelRefresh">
          Annuler l'actualisation
        </BaseButton>
      </div>
    </div>

    <div v-if="loading && items.length === 0" class="text-default flex items-center gap-2">
      <UIcon name="i-lucide-loader-2" class="size-5 animate-spin" />
      Chargement…
    </div>

    <div
      v-else-if="filteredItems.length === 0"
      class="bg-elevated border-default text-default rounded-xl border p-8 text-center"
    >
      {{ items.length === 0 ? 'Aucune page pour le moment.' : 'Aucun résultat pour les filtres choisis.' }}
    </div>

    <div v-else class="w-full min-w-0">
      <p class="text-default mb-3 text-sm font-medium">
        {{ filteredItems.length === 1 ? '1 résultat' : `${filteredItems.length} résultats` }}
      </p>

      <ul class="flex w-full min-w-0 flex-col gap-3">
        <li
          v-for="item in filteredItems"
          :key="item.url"
          class="bg-elevated border-default flex flex-col gap-3 rounded-xl border p-4"
        >
          <div class="flex flex-col gap-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-highlighted font-semibold break-words">{{ item.title }}</span>
              <span class="bg-primary/10 text-primary shrink-0 rounded px-1.5 py-0.5 text-xs font-medium">
                {{ item.type }}
              </span>
              <span
                v-if="item.verdict === 'PASS'"
                class="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
              >
                PASS
              </span>
              <span
                v-else-if="item.verdict === 'FAIL'"
                class="rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-400"
              >
                FAIL
              </span>
              <span
                v-else-if="item.verdict === 'NEUTRAL'"
                class="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400"
              >
                NEUTRAL
              </span>
              <span class="shrink-0 rounded px-2 py-0.5 text-xs font-medium" :class="getSignalBadgeClass(item)">
                {{ getSignalLabel(item) }}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <UButton
                :icon="copiedUrl === item.url ? 'i-lucide-check' : 'i-lucide-copy'"
                color="neutral"
                variant="ghost"
                size="xs"
                :aria-label="`Copier ${item.url}`"
                @click="copyToClipboard(item.url)"
              />
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary min-w-0 text-sm break-all hover:underline"
              >
                {{ item.url }}
              </a>
            </div>
          </div>

          <div class="text-default grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div>
              <span class="text-muted text-xs">Statut</span>
              <p>
                <template v-if="item.coverageState">
                  {{ item.coverageState }}
                  <span
                    v-if="item.googleCanonical && item.coverageState?.toLowerCase().includes('redirection')"
                    class="text-muted mt-1 block text-xs"
                  >
                    Redirige vers {{ item.googleCanonical }}
                  </span>
                </template>
                <span v-else class="text-muted">—</span>
              </p>
            </div>
            <div>
              <span class="text-muted text-xs">Dernière exploration</span>
              <p>{{ formatLastCrawl(item.lastCrawlTime) }}</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <BaseButton
              v-if="gscConnected"
              size="sm"
              :disabled="isItemRefreshing(item.url)"
              @click="refreshUrl(item.url)"
            >
              <UIcon v-if="isItemRefreshing(item.url)" name="i-lucide-loader-2" class="mr-1.5 size-3.5 animate-spin" />
              {{ isItemRefreshing(item.url) ? 'Actualisation…' : 'Actualiser' }}
            </BaseButton>
            <BaseButton
              v-if="item.inspectionResultLink"
              size="sm"
              variant="secondary"
              @click="openInNewTab(gscConsoleUrl(item.inspectionResultLink))"
            >
              Search Console
            </BaseButton>
            <span v-if="!gscConnected && !item.inspectionResultLink" class="text-muted text-sm">
              GSC non connecté
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="!gscConnected && !loading" class="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
      <p class="text-sm text-amber-700 dark:text-amber-200">
        Configure Google Search Console pour afficher le statut. Ajoute
        <code class="bg-muted rounded px-1">GSC_SERVICE_ACCOUNT_JSON</code> dans ton fichier
        <code class="bg-muted rounded px-1">.env</code> avec la clé JSON d'un Service Account, puis ajoute l'email du SA
        comme <strong>Owner</strong> dans Search Console.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { ComputedRef, Ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Indexation Google — Dashboard',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

/**
 *
 */
type IndexingItem = {
  url: string
  title: string
  type: string
  verdict?: string
  coverageState?: string
  lastCrawlTime?: string
  inspectionResultLink?: string
  googleCanonical?: string
  checkedAt?: string
}

/**
 *
 */
type IndexingApiResponse = {
  items: IndexingItem[]
  refresh: {
    status: 'idle' | 'running'
    startedAt?: string
    finishedAt?: string
    currentUrl?: string
    currentIndex?: number
    totalCount?: number
  }
  gscConnected: boolean
}

const CACHE_KEY: string = 'dashboard-indexing-cache'
const POLL_INTERVAL_MS: number = 3000

const items: Ref<IndexingItem[]> = ref([])
const loading: Ref<boolean> = ref(true)
const error: Ref<string> = ref('')
const gscConnected: Ref<boolean> = ref(false)
const refreshStatus: Ref<'idle' | 'running'> = ref('idle')
const refreshAllCurrentUrl: Ref<string | null> = ref(null)
const refreshCurrentIndex: Ref<number | null> = ref(null)
const refreshTotalCount: Ref<number | null> = ref(null)
const searchText: Ref<string> = ref('')
const refreshingUrls: Ref<string[]> = ref([])
const copiedUrl: Ref<string | null> = ref(null)

/**
 *
 */
type SelectOption = { label: string; value: string }

const verdictOptions: SelectOption[] = [
  { label: 'Tous les verdicts', value: '' },
  { label: 'PASS', value: 'PASS' },
  { label: 'NEUTRAL', value: 'NEUTRAL' },
  { label: 'FAIL', value: 'FAIL' },
]
const typeOptions: SelectOption[] = [
  { label: 'Tous les types', value: '' },
  { label: 'Page', value: 'page' },
  { label: 'Projet', value: 'project' },
  { label: 'Catégorie', value: 'category' },
  { label: 'Secteur', value: 'sector' },
  { label: 'Blog', value: 'blog' },
]
const selectedVerdict: Ref<string> = ref('')
const selectedType: Ref<string> = ref('')

/**
 * Normalise l'URL GSC pour utiliser le chemin u/1.
 * @param {string} link - URL brute issue de l'API GSC.
 * @returns {string} URL normalisée vers l'interface `u/1`.
 */
function gscConsoleUrl(link: string): string {
  if (!link) return 'https://search.google.com/u/1/search-console'
  if (link.includes('search.google.com/u/1/')) return link
  return link.replace(/search\.google\.com\/(?!u\/1)/, 'search.google.com/u/1/')
}

const filteredItems: ComputedRef<IndexingItem[]> = computed((): IndexingItem[] => {
  let list: IndexingItem[] = items.value
  const v: string = selectedVerdict.value
  if (v) list = list.filter((row: IndexingItem) => row.verdict === v)
  const t: string = selectedType.value
  if (t) list = list.filter((row: IndexingItem) => row.type === t)
  const q: string = searchText.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (row: IndexingItem): boolean => row.title.toLowerCase().includes(q) || row.url.toLowerCase().includes(q),
    )
  }
  return list
})

/**
 * Indique si une URL est en cours d'actualisation.
 * @param {string} url - URL à vérifier.
 * @returns {boolean} True si un refresh global ou local cible cette URL.
 */
function isItemRefreshing(url: string): boolean {
  return refreshingUrls.value.includes(url) || (refreshStatus.value === 'running' && refreshAllCurrentUrl.value === url)
}

/**
 * Formate la date de dernier crawl en format FR.
 * @param {string | undefined} iso - Horodatage ISO brut.
 * @returns {string} Date formatée, ou tiret si absente.
 */
function formatLastCrawl(iso?: string): string {
  if (!iso) return '—'
  try {
    const d: Date = new Date(iso)
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

const ONE_DAY_MS: number = 24 * 60 * 60 * 1000

/**
 * Déduit un libellé métier à partir des données d'indexation.
 * @param {IndexingItem} item - Ligne d'indexation à interpréter.
 * @returns {string} Libellé de signal utilisateur.
 */
function getSignalLabel(item: IndexingItem): string {
  if (item.verdict === 'PASS') return 'Indexée'
  if (item.coverageState === 'Explorée, actuellement non indexée') return 'Crawl OK, indexation pas encore faite'
  if (item.coverageState === 'Google ne reconnaît pas cette URL') return 'Non découverte (pas crawlé)'
  if (
    item.verdict !== 'PASS' &&
    item.lastCrawlTime &&
    Date.now() - new Date(item.lastCrawlTime).getTime() < ONE_DAY_MS
  ) {
    return "Crawl récent — en attente d'indexation"
  }
  return item.coverageState?.trim() || 'À vérifier'
}

/**
 * Retourne la classe visuelle du badge de signal.
 * @param {IndexingItem} item - Ligne d'indexation à styliser.
 * @returns {string} Classes Tailwind du badge.
 */
function getSignalBadgeClass(item: IndexingItem): string {
  const label: string = getSignalLabel(item)
  if (label === 'Indexée') return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
  if (label === 'Crawl OK, indexation pas encore faite') return 'bg-amber-500/20 text-amber-800 dark:text-amber-200'
  if (label === 'Non découverte (pas crawlé)') return 'bg-red-500/15 text-red-700 dark:text-red-300'
  if (label === "Crawl récent — en attente d'indexation") return 'bg-blue-500/20 text-blue-800 dark:text-blue-200'
  return 'bg-purple-500/15 text-purple-700 dark:text-purple-200'
}

/**
 * Ouvre une URL dans un nouvel onglet navigateur.
 * @param {string} url - URL absolue à ouvrir.
 * @returns {void} Aucun retour.
 */
function openInNewTab(url: string): void {
  if (import.meta.client) window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Copie une valeur texte dans le presse-papiers.
 * @param {string} value - Texte à copier.
 * @returns {Promise<void>} Promise résolue après tentative de copie.
 */
async function copyToClipboard(value: string): Promise<void> {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(value)
    copiedUrl.value = value
    setTimeout(() => {
      if (copiedUrl.value === value) copiedUrl.value = null
    }, 1500)
  } catch {
    // ignore
  }
}

/**
 * Charge l'état d'indexation depuis le cache ou l'API.
 * @param {boolean} force - Force un appel API même si le cache existe.
 * @returns {Promise<void>} Promise résolue quand l'état local est synchronisé.
 */
async function fetchFromApi(force: boolean = false): Promise<void> {
  const cache: Ref<IndexingApiResponse | null> = useState<IndexingApiResponse | null>(CACHE_KEY)
  if (!force && cache.value) {
    items.value = cache.value.items
    gscConnected.value = cache.value.gscConnected
    refreshStatus.value = cache.value.refresh.status
    refreshAllCurrentUrl.value = cache.value.refresh.currentUrl ?? null
    refreshCurrentIndex.value = cache.value.refresh.currentIndex ?? null
    refreshTotalCount.value = cache.value.refresh.totalCount ?? null
    loading.value = false
    return
  }
  loading.value = true
  error.value = ''
  try {
    const data: IndexingApiResponse = await $fetch<IndexingApiResponse>('/api/indexing-status')
    items.value = data.items
    gscConnected.value = data.gscConnected
    refreshStatus.value = data.refresh.status
    refreshAllCurrentUrl.value = data.refresh.currentUrl ?? null
    refreshCurrentIndex.value = data.refresh.currentIndex ?? null
    refreshTotalCount.value = data.refresh.totalCount ?? null
    cache.value = data
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Erreur lors du chargement.'
    items.value = []
  } finally {
    loading.value = false
  }
}

let pollIntervalId: ReturnType<typeof setInterval> | null = null
let pollTimeoutId: ReturnType<typeof setTimeout> | null = null

/**
 * Arrête le polling en cours et nettoie les timers.
 * @returns {void} Aucun retour.
 */
function stopPolling(): void {
  if (pollIntervalId) {
    clearInterval(pollIntervalId)
    pollIntervalId = null
  }
  if (pollTimeoutId) {
    clearTimeout(pollTimeoutId)
    pollTimeoutId = null
  }
}

/**
 * Démarre le polling de progression du refresh global.
 * @returns {void} Aucun retour.
 */
function startPolling(): void {
  stopPolling()

  pollIntervalId = setInterval((): void => {
    void (async (): Promise<void> => {
      const data: IndexingApiResponse = await $fetch<IndexingApiResponse>('/api/indexing-status')
      refreshStatus.value = data.refresh.status
      refreshAllCurrentUrl.value = data.refresh.currentUrl ?? null
      refreshCurrentIndex.value = data.refresh.currentIndex ?? null
      refreshTotalCount.value = data.refresh.totalCount ?? null
      items.value = data.items
      useState(CACHE_KEY).value = data

      if (data.refresh.status !== 'running') {
        refreshAllCurrentUrl.value = null
        refreshCurrentIndex.value = null
        refreshTotalCount.value = null
        stopPolling()
      }
    })().catch((e: unknown) => {
      error.value = e instanceof Error ? e.message : 'Erreur lors du polling.'
    })
  }, POLL_INTERVAL_MS)

  pollTimeoutId = setTimeout(() => {
    stopPolling()
    refreshStatus.value = 'idle'
    refreshAllCurrentUrl.value = null
    refreshCurrentIndex.value = null
    refreshTotalCount.value = null
  }, 600_000)
}

/**
 * Déclenche l'actualisation globale de l'indexation.
 * @returns {Promise<void>} Promise résolue après déclenchement.
 */
async function startRefresh(): Promise<void> {
  try {
    await $fetch('/api/indexing-status/refresh', { method: 'POST' })
    refreshStatus.value = 'running'
    startPolling()
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Erreur lors de l'actualisation."
  }
}

/**
 * Annule l'actualisation globale côté serveur et UI.
 * @returns {Promise<void>} Promise résolue après annulation.
 */
async function cancelRefresh(): Promise<void> {
  try {
    await $fetch('/api/indexing-status/refresh-cancel', { method: 'POST' })
    stopPolling()
    refreshStatus.value = 'idle'
    refreshAllCurrentUrl.value = null
    refreshCurrentIndex.value = null
    refreshTotalCount.value = null
    const cache: Ref<IndexingApiResponse | null> = useState<IndexingApiResponse | null>(CACHE_KEY)
    if (cache.value) {
      cache.value = {
        ...cache.value,
        refresh: {
          status: 'idle',
          startedAt: cache.value.refresh.startedAt,
          finishedAt: new Date().toISOString(),
        },
      }
    }
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Impossible d'annuler l'actualisation."
  }
}

/**
 * Actualise une seule URL via l'API d'inspection.
 * @param {string} url - URL à rafraîchir.
 * @returns {Promise<void>} Promise résolue une fois la ligne mise à jour.
 */
async function refreshUrl(url: string): Promise<void> {
  refreshingUrls.value = [...refreshingUrls.value, url]
  error.value = ''
  try {
    const data: { ok: boolean; item: IndexingItem } = await $fetch<{ ok: boolean; item: IndexingItem }>(
      '/api/indexing-status/refresh-url',
      {
        method: 'POST',
        body: { url },
      },
    )
    const idx: number = items.value.findIndex((r: IndexingItem) => r.url === url)
    if (idx !== -1) items.value[idx] = data.item
    const cache: Ref<IndexingApiResponse | null> = useState<IndexingApiResponse | null>(CACHE_KEY)
    if (cache.value) cache.value = { ...cache.value, items: [...items.value] }
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Erreur lors de l'actualisation de l'URL."
  } finally {
    refreshingUrls.value = refreshingUrls.value.filter((u: string) => u !== url)
  }
}

onMounted(async (): Promise<void> => {
  const cache: Ref<IndexingApiResponse | null> = useState<IndexingApiResponse | null>(CACHE_KEY)
  if (cache.value) {
    items.value = cache.value.items
    gscConnected.value = cache.value.gscConnected
    refreshStatus.value = cache.value.refresh.status
    refreshAllCurrentUrl.value = cache.value.refresh.currentUrl ?? null
    refreshCurrentIndex.value = cache.value.refresh.currentIndex ?? null
    refreshTotalCount.value = cache.value.refresh.totalCount ?? null
    loading.value = false

    if (cache.value.refresh.status === 'running') {
      try {
        const data: IndexingApiResponse = await $fetch<IndexingApiResponse>('/api/indexing-status')
        items.value = data.items
        gscConnected.value = data.gscConnected
        refreshStatus.value = data.refresh.status
        refreshAllCurrentUrl.value = data.refresh.currentUrl ?? null
        refreshCurrentIndex.value = data.refresh.currentIndex ?? null
        refreshTotalCount.value = data.refresh.totalCount ?? null
        cache.value = data

        if (data.refresh.status === 'running') {
          startPolling()
        }
      } catch {
        // garder cache
      }
    }
    return
  }
  await fetchFromApi(false)
  if (refreshStatus.value === 'running') {
    startPolling()
  }
})

onBeforeUnmount(() => {
  stopPolling()
})
</script>
