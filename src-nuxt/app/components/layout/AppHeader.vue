<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  { to: localePath('index'), label: t('nav.home') },
  { to: localePath('projects'), label: t('nav.projects') },
  { to: localePath('about'), label: t('nav.about') },
  { to: localePath('contact'), label: t('nav.contact') },
])

const mobileOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-100/80 bg-white/80 backdrop-blur">
    <BaseContainer size="xl" class="flex h-16 items-center justify-between">
      <NuxtLinkLocale to="index" class="text-base font-semibold tracking-tight text-slate-900"> Studio </NuxtLinkLocale>
      <nav class="hidden items-center gap-1 md:flex" aria-label="Main">
        <NuxtLink
          v-for="link in links"
          :key="link.to as string"
          :to="link.to"
          class="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          active-class="text-slate-900"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="flex items-center gap-2">
        <LayoutLanguageSwitcher class="hidden md:block" />
        <NuxtLinkLocale
          to="contact"
          class="hidden rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 md:inline-flex"
        >
          {{ t('buttons.talkAboutProject') }}
        </NuxtLinkLocale>
        <button
          type="button"
          :aria-label="t('nav.openMenu')"
          class="rounded-full p-2 text-slate-700 ring-1 ring-slate-200 md:hidden"
          @click="mobileOpen = true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </BaseContainer>
    <LayoutMobileMenu :open="mobileOpen" @close="mobileOpen = false" />
  </header>
</template>
