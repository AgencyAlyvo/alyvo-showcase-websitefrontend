<template>
  <div>
    <UPageHero
      :description="t('contact.hero.lead')"
      :ui="{ container: 'pb-8 sm:pb-10 lg:pb-12', wrapper: 'page-copy-reveal' }"
    >
      <template #title>
        <span>{{ t('contact.hero.title') }}</span>
        <span class="text-primary block whitespace-normal lg:whitespace-nowrap">{{ t('contact.hero.accent') }}</span>
      </template>
    </UPageHero>

    <section class="section-tone-tinted py-20 sm:py-32">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <UPageCard variant="subtle" class="contact-card-reveal p-5 sm:p-6">
          <p class="contact-card-copy text-default text-base leading-relaxed sm:text-lg">
            {{ t('contact.hero.directLead', { email: contactEmail, phone: contactPhone }) }}
          </p>
          <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <UButton
              class="contact-card-action"
              :href="`mailto:${contactEmail}`"
              :label="t('contact.hero.directEmail')"
              icon="i-lucide-mail"
              color="primary"
              variant="solid"
            />
            <UButton
              class="contact-card-action"
              :href="whatsappHref"
              :label="t('contact.hero.directWhatsapp')"
              icon="i-simple-icons-whatsapp"
              color="neutral"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            />
            <UButton
              class="contact-card-action"
              :href="`tel:${phoneHref}`"
              :label="t('contact.hero.directCall')"
              icon="i-lucide-phone"
              color="neutral"
              variant="outline"
            />
          </div>
        </UPageCard>
      </div>
    </section>

    <SectionsFaqSection class="section-tone-violet" :title="t('contact.faq.title')" :items="faqItems" />
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

<style scoped>
:deep(.page-copy-reveal) {
  animation: page-copy-in 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

:deep(.page-copy-reveal [data-slot='title']),
:deep(.page-copy-reveal [data-slot='description']) {
  animation: page-copy-item-in 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

:deep(.page-copy-reveal [data-slot='description']) {
  animation-delay: 110ms;
}

.contact-card-reveal {
  animation: contact-card-pop 620ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both;
}

.contact-card-copy {
  animation: contact-card-content-in 560ms ease-out 320ms both;
}

.contact-card-action {
  animation: contact-card-action-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.contact-card-action:nth-child(1) {
  animation-delay: 430ms;
}

.contact-card-action:nth-child(2) {
  animation-delay: 520ms;
}

.contact-card-action:nth-child(3) {
  animation-delay: 610ms;
}

@keyframes page-copy-in {
  from {
    opacity: 0;
    transform: translate3d(-52px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes page-copy-item-in {
  from {
    opacity: 0;
    transform: translate3d(-28px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes contact-card-pop {
  from {
    opacity: 0;
    transform: translate3d(0, 26px, 0) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes contact-card-content-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes contact-card-action-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  :deep(.page-copy-reveal),
  :deep(.page-copy-reveal [data-slot='title']),
  :deep(.page-copy-reveal [data-slot='description']),
  .contact-card-reveal,
  .contact-card-copy,
  .contact-card-action {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
