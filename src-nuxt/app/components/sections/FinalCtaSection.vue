<template>
  <USeparator />

  <UPageCTA
    :headline="eyebrow"
    :title="title"
    :description="lead"
    :links="ctaLinks"
    variant="naked"
    class="overflow-hidden"
  >
    <LazyStarsBg />
  </UPageCTA>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** Props for the shared final CTA section. */
type FinalCtaProps = {
  eyebrow?: string
  title: string
  lead?: string
  cta?: string
}

/** Link item consumed by Nuxt UI page CTA. */
type CtaLink = {
  label: string
  to: string
  trailingIcon: string
}

const props: FinalCtaProps = defineProps<FinalCtaProps>()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()
const { t } = useI18n()

const ctaLinks: ComputedRef<CtaLink[]> = computed((): CtaLink[] => [
  {
    label: props.cta ?? t('buttons.talkAboutProject'),
    to: localePath('contact'),
    trailingIcon: 'i-lucide-arrow-right',
  },
])
</script>
