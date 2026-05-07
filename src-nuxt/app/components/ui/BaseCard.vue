<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    interactive?: boolean
    tone?: 'default' | 'muted' | 'dark'
  }>(),
  {
    as: 'div',
    interactive: false,
    tone: 'default',
  },
)

const toneClass = {
  default: 'bg-white ring-1 ring-slate-200',
  muted: 'bg-slate-50 ring-1 ring-slate-200',
  dark: 'bg-slate-900 text-white ring-1 ring-white/10',
}
</script>

<template>
  <component
    :is="as"
    :class="[
      'flex flex-col gap-4 rounded-2xl p-6 transition',
      toneClass[tone],
      interactive ? 'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5' : '',
    ]"
  >
    <slot />
  </component>
</template>
