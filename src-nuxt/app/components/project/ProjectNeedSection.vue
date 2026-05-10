<template>
  <BaseSection tone="muted" container-size="lg">
    <h2 class="text-highlighted text-2xl font-semibold tracking-tight sm:text-3xl">
      {{ t('project.sections.need.title') }}
    </h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <UPageCard variant="subtle" class="p-6">
        <h3 class="text-dimmed text-xs font-semibold tracking-wide uppercase">
          {{ t('project.sections.need.context') }}
        </h3>
        <p class="text-muted mt-3 text-sm leading-relaxed">{{ translation.context }}</p>
      </UPageCard>
      <UPageCard variant="subtle" class="p-6">
        <h3 class="text-dimmed text-xs font-semibold tracking-wide uppercase">
          {{ t('project.sections.need.problem') }}
        </h3>
        <p class="text-muted mt-3 text-sm leading-relaxed">{{ translation.problem }}</p>
      </UPageCard>
      <UPageCard variant="subtle" class="p-6">
        <h3 class="text-dimmed text-xs font-semibold tracking-wide uppercase">
          {{ t('project.sections.need.objective') }}
        </h3>
        <p class="text-muted mt-3 text-sm leading-relaxed">{{ translation.objective }}</p>
      </UPageCard>
    </div>

    <div class="mt-12">
      <h3 class="text-highlighted text-lg font-semibold">
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

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { Project, ProjectLocale, ProjectTranslation } from '#src-nuxt/shared/types/project'

/** Props for the project need section. */
type ProjectNeedSectionProps = {
  project: Project
}

const props: ProjectNeedSectionProps = defineProps<ProjectNeedSectionProps>()

const { locale, t } = useI18n()
const translation: ComputedRef<ProjectTranslation> = computed(
  (): ProjectTranslation => props.project.translations[locale.value as ProjectLocale],
)
</script>
