<template>
  <div>
    <BaseSection spacing="lg" container-size="xl" class="section-tone-tinted">
      <div class="page-copy-reveal mx-auto max-w-5xl text-center">
        <h1 class="text-highlighted text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          <span>{{ t('projects.heading.title') }}</span>
          <span class="text-primary block whitespace-normal lg:whitespace-nowrap">
            {{ t('projects.heading.accent') }}
          </span>
        </h1>
        <p class="text-muted mt-6 text-lg text-balance sm:text-xl/8">
          {{ t('projects.heading.lead') }}
        </p>
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

    <BaseSection spacing="md" container-size="xl" class="section-tone-soft">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(card, index) in cards"
          :key="card.slug"
          class="project-card border-default bg-default group relative flex flex-col overflow-hidden rounded-2xl border"
          :style="{ '--project-card-delay': `${260 + index * 95}ms` }"
        >
          <div class="project-card-media bg-muted relative overflow-hidden">
            <img
              :src="card.image"
              :alt="card.title"
              loading="lazy"
              class="project-card-image aspect-[4/3] w-full object-cover"
            />
            <div class="project-card-image-overlay" aria-hidden="true" />
          </div>

          <div class="flex flex-1 flex-col p-6">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="key in card.categories"
                :key="key"
                class="project-card-chip"
                :style="{ '--chip-accent': categoryAccent(key) }"
              >
                {{ t(`projects.categories.${key}`) }}
              </span>
            </div>

            <h2 class="text-highlighted mt-4 text-xl font-semibold tracking-tight">
              {{ card.title }}
            </h2>
            <p class="text-primary mt-1 text-sm font-medium">{{ card.descriptor }}</p>
            <p class="text-muted mt-3 text-sm leading-6">{{ card.summary }}</p>

            <div class="mt-6 flex flex-1 items-end">
              <UButton
                :label="t('projects.card.learnMore')"
                :to="`${localePath('projects')}/${card.slug}`"
                color="primary"
                variant="ghost"
                trailing-icon="i-lucide-arrow-right"
                class="project-card-cta -ml-2"
              />
            </div>
          </div>
        </article>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import enCards from '~/data/projects/en.json'
import esCards from '~/data/projects/es.json'
import frCards from '~/data/projects/fr.json'

/**
 * Card displayed on the projects listing page.
 */
interface ProjectCard {
  slug: string
  title: string
  descriptor: string
  summary: string
  image: string
  categories: string[]
}

const { locale, t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const cardsByLocale: Record<string, ProjectCard[]> = {
  fr: frCards as ProjectCard[],
  en: enCards as ProjectCard[],
  es: esCards as ProjectCard[],
}

const cards: ComputedRef<ProjectCard[]> = computed<ProjectCard[]>(
  (): ProjectCard[] => cardsByLocale[locale.value] ?? (frCards as ProjectCard[]),
)

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
 * @param {string} key - Category identifier (e.g. "web", "ai").
 * @returns {string} RGB triplet string ("R G B").
 */
function categoryAccent(key: string): string {
  return categoryAccents[key] ?? '14 165 233'
}

usePageSeo({
  title: t('seo.projects.title'),
  description: t('seo.projects.description'),
})
</script>

<style scoped>
.page-copy-reveal {
  animation: page-copy-in 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.page-copy-reveal > * {
  animation: page-copy-item-in 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.page-copy-reveal > :nth-child(2) {
  animation-delay: 110ms;
}

.page-copy-reveal > :nth-child(3) {
  animation-delay: 220ms;
}

.project-card {
  isolation: isolate;
  animation: project-card-enter 620ms cubic-bezier(0.22, 1, 0.36, 1) var(--project-card-delay, 260ms) both;
  transition:
    transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 240ms ease,
    box-shadow 240ms ease;
}

.project-card::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: '';
  background: radial-gradient(
    circle at 50% 0%,
    rgb(var(--ui-primary, 14 165 233) / 0.08),
    transparent 55%
  );
  opacity: 0;
  transition: opacity 320ms ease;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: rgb(var(--ui-primary, 14 165 233) / 0.35);
  box-shadow:
    0 24px 60px rgb(15 23 42 / 0.16),
    0 0 0 1px rgb(var(--ui-primary, 14 165 233) / 0.08);
}

.project-card:hover::before {
  opacity: 1;
}

.project-card-media {
  position: relative;
}

.project-card-image {
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card:hover .project-card-image {
  transform: scale(1.06);
}

.project-card-image-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 55%, rgb(0 0 0 / 0.18) 100%);
  opacity: 0.65;
  transition: opacity 320ms ease;
}

.project-card:hover .project-card-image-overlay {
  opacity: 0.4;
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

:deep(.project-card-cta) {
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 220ms ease;
}

:deep(.project-card-cta:hover [class*='i-lucide-arrow-right']),
.project-card:hover :deep(.project-card-cta [class*='i-lucide-arrow-right']) {
  transform: translateX(4px);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes project-card-enter {
  from {
    opacity: 0;
    transform: translate3d(0, 22px, 0) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes page-copy-in {
  from {
    opacity: 0;
    transform: translate3d(-52px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes page-copy-item-in {
  from {
    opacity: 0;
    transform: translate3d(-28px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-copy-reveal,
  .page-copy-reveal > *,
  .project-card,
  .project-card::before,
  .project-card-image,
  .project-card-image-overlay,
  .project-card:hover,
  .project-card:hover .project-card-image,
  :deep(.project-card-cta),
  :deep(.project-card-cta [class*='i-lucide-arrow-right']) {
    animation: none;
    transform: none;
    transition: none;
  }
}
</style>
