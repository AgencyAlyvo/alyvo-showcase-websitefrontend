<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const navLinks = computed(() => [
  { to: localePath('index'), label: t('nav.home') },
  { to: localePath('projects'), label: t('nav.projects') },
  { to: localePath('about'), label: t('nav.about') },
  { to: localePath('contact'), label: t('nav.contact') },
])

const solutionLinks = computed(() => [
  { key: 'seoWeb', label: t('footer.solutionsList.seoWeb') },
  { key: 'webApp', label: t('footer.solutionsList.webApp') },
  { key: 'mobileApp', label: t('footer.solutionsList.mobileApp') },
  { key: 'automation', label: t('footer.solutionsList.automation') },
  { key: 'dashboard', label: t('footer.solutionsList.dashboard') },
  { key: 'api', label: t('footer.solutionsList.api') },
  { key: 'redesign', label: t('footer.solutionsList.redesign') },
])

type LocaleCode = 'fr' | 'en' | 'es'
const availableLocales = computed(() => locales.value as Array<{ code: LocaleCode; name: string }>)

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-100 bg-slate-950 text-slate-300">
    <BaseContainer size="xl" class="py-16">
      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-4">
          <NuxtLinkLocale to="index" class="text-base font-semibold tracking-tight text-white"> Studio </NuxtLinkLocale>
          <p class="text-sm leading-relaxed text-slate-400">
            {{ t('footer.description') }}
          </p>
        </div>
        <div>
          <h3 class="text-sm font-semibold tracking-wide text-white uppercase">
            {{ t('footer.navigation') }}
          </h3>
          <ul class="mt-4 space-y-2 text-sm">
            <li v-for="link in navLinks" :key="link.to as string">
              <NuxtLink :to="link.to" class="text-slate-400 hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold tracking-wide text-white uppercase">
            {{ t('footer.solutions') }}
          </h3>
          <ul class="mt-4 space-y-2 text-sm">
            <li v-for="link in solutionLinks" :key="link.key">
              <NuxtLinkLocale to="contact" class="text-slate-400 hover:text-white">
                {{ link.label }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-semibold tracking-wide text-white uppercase">
              {{ t('footer.contact') }}
            </h3>
            <p class="mt-4 text-sm text-slate-400">
              {{ t('contact.info.email') }}
            </p>
            <NuxtLinkLocale
              to="contact"
              class="mt-3 inline-flex items-center rounded-full bg-indigo-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-400"
            >
              {{ t('buttons.talkAboutProject') }}
            </NuxtLinkLocale>
          </div>
          <div>
            <h3 class="text-sm font-semibold tracking-wide text-white uppercase">
              {{ t('footer.languages') }}
            </h3>
            <ul class="mt-4 flex flex-wrap gap-2 text-sm">
              <li v-for="loc in availableLocales" :key="loc.code">
                <NuxtLink
                  :to="switchLocalePath(loc.code)"
                  :class="[
                    'rounded-full px-3 py-1 ring-1',
                    loc.code === locale
                      ? 'bg-white text-slate-900 ring-white'
                      : 'text-slate-400 ring-white/10 hover:text-white',
                  ]"
                >
                  {{ loc.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-16 border-t border-white/10 pt-6 text-xs text-slate-500">
        © {{ year }} Studio · {{ t('footer.rights') }}
      </div>
    </BaseContainer>
  </footer>
</template>
