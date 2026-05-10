<template>
  <div>
    <UPageHero
      :description="heroDescription"
      :links="heroLinks"
      :ui="{ container: '!pt-24 sm:!pt-32 lg:!pt-40 !pb-0' }"
      class="relative overflow-hidden"
    >
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <span>{{ t('home.hero.title') }}</span>
        <span class="text-primary block">{{ t('home.hero.lead') }}</span>
      </template>

      <div>
        <div class="border-default overflow-hidden rounded-xl border bg-black shadow-sm">
          <video
            class="aspect-video w-full object-cover"
            controls
            preload="metadata"
            poster="/videos/presentation-poster.jpg"
          >
            <source src="/videos/presentation.mp4" type="video/mp4" />
            {{ t('home.hero.videoFallback') }}
          </video>
        </div>
        <div class="mt-[50px] flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6">
          <a
            :href="`mailto:${t('home.hero.contact.email')}`"
            class="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-base font-semibold transition-colors sm:text-lg"
          >
            <UIcon name="i-lucide-mail" class="size-5" />
            {{ t('home.hero.contact.email') }}
          </a>
          <span class="text-muted hidden sm:inline">•</span>
          <a
            :href="`tel:${t('home.hero.contact.phone').replace(/[^+\d]/g, '')}`"
            class="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-base font-semibold transition-colors sm:text-lg"
          >
            <UIcon name="i-lucide-phone" class="size-5" />
            {{ t('home.hero.contact.phone') }}
          </a>
        </div>
      </div>
      <div
        class="border-default bg-default relative right-1/2 left-1/2 -mx-[50vw] mt-[10px] grid w-screen grid-cols-1 gap-3 border p-4 sm:grid-cols-3 sm:gap-4 sm:p-5"
      >
        <div class="flex flex-col items-center text-center">
          <p class="text-highlighted text-2xl font-bold">{{ t('home.hero.stats.experience.value') }}</p>
          <p class="text-muted text-sm">{{ t('home.hero.stats.experience.label') }}</p>
        </div>
        <div class="flex flex-col items-center text-center">
          <p class="text-highlighted text-2xl font-bold">{{ t('home.hero.stats.company.value') }}</p>
          <p class="text-muted text-sm">{{ t('home.hero.stats.company.label') }}</p>
        </div>
        <div class="flex flex-col items-center text-center">
          <p class="text-highlighted text-2xl font-bold">{{ t('home.hero.stats.passion.value') }}</p>
          <p class="text-muted text-sm">{{ t('home.hero.stats.passion.label') }}</p>
        </div>
      </div>
    </UPageHero>

    <UPageSection
      id="problems"
      :title="t('home.problems.title')"
      :description="t('home.problems.lead')"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    >
      <UPageGrid class="sm:grid-cols-2 xl:grid-cols-3">
        <UPageCard
          v-for="item in problemFeatures"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          variant="soft"
          class="border-primary/20 bg-default ring-primary/10 border shadow-sm ring-1"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="t('home.value.title')"
      :description="t('home.value.lead')"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    >
      <UPageGrid>
        <UPageCard v-for="item in valueCards" :key="item.title" v-bind="item" spotlight />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="t('home.solutions.title')"
      :description="t('home.solutions.lead')"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    >
      <UPageGrid class="lg:grid-cols-2">
        <UPageCard
          v-for="item in solutionCards"
          :key="item.title"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          variant="soft"
          class="border-primary/20 bg-default ring-primary/10 border-l-4 shadow-sm ring-1"
        >
          <template #footer>
            <div class="border-default mt-4 space-y-3 border-t pt-4 text-sm">
              <p class="text-muted">
                <span class="text-highlighted font-medium">{{ t('projects.card.need') }}:</span> {{ item.need }}
              </p>
              <p class="text-primary">
                <span class="font-medium">{{ t('projects.card.result') }}:</span> {{ item.benefit }}
              </p>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="t('home.method.title')"
      :description="t('home.method.lead')"
      :features="methodFeatures"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    />

    <UPageSection :title="t('home.faq.title')" :ui="{ title: 'text-center' }">
      <UAccordion :items="faqItems" type="single" collapsible class="mx-auto max-w-3xl" />
    </UPageSection>

    <USeparator />

    <UPageCTA
      :title="t('home.finalCta.title')"
      :description="t('home.finalCta.lead')"
      :links="ctaLinks"
      variant="naked"
      class="overflow-hidden"
    >
      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

const { t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

usePageSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
})

/** Card-shaped item used by Nuxt UI page sections. */
type HomeFeature = {
  title: string
  description: string
  icon: string
}

/** Solution card with the extra business context from the current page content. */
type SolutionCard = HomeFeature & {
  need: string
  benefit: string
}

/** Item consumed by Nuxt UI accordion. */
type FaqItem = {
  value: string
  label: string
  content: string
}

