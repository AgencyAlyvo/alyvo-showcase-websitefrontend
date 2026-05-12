<template>
  <BaseSection spacing="lg" container-size="xl">
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

    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(card, index) in cards"
        :key="card.title"
        class="project-card border-default bg-default group overflow-hidden rounded-lg border"
        :style="{ '--project-card-delay': `${260 + index * 95}ms` }"
      >
        <div class="bg-muted overflow-hidden">
          <img
            :src="card.image"
            :alt="card.title"
            class="aspect-[4/3] w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div class="p-5">
          <h2 class="text-highlighted text-xl font-semibold tracking-tight">
            {{ card.title }}
          </h2>
        </div>
      </article>
    </div>
  </BaseSection>
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
  title: string
  image: string
}

const { locale, t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const cardsByLocale: Record<string, ProjectCard[]> = {
  fr: frCards,
  en: enCards,
  es: esCards,
}

const cards: ComputedRef<ProjectCard[]> = computed<ProjectCard[]>(() => cardsByLocale[locale.value] ?? frCards)

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
  animation: project-card-enter 620ms cubic-bezier(0.22, 1, 0.36, 1) var(--project-card-delay, 260ms) both;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgb(15 23 42 / 0.12);
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
  .project-card:hover {
    animation: none;
    transform: none;
    transition: none;
  }
}
</style>
