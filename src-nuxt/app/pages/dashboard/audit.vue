<template>
  <div class="flex min-w-0 flex-1 flex-col overflow-x-hidden px-4 py-8 sm:px-6 sm:py-12">
    <!-- Vue liste des pages -->
    <template v-if="!reportUrlParam">
      <header class="mb-8">
        <h1 class="text-highlighted text-2xl font-semibold">Audit SEO &amp; Performance</h1>
        <p class="text-default mt-2">
          Cliquez sur une page pour ouvrir son rapport Lighthouse (SEO, performance, accessibilité, bonnes pratiques).
          Le rapport se charge automatiquement.
        </p>
      </header>

      <UAlert v-if="error" color="error" variant="subtle" :description="error" class="mb-4" />

      <div class="flex min-w-0 flex-col gap-4">
        <div class="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="w-full min-w-0 flex-1 sm:max-w-md">
            <UInput
              v-model="searchText"
              icon="i-lucide-search"
              placeholder="Titre ou URL…"
              size="xl"
              color="neutral"
              variant="outline"
              class="w-full"
            />
          </div>
          <BaseButton class="w-full sm:w-auto" :disabled="loading" @click="fetchPages(true)">
            <UIcon v-if="loading" name="i-lucide-loader-2" class="mr-2 inline-block size-4 animate-spin" />
            {{ loading ? 'Chargement…' : 'Actualiser la liste' }}
          </BaseButton>
        </div>

        <div v-if="loading && items.length === 0" class="text-default flex items-center gap-2">
          <UIcon name="i-lucide-loader-2" class="size-5 animate-spin" />
          Chargement…
        </div>

        <div
          v-else-if="filteredItems.length === 0"
          class="bg-elevated border-default text-default rounded-xl border p-8 text-center"
        >
          {{ items.length === 0 ? 'Aucune page (vérifiez le sitemap).' : 'Aucun résultat pour la recherche.' }}
        </div>

        <ul v-else class="flex w-full min-w-0 flex-col gap-3">
          <li v-for="item in filteredItems" :key="item.url" class="w-full min-w-0">
            <NuxtLink
              :to="listItemToQuery(item.url)"
              class="group bg-elevated border-default hover:border-primary hover:bg-accented flex w-full min-w-0 items-center justify-between gap-3 overflow-hidden rounded-xl border px-3 py-3 transition-colors sm:px-4 sm:py-4"
            >
              <div class="min-w-0 flex-1 overflow-hidden">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span class="group-hover:text-primary text-highlighted font-medium break-words">
                    {{ item.title }}
                  </span>
                  <span class="bg-primary/10 text-primary shrink-0 rounded px-1.5 py-0.5 text-xs font-medium">
                    {{ item.type }}
                  </span>
                </div>
                <p class="text-default mt-1 text-sm break-all">{{ item.url }}</p>
              </div>
              <span class="group-hover:text-primary text-default shrink-0" aria-hidden="true">
                <UIcon name="i-lucide-chevron-right" class="size-5" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>

    <!-- Vue rapport (page dédiée par URL) -->
    <template v-else>
      <div class="mx-auto w-full max-w-4xl min-w-0">
        <NuxtLink
          to="/dashboard/audit"
          class="text-default hover:text-highlighted mb-4 inline-flex items-center gap-2 text-sm transition-colors sm:mb-6"
        >
          <UIcon name="i-lucide-arrow-left" class="size-4 shrink-0" />
          <span class="break-words">Retour à la liste des pages</span>
        </NuxtLink>

        <div v-if="reportLoading" class="flex flex-col items-center justify-center gap-4 py-12 text-center sm:py-20">
          <UIcon name="i-lucide-loader-2" class="text-primary size-12 animate-spin" />
          <p class="text-default max-w-sm text-sm sm:text-base">
            Analyse Lighthouse en cours (mobile + desktop)… 20–60 secondes.
          </p>
        </div>

        <UAlert v-else-if="reportError" color="error" variant="subtle" :description="reportError" />

        <template v-else-if="report !== null">
          <header class="mb-6 sm:mb-8">
            <h1 class="text-highlighted text-xl font-semibold sm:text-2xl">Rapport d'audit</h1>
            <p class="text-default mt-2 text-sm break-all sm:text-base">{{ report.finalUrl }}</p>
          </header>

          <!-- Onglets Mobile / Desktop -->
          <nav
            class="bg-elevated border-default mb-6 flex flex-col gap-2 rounded-xl border p-2 sm:mb-8 sm:flex-row sm:gap-2 sm:p-1"
            aria-label="Stratégie d'analyse"
          >
            <button
              type="button"
              class="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              :class="
                auditTab === 'mobile'
                  ? 'bg-primary text-inverted'
                  : 'text-default hover:bg-accented hover:text-highlighted'
              "
              @click="auditTab = 'mobile'"
            >
              <UIcon name="i-lucide-smartphone" class="size-4 shrink-0" />
              Mobile
            </button>
            <button
              type="button"
              class="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              :class="
                auditTab === 'desktop'
                  ? 'bg-primary text-inverted'
                  : 'text-default hover:bg-accented hover:text-highlighted'
              "
              @click="auditTab = 'desktop'"
            >
              <UIcon name="i-lucide-monitor" class="size-4 shrink-0" />
              <span class="sm:hidden">Desktop</span>
              <span class="hidden sm:inline">Bureau (desktop)</span>
            </button>
          </nav>

          <template v-if="currentStrategyReport">
            <p class="text-default mb-4 text-sm sm:mb-6">
              {{ auditTab === 'mobile' ? 'Analyse mobile' : 'Analyse bureau' }} ·
              {{ formatFetchTime(currentStrategyReport.fetchTime) }}
            </p>

            <UAlert
              v-if="currentStrategyReport.runtimeError"
              color="error"
              variant="subtle"
              :description="currentStrategyReport.runtimeError"
              class="mb-6 sm:mb-8"
            />

            <template v-else>
              <!-- Scores Lighthouse -->
              <section class="mb-8 sm:mb-12" aria-labelledby="scores-heading">
                <h2 id="scores-heading" class="text-highlighted mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
                  Scores Lighthouse
                </h2>
                <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
                  <div
                    v-for="cat in currentStrategyReport.categories"
                    :key="cat.id"
                    class="bg-elevated border-default rounded-xl border p-4 text-center shadow-sm sm:rounded-2xl sm:p-6"
                  >
                    <div
                      class="mx-auto mb-3 flex size-20 items-center justify-center rounded-full text-2xl font-bold tabular-nums sm:mb-4 sm:size-24 sm:text-3xl"
                      :class="scoreRingClass(cat.score)"
                    >
                      {{ scoreLabel(cat.score) }}
                    </div>
                    <p class="text-default text-xs font-semibold tracking-wider uppercase">
                      {{ categoryLabel(cat.id) }}
                    </p>
                    <p class="text-default mt-1 line-clamp-2 text-xs sm:text-sm">{{ cat.title }}</p>
                  </div>
                </div>
              </section>

              <!-- Bandeau rapport complet PageSpeed -->
              <section
                class="border-primary/40 bg-primary/5 mb-8 rounded-xl border-2 p-4 sm:mb-10 sm:rounded-2xl sm:p-6"
                aria-labelledby="full-report-heading"
              >
                <h2 id="full-report-heading" class="text-highlighted text-base font-semibold sm:text-lg">
                  Rapport complet (screenshot, tous les détails)
                </h2>
                <p class="text-default mt-2 text-sm">
                  Pour la capture d'écran, les métriques détaillées et l'ensemble des recommandations, ouvrez le rapport
                  officiel PageSpeed Insights ({{ auditTab === 'mobile' ? 'mobile' : 'bureau' }}).
                </p>
                <UButton
                  :to="currentPageSpeedReportUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  size="lg"
                  trailing-icon="i-lucide-arrow-right"
                  class="mt-4 rounded-xl"
                  block
                >
                  Ouvrir sur PageSpeed Insights
                </UButton>
              </section>

              <!-- Capture d'écran -->
              <section
                v-if="currentStrategyReport.screenshotDataUrl"
                class="mb-8 sm:mb-10"
                aria-labelledby="screenshot-heading"
              >
                <h2 id="screenshot-heading" class="text-highlighted mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
                  Aperçu de la page
                </h2>
                <div class="bg-muted border-default overflow-hidden rounded-xl border shadow-sm">
                  <img
                    :src="currentStrategyReport.screenshotDataUrl"
                    :alt="auditTab === 'mobile' ? 'Capture d\'écran mobile' : 'Capture d\'écran bureau'"
                    class="block max-h-[280px] w-full max-w-full object-contain sm:max-h-[400px] lg:max-h-[480px]"
                  />
                </div>
              </section>

              <!-- Audits détaillés -->
              <section v-if="currentStrategyReport.audits.length > 0" aria-labelledby="audits-heading">
                <h2 id="audits-heading" class="text-highlighted mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
                  Détail des audits
                </h2>
                <ul class="flex flex-col gap-3">
                  <li
                    v-for="audit in currentStrategyReport.audits"
                    :key="audit.id"
                    class="bg-elevated border-default flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-start sm:justify-between sm:p-4"
                  >
                    <div class="min-w-0 flex-1">
                      <h3 class="text-highlighted text-sm font-medium sm:text-base">{{ audit.title }}</h3>
                      <p
                        v-if="audit.description"
                        class="text-default mt-1 text-xs sm:text-sm"
                        v-html="audit.description"
                      />
                      <span v-if="audit.displayValue" class="text-default mt-1 block text-xs">
                        {{ audit.displayValue }}
                      </span>
                    </div>
                    <span
                      class="w-fit shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium"
                      :class="auditScoreClass(audit.score)"
                    >
                      {{ auditScoreLabel(audit.score) }}
                    </span>
                  </li>
                </ul>
              </section>
            </template>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type {
  LighthouseReportResponse,
  LighthouseStrategyReport,
  LighthouseCategoryId,
} from '~~/server/types/lighthouse'

