<script setup lang="ts">
interface FaqItem {
  key: string
  question: string
  answer: string
}

withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    items: FaqItem[]
  }>(),
  {},
)

const opened = ref<string | null>(null)

function toggle(key: string) {
  opened.value = opened.value === key ? null : key
}
</script>

<template>
  <BaseSection container-size="md">
    <div class="text-center">
      <BaseBadge v-if="eyebrow">{{ eyebrow }}</BaseBadge>
      <h2 v-if="title" class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ title }}
      </h2>
    </div>
    <div class="mt-10 divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200">
      <div v-for="item in items" :key="item.key">
        <button
          type="button"
          class="flex w-full items-start justify-between gap-6 px-6 py-5 text-left"
          :aria-expanded="opened === item.key"
          @click="toggle(item.key)"
        >
          <span class="text-base font-medium text-slate-900">{{ item.question }}</span>
          <svg
            :class="['mt-1 h-5 w-5 shrink-0 text-slate-500 transition', opened === item.key ? 'rotate-45' : '']"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
        <div v-if="opened === item.key" class="px-6 pb-5">
          <p class="text-sm leading-relaxed text-slate-600">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
