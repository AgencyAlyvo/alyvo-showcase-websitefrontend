<template>
  <div>
    <UPageHero :title="t('contact.hero.title')" :description="t('contact.hero.lead')" />

    <div class="mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
      <UPageCard variant="subtle" class="p-5 sm:p-6">
        <p class="text-default text-base leading-relaxed sm:text-lg">
          {{ t('contact.hero.directLead', { email: contactEmail, phone: contactPhone }) }}
        </p>
        <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <UButton
            :href="`mailto:${contactEmail}`"
            :label="t('contact.hero.directEmail')"
            icon="i-lucide-mail"
            color="primary"
            variant="solid"
          />
          <UButton
            :href="whatsappHref"
            :label="t('contact.hero.directWhatsapp')"
            icon="i-simple-icons-whatsapp"
            color="neutral"
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          />
          <UButton
            :href="`tel:${phoneHref}`"
            :label="t('contact.hero.directCall')"
            icon="i-lucide-phone"
            color="neutral"
            variant="outline"
          />
        </div>
      </UPageCard>
    </div>

    <SectionsFaqSection :title="t('contact.faq.title')" :items="faqItems" />
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

const { t } = useI18n()

const contactEmail: ComputedRef<string> = computed((): string => t('contact.info.email'))
const contactPhone: ComputedRef<string> = computed((): string => t('contact.info.phone'))
const phoneHref: ComputedRef<string> = computed((): string => contactPhone.value.replace(/[^+\d]/g, ''))
const whatsappHref: ComputedRef<string> = computed((): string => {
  const digits: string = contactPhone.value.replace(/\D/g, '')
  const internationalDigits: string = digits.startsWith('0') ? `33${digits.slice(1)}` : digits
  return `https://wa.me/${internationalDigits}`
})

usePageSeo({
  title: t('seo.contact.title'),
  description: t('seo.contact.description'),
})

/** FAQ item passed to the shared FAQ section. */
type ContactFaqItem = {
  key: string
  question: string
  answer: string
}

const faqKeys: readonly string[] = ['ready', 'smallProject', 'remote', 'tech']

const faqItems: ComputedRef<ContactFaqItem[]> = computed((): ContactFaqItem[] =>
  faqKeys.map(
    (key: string): ContactFaqItem => ({
      key,
      question: t(`contact.faq.items.${key}.question`),
      answer: t(`contact.faq.items.${key}.answer`),
    }),
  ),
)
</script>
