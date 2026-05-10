<template>
  <UBadge :color="badgeColor" variant="subtle" class="rounded-full font-semibold tracking-normal uppercase">
    <slot />
  </UBadge>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** Visual tones supported by the legacy badge API. */
type BaseBadgeTone = 'default' | 'muted' | 'success' | 'dark'

/** Props for the Nuxt UI badge compatibility wrapper. */
type BaseBadgeProps = {
  tone?: BaseBadgeTone
}

/** Badge color accepted by Nuxt UI. */
type NuxtBadgeColor = 'primary' | 'neutral' | 'success'

const props: BaseBadgeProps = withDefaults(defineProps<BaseBadgeProps>(), {
  tone: 'default',
})

const badgeColor: ComputedRef<NuxtBadgeColor> = computed((): NuxtBadgeColor => {
  if (props.tone === 'success') {
    return 'success'
  }

  if (props.tone === 'muted' || props.tone === 'dark') {
    return 'neutral'
  }

  return 'primary'
})
</script>
