<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
    <div
      class="pointer-events-none absolute inset-x-0 -top-32 h-96 bg-gradient-to-b from-slate-100/80 to-transparent blur-3xl"
      aria-hidden="true"
    />
    <BaseContainer size="xl" class="relative py-24 sm:py-32">
      <div class="mx-auto max-w-3xl text-center">
        <BaseBadge>{{ t('home.hero.eyebrow') }}</BaseBadge>
        <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          {{ t('home.hero.title') }}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
          {{ t('home.hero.lead') }}
        </p>
        <p class="mt-4 text-base leading-relaxed text-slate-500">
          {{ t('home.hero.subLead') }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NuxtLink :to="localePath('contact')">
            <BaseButton size="lg">{{ t('home.hero.ctaPrimary') }}</BaseButton>
          </NuxtLink>
          <NuxtLink :to="localePath('projects')">
            <BaseButton variant="secondary" size="lg">
              {{ t('home.hero.ctaSecondary') }}
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
