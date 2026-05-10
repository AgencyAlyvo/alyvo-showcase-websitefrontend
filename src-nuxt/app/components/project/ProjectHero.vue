<template>
  <section class="from-default via-muted to-default bg-gradient-to-b">
    <BaseContainer size="xl" class="py-16 sm:py-20">
      <UButton
        :to="localePath('projects')"
        :label="t('project.hero.back')"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="link"
        class="p-0"
      />

      <div class="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div class="flex flex-wrap gap-2">
            <BaseBadge v-for="goal in project.goals" :key="goal" tone="muted">
              {{ t(`projects.filters.${goal}`) }}
            </BaseBadge>
          </div>
          <h1 class="text-highlighted mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {{ translation.title }}
          </h1>
          <p class="text-muted mt-4 text-lg leading-relaxed">
            {{ translation.tagline }}
          </p>
          <UBadge color="success" variant="subtle" class="mt-6 rounded-full px-4 py-2">
            {{ translation.benefit }}
          </UBadge>
        </div>
        <div class="border-default bg-muted overflow-hidden rounded-2xl border">
          <img :src="project.cover.src" :alt="project.cover.alt" class="aspect-[4/3] w-full object-cover" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { Project, ProjectLocale, ProjectTranslation } from '#src-nuxt/shared/types/project'

/** Props for the project detail hero. */
type ProjectHeroProps = {
  project: Project
}

const props: ProjectHeroProps = defineProps<ProjectHeroProps>()

const { locale, t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const translation: ComputedRef<ProjectTranslation> = computed(
  (): ProjectTranslation => props.project.translations[locale.value as ProjectLocale],
)
</script>
