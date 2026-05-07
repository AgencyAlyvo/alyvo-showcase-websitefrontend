<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
})

const valueItems = ['clarity', 'advice', 'tech', 'business', 'execution', 'seo', 'support'] as const

const methodItems = ['understand', 'simplify', 'user', 'performance', 'maintain'] as const

const whyItems = ['decisions', 'time', 'fit', 'understand', 'evolve'] as const
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-white via-slate-50 to-white">
      <BaseContainer size="xl" class="py-20 sm:py-28">
        <div class="mx-auto max-w-3xl text-center">
          <BaseBadge>{{ t('about.hero.eyebrow') }}</BaseBadge>
          <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {{ t('about.hero.title') }}
          </h1>
          <p class="mt-6 text-lg leading-relaxed text-slate-600">
            {{ t('about.hero.lead') }}
          </p>
        </div>
      </BaseContainer>
    </section>

    <BaseSection container-size="md">
      <BaseBadge>{{ t('about.vision.eyebrow') }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {{ t('about.vision.title') }}
      </h2>
      <p class="mt-6 text-lg leading-relaxed text-slate-700">
        {{ t('about.vision.lead') }}
      </p>
      <p class="mt-4 text-base leading-relaxed text-slate-600">
        {{ t('about.vision.extra') }}
      </p>
    </BaseSection>

    <BaseSection tone="muted" container-size="xl">
      <div class="mx-auto max-w-2xl text-center">
        <BaseBadge>{{ t('about.value.eyebrow') }}</BaseBadge>
        <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {{ t('about.value.title') }}
        </h2>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="key in valueItems" :key="key" class="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h3 class="text-base font-semibold text-slate-900">
            {{ t(`about.value.items.${key}.title`) }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">
            {{ t(`about.value.items.${key}.description`) }}
          </p>
        </div>
      </div>
    </BaseSection>

    <BaseSection container-size="lg">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <BaseBadge>{{ t('about.method.eyebrow') }}</BaseBadge>
          <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {{ t('about.method.title') }}
          </h2>
          <ul class="mt-8 space-y-3">
            <li
              v-for="item in methodItems"
              :key="item"
              class="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200"
            >
              <span
                class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white"
                aria-hidden="true"
              >
                ✓
              </span>
              <span class="text-sm font-medium text-slate-800">
                {{ t(`about.method.items.${item}`) }}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <BaseBadge>{{ t('about.why.eyebrow') }}</BaseBadge>
          <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {{ t('about.why.title') }}
          </h2>
          <ul class="mt-8 space-y-3">
            <li
              v-for="item in whyItems"
              :key="item"
              class="rounded-2xl bg-white p-5 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200"
            >
              {{ t(`about.why.items.${item}`) }}
            </li>
          </ul>
        </div>
      </div>
    </BaseSection>

    <SectionsFinalCtaSection :title="t('about.cta.title')" :lead="t('about.cta.lead')" />
  </div>
</template>
