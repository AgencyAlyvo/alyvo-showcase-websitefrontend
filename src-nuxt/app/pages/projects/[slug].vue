<script setup lang="ts">
import type { Project, ProjectLocale } from '#src-nuxt/shared/types/project'

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const setI18nParams = useSetI18nParams()

const slug = computed(() => route.params.slug as string)

const { data: project } = await useAsyncData<Project | null>(
  () => `project-${locale.value}-${slug.value}`,
  async () => {
    try {
      return await $fetch<Project>(`/api/projects/${locale.value}/${slug.value}` as never)
    } catch (error) {
      const status = (error as { statusCode?: number })?.statusCode
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

const translation = computed(() => project.value!.translations[locale.value as ProjectLocale])

setI18nParams({
  fr: { slug: project.value!.translations.fr.slug },
  en: { slug: project.value!.translations.en.slug },
  es: { slug: project.value!.translations.es.slug },
})

watch(project, (next) => {
  if (!next) return
  setI18nParams({
    fr: { slug: next.translations.fr.slug },
    en: { slug: next.translations.en.slug },
    es: { slug: next.translations.es.slug },
  })
})

usePageSeo({
  title: translation.value.seoTitle,
  description: translation.value.seoDescription,
  image: project.value.cover.src,
  type: 'article',
})
</script>

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
      <h1 class="text-3xl font-semibold tracking-tight text-slate-900">
        {{ t('project.notFound.title') }}
      </h1>
      <p class="mt-4 text-base text-slate-600">{{ t('project.notFound.description') }}</p>
      <NuxtLink :to="localePath('projects')" class="mt-6 inline-block">
        <BaseButton>{{ t('project.notFound.back') }}</BaseButton>
      </NuxtLink>
    </BaseContainer>
  </div>
</template>
