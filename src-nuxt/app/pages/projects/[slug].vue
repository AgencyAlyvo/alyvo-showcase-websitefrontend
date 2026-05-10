<template>
  <div v-if="project">
    <ProjectProjectHero :project="project" />
    <ProjectProjectNeedSection :project="project" />
    <ProjectProjectSolutionSection :project="project" />
    <ProjectProjectGallery :images="project.gallery" />
    <ProjectProjectResultsSection :project="project" />
    <ProjectProjectTechStack :stack="project.stack" />
    <SectionsFinalCtaSection :title="t('project.sections.cta.title')" :lead="t('project.sections.cta.lead')" />
  </div>
  <div v-else class="py-32">
    <BaseContainer size="md" class="text-center">
      <h1 class="text-highlighted text-3xl font-semibold tracking-tight">
        {{ t('project.notFound.title') }}
      </h1>
      <p class="text-muted mt-4 text-base">{{ t('project.notFound.description') }}</p>
      <UButton
        :to="localePath('projects')"
        :label="t('project.notFound.back')"
        trailing-icon="i-lucide-arrow-right"
        class="mt-6"
      />
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { Project, ProjectLocale, ProjectTranslation } from '#src-nuxt/shared/types/project'

const route: ReturnType<typeof useRoute> = useRoute()
const { locale, t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()
const setI18nParams: ReturnType<typeof useSetI18nParams> = useSetI18nParams()

const slug: ComputedRef<string> = computed((): string => route.params.slug as string)

const { data: project } = await useAsyncData<Project | null>(
  () => `project-${locale.value}-${slug.value}`,
  async () => {
    try {
      return await $fetch<Project>(`/api/projects/${locale.value}/${slug.value}` as never)
    } catch (error) {
      const status: number | undefined = (error as { statusCode?: number }).statusCode
      if (status === 404) return null
      throw error
    }
  },
  { watch: [locale, slug] },
)

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
    fatal: true,
  })
}

const translation: ComputedRef<ProjectTranslation> = computed(
  (): ProjectTranslation => project.value!.translations[locale.value as ProjectLocale],
)

setI18nParams({
  fr: { slug: project.value!.translations.fr.slug },
  en: { slug: project.value!.translations.en.slug },
  es: { slug: project.value!.translations.es.slug },
})

watch(
  () => project.value,
  (next: Project | null | undefined): void => {
    if (!next) return
    setI18nParams({
      fr: { slug: next.translations.fr.slug },
      en: { slug: next.translations.en.slug },
      es: { slug: next.translations.es.slug },
    })
  },
)

usePageSeo({
  title: translation.value.seoTitle,
  description: translation.value.seoDescription,
  image: project.value.cover.src,
  type: 'article',
})
</script>
