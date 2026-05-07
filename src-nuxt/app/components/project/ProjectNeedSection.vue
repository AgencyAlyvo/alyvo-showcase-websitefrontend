<script setup lang="ts">
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const props = defineProps<{
  project: Project
}>()

const { locale, t } = useI18n()
const translation = computed(() => props.project.translations[locale.value as ProjectLocale])
</script>

<template>
  <BaseSection tone="muted" container-size="lg">
    <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
      {{ t('project.sections.need.title') }}
    </h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <div class="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h3 class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          {{ t('project.sections.need.context') }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ translation.context }}</p>
      </div>
      <div class="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h3 class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          {{ t('project.sections.need.problem') }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ translation.problem }}</p>
      </div>
      <div class="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h3 class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
          {{ t('project.sections.need.objective') }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ translation.objective }}</p>
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-lg font-semibold text-slate-900">
        {{ t('project.sections.stakes.title') }}
      </h3>
      <div class="mt-4 flex flex-wrap gap-2">
        <BaseBadge v-for="stake in translation.stakes" :key="stake.key">
          {{ stake.label }}
        </BaseBadge>
      </div>
    </div>
  </BaseSection>
</template>
