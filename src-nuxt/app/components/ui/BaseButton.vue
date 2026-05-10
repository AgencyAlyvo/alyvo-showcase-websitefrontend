<template>
  <UButton
    :type="type"
    :disabled="disabled"
    :block="block"
    :size="size"
    :color="buttonColor"
    :variant="buttonVariant"
    class="rounded-full"
  >
    <slot />
  </UButton>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** Legacy button variants mapped to Nuxt UI. */
type BaseButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'accent' | 'ghost-dark'

/** Props for the Nuxt UI button compatibility wrapper. */
type BaseButtonProps = {
  variant?: BaseButtonVariant
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  block?: boolean
}

/** Button colors accepted by Nuxt UI in this project. */
type NuxtButtonColor = 'primary' | 'neutral'

/** Button variants accepted by Nuxt UI in this project. */
type NuxtButtonVariant = 'solid' | 'outline' | 'ghost' | 'subtle'

const props: BaseButtonProps = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  block: false,
})

const buttonColor: ComputedRef<NuxtButtonColor> = computed(
  (): NuxtButtonColor => (props.variant === 'primary' || props.variant === 'accent' ? 'primary' : 'neutral'),
)

const buttonVariant: ComputedRef<NuxtButtonVariant> = computed((): NuxtButtonVariant => {
  if (props.variant === 'secondary') {
    return 'outline'
  }

  if (props.variant === 'ghost') {
    return 'ghost'
  }

  if (props.variant === 'ghost-dark') {
    return 'subtle'
  }

  return 'solid'
})
</script>
