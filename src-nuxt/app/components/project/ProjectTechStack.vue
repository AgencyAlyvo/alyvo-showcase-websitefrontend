<template>
  <BaseSection container-size="lg">
    <UPageCard variant="subtle" class="p-8">
      <h2 class="text-highlighted text-lg font-semibold tracking-tight">
        {{ t('project.sections.stack.title') }}
      </h2>
      <p class="text-muted mt-2 text-sm">{{ t('project.sections.stack.lead') }}</p>
      <ul class="mt-5 flex flex-wrap gap-2">
        <li v-for="tech in stack" :key="tech">
          <UBadge color="neutral" variant="subtle" class="rounded-full">
            {{ tech }}
          </UBadge>
        </li>
      </ul>
    </UPageCard>
  </BaseSection>
</template>

<script setup lang="ts">
defineProps<{
  stack: string[]
}>()

const { t } = useI18n()
</script>
