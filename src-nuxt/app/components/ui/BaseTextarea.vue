<template>
  <UFormField :label="label" :required="required" :ui="{ label: 'text-highlighted' }">
    <UTextarea
      :id="id || textareaId"
      :name="name"
      :rows="rows"
      :model-value="modelValue"
      :placeholder="placeholder"
      :required="required"
      color="neutral"
      variant="outline"
      size="xl"
      autoresize
      class="w-full"
      @update:model-value="updateValue"
    />
  </UFormField>
</template>

<script setup lang="ts">
/** Props for the Nuxt UI textarea compatibility wrapper. */
type BaseTextareaProps = {
  modelValue?: string
  label?: string
  placeholder?: string
  required?: boolean
  name?: string
  id?: string
  rows?: number
}

/** Emits supported by the textarea wrapper. */
type BaseTextareaEmits = {
  (event: 'update:modelValue', value: string): void
}

withDefaults(defineProps<BaseTextareaProps>(), {
  required: false,
  rows: 5,
})

const emit: BaseTextareaEmits = defineEmits<BaseTextareaEmits>()
const textareaId: string = useId()

/**
 * Normalizes Nuxt UI's model value before forwarding it.
 * @param {unknown} value - Raw value emitted by UTextarea.
 */
function updateValue(value: unknown): void {
  emit('update:modelValue', value === undefined || value === null ? '' : String(value))
}
</script>
