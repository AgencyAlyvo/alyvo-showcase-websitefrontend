<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    tone?: 'default' | 'muted' | 'dark' | 'gradient'
    spacing?: 'sm' | 'md' | 'lg'
    containerSize?: 'sm' | 'md' | 'lg' | 'xl'
    id?: string
  }>(),
  {
    as: 'section',
    tone: 'default',
    spacing: 'md',
    containerSize: 'lg',
  },
)

const toneClass = {
  default: 'bg-slate-50 text-slate-900',
  muted: 'bg-slate-100 text-slate-900',
  dark: 'bg-slate-900 text-white',
  gradient: 'bg-gradient-to-b from-indigo-50 via-slate-50 to-slate-50 text-slate-900',
}

const spacingClass = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-24 sm:py-32',
}
</script>

<template>
  <component :is="as" :id="id" :class="[toneClass[tone], spacingClass[spacing]]">
    <BaseContainer :size="containerSize">
      <slot />
    </BaseContainer>
  </component>
</template>
