<template>
  <component :is="as" :class="['mx-auto w-full px-6 sm:px-8', sizeClass[size]]">
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    as: 'div',
    size: 'lg',
  },
)

const sizeClass: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}
</script>
