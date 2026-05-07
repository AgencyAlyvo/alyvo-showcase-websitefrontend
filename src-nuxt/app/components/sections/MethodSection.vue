<script setup lang="ts">
const { t } = useI18n()

const steps = ['understand', 'objectives', 'propose', 'build', 'improve'] as const
</script>

<template>
  <BaseSection container-size="xl">
    <div class="mx-auto max-w-2xl text-center">
      <BaseBadge>{{ t('home.method.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ t('home.method.title') }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ t('home.method.lead') }}
      </p>
    </div>
    <ol class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      <li
        v-for="(step, index) in steps"
        :key="step"
        class="flex flex-col gap-3 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
      >
        <span
          class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white"
        >
          {{ index + 1 }}
        </span>
        <h3 class="text-base font-semibold text-slate-900">
          {{ t(`home.method.steps.${step}.title`) }}
        </h3>
        <p class="text-sm leading-relaxed text-slate-600">
          {{ t(`home.method.steps.${step}.description`) }}
        </p>
      </li>
    </ol>
  </BaseSection>
</template>
