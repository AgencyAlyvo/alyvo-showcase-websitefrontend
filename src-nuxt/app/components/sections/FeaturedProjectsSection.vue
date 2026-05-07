<script setup lang="ts">
import type { Project } from '#src-nuxt/shared/types/project'

defineProps<{
  projects: Project[]
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <BaseSection container-size="xl">
    <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div class="max-w-2xl">
        <BaseBadge>{{ t('home.projects.eyebrow') }}</BaseBadge>
        <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {{ t('home.projects.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-slate-600">
          {{ t('home.projects.lead') }}
        </p>
      </div>
      <NuxtLink :to="localePath('projects')">
        <BaseButton variant="secondary">{{ t('home.projects.viewAll') }}</BaseButton>
      </NuxtLink>
    </div>
    <div class="mt-12">
      <ProjectProjectGrid :projects="projects" />
    </div>
  </BaseSection>
</template>
