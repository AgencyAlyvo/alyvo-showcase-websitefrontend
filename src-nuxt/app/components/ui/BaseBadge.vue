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
  default: 'bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10',
  muted: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  dark: 'bg-white/10 text-white ring-1 ring-white/15',
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
