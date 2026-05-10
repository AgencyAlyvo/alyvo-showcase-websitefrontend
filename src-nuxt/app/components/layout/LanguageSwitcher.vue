<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="languageItems"
    :content="{ align: 'end' }"
    :ui="{ content: 'min-w-44' }"
  >
    <UButton
      color="neutral"
      variant="subtle"
      size="sm"
      trailing-icon="i-lucide-chevron-down"
      :label="locale.toUpperCase()"
      :aria-label="t('nav.switchLanguage')"
      class="rounded-full font-semibold"
      :class="[open && 'bg-muted']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' '),
      }"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** Locale codes supported by the site. */
type LocaleCode = 'fr' | 'en' | 'es'

/** Locale option exposed by Nuxt i18n. */
type LocaleOption = {
  code: LocaleCode
  name: string
}

/** Nuxt UI dropdown item for the locale switcher. */
type LanguageMenuItem = {
  label: string
  onSelect: () => Promise<void>
  suffix: string
  color?: 'primary'
  checked?: boolean
  type?: 'checkbox'
}

const { locale, locales, t, setLocale } = useI18n()

const availableLocales: ComputedRef<LocaleOption[]> = computed((): LocaleOption[] => locales.value as LocaleOption[])

const languageItems: ComputedRef<LanguageMenuItem[]> = computed((): LanguageMenuItem[] =>
  availableLocales.value.map(
    (item: LocaleOption): LanguageMenuItem => ({
      label: item.name,
      onSelect: async (): Promise<void> => {
        await setLocale(item.code)
      },
      suffix: item.code.toUpperCase(),
      color: item.code === locale.value ? 'primary' : undefined,
      checked: item.code === locale.value,
      type: item.code === locale.value ? 'checkbox' : undefined,
    }),
  ),
)
</script>
