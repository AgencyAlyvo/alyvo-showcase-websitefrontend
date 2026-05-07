<script setup lang="ts">
const { t } = useI18n()

const items = ['objective', 'convert', 'seo', 'automation', 'maintain', 'vision'] as const
</script>

<template>
  <BaseSection tone="dark" container-size="xl">
    <div class="mx-auto max-w-2xl text-center">
      <BaseBadge tone="dark">{{ t('home.why.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {{ t('home.why.title') }}
      </h2>
    </div>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="key in items" :key="key" class="rounded-2xl border-l-2 border-indigo-500/50 bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
        <h3 class="text-base font-semibold text-white">
          {{ t(`home.why.items.${key}.title`) }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-300">
          {{ t(`home.why.items.${key}.description`) }}
        </p>
      </div>
    </div>
  </BaseSection>
</template>
