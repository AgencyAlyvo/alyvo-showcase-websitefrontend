<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'accent' | 'ghost-dark'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    block?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    block: false,
  },
)

const variantClass = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 shadow-sm shadow-indigo-950/25',
  secondary:
    'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100 hover:ring-slate-300 focus-visible:outline-slate-900',
  ghost: 'bg-transparent text-slate-800 hover:bg-slate-100 focus-visible:outline-slate-800',
  dark: 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900',
  accent:
    'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500 shadow-lg shadow-indigo-900/35',
  'ghost-dark': 'bg-slate-900/20 text-white ring-1 ring-slate-200/30 hover:bg-slate-900/30 focus-visible:outline-white',
}

const sizeClass = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
      variantClass[variant],
      sizeClass[size],
      block ? 'w-full' : '',
    ]"
  >
    <slot />
  </button>
</template>
