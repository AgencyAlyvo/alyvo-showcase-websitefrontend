<template>
  <BaseSection container-size="md">
    <div class="text-center">
      <BaseBadge v-if="eyebrow">{{ eyebrow }}</BaseBadge>
      <h2 v-if="title" class="text-highlighted mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {{ title }}
      </h2>
    </div>

    <UAccordion :items="accordionItems" type="single" collapsible class="mx-auto mt-10 max-w-3xl" />
  </BaseSection>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** FAQ item used by content sections. */
type FaqItem = {
  key: string
  question: string
  answer: string
}

/** Props for the reusable FAQ section. */
type FaqSectionProps = {
  eyebrow?: string
  title?: string
  items: FaqItem[]
}

/** Item shape consumed by Nuxt UI accordion. */
type AccordionItem = {
  value: string
  label: string
  content: string
}

const props: FaqSectionProps = defineProps<FaqSectionProps>()

const accordionItems: ComputedRef<AccordionItem[]> = computed((): AccordionItem[] =>
  props.items.map(
    (item: FaqItem): AccordionItem => ({
      value: item.key,
      label: item.question,
      content: item.answer,
    }),
  ),
)
</script>
