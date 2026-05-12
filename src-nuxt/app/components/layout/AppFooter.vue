<template>
  <USeparator icon="i-lucide-sparkles" class="h-px" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns
          :columns="columns"
          :ui="{
            root: 'md:grid md:grid-cols-3 md:gap-10',
            center: 'flex flex-col sm:grid grid-flow-col auto-cols-fr gap-8 md:col-span-2',
            right: 'mt-10 md:mt-0',
          }"
        >
          <template #right>
            <div class="max-w-sm">
              <p v-if="t('footer.description')" class="text-highlighted text-sm font-medium">
                {{ t('footer.description') }}
              </p>
              <div>
                <p class="text-highlighted text-xs font-semibold">{{ t('footer.solutions') }}</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    v-for="tag in solutionTags"
                    :key="tag"
                    class="text-muted ring-accented bg-elevated inline-flex rounded-md px-2 py-1 text-xs ring ring-inset"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <UButton
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  :label="loc.name"
                  :to="switchLocalePath(loc.code)"
                  :color="loc.code === locale ? 'primary' : 'neutral'"
                  :variant="loc.code === locale ? 'solid' : 'subtle'"
                  size="xs"
                />
              </div>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">{{ t('brand.name') }} • © {{ year }} • {{ t('footer.rights') }}</p>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

const { t, locale, locales } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()
const switchLocalePath: ReturnType<typeof useSwitchLocalePath> = useSwitchLocalePath()

/** Locale currently exposed by the site navigation. */
type LocaleCode = 'fr' | 'en' | 'es'

/** Language switcher entry rendered in the footer. */
type FooterLocale = {
  code: LocaleCode
  name: string
}

/** Link item rendered inside one footer column. */
type FooterLink = {
  label: string
  to?: string
}

/** Footer column rendered by Nuxt UI's footer component. */
type FooterColumn = {
  label: string
  children: FooterLink[]
}

const availableLocales: ComputedRef<FooterLocale[]> = computed((): FooterLocale[] => locales.value as FooterLocale[])

const columns: ComputedRef<FooterColumn[]> = computed((): FooterColumn[] => [
  {
    label: t('footer.navigation'),
    children: [
      { label: t('nav.home'), to: localePath('index') },
      { label: t('nav.projects'), to: localePath('projects') },
      { label: t('nav.contact'), to: localePath('contact') },
    ],
  },
  {
    label: t('footer.contact'),
    children: [
      { label: t('contact.info.email'), to: `mailto:${t('contact.info.email')}` },
      { label: t('contact.info.phone'), to: `tel:${contactPhoneHref.value}` },
    ],
  },
])

const contactPhoneHref: ComputedRef<string> = computed((): string => t('contact.info.phone').replace(/[^+\d]/g, ''))

const solutionTags: ComputedRef<string[]> = computed((): string[] => [
  t('footer.solutionsList.seoWeb'),
  t('footer.solutionsList.webApp'),
  t('footer.solutionsList.mobileApp'),
  t('footer.solutionsList.automation'),
  t('footer.solutionsList.dashboard'),
  t('footer.solutionsList.api'),
])

const year: number = new Date().getFullYear()
</script>
