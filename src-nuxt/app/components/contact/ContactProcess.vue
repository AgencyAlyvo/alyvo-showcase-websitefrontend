<script setup lang="ts">
const { t } = useI18n()

const steps = ['analyze', 'respond', 'exchange', 'propose'] as const
</script>

<template>
  <div>
    <BaseBadge>{{ t('contact.process.eyebrow') }}</BaseBadge>
    <h2 class="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
      {{ t('contact.process.title') }}
    </h2>
    <ol class="mt-8 space-y-5">
      <li v-for="(step, index) in steps" :key="step" class="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <span
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white"
        >
          {{ index + 1 }}
        </span>
        <div>
          <h3 class="text-base font-semibold text-slate-900">
            {{ t(`contact.process.steps.${step}.title`) }}
          </h3>
          <p class="mt-1 text-sm leading-relaxed text-slate-600">
            {{ t(`contact.process.steps.${step}.description`) }}
          </p>
        </div>
      </li>
    </ol>
  </div>
</template>
