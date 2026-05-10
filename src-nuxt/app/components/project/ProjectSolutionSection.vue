<template>
  <BaseSection container-size="lg">
    <h2 class="text-highlighted text-2xl font-semibold tracking-tight sm:text-3xl">
      {{ t('project.sections.solution.title') }}
    </h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <UPageCard variant="subtle" class="p-6">
        <h3 class="text-dimmed text-xs font-semibold tracking-wide uppercase">
          {{ t('project.sections.solution.what') }}
        </h3>
        <p class="text-muted mt-3 text-sm leading-relaxed">{{ translation.solutionWhat }}</p>
      </UPageCard>
      <UPageCard variant="subtle" class="p-6">
        <h3 class="text-dimmed text-xs font-semibold tracking-wide uppercase">
          {{ t('project.sections.solution.why') }}
        </h3>
        <p class="text-muted mt-3 text-sm leading-relaxed">{{ translation.solutionWhy }}</p>
      </UPageCard>
      <UPageCard variant="subtle" class="p-6">
        <h3 class="text-dimmed text-xs font-semibold tracking-wide uppercase">
          {{ t('project.sections.solution.how') }}
        </h3>
        <p class="text-muted mt-3 text-sm leading-relaxed">{{ translation.solutionHow }}</p>
      </UPageCard>
    </div>

    <div class="mt-12">
      <h3 class="text-highlighted text-lg font-semibold">
        {{ t('project.sections.features.title') }}
      </h3>
      <div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UPageCard v-for="feature in translation.features" :key="feature.title" variant="subtle" class="p-5">
          <h4 class="text-highlighted text-sm font-semibold">{{ feature.title }}</h4>
          <p class="text-muted mt-2 text-sm leading-relaxed">{{ feature.description }}</p>
        </UPageCard>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { Project, ProjectLocale, ProjectTranslation } from '#src-nuxt/shared/types/project'

/** Props for the project solution section. */
type ProjectSolutionSectionProps = {
  project: Project
}

const props: ProjectSolutionSectionProps = defineProps<ProjectSolutionSectionProps>()

const { locale, t } = useI18n()
const translation: ComputedRef<ProjectTranslation> = computed(
  (): ProjectTranslation => props.project.translations[locale.value as ProjectLocale],
)
</script>
