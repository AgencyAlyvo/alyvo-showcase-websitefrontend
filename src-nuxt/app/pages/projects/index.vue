<template>
  <div>
    <UPageSection>
      <div class="min-h-[45vh]" />
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.projects.title'),
  description: t('seo.projects.description'),
})
</script>
