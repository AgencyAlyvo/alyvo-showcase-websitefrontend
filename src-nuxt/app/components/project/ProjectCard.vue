<script setup lang="ts">
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const props = defineProps<{
  project: Project
}>()

const { locale, t } = useI18n()
const localeRoute = useLocaleRoute()

const localeKey = computed(() => locale.value as ProjectLocale)
const translation = computed(() => props.project.translations[localeKey.value])

const detailRoute = computed(() => {
  return localeRoute({
    name: 'projects-slug',
    params: { slug: translation.value.slug },
  })
})
</script>

<template>
  <NuxtLink
    :to="detailRoute"
    class="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5"
  >
    <div class="aspect-[16/10] overflow-hidden bg-slate-100">
      <img
        :src="project.cover.src"
        :alt="project.cover.alt"
        loading="lazy"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div class="flex flex-1 flex-col gap-4 p-6">
      <div class="flex flex-wrap gap-2">
        <BaseBadge v-for="goal in project.goals" :key="goal" tone="muted">
          {{ t(`projects.filters.${goal}`) }}
        </BaseBadge>
      </div>
      <h3 class="text-xl font-semibold tracking-tight text-slate-900">
        {{ translation.title }}
      </h3>
      <p class="text-sm leading-relaxed text-slate-600">
        {{ translation.tagline }}
      </p>
      <dl class="mt-auto space-y-2 text-sm text-slate-600">
        <div class="flex gap-2">
          <dt class="w-20 shrink-0 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {{ t('projects.card.need') }}
          </dt>
          <dd>{{ translation.needSummary }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="w-20 shrink-0 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {{ t('projects.card.solution') }}
          </dt>
          <dd>{{ translation.solutionSummary }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="w-20 shrink-0 text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {{ t('projects.card.result') }}
          </dt>
          <dd class="text-slate-900">{{ translation.benefit }}</dd>
        </div>
      </dl>
      <div class="flex flex-wrap gap-1.5 pt-2 text-xs text-slate-500">
        <span v-for="tech in project.stack.slice(0, 4)" :key="tech" class="rounded-full bg-slate-100 px-2.5 py-1">
          {{ tech }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
