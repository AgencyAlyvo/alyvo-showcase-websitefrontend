import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  components: true,
  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
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
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,

    // Meilleur choix SEO clair : toutes les langues ont leur préfixe.
    strategy: 'prefix',

    // La langue par défaut, utilisée quand aucune autre ne correspond.
    defaultLocale: 'fr',

    // Par défaut, Nuxt i18n cherche dans /i18n/locales
    langDir: 'locales',

    // Les langues disponibles, avec leur code, nom, langue HTML et fichier de traduction.
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

    // Traduction des segments d’URL statiques.
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
      services: {
        fr: '/mes-services',
        en: '/services',
        es: '/mis-servicios',
      },
      about: {
        fr: '/a-propos',
        en: '/about',
        es: '/nosotros',
      },

      'dashboard/index': false,
    },

    // Détection auto, mais uniquement sur la racine.
    // Important : ne pas rediriger les bots depuis /en/... vers /fr/...
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'fr',
    },
  },

  routeRules: {
    // Dashboard : pas SEO, pas besoin de pré-rendu public.
    '/dashboard/**': {
      ssr: false,
      prerender: false,
    },
  },
})
