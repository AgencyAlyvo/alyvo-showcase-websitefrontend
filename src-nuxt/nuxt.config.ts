import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-08',
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
      script: [],
      link: [],
      style: [],
      noscript: [],
    },
  },
  srcDir: 'app',
  serverDir: 'server',
  dir: {
    public: 'public',
    modules: 'modules',
    shared: 'shared',
  },
  modulesDir: ['../node_modules'],
  ssr: process.env.NUXT_SSR !== 'false',
  alias: {
    '#src-nuxt': fileURLToPath(new URL('.', import.meta.url)),
    '#src-core': fileURLToPath(new URL('../src-core', import.meta.url)),
  },
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },
  telemetry: false,
  components: [{ path: '~/components/ui', pathPrefix: false }, '~/components'],
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
        noEmit: true,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    'nuxt-seo-utils',
    '@nuxtjs/i18n',
  ],
  pinia: {
    storesDirs: ['~/stores/**'],
  },
  googleFonts: {
    families: {
      Barlow: [400, 500, 600, 700],
      'Roboto Mono': [500],
      'Roboto Flex': [600],
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: 'Studio',
  },
  sitemap: {
    autoLastmod: true,
    sources: ['/api/__sitemap__/projects'],
  },
  robots: {
    disallow: ['/api/'],
  },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,

    strategy: 'prefix',
    defaultLocale: 'fr',
    langDir: 'locales',

    locales: [
      {
        code: 'fr',
        name: 'Français',
        language: 'fr-FR',
        file: 'fr.json',
      },
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        file: 'en.json',
      },
      {
        code: 'es',
        name: 'Español',
        language: 'es-ES',
        file: 'es.json',
      },
    ],

    customRoutes: 'config',
    pages: {
      projects: {
        fr: '/projets',
        en: '/projects',
        es: '/proyectos',
      },

      'projects-slug': {
        fr: '/projets/[slug]',
        en: '/projects/[slug]',
        es: '/proyectos/[slug]',
      },

      contact: {
        fr: '/contact',
        en: '/contact',
        es: '/contacto',
      },

      about: {
        fr: '/a-propos',
        en: '/about',
        es: '/nosotros',
      },
    },

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'fr',
    },
  },
})
