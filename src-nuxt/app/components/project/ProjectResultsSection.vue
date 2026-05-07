<script setup lang="ts">
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const props = defineProps<{
  project: Project
}>()

const { locale, t } = useI18n()
const translation = computed(() => props.project.translations[locale.value as ProjectLocale])
</script>

<template>
  <BaseSection tone="dark" container-size="lg">
    <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
      {{ t('project.sections.results.title') }}
    </h2>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="result in translation.results"
        :key="result.key"
        class="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
      >
        <h3 class="text-xs font-semibold tracking-wide text-slate-300 uppercase">
          {{ result.label }}
        </h3>
        <p v-if="result.value" class="mt-3 text-3xl font-semibold tracking-tight text-white">
          {{ result.value }}
        </p>
      </div>
    </div>
    <p class="mt-8 text-base leading-relaxed text-slate-300">
      {{ translation.resultSummary }}
    </p>
  </BaseSection>
</template>
