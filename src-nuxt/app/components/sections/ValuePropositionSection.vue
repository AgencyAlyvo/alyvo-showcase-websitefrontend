<script setup lang="ts">
const { t } = useI18n()

const items = ['visibility', 'leads', 'time', 'experience', 'fit', 'evolutive'] as const
</script>

<template>
  <BaseSection container-size="xl">
    <div class="mx-auto max-w-2xl text-center">
      <BaseBadge>{{ t('home.value.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ t('home.value.title') }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ t('home.value.lead') }}
      </p>
    </div>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(key, index) in items"
        :key="key"
        class="flex flex-col gap-3 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
      >
        <span class="text-sm font-semibold text-indigo-500">0{{ index + 1 }}</span>
        <h3 class="text-lg font-semibold text-slate-900">
          {{ t(`home.value.items.${key}.title`) }}
        </h3>
        <p class="text-sm leading-relaxed text-slate-600">
          {{ t(`home.value.items.${key}.description`) }}
        </p>
      </div>
    </div>
  </BaseSection>
</template>
