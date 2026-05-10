<template>
  <component :is="as" :id="id" :class="[toneClass[tone], spacingClass[spacing]]">
    <BaseContainer :size="containerSize">
      <slot />
    </BaseContainer>
  </component>
</template>

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

const toneClass: Record<'default' | 'muted' | 'dark' | 'gradient', string> = {
  default: 'bg-default text-highlighted',
  muted: 'bg-muted text-highlighted',
  dark: 'bg-inverted text-inverted',
  gradient: 'bg-gradient-to-b from-default via-muted to-default text-highlighted',
}

const spacingClass: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-24 sm:py-32',
}
</script>
