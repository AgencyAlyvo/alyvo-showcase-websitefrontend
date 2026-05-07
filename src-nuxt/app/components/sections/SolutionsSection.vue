<script setup lang="ts">
const { t } = useI18n()

const items = ['seoWeb', 'webApp', 'mobileApp', 'automation', 'software', 'dashboard', 'api', 'redesign'] as const
</script>

<template>
  <BaseSection tone="muted" container-size="xl">
    <div class="mx-auto max-w-2xl text-center">
      <BaseBadge>{{ t('home.solutions.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ t('home.solutions.title') }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ t('home.solutions.lead') }}
      </p>
    </div>
    <div class="mt-12 grid gap-6 lg:grid-cols-2">
      <article
        v-for="key in items"
        :key="key"
        class="flex flex-col gap-4 rounded-2xl bg-white p-8 ring-1 ring-slate-200"
      >
        <h3 class="text-xl font-semibold text-slate-900">
          {{ t(`home.solutions.items.${key}.title`) }}
        </h3>
        <dl class="space-y-3 text-sm leading-relaxed text-slate-600">
          <div>
            <dt class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              {{ t('projects.card.need') }}
            </dt>
            <dd class="mt-1">{{ t(`home.solutions.items.${key}.need`) }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              {{ t('projects.card.solution') }}
            </dt>
            <dd class="mt-1">{{ t(`home.solutions.items.${key}.solution`) }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              {{ t('projects.card.result') }}
            </dt>
            <dd class="mt-1 font-medium text-indigo-700">{{ t(`home.solutions.items.${key}.benefit`) }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </BaseSection>
</template>
