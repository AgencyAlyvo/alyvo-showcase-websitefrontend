<script setup lang="ts">
const { t } = useI18n()

const items = ['modern', 'performance', 'accessibility', 'security', 'maintainable', 'evolutive'] as const
</script>

<template>
  <BaseSection container-size="xl">
    <div class="mx-auto max-w-2xl text-center">
      <BaseBadge>{{ t('home.tech.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ t('home.tech.title') }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ t('home.tech.lead') }}
      </p>
    </div>
    <ul class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="key in items"
        :key="key"
        class="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200"
      >
        <span
          class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10l3 3 7-7"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="text-sm font-medium text-slate-800">
          {{ t(`home.tech.items.${key}`) }}
        </span>
      </li>
    </ul>
  </BaseSection>
</template>
