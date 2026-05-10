<template>
  <UFormField :label="label" :required="required" :ui="{ label: 'text-highlighted' }">
    <USelect
      :id="id || selectId"
      :name="name"
      :items="normalizedOptions"
      :model-value="internalModelValue"
      :placeholder="placeholder"
      :required="required"
      value-key="value"
      label-key="label"
      color="neutral"
      variant="outline"
      size="xl"
      class="w-full"
      @update:model-value="updateValue"
    />
  </UFormField>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** Select option consumed by the compatibility wrapper. */
type BaseSelectOption = {
  value: string
  label: string
}

/** Props for the Nuxt UI select compatibility wrapper. */
type BaseSelectProps = {
  modelValue?: string
  label?: string
  name?: string
  id?: string
  required?: boolean
  options: BaseSelectOption[]
  placeholder?: string
}

/** Emits supported by the select wrapper. */
type BaseSelectEmits = {
  (event: 'update:modelValue', value: string): void
}

const props: BaseSelectProps = withDefaults(defineProps<BaseSelectProps>(), {
  required: false,
})

const emit: BaseSelectEmits = defineEmits<BaseSelectEmits>()
const selectId: string = useId()
const emptyOptionValue: string = `__base_select_empty_${selectId}__`

const normalizedOptions: ComputedRef<BaseSelectOption[]> = computed((): BaseSelectOption[] =>
  props.options.map(
    (option: BaseSelectOption): BaseSelectOption => ({
      ...option,
      value: option.value === '' ? emptyOptionValue : option.value,
    }),
  ),
)

const internalModelValue: ComputedRef<string | undefined> = computed((): string | undefined => {
  if (props.modelValue === '') return emptyOptionValue
  return props.modelValue
})

/**
 * Normalizes Nuxt UI's selected value before forwarding it.
 * @param {unknown} value - Raw value emitted by USelect.
 */
function updateValue(value: unknown): void {
  if (value === undefined || value === null || value === emptyOptionValue) {
    emit('update:modelValue', '')
    return
  }

  emit('update:modelValue', String(value))
}
</script>
