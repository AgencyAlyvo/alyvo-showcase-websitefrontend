<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.contact.title'),
  description: t('seo.contact.description'),
})

const faqItems = computed(() => {
  const keys = ['ready', 'smallProject', 'remote', 'tech'] as const
  return keys.map((key) => ({
    key,
    question: t(`contact.faq.items.${key}.question`),
    answer: t(`contact.faq.items.${key}.answer`),
  }))
})
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-white via-slate-50 to-white">
      <BaseContainer size="xl" class="py-20 sm:py-28">
        <div class="mx-auto max-w-3xl text-center">
          <BaseBadge>{{ t('contact.hero.eyebrow') }}</BaseBadge>
          <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {{ t('contact.hero.title') }}
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-slate-600">
            {{ t('contact.hero.lead') }}
          </p>
        </div>
      </BaseContainer>
    </section>

    <BaseSection container-size="xl">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <ContactContactForm />
        <div class="space-y-8">
          <div class="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <h2 class="text-lg font-semibold">{{ t('contact.reassure.title') }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-300">
              {{ t('contact.reassure.lead') }}
            </p>
          </div>
          <ContactContactInfo />
        </div>
      </div>
    </BaseSection>

    <BaseSection tone="muted" container-size="lg">
      <ContactContactProcess />
    </BaseSection>

    <SectionsFaqSection :title="t('contact.faq.title')" :items="faqItems" />
  </div>
</template>
