<script setup lang="ts">
const { t } = useI18n()

const items = ['leads', 'time', 'tool', 'idea', 'performance', 'integration'] as const
</script>

<template>
  <BaseSection tone="muted" container-size="xl">
    <div class="mx-auto max-w-2xl text-center">
      <BaseBadge>{{ t('home.problems.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ t('home.problems.title') }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ t('home.problems.lead') }}
      </p>
    </div>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BaseCard v-for="key in items" :key="key" interactive>
        <h3 class="text-lg font-semibold text-slate-900">
          {{ t(`home.problems.items.${key}.title`) }}
        </h3>
        <p class="text-sm leading-relaxed text-slate-600">
          {{ t(`home.problems.items.${key}.description`) }}
        </p>
        <p class="mt-auto rounded-xl bg-slate-900/[0.04] px-4 py-3 text-sm text-slate-700">
          → {{ t(`home.problems.items.${key}.solution`) }}
        </p>
      </BaseCard>
    </div>
  </BaseSection>
</template>
