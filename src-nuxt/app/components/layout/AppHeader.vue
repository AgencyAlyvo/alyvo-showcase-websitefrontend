<template>
  <UHeader>
    <template #left>
      <NuxtLink :to="localePath('index')" class="flex items-center gap-2" :aria-label="t('brand.name')">
        <span
          class="bg-primary text-inverted flex size-7 items-center justify-center rounded-lg text-sm font-bold"
          aria-hidden="true"
        >
          A
        </span>
        <span class="text-highlighted text-sm font-bold tracking-tight">{{ t('brand.name') }}</span>
      </NuxtLink>

      <UBadge
        :label="t('brand.badge')"
        color="primary"
        variant="subtle"
        size="sm"
        class="-mb-[6px] hidden rounded-full font-semibold sm:inline-flex"
      />
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeButton />
      <LayoutLanguageSwitcher class="hidden lg:block" />

      <UButton
        icon="i-lucide-send"
        color="neutral"
        variant="ghost"
        :to="localePath('contact')"
        :aria-label="t('buttons.talkAboutProject')"
        class="lg:hidden"
      />

      <UButton
        :label="t('buttons.talkAboutProject')"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        :to="localePath('contact')"
        class="hidden lg:inline-flex"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

      <USeparator class="my-6" />

      <LayoutLanguageSwitcher class="mb-3" />

      <UButton
        :label="t('buttons.talkAboutProject')"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        :to="localePath('contact')"
        block
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** Navigation item consumed by Nuxt UI's navigation menu. */
type HeaderNavItem = {
  label: string
  to: string
  active: boolean
}

const route: ReturnType<typeof useRoute> = useRoute()
const { t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const items: ComputedRef<HeaderNavItem[]> = computed((): HeaderNavItem[] => [
  {
    label: t('nav.home'),
    to: localePath('index'),
    active: route.path === localePath('index'),
  },
  {
    label: t('nav.projects'),
    to: localePath('projects'),
    active: route.path.startsWith(localePath('projects')),
  },
  {
    label: t('nav.contact'),
    to: localePath('contact'),
    active: route.path.startsWith(localePath('contact')),
  },
])
</script>
