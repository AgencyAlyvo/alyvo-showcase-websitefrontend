<template>
  <UPageCard variant="subtle" class="p-6 sm:p-8">
    <h2 class="text-highlighted text-lg font-semibold">{{ t('contact.info.title') }}</h2>
    <p class="text-muted mt-2 text-sm leading-relaxed">
      {{ t('contact.info.lead') }}
    </p>
    <UButton
      :href="`mailto:${t('contact.info.email')}`"
      :label="t('contact.info.email')"
      color="neutral"
      variant="link"
      class="mt-4 p-0"
    />
  </UPageCard>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
