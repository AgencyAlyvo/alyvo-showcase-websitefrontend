<script setup lang="ts">
import type { Project } from '#src-nuxt/shared/types/project'

defineProps<{
  projects: Project[]
}>()

const { t } = useI18n()
</script>

<template>
  <div v-if="projects.length === 0" class="rounded-2xl bg-slate-50 p-10 text-center">
    <h3 class="text-lg font-semibold text-slate-900">
      {{ t('projects.empty.title') }}
    </h3>
    <p class="mt-2 text-sm text-slate-600">
      {{ t('projects.empty.description') }}
    </p>
  </div>
  <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <ProjectProjectCard v-for="project in projects" :key="project.id" :project="project" />
  </div>
</template>
