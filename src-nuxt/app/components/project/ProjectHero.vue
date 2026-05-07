<script setup lang="ts">
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const props = defineProps<{
  project: Project
}>()

const { locale, t } = useI18n()
const localePath = useLocalePath()

const translation = computed(() => props.project.translations[locale.value as ProjectLocale])
</script>

<template>
  <section class="bg-gradient-to-b from-white via-slate-50 to-white">
    <BaseContainer size="xl" class="py-16 sm:py-20">
      <NuxtLink
        :to="localePath('projects')"
        class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M12 5l-5 5 5 5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ t('project.hero.back') }}
      </NuxtLink>

      <div class="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div class="flex flex-wrap gap-2">
            <BaseBadge v-for="goal in project.goals" :key="goal" tone="muted">
              {{ t(`projects.filters.${goal}`) }}
            </BaseBadge>
          </div>
          <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {{ translation.title }}
          </h1>
          <p class="mt-4 text-lg leading-relaxed text-slate-600">
            {{ translation.tagline }}
          </p>
          <p
            class="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200"
          >
            {{ translation.benefit }}
          </p>
        </div>
        <div class="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
          <img :src="project.cover.src" :alt="project.cover.alt" class="aspect-[4/3] w-full object-cover" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
