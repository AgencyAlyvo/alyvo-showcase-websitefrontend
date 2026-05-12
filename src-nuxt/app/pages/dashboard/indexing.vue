<template>
  <div class="flex min-w-0 flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
    <div class="min-w-0">
      <h1 class="text-highlighted text-2xl font-semibold">Indexation Google</h1>
      <p class="text-default mt-1">
        Liste des URLs du sitemap et statut d'indexation dans Google Search Console. Les données sont lues depuis le
        cache ; utilise « Actualiser » pour mettre à jour.
      </p>
    </div>

    <UAlert v-if="error" color="error" variant="subtle" :description="error" />

    <div class="flex w-full flex-col gap-4">
      <div class="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="w-full min-w-0 md:max-w-[220px]">
          <BaseSelect v-model="selectedVerdict" label="Verdict" :options="verdictOptions" />
        </div>

        <div class="w-full min-w-0 md:max-w-md">
          <UFormField label="Recherche" :ui="{ label: 'text-highlighted' }">
            <UInput
              v-model="searchText"
              icon="i-lucide-search"
              placeholder="URL, statut ou verdict..."
              size="xl"
              color="neutral"
              variant="outline"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>

      <div class="flex w-full flex-wrap items-center gap-3">
        <BaseButton :disabled="loading || refreshStatus === 'running'" @click="startRefresh">
          <UIcon v-if="refreshStatus === 'running'" name="i-lucide-loader-2" class="mr-2 size-4 animate-spin" />
          {{
            refreshStatus === 'running' && refreshCurrentIndex != null && refreshTotalCount != null
              ? `Mise à jour ${refreshCurrentIndex}/${refreshTotalCount}`
              : refreshStatus === 'running'
                ? 'Mise à jour...'
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
      Chargement...
    </div>

    <div
      v-else-if="filteredItems.length === 0"
      class="bg-elevated border-default text-default rounded-xl border p-8 text-center"
    >
      {{ items.length === 0 ? 'Aucune URL dans le sitemap.' : 'Aucun résultat pour les filtres choisis.' }}
    </div>

    <div v-else class="w-full min-w-0">
      <p class="text-default mb-3 text-sm font-medium">
        {{ filteredItems.length === 1 ? '1 résultat' : `${filteredItems.length} résultats` }}
      </p>

      <div class="border-default bg-elevated overflow-x-auto rounded-lg border">
        <table class="w-full min-w-[980px] text-left text-sm">
          <thead class="border-default bg-muted/50 text-muted border-b text-xs font-semibold uppercase">
            <tr>
              <th class="px-4 py-3">URL</th>
              <th class="px-4 py-3">Statut</th>
              <th class="px-4 py-3">Verdict</th>
              <th class="px-4 py-3">Signal</th>
              <th class="px-4 py-3">Dernière exploration</th>
              <th class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-default divide-y">
            <tr v-for="item in filteredItems" :key="item.url" class="hover:bg-muted/30">
              <td class="max-w-[360px] px-4 py-3 align-top">
                <div class="flex min-w-0 items-start gap-2">
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
                    class="text-primary min-w-0 break-all hover:underline"
                  >
                    {{ item.url }}
                  </a>
                </div>
              </td>

              <td class="max-w-[300px] px-4 py-3 align-top">
                <span v-if="item.coverageState" class="text-default">
                  {{ item.coverageState }}
                </span>
                <span v-else class="text-muted">-</span>
                <span
                  v-if="item.googleCanonical && item.coverageState?.toLowerCase().includes('redirection')"
                  class="text-muted mt-1 block text-xs break-all"
                >
                  Canonique Google : {{ item.googleCanonical }}
                </span>
              </td>

              <td class="px-4 py-3 align-top">
                <span
                  v-if="item.verdict"
                  class="rounded-full px-2 py-0.5 text-xs font-medium"
                  :class="getVerdictBadgeClass(item.verdict)"
                >
                  {{ item.verdict }}
                </span>
                <span v-else class="text-muted">-</span>
              </td>

              <td class="px-4 py-3 align-top">
                <span class="rounded px-2 py-0.5 text-xs font-medium" :class="getSignalBadgeClass(item)">
                  {{ getSignalLabel(item) }}
                </span>
              </td>

              <td class="px-4 py-3 align-top whitespace-nowrap">
                {{ formatLastCrawl(item.lastCrawlTime) }}
              </td>

              <td class="px-4 py-3 align-top">
                <div class="flex justify-end gap-2">
                  <BaseButton
                    v-if="gscConnected"
                    size="sm"
                    :disabled="isItemRefreshing(item.url)"
                    @click="refreshUrl(item.url)"
                  >
                    <UIcon
                      v-if="isItemRefreshing(item.url)"
                      name="i-lucide-loader-2"
                      class="mr-1.5 size-3.5 animate-spin"
                    />
                    {{ isItemRefreshing(item.url) ? 'Actualisation...' : 'Actualiser' }}
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="!gscConnected && !loading" class="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
      <p class="text-sm text-amber-700 dark:text-amber-200">
        Configure Google Search Console pour afficher le statut. Ajoute
        <code class="bg-muted rounded px-1">GOOGLE_CLIENT_ID</code>,
        <code class="bg-muted rounded px-1">GOOGLE_CLIENT_SECRET</code> et
        <code class="bg-muted rounded px-1">GSC_REFRESH_TOKEN</code> dans ton fichier
        <code class="bg-muted rounded px-1">.env</code>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable jsdoc/require-jsdoc, eslint-plugin-jsdoc/require-jsdoc */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Indexation Google - Dashboard',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

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

type SelectOption = { label: string; value: string }

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
const selectedVerdict: Ref<string> = ref('')

const verdictOptions: SelectOption[] = [
  { label: 'Tous les verdicts', value: '' },
  { label: 'PASS', value: 'PASS' },
  { label: 'NEUTRAL', value: 'NEUTRAL' },
  { label: 'FAIL', value: 'FAIL' },
]

const filteredItems: ComputedRef<IndexingItem[]> = computed((): IndexingItem[] => {
  let list: IndexingItem[] = items.value
  const verdict: string = selectedVerdict.value
  const query: string = searchText.value.trim().toLowerCase()

  if (verdict) list = list.filter((row: IndexingItem) => row.verdict === verdict)
  if (query) {
    list = list.filter((row: IndexingItem): boolean => {
      const signal: string = getSignalLabel(row).toLowerCase()
      return (
        row.url.toLowerCase().includes(query) ||
        row.coverageState?.toLowerCase().includes(query) === true ||
        row.verdict?.toLowerCase().includes(query) === true ||
        signal.includes(query)
      )
    })
  }

  return list
})

function gscConsoleUrl(link: string): string {
  if (!link) return 'https://search.google.com/u/1/search-console'
  if (link.includes('search.google.com/u/1/')) return link
  return link.replace(/search\.google\.com\/(?!u\/1)/, 'search.google.com/u/1/')
}

function isItemRefreshing(url: string): boolean {
  return refreshingUrls.value.includes(url) || (refreshStatus.value === 'running' && refreshAllCurrentUrl.value === url)
}

function formatLastCrawl(iso?: string): string {
  if (!iso) return '-'
  const date: Date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getSignalLabel(item: IndexingItem): string {
  if (item.verdict === 'PASS') return 'Indexée'
  if (item.verdict === 'FAIL') return 'Erreur ou bloquée'
  if (item.verdict === 'NEUTRAL') return item.coverageState?.trim() || 'À vérifier'
  return item.coverageState?.trim() || 'À vérifier'
}

function getSignalBadgeClass(item: IndexingItem): string {
  if (item.verdict === 'PASS') return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
  if (item.verdict === 'FAIL') return 'bg-red-500/15 text-red-700 dark:text-red-300'
  if (item.verdict === 'NEUTRAL') return 'bg-amber-500/20 text-amber-800 dark:text-amber-200'
  return 'bg-muted text-muted'
}

function getVerdictBadgeClass(verdict: string): string {
  if (verdict === 'PASS') return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
  if (verdict === 'FAIL') return 'bg-red-500/15 text-red-700 dark:text-red-300'
  if (verdict === 'NEUTRAL') return 'bg-amber-500/20 text-amber-800 dark:text-amber-200'
  return 'bg-muted text-muted'
}

function openInNewTab(url: string): void {
  if (import.meta.client) window.open(url, '_blank', 'noopener,noreferrer')
}

async function copyToClipboard(value: string): Promise<void> {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(value)
    copiedUrl.value = value
    setTimeout(() => {
      if (copiedUrl.value === value) copiedUrl.value = null
    }, 1500)
  } catch {
    // ignore clipboard errors
  }
}

function applyResponse(data: IndexingApiResponse): void {
  items.value = data.items
  gscConnected.value = data.gscConnected
  refreshStatus.value = data.refresh.status
  refreshAllCurrentUrl.value = data.refresh.currentUrl ?? null
  refreshCurrentIndex.value = data.refresh.currentIndex ?? null
  refreshTotalCount.value = data.refresh.totalCount ?? null
  useState<IndexingApiResponse | null>(CACHE_KEY).value = data
}

async function fetchFromApi(): Promise<void> {
  loading.value = true
  error.value = ''
  try {
    const data: IndexingApiResponse = await $fetch<IndexingApiResponse>('/api/indexing-status')
    applyResponse(data)
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Erreur lors du chargement.'
    items.value = []
  } finally {
    loading.value = false
  }
}

let pollIntervalId: ReturnType<typeof setInterval> | null = null
let pollTimeoutId: ReturnType<typeof setTimeout> | null = null

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

function startPolling(): void {
  stopPolling()

  pollIntervalId = setInterval((): void => {
    void (async (): Promise<void> => {
      const data: IndexingApiResponse = await $fetch<IndexingApiResponse>('/api/indexing-status')
      applyResponse(data)

      if (data.refresh.status !== 'running') {
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

async function startRefresh(): Promise<void> {
  try {
    await $fetch('/api/indexing-status/refresh', { method: 'POST' })
    refreshStatus.value = 'running'
    startPolling()
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Erreur lors de l'actualisation."
  }
}

async function cancelRefresh(): Promise<void> {
  try {
    await $fetch('/api/indexing-status/refresh-cancel', { method: 'POST' })
    stopPolling()
    refreshStatus.value = 'idle'
    refreshAllCurrentUrl.value = null
    refreshCurrentIndex.value = null
    refreshTotalCount.value = null
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Impossible d'annuler l'actualisation."
  }
}

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
    const index: number = items.value.findIndex((row: IndexingItem) => row.url === url)
    if (index !== -1) items.value[index] = data.item
    useState<IndexingApiResponse | null>(CACHE_KEY).value = {
      items: [...items.value],
      gscConnected: gscConnected.value,
      refresh: {
        status: refreshStatus.value,
        currentUrl: refreshAllCurrentUrl.value ?? undefined,
        currentIndex: refreshCurrentIndex.value ?? undefined,
        totalCount: refreshTotalCount.value ?? undefined,
      },
    }
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Erreur lors de l'actualisation de l'URL."
  } finally {
    refreshingUrls.value = refreshingUrls.value.filter((currentUrl: string) => currentUrl !== url)
  }
}

onMounted(async (): Promise<void> => {
  await fetchFromApi()
  if (refreshStatus.value === 'running') {
    startPolling()
  }
})

onBeforeUnmount(() => {
  stopPolling()
})
</script>
