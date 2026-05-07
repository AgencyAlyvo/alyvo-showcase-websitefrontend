<script setup lang="ts">
defineProps<{
  stack: string[]
}>()

const { t } = useI18n()
</script>

<template>
  <BaseSection container-size="lg">
    <div class="rounded-2xl bg-slate-50 p-8 ring-1 ring-slate-200">
      <h2 class="text-lg font-semibold tracking-tight text-slate-900">
        {{ t('project.sections.stack.title') }}
      </h2>
      <p class="mt-2 text-sm text-slate-600">{{ t('project.sections.stack.lead') }}</p>
      <ul class="mt-5 flex flex-wrap gap-2">
        <li
          v-for="tech in stack"
          :key="tech"
          class="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
        >
          {{ tech }}
        </li>
      </ul>
    </div>
  </BaseSection>
</template>
