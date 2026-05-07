<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    placeholder?: string
    required?: boolean
    name?: string
    id?: string
    rows?: number
  }>(),
  {
    required: false,
    rows: 5,
  },
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const textareaId = computed(() => `textarea-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="id || textareaId" class="text-sm font-medium text-slate-800">
      {{ label }}
    </label>
    <textarea
      :id="id || textareaId"
      :name="name"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="w-full resize-y rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>
