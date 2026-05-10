<template>
  <div>
    <BaseBadge>{{ t('contact.process.eyebrow') }}</BaseBadge>
    <h2 class="text-highlighted mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
      {{ t('contact.process.title') }}
    </h2>
    <ol class="mt-8 space-y-5">
      <UPageCard v-for="(step, index) in steps" :key="step" as="li" variant="subtle" class="flex-row gap-4 p-5">
        <UBadge color="neutral" variant="solid" :label="String(index + 1)" class="size-9 justify-center rounded-full" />
        <div>
          <h3 class="text-highlighted text-base font-semibold">
            {{ t(`contact.process.steps.${step}.title`) }}
          </h3>
          <p class="text-muted mt-1 text-sm leading-relaxed">
            {{ t(`contact.process.steps.${step}.description`) }}
          </p>
        </div>
      </UPageCard>
    </ol>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const steps: readonly string[] = ['analyze', 'respond', 'exchange', 'propose']
</script>
