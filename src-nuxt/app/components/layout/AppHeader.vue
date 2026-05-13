<template>
  <UHeader>
    <template #left>
      <NuxtLink :to="localePath('index')" class="flex items-center gap-2" :aria-label="t('brand.name')">
        <img src="/logo/logo-alyvo.svg" :alt="t('brand.name')" class="h-7 w-auto dark:brightness-0 dark:invert" />
      </NuxtLink>
    </template>

    <nav class="hidden items-center gap-1 md:flex" :aria-label="t('footer.navigation')">
      <NuxtLink
        v-for="item in items"
        :key="`desktop-${item.to}`"
        :to="item.to"
        custom
        v-slot="{ href, navigate, isActive, isExactActive }"
      >
        <a
          :href="href"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="isNavItemActive(item, isActive, isExactActive) ? activeLinkClass : inactiveLinkClass"
          @click="navigate"
        >
          {{ item.label }}
        </a>
      </NuxtLink>
    </nav>

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
      <nav class="-mx-2.5 flex flex-col gap-1" :aria-label="t('footer.navigation')">
        <NuxtLink
          v-for="item in items"
          :key="`mobile-${item.to}`"
          :to="item.to"
          custom
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <a
            :href="href"
            class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
            :class="isNavItemActive(item, isActive, isExactActive) ? activeLinkClass : inactiveLinkClass"
            @click="navigate"
          >
            {{ item.label }}
          </a>
        </NuxtLink>
      </nav>

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
  exact?: boolean
}

const { t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const activeLinkClass: string = 'text-primary underline underline-offset-4'
const inactiveLinkClass: string = 'text-muted hover:text-highlighted'

/**
 * Selects exact matching for the home link and regular matching for section links.
 * @param {HeaderNavItem} item - Navigation item configuration.
 * @param {boolean} isActive - Router state for regular active matching.
 * @param {boolean} isExactActive - Router state for exact active matching.
 * @returns {boolean} Whether the item should receive active navigation styles.
 */
const isNavItemActive: (item: HeaderNavItem, isActive: boolean, isExactActive: boolean) => boolean = (
  item: HeaderNavItem,
  isActive: boolean,
  isExactActive: boolean,
): boolean => (item.exact === true ? isExactActive : isActive)

const items: ComputedRef<HeaderNavItem[]> = computed((): HeaderNavItem[] => [
  {
    label: t('nav.home'),
    to: localePath('index'),
    exact: true,
  },
  {
    label: t('nav.projects'),
    to: localePath('projects'),
  },
  {
    label: t('nav.contact'),
    to: localePath('contact'),
  },
])
</script>
