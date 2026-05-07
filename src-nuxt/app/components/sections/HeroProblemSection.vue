<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative overflow-hidden bg-slate-950">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,theme(colors.indigo.900/60%),transparent)]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
      aria-hidden="true"
    />
    <BaseContainer size="xl" class="relative py-24 sm:py-36">
      <div class="mx-auto max-w-3xl text-center">
        <BaseBadge tone="dark">{{ t('home.hero.eyebrow') }}</BaseBadge>
        <h1 class="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          {{ t('home.hero.title') }}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
          {{ t('home.hero.lead') }}
        </p>
        <p class="mt-4 text-base leading-relaxed text-indigo-300/80">
          {{ t('home.hero.subLead') }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NuxtLink :to="localePath('contact')">
            <BaseButton size="lg" variant="accent">{{ t('home.hero.ctaPrimary') }}</BaseButton>
          </NuxtLink>
          <NuxtLink :to="localePath('projects')">
            <BaseButton variant="ghost-dark" size="lg">
              {{ t('home.hero.ctaSecondary') }}
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
