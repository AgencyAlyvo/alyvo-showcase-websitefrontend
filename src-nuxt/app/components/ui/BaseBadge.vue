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
  muted: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  success: 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200',
  dark: 'bg-slate-800/80 text-slate-100 ring-1 ring-slate-300/30',
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
