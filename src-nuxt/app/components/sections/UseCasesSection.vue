<script setup lang="ts">
const { t } = useI18n()

const items = ['leads', 'redesign', 'clientApp', 'process', 'data', 'google'] as const
</script>

<template>
  <BaseSection tone="muted" container-size="xl">
    <div class="mx-auto max-w-2xl text-center">
      <BaseBadge>{{ t('home.useCases.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ t('home.useCases.title') }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ t('home.useCases.lead') }}
      </p>
    </div>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="key in items" :key="key" class="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h3 class="text-base font-semibold text-slate-900">
          {{ t(`home.useCases.items.${key}.title`) }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">
          {{ t(`home.useCases.items.${key}.description`) }}
        </p>
      </div>
    </div>
  </BaseSection>
</template>
