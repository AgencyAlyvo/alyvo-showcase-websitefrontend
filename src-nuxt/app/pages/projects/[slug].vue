<template>
  <div v-if="project">
    <BaseSection spacing="lg" container-size="xl" class="section-tone-tinted">
      <div class="project-hero mx-auto max-w-5xl">
        <UButton
          :label="t('project.hero.back')"
          :to="localePath('projects')"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          size="sm"
          class="project-hero-back"
        />

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="key in project.categories"
            :key="key"
            class="project-card-chip"
            :style="{ '--chip-accent': categoryAccent(key) }"
          >
            {{ t(`projects.categories.${key}`) }}
          </span>
        </div>

        <h1 class="text-highlighted mt-5 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ project.title }}
        </h1>
        <p class="text-primary mt-3 text-base font-medium sm:text-lg">{{ project.descriptor }}</p>
        <p class="text-muted mt-6 text-lg leading-7 text-balance sm:text-xl/8">
          {{ project.details.tagline }}
        </p>

        <div
          v-if="project.details.cover"
          class="project-hero-media border-default mt-10 overflow-hidden rounded-2xl border"
        >
          <video
            v-if="isVideoCover"
            :src="project.details.cover"
            class="aspect-video w-full object-cover"
            autoplay
            loop
            muted
            playsinline
          />
          <img v-else :src="project.details.cover" :alt="project.title" class="aspect-video w-full object-cover" />
        </div>
      </div>
    </BaseSection>

    <BaseSection spacing="md" container-size="xl" class="section-tone-soft">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-highlighted text-3xl font-semibold tracking-tight">
          {{ t('project.sections.need.title') }}
        </h2>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div
            v-for="(item, index) in needBlocks"
            :key="item.label"
            class="need-card border-default bg-default rounded-xl border p-5"
            :style="{ '--card-accent': needAccents[index] }"
          >
            <p class="accent-label text-xs font-semibold tracking-normal uppercase">
              {{ item.label }}
            </p>
            <p class="text-default mt-3 text-sm leading-6">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </BaseSection>

    <BaseSection spacing="md" container-size="xl" class="section-tone-pattern">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-highlighted text-3xl font-semibold tracking-tight">
          {{ t('project.sections.stakes.title') }}
        </h2>
        <ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="stake in project.details.stakes"
            :key="stake"
            class="stake-card border-default bg-default flex items-start gap-3 rounded-xl border p-5"
          >
            <span
              class="text-primary bg-primary/10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full"
            >
              <UIcon name="i-lucide-target" class="size-4" />
            </span>
            <p class="text-default text-sm leading-6">{{ stake }}</p>
          </li>
        </ul>
      </div>
    </BaseSection>

    <BaseSection spacing="md" container-size="xl" class="section-tone-soft">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-highlighted text-3xl font-semibold tracking-tight">
          {{ t('project.sections.solution.title') }}
        </h2>
        <div class="mt-8 grid gap-4 lg:grid-cols-3">
          <div
            v-for="(item, index) in solutionBlocks"
            :key="item.label"
            class="solution-card border-default bg-default overflow-hidden rounded-xl border"
            :style="{ '--card-accent': solutionAccents[index] }"
          >
            <div class="accent-bar h-1 w-full" />
            <div class="p-6">
              <p class="accent-label text-xs font-semibold tracking-normal uppercase">
                {{ item.label }}
              </p>
              <p class="text-default mt-3 text-sm leading-6">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </BaseSection>

    <BaseSection spacing="md" container-size="xl" class="section-tone-deep">
      <div class="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
        <div>
          <h2 class="text-highlighted text-3xl font-semibold tracking-tight">
            {{ t('project.sections.features.title') }}
          </h2>
          <ul class="mt-6 space-y-3">
            <li v-for="feature in project.details.features" :key="feature" class="flex items-start gap-3">
              <span class="text-primary mt-1">
                <UIcon name="i-lucide-check-circle-2" class="size-5" />
              </span>
              <p class="text-default text-sm leading-6">{{ feature }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-highlighted text-3xl font-semibold tracking-tight">
            {{ t('project.sections.results.title') }}
          </h2>
          <ul class="mt-6 space-y-3">
            <li
              v-for="result in project.details.results"
              :key="result"
              class="result-card border-default bg-default flex items-start gap-3 rounded-lg border p-4"
            >
              <span
                class="text-primary bg-primary/10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full"
              >
                <UIcon name="i-lucide-trending-up" class="size-4" />
              </span>
              <p class="text-default text-sm leading-6">{{ result }}</p>
            </li>
          </ul>
        </div>
      </div>
    </BaseSection>

    <BaseSection spacing="md" container-size="xl" class="section-tone-violet">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-highlighted text-3xl font-semibold tracking-tight">
          {{ t('project.sections.stack.title') }}
        </h2>
        <p class="text-muted mt-3 text-base leading-6">{{ t('project.sections.stack.lead') }}</p>
        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tech in project.details.stack"
            :key="tech"
            class="stack-chip border-default bg-default rounded-full border px-3 py-1 text-sm font-medium"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </BaseSection>

    <BaseSection spacing="md" container-size="xl" class="section-tone-tinted">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-highlighted text-3xl font-semibold tracking-tight sm:text-4xl">
          {{ t('project.sections.cta.title') }}
        </h2>
        <p class="text-muted mt-4 text-base sm:text-lg">{{ t('project.sections.cta.lead') }}</p>
        <div class="mt-8 flex justify-center">
          <UButton
            :label="t('home.hero.ctaPrimary')"
            :to="localePath('contact')"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
          />
        </div>
      </div>
    </BaseSection>
  </div>

  <div v-else>
    <BaseSection spacing="lg" container-size="md" class="section-tone-tinted">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-highlighted text-4xl font-bold tracking-tight sm:text-5xl">
          {{ t('project.notFound.title') }}
        </h1>
        <p class="text-muted mt-4 text-base sm:text-lg">{{ t('project.notFound.description') }}</p>
        <div class="mt-8 flex justify-center">
          <UButton
            :label="t('project.notFound.back')"
            :to="localePath('projects')"
            color="primary"
            variant="solid"
            icon="i-lucide-arrow-left"
          />
        </div>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import enCards from '~/data/projects/en.json'
import esCards from '~/data/projects/es.json'
import frCards from '~/data/projects/fr.json'

/** Localised need block. */
type ProjectNeed = {
  context: string
  problem: string
  objective: string
}

/** Localised solution block. */
type ProjectSolution = {
  what: string
  why: string
  how: string
}

/** Full set of fields for the project detail page. */
type ProjectDetails = {
  tagline: string
  cover?: string
  need: ProjectNeed
  solution: ProjectSolution
  stakes: string[]
  features: string[]
  results: string[]
  stack: string[]
}

/** Project entry including the detail payload used by this page. */
interface ProjectEntry {
  slug: string
  title: string
  descriptor: string
  summary: string
  image: string
  categories: string[]
  details: ProjectDetails
}

const route: ReturnType<typeof useRoute> = useRoute()
const { locale, t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const cardsByLocale: Record<string, ProjectEntry[]> = {
  fr: frCards as ProjectEntry[],
  en: enCards as ProjectEntry[],
  es: esCards as ProjectEntry[],
}

const project: ComputedRef<ProjectEntry | undefined> = computed((): ProjectEntry | undefined => {
  const rawSlug: string | string[] = route.params.slug as string | string[]
  const slug: string = Array.isArray(rawSlug) ? (rawSlug[0] ?? '') : rawSlug

  if (!slug) {
    return undefined
  }

  const primary: ProjectEntry[] = cardsByLocale[locale.value] ?? (frCards as ProjectEntry[])
  const match: ProjectEntry | undefined = primary.find((entry: ProjectEntry): boolean => entry.slug === slug)

  if (match) {
    return match
  }

  for (const list of Object.values(cardsByLocale)) {
    const found: ProjectEntry | undefined = list.find((entry: ProjectEntry): boolean => entry.slug === slug)

    if (found) {
      return found
    }
  }

  return undefined
})

const needBlocks: ComputedRef<{ label: string; value: string }[]> = computed(() => {
  if (!project.value) {
    return []
  }
  const { context, problem, objective } = project.value.details.need
  return [
    { label: t('project.sections.need.context'), value: context },
    { label: t('project.sections.need.problem'), value: problem },
    { label: t('project.sections.need.objective'), value: objective },
  ]
})

const solutionBlocks: ComputedRef<{ label: string; value: string }[]> = computed(() => {
  if (!project.value) {
    return []
  }
  const { what, why, how } = project.value.details.solution
  return [
    { label: t('project.sections.solution.what'), value: what },
    { label: t('project.sections.solution.why'), value: why },
    { label: t('project.sections.solution.how'), value: how },
  ]
})

const isVideoCover: ComputedRef<boolean> = computed((): boolean => {
  const src: string | undefined = project.value?.details.cover
  return Boolean(src && /\.(mp4|webm|ogg)$/i.test(src))
})

const needAccents: readonly string[] = ['14 165 233', '244 63 94', '16 185 129']
const solutionAccents: readonly string[] = ['14 165 233', '139 92 246', '245 158 11']

/** RGB triplet used as accent for each category chip. */
const categoryAccents: Record<string, string> = {
  web: '14 165 233',
  software: '16 185 129',
  mobile: '139 92 246',
  ai: '244 63 94',
  devops: '245 158 11',
  automation: '99 102 241',
  api: '20 184 166',
  saas: '14 165 233',
  data: '217 70 239',
}

/**
 * Return the accent RGB triplet for a given category key.
 * @param {string} key - Category identifier.
 * @returns {string} RGB triplet string ("R G B").
 */
function categoryAccent(key: string): string {
  return categoryAccents[key] ?? '14 165 233'
}

usePageSeo({
  title: project.value ? `${project.value.title} — ${t('projects.heading.title')}` : t('project.notFound.title'),
  description: project.value?.summary ?? t('project.notFound.description'),
})
</script>

<style scoped>
.project-hero-back {
  margin-left: -0.5rem;
}

.project-card-chip {
  --chip-accent: 14 165 233;

  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: rgb(var(--chip-accent));
  background-color: rgb(var(--chip-accent) / 0.12);
  border: 1px solid rgb(var(--chip-accent) / 0.22);
  border-radius: 9999px;
  text-transform: uppercase;
  white-space: nowrap;
}

.dark .project-card-chip {
  background-color: rgb(var(--chip-accent) / 0.18);
  border-color: rgb(var(--chip-accent) / 0.32);
}

.need-card {
  --card-accent: 14 165 233;

  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.need-card:hover {
  transform: translateY(-3px);
  border-color: rgb(var(--card-accent) / 0.4);
  box-shadow: 0 18px 45px rgb(var(--card-accent) / 0.14);
}

.solution-card {
  --card-accent: 14 165 233;

  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.solution-card:hover {
  transform: translateY(-3px);
  border-color: rgb(var(--card-accent) / 0.4);
  box-shadow: 0 18px 45px rgb(var(--card-accent) / 0.14);
}

.accent-bar {
  background: linear-gradient(
    90deg,
    rgb(var(--card-accent)) 0%,
    rgb(var(--card-accent) / 0.55) 60%,
    rgb(var(--card-accent) / 0) 100%
  );
}

.accent-label {
  color: rgb(var(--card-accent));
}

.stake-card,
.result-card {
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.stake-card:hover,
.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgb(15 23 42 / 0.08);
}

.stack-chip {
  transition:
    background-color 220ms ease,
    border-color 220ms ease,
    color 220ms ease;
}

.stack-chip:hover {
  border-color: rgb(var(--ui-primary, 14 165 233) / 0.5);
  color: rgb(var(--ui-primary, 14 165 233));
}

.project-hero-media {
  box-shadow: 0 30px 70px rgb(15 23 42 / 0.12);
}
</style>
