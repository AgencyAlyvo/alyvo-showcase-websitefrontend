<script setup lang="ts">
interface Option {
  value: string
  label: string
}

withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    name?: string
    id?: string
    required?: boolean
    options: Option[]
    placeholder?: string
  }>(),
  {
    required: false,
  },
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectId = computed(() => `select-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="id || selectId" class="text-sm font-medium text-slate-800">
      {{ label }}
    </label>
    <select
      :id="id || selectId"
      :name="name"
      :value="modelValue"
      :required="required"
      class="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-900 focus:outline-none"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
