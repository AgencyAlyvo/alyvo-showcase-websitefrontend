<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'default' | 'muted' | 'success' | 'dark'
  }>(),
  {
    tone: 'default',
  },
)

const toneClass = {
  default: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  muted: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  dark: 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
      toneClass[tone],
    ]"
  >
    <slot />
  </span>
</template>
