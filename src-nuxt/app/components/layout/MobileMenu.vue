<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  { to: localePath('index'), label: t('nav.home') },
  { to: localePath('projects'), label: t('nav.projects') },
  { to: localePath('contact'), label: t('nav.contact') },
])

watch(
  () => props.open,
  (value) => {
    if (import.meta.client) {
      document.body.style.overflow = value ? 'hidden' : ''
    }
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="open" class="fixed inset-0 z-50 flex flex-col bg-white" role="dialog" aria-modal="true">
        <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <NuxtLinkLocale to="index" class="font-semibold tracking-tight" @click="emit('close')">
            Studio
          </NuxtLinkLocale>
          <button
            type="button"
            :aria-label="t('nav.closeMenu')"
            class="rounded-full p-2 text-slate-700 hover:bg-slate-100"
            @click="emit('close')"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto px-6 py-8">
          <ul class="flex flex-col gap-2">
            <li v-for="link in links" :key="link.to as string">
              <NuxtLink
                :to="link.to"
                class="block rounded-xl px-4 py-4 text-2xl font-semibold tracking-tight text-slate-900 hover:bg-slate-50"
                @click="emit('close')"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="border-t border-slate-100 p-6">
          <NuxtLinkLocale
            to="contact"
            class="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            @click="emit('close')"
          >
            {{ t('buttons.talkAboutProject') }}
          </NuxtLinkLocale>
          <div class="mt-4 flex justify-center">
            <LayoutLanguageSwitcher />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.18s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