/** Button/link configuration consumed by Nuxt UI page hero and CTA. */
type HomeLink = {
  label: string
  to: string
  icon?: string
  trailingIcon?: string
  color?: 'neutral'
  variant?: 'subtle'
  size?: 'xl'
}

const problemKeys: readonly string[] = ['leads', 'time', 'tool', 'idea', 'performance']
const valueKeys: readonly string[] = ['visibility', 'leads', 'time', 'experience', 'fit', 'evolutive']
const solutionKeys: readonly string[] = ['seoWeb', 'automation', 'redesign', 'scale']
const methodKeys: readonly string[] = ['understand', 'objectives', 'propose', 'build', 'improve']
const faqKeys: readonly string[] = ['unclear', 'price', 'time', 'existing', 'small']

const problemIcons: readonly string[] = [
  'i-lucide-target',
  'i-lucide-clock-3',
  'i-lucide-wrench',
  'i-lucide-rocket',
  'i-lucide-gauge',
  'i-lucide-plug',
]
const valueIcons: readonly string[] = [
  'i-lucide-search',
  'i-lucide-mouse-pointer-click',
  'i-lucide-timer-reset',
  'i-lucide-smile',
  'i-lucide-puzzle',
  'i-lucide-layers-3',
]
const solutionIcons: readonly string[] = [
  'i-lucide-globe-2',
  'i-lucide-workflow',
  'i-lucide-refresh-cw',
  'i-lucide-rocket',
]

/**
 * Return an optional translation without rendering the path when the key is missing.
 * @param {string} path - Translation path to read.
 * @returns {string} Translation text or an empty string.
 */
function optionalText(path: string): string {
  const value: string = t(path)
  return value === path ? '' : value.trim()
}

const heroDescription: ComputedRef<string> = computed(
  (): string => optionalText('home.hero.subLead') || t('seo.home.description'),
)

const heroLinks: ComputedRef<HomeLink[]> = computed((): HomeLink[] => [
  {
    label: t('home.hero.ctaPrimary'),
    trailingIcon: 'i-lucide-arrow-right',
    to: localePath('contact'),
    size: 'xl',
  },
  {
    label: t('home.hero.ctaSecondary'),
    icon: 'i-lucide-folder-kanban',
    color: 'neutral',
    variant: 'subtle',
    to: localePath('projects'),
    size: 'xl',
  },
])

const problemFeatures: ComputedRef<HomeFeature[]> = computed((): HomeFeature[] =>
  problemKeys.map(
    (key: string, index: number): HomeFeature => ({
      title: t(`home.problems.items.${key}.title`),
      description: optionalText(`home.problems.items.${key}.description`) || t(`home.problems.items.${key}.solution`),
      icon: problemIcons[index] ?? 'i-lucide-circle',
    }),
  ),
)

const valueCards: ComputedRef<HomeFeature[]> = computed((): HomeFeature[] =>
  valueKeys.map(
    (key: string, index: number): HomeFeature => ({
      title: t(`home.value.items.${key}.title`),
      description: t(`home.value.items.${key}.description`),
      icon: valueIcons[index] ?? 'i-lucide-circle',
    }),
  ),
)

const solutionCards: ComputedRef<SolutionCard[]> = computed((): SolutionCard[] =>
  solutionKeys.map(
    (key: string, index: number): SolutionCard => ({
      title: t(`home.solutions.items.${key}.title`),
      description: t(`home.solutions.items.${key}.solution`),
      need: t(`home.solutions.items.${key}.need`),
      benefit: t(`home.solutions.items.${key}.benefit`),
      icon: solutionIcons[index] ?? 'i-lucide-circle',
    }),
  ),
)

const methodFeatures: ComputedRef<HomeFeature[]> = computed((): HomeFeature[] =>
  methodKeys.map(
    (key: string, index: number): HomeFeature => ({
      title: `${index + 1}. ${t(`home.method.steps.${key}.title`)}`,
      description: t(`home.method.steps.${key}.description`),
      icon: 'i-lucide-circle-check',
    }),
  ),
)

const faqItems: ComputedRef<FaqItem[]> = computed((): FaqItem[] =>
  faqKeys.map(
    (key: string): FaqItem => ({
      value: key,
      label: t(`home.faq.items.${key}.question`),
      content: t(`home.faq.items.${key}.answer`),
    }),
  ),
)

const ctaLinks: ComputedRef<HomeLink[]> = computed((): HomeLink[] => [
  {
    label: t('home.finalCta.cta'),
    to: localePath('contact'),
    trailingIcon: 'i-lucide-arrow-right',
  },
  {
    label: t('buttons.viewAllProjects'),
    to: localePath('projects'),
    variant: 'subtle',
    color: 'neutral',
    icon: 'i-lucide-folder-kanban',
  },
])
</script>
