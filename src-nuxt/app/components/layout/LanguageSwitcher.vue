<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value as Array<{ code: string; name: string }>)

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function close() {
  open.value = false
}

function onClickOutside(event: MouseEvent) {
  if (!root.value) return
  if (!root.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

const { t } = useI18n()
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      :aria-label="t('nav.switchLanguage')"
      :aria-expanded="open"
      class="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900"
      @click="open = !open"
    >
      <span class="uppercase">{{ locale }}</span>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M5 8l5 5 5-5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <Transition name="fade">
      <div
        v-if="open"
        class="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-2xl bg-white p-1 shadow-lg ring-1 shadow-slate-900/5 ring-slate-200"
        role="menu"
      >
        <NuxtLink
          v-for="loc in availableLocales"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          :class="[
            'flex items-center justify-between rounded-xl px-3 py-2 text-sm',
            loc.code === locale ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
          ]"
          @click="close"
        >
          <span>{{ loc.name }}</span>
          <span class="text-xs uppercase opacity-70">{{ loc.code }}</span>
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
