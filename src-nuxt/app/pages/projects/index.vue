<script setup lang="ts">
import type { ProjectGoal } from '#src-nuxt/shared/types/project'

const { t } = useI18n()

usePageSeo({
  title: t('seo.projects.title'),
  description: t('seo.projects.description'),
})

const { data: projects } = await useProjects()

if (import.meta.prerender && projects.value) {
  prerenderRoutes(buildPrerenderRoutes(projects.value))
}

const goals: Array<'all' | ProjectGoal> = ['all', 'visibility', 'conversion', 'time', 'automation', 'tool', 'launch']

const activeGoal = ref<'all' | ProjectGoal>('all')

const filteredProjects = computed(() => {
  const list = projects.value ?? []
  if (activeGoal.value === 'all') return list
  return list.filter((project) => project.goals.includes(activeGoal.value as ProjectGoal))
})

const demonstrateItems = ['understand', 'adapt', 'experience', 'performance', 'maintain'] as const
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-white via-slate-50 to-white">
      <BaseContainer size="xl" class="py-20 sm:py-28">
        <div class="mx-auto max-w-3xl text-center">
          <BaseBadge>{{ t('projects.hero.eyebrow') }}</BaseBadge>
          <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {{ t('projects.hero.title') }}
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-slate-600">
            {{ t('projects.hero.lead') }}
          </p>
        </div>
      </BaseContainer>
    </section>

    <BaseSection container-size="xl">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 class="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          {{ t('projects.filters.title') }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="goal in goals"
            :key="goal"
            type="button"
            :class="[
              'rounded-full px-4 py-2 text-sm font-medium transition',
              activeGoal === goal
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50',
            ]"
            @click="activeGoal = goal"
          >
            {{ t(`projects.filters.${goal}`) }}
          </button>
        </div>
      </div>

      <div class="mt-12">
        <ProjectProjectGrid :projects="filteredProjects" />
      </div>
    </BaseSection>

    <BaseSection tone="muted" container-size="lg">
      <div class="mx-auto max-w-2xl text-center">
        <BaseBadge>{{ t('projects.demonstrate.eyebrow') }}</BaseBadge>
        <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {{ t('projects.demonstrate.title') }}
        </h2>
      </div>
      <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <li
          v-for="key in demonstrateItems"
          :key="key"
          class="rounded-2xl bg-white p-5 text-sm font-medium text-slate-800 ring-1 ring-slate-200"
        >
          {{ t(`projects.demonstrate.items.${key}`) }}
        </li>
      </ul>
    </BaseSection>

    <SectionsFinalCtaSection :title="t('projects.cta.title')" :lead="t('projects.cta.lead')" />
  </div>
</template>
