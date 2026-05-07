<script setup lang="ts">
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const props = defineProps<{
  project: Project
}>()

const { locale, t } = useI18n()
const translation = computed(() => props.project.translations[locale.value as ProjectLocale])
</script>

<template>
  <BaseSection container-size="lg">
    <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
      {{ t('project.sections.solution.title') }}
    </h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <div class="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h3 class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          {{ t('project.sections.solution.what') }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ translation.solutionWhat }}</p>
      </div>
      <div class="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h3 class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          {{ t('project.sections.solution.why') }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ translation.solutionWhy }}</p>
      </div>
      <div class="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
        <h3 class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          {{ t('project.sections.solution.how') }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ translation.solutionHow }}</p>
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-lg font-semibold text-slate-900">
        {{ t('project.sections.features.title') }}
      </h3>
      <div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in translation.features"
          :key="feature.title"
          class="rounded-2xl bg-white p-5 ring-1 ring-slate-200"
        >
          <h4 class="text-sm font-semibold text-slate-900">{{ feature.title }}</h4>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