definePageMeta({
  layout: 'dashboard',
})

const route: ReturnType<typeof useRoute> = useRoute()

const reportUrlParam: ComputedRef<string | null> = computed((): string | null => {
  const url: unknown = route.query.url
  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : null
})

useHead({
  title: computed((): string =>
    reportUrlParam.value ? `Audit — ${reportUrlParam.value}` : 'Audit SEO & Performance — Dashboard',
  ),
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

/**
 *
 */
type SitemapPageItem = {
  url: string
  title: string
  type: string
}

/**
 *
 */
type SitemapPagesResponse = {
  items: SitemapPageItem[]
}

const items: Ref<SitemapPageItem[]> = ref([])
const loading: Ref<boolean> = ref(true)
const error: Ref<string> = ref('')
const searchText: Ref<string> = ref('')
const report: Ref<LighthouseReportResponse | null> = ref(null)
const reportLoading: Ref<boolean> = ref(false)
const reportError: Ref<string> = ref('')
const auditTab: Ref<'mobile' | 'desktop'> = ref('mobile')

const currentStrategyReport: ComputedRef<LighthouseStrategyReport | null> = computed(
  (): LighthouseStrategyReport | null => {
    const r: LighthouseReportResponse | null = report.value
    if (r === null) return null
    return auditTab.value === 'mobile' ? r.mobile : r.desktop
  },
)

const currentPageSpeedReportUrl: ComputedRef<string> = computed((): string => {
  if (report.value === null) return 'https://pagespeed.web.dev/'
  const url: string = encodeURIComponent(report.value.finalUrl)
  const formFactor: string = auditTab.value === 'mobile' ? 'mobile' : 'desktop'
  return `https://pagespeed.web.dev/analysis?url=${url}&form_factor=${formFactor}`
})

const filteredItems: ComputedRef<SitemapPageItem[]> = computed((): SitemapPageItem[] => {
  const q: string = searchText.value.trim().toLowerCase()
  if (q.length === 0) return items.value
  return items.value.filter(
    (row: SitemapPageItem): boolean => row.title.toLowerCase().includes(q) || row.url.toLowerCase().includes(q),
  )
})

/**
 * Construit la route de détail d'audit pour une URL.
 * @param {string} pageUrl - URL de la page à auditer.
 * @returns {{ path: string; query: { url: string } }} Route Nuxt avec query.
 */
function listItemToQuery(pageUrl: string): { path: string; query: { url: string } } {
  return {
    path: '/dashboard/audit',
    query: { url: pageUrl },
  }
}

/**
 * Traduit un identifiant de catégorie Lighthouse en libellé UI.
 * @param {LighthouseCategoryId} id - Identifiant de catégorie Lighthouse.
 * @returns {string} Libellé affichable.
 */
function categoryLabel(id: LighthouseCategoryId): string {
  const labels: Record<LighthouseCategoryId, string> = {
    performance: 'Performance',
    accessibility: 'Accessibilité',
    'best-practices': 'Bonnes pratiques',
    seo: 'SEO',
  }
  return labels[id]
}

/**
 * Formate un score Lighthouse en pourcentage texte.
 * @param {number | null} score - Score entre 0 et 1, ou null.
 * @returns {string} Score affichable.
 */
function scoreLabel(score: number | null): string {
  if (score === null) return '—'
  return String(Math.round(score * 100))
}

/**
 * Détermine la classe visuelle du cercle de score.
 * @param {number | null} score - Score entre 0 et 1, ou null.
 * @returns {string} Classes Tailwind à appliquer.
 */
function scoreRingClass(score: number | null): string {
  if (score === null) return 'bg-muted text-default'
  const pct: number = score * 100
  if (pct >= 90) return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-500/30'
  if (pct >= 50) return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-4 ring-amber-500/30'
  return 'bg-red-500/15 text-red-600 dark:text-red-400 ring-4 ring-red-500/30'
}

/**
 * Retourne le libellé qualité d'un audit unitaire.
 * @param {number | null} score - Score entre 0 et 1, ou null.
 * @returns {string} Libellé de statut.
 */
function auditScoreLabel(score: number | null): string {
  if (score === null) return 'N/A'
  if (score >= 0.9) return 'OK'
  if (score >= 0.5) return 'À améliorer'
  return 'Échec'
}

/**
 * Retourne la classe de badge pour un score d'audit.
 * @param {number | null} score - Score entre 0 et 1, ou null.
 * @returns {string} Classes Tailwind à appliquer.
 */
function auditScoreClass(score: number | null): string {
  if (score === null) return 'bg-muted text-default'
  if (score >= 0.9) return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
  if (score >= 0.5) return 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
  return 'bg-red-500/15 text-red-600 dark:text-red-400'
}

/**
 * Formate une date ISO en date/heure locale FR.
 * @param {string} iso - Date ISO à afficher.
 * @returns {string} Date formatée, ou valeur brute en fallback.
 */
function formatFetchTime(iso: string): string {
  try {
    const d: Date = new Date(iso)
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

/**
 * Récupère la liste des pages auditables depuis l'API sitemap.
 * @param {boolean} force - Ignore le cache local quand true.
 * @returns {Promise<void>} Promise résolue quand l'état local est à jour.
 */
async function fetchPages(force: boolean = false): Promise<void> {
  const cacheKey: string = 'dashboard-audit-sitemap-pages'
  const cached: Ref<SitemapPagesResponse | null> = useState<SitemapPagesResponse | null>(cacheKey)
  const cachedData: SitemapPagesResponse | null | undefined = cached.value
  if (!force && cachedData != null && Array.isArray(cachedData.items)) {
    items.value = cachedData.items
    loading.value = false
    return
  }
  loading.value = true
  error.value = ''
  try {
    const data: SitemapPagesResponse = await $fetch<SitemapPagesResponse>('/api/dashboard/sitemap-pages')
    items.value = data.items
    cached.value = data
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Erreur lors du chargement.'
    items.value = []
  } finally {
    loading.value = false
  }
}

/**
 * Déclenche l'analyse Lighthouse pour l'URL demandée.
 * @param {string} url - URL de page à analyser.
 * @returns {Promise<void>} Promise résolue quand l'état de rapport est mis à jour.
 */
async function fetchReport(url: string): Promise<void> {
  reportLoading.value = true
  reportError.value = ''
  report.value = null
  try {
    const data: LighthouseReportResponse = await $fetch<LighthouseReportResponse>('/api/dashboard/lighthouse', {
      query: { url },
    })
    report.value = data
  } catch (e: unknown) {
    reportError.value = e instanceof Error ? e.message : "Erreur lors de l'audit."
  } finally {
    reportLoading.value = false
  }
}

onMounted((): void => {
  fetchPages(false)
  const url: string | null = reportUrlParam.value
  if (url !== null) fetchReport(url)
})

watch(reportUrlParam, (url: string | null): void => {
  if (url !== null) fetchReport(url)
  else {
    report.value = null
    reportError.value = ''
  }
})
</script>
