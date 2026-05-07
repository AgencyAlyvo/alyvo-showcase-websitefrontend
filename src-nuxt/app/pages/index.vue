<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
})

const { data: projects } = await useProjects()

const featuredProjects = computed(() => (projects.value ?? []).slice(0, 3))

const faqItems = computed(() => {
  const keys = ['unclear', 'seo', 'price', 'time', 'existing', 'small'] as const
  return keys.map((key) => ({
    key,
    question: t(`home.faq.items.${key}.question`),
    answer: t(`home.faq.items.${key}.answer`),
  }))
})
</script>

<template>
  <div>
    <SectionsHeroProblemSection />
    <SectionsClientProblemsSection />
    <SectionsValuePropositionSection />
    <SectionsSolutionsSection />
    <SectionsMethodSection />
    <SectionsWhyItWorksSection />
    <SectionsUseCasesSection />
    <SectionsTechnologiesQualitySection />
    <SectionsFaqSection :eyebrow="t('home.faq.eyebrow')" :title="t('home.faq.title')" :items="faqItems" />
    <SectionsFinalCtaSection
      :eyebrow="t('home.finalCta.eyebrow')"
      :title="t('home.finalCta.title')"
      :lead="t('home.finalCta.lead')"
      :cta="t('home.finalCta.cta')"
    />
  </div>
</template>
