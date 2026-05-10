<template>
  <UFormField :label="label" :hint="hint" :required="required" :ui="{ label: 'text-highlighted', hint: 'text-muted' }">
    <UInput
      :id="id || inputId"
      :name="name"
      :type="type"
      :model-value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      color="neutral"
      variant="outline"
      size="xl"
      class="w-full"
      @update:model-value="updateValue"
    />
  </UFormField>
</template>

<script setup lang="ts">
/** Props for the Nuxt UI input compatibility wrapper. */
type BaseInputProps = {
  modelValue?: string
  type?: string
  label?: string
  placeholder?: string
  required?: boolean
  name?: string
  id?: string
  autocomplete?: string
  hint?: string
}

/** Emits supported by the input wrapper. */
type BaseInputEmits = {
  (event: 'update:modelValue', value: string): void
}

withDefaults(defineProps<BaseInputProps>(), {
  type: 'text',
  required: false,
})

const emit: BaseInputEmits = defineEmits<BaseInputEmits>()
const inputId: string = useId()

/**
 * Normalizes Nuxt UI's model value before forwarding it.
 * @param {unknown} value - Raw value emitted by UInput.
 */
function updateValue(value: unknown): void {
  emit('update:modelValue', value === undefined || value === null ? '' : String(value))
}
</script>
