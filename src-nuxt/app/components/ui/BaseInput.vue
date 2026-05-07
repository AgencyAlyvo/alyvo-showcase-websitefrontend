<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    type?: string
    label?: string
    placeholder?: string
    required?: boolean
    name?: string
    id?: string
    autocomplete?: string
    hint?: string
  }>(),
  {
    type: 'text',
    required: false,
  },
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="id || inputId" class="text-sm font-medium text-slate-800">
      {{ label }}
      <span v-if="!required" class="font-normal text-slate-400">{{ ' ' }}</span>
    </label>
    <input
      :id="id || inputId"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      class="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="hint" class="text-xs text-slate-500">{{ hint }}</p>
  </div>
</template>
