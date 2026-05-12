<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage :page-key="route.fullPath" />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { useSchemaOrg as useLocalSchemaOrg } from './composables/useSchemaOrg'

const colorMode: ReturnType<typeof useColorMode> = useColorMode()
const config: ReturnType<typeof useRuntimeConfig> = useRuntimeConfig()
const route: ReturnType<typeof useRoute> = useRoute()
const i18nHead: ReturnType<typeof useLocaleHead> = useLocaleHead({
  seo: true,
})
const siteUrl: string = ((config.public.siteUrl as string) || '').replace(/\/$/, '')

const themeColor: ComputedRef<string> = computed((): string => (colorMode.value === 'dark' ? '#020618' : 'white'))

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  link: [
    ...i18nHead.value.link,
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/icon-32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/icon-16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
    { rel: 'mask-icon', href: '/favicon.svg', color: '#000000' },
  ],
  meta: [...i18nHead.value.meta, { key: 'theme-color', name: 'theme-color', content: themeColor.value }],
}))

if (siteUrl) {
  useLocalSchemaOrg([
    {
      type: 'Organization',
      data: {
        name: 'Alyvo',
        url: siteUrl,
        logo: `${siteUrl}/favicon.ico`,
      },
    },
    {
      type: 'WebSite',
      data: {
        name: 'Alyvo',
        url: siteUrl,
      },
    },
  ])
}
</script>
