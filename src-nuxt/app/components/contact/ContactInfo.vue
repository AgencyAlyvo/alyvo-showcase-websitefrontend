<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
    <h2 class="text-lg font-semibold text-slate-900">{{ t('contact.info.title') }}</h2>
    <p class="mt-2 text-sm leading-relaxed text-slate-600">
      {{ t('contact.info.lead') }}
    </p>
    <a
      :href="`mailto:${t('contact.info.email')}`"
      class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900 underline-offset-4 hover:underline"
    >
      {{ t('contact.info.email') }}
    </a>
    <p class="mt-3 text-xs text-slate-500">{{ t('contact.info.responseTime') }}</p>
  </div>
</template>
