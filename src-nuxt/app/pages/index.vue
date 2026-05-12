<template>
  <div>
    <UPageHero
      :description="heroDescription"
      :links="heroLinks"
      :ui="{ container: '!pt-24 sm:!pt-32 lg:!pt-40 !pb-0', wrapper: 'hero-copy-reveal' }"
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
        <div class="home-video-frame">
          <div class="home-video-shell border-default overflow-hidden rounded-xl border bg-black shadow-sm">
            <video
              class="home-video-media aspect-video w-full object-cover"
              controls
              preload="metadata"
              poster="/videos/presentation-poster.jpg"
            >
              <source src="/videos/presentation.mp4" type="video/mp4" />
              {{ t('home.hero.videoFallback') }}
            </video>
          </div>
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
      class="reveal-section"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    >
      <div class="reveal-grid reveal-grid-problems grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="(item, index) in problemFeatures"
          :key="item.title"
          class="home-card reveal-item problem-card border-default bg-default group relative flex gap-4 overflow-hidden rounded-lg border p-5"
          :style="{ '--reveal-delay': `${index * 70}ms` }"
        >
          <span
            class="text-primary bg-primary/10 flex size-11 shrink-0 items-center justify-center rounded-full transition group-hover:scale-105"
          >
            <UIcon :name="item.icon" class="size-5" />
          </span>
          <h3 class="text-highlighted text-base leading-6 font-semibold">
            {{ item.title }}
          </h3>
        </article>
      </div>
    </UPageSection>

    <UPageSection
      :title="t('home.value.title')"
      :description="t('home.value.lead')"
      class="reveal-section"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    >
      <div class="reveal-grid reveal-grid-value grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="(item, index) in valueCards"
          :key="item.title"
          class="home-card reveal-item value-card border-default bg-default relative overflow-hidden rounded-lg border p-6"
          :style="{ '--reveal-delay': `${index * 80}ms` }"
        >
          <span class="text-primary/20 absolute top-4 right-5 text-4xl leading-none font-bold">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <div class="flex items-center gap-3">
            <span class="text-primary bg-primary/10 flex size-10 items-center justify-center rounded-lg">
              <UIcon :name="item.icon" class="size-5" />
            </span>
            <h3 class="text-highlighted text-lg font-semibold">
              {{ item.title }}
            </h3>
          </div>
          <p class="text-muted mt-4 text-sm leading-6">
            {{ item.description }}
          </p>
        </article>
      </div>
    </UPageSection>

    <UPageSection
      :title="t('home.solutions.title')"
      :description="t('home.solutions.lead')"
      class="reveal-section"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    >
      <div class="reveal-grid reveal-grid-solutions grid gap-5 lg:grid-cols-2">
        <article
          v-for="(item, index) in solutionCards"
          :key="item.title"
          class="home-card reveal-item solution-card border-default bg-default overflow-hidden rounded-lg border"
          :style="{ '--reveal-delay': `${index * 95}ms` }"
        >
          <div class="bg-primary h-1 w-full" />
          <div class="flex gap-4 p-6">
            <span class="text-primary bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
              <UIcon :name="item.icon" class="size-6" />
            </span>
            <div>
              <h3 class="text-highlighted text-xl font-semibold tracking-tight">
                {{ item.title }}
              </h3>
              <p class="text-muted mt-2 text-sm leading-6">
                {{ item.description }}
              </p>
            </div>
          </div>
          <div class="border-default grid gap-0 border-t sm:grid-cols-2">
            <div class="p-5">
              <p class="text-primary text-xs font-semibold tracking-normal uppercase">{{ t('projects.card.need') }}</p>
              <p class="text-muted mt-2 text-sm leading-6">{{ item.need }}</p>
            </div>
            <div class="border-default bg-muted border-t p-5 sm:border-t-0 sm:border-l">
              <p class="text-primary text-xs font-semibold tracking-normal uppercase">
                {{ t('projects.card.result') }}
              </p>
              <p class="text-highlighted mt-2 text-sm leading-6">{{ item.benefit }}</p>
            </div>
          </div>
        </article>
      </div>
    </UPageSection>

    <UPageSection
      :title="t('home.method.title')"
      :description="t('home.method.lead')"
      class="reveal-section"
      :ui="{ headline: 'text-left', title: 'text-left', description: 'text-left' }"
    >
      <ol class="reveal-grid reveal-grid-method grid gap-4 lg:grid-cols-5">
        <li
          v-for="(item, index) in methodFeatures"
          :key="item.title"
          class="home-card reveal-item method-card border-default bg-default rounded-lg border p-5"
          :style="{ '--reveal-delay': `${index * 75}ms` }"
        >
          <span class="bg-primary text-inverted flex size-9 items-center justify-center rounded-full text-sm font-bold">
            {{ index + 1 }}
          </span>
          <h3 class="text-highlighted mt-4 text-base font-semibold">
            {{ item.title }}
          </h3>
          <p class="text-muted mt-3 text-sm leading-6">
            {{ item.description }}
          </p>
        </li>
      </ol>
    </UPageSection>

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
    (key: string): HomeFeature => ({
      title: t(`home.method.steps.${key}.title`),
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

let revealObserver: IntersectionObserver | undefined

onMounted((): void => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const sections: NodeListOf<HTMLElement> = document.querySelectorAll('.reveal-section')

  revealObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry: IntersectionObserverEntry): void => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    },
    {
      rootMargin: '0px 0px -80px',
      threshold: 0.16,
    },
  )

  sections.forEach((section: HTMLElement): void => {
    section.classList.add('is-reveal-ready')
    revealObserver?.observe(section)
  })
})

onBeforeUnmount((): void => {
  revealObserver?.disconnect()
})
</script>

<style scoped>
:deep(.hero-copy-reveal) {
  animation: hero-copy-in 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

:deep(.hero-copy-reveal [data-slot='title']),
:deep(.hero-copy-reveal [data-slot='description']),
:deep(.hero-copy-reveal [data-slot='footer']) {
  animation: hero-copy-item-in 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

:deep(.hero-copy-reveal [data-slot='description']) {
  animation-delay: 110ms;
}

:deep(.hero-copy-reveal [data-slot='footer']) {
  animation-delay: 220ms;
}

.reveal-section {
  --section-start-y: 30px;

  transition:
    opacity 520ms ease,
    transform 520ms ease;
}

.reveal-section.is-reveal-ready:not(.is-visible) {
  opacity: 0;
  transform: translate3d(0, var(--section-start-y), 0);
}

.reveal-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-grid {
  --card-start-x: 0px;
  --card-start-y: 24px;

  overflow-x: clip;
}

@supports not (overflow: clip) {
  .reveal-grid {
    overflow-x: hidden;
  }
}

.reveal-grid-problems {
  --card-start-x: -28px;
  --card-start-y: 0px;
}

.reveal-grid-value {
  --card-start-x: 0px;
  --card-start-y: 30px;
}

.reveal-grid-solutions {
  --card-start-x: 34px;
  --card-start-y: 0px;
}

.reveal-grid-method {
  --card-start-x: 0px;
  --card-start-y: 34px;
}

.home-card {
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.reveal-item {
  transition:
    opacity 520ms ease,
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.reveal-section.is-reveal-ready:not(.is-visible) .reveal-item {
  opacity: 0;
  transform: translate3d(var(--card-start-x), var(--card-start-y), 0);
}

.reveal-section.is-visible .reveal-item {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition-delay: var(--reveal-delay, 0ms), var(--reveal-delay, 0ms), 0ms, 0ms;
}

.reveal-section.is-visible .reveal-item:hover {
  transform: translateY(-3px);
  transition-delay: 0ms;
}

.home-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 45px rgb(15 23 42 / 0.1);
}

.home-video-frame {
  position: relative;
  isolation: isolate;
  animation: video-shell-in 820ms cubic-bezier(0.22, 1, 0.36, 1) 280ms both;
}

.home-video-frame::before {
  position: absolute;
  inset: -14px;
  z-index: -1;
  pointer-events: none;
  content: '';
  background:
    linear-gradient(135deg, rgb(var(--ui-primary) / 0.22), transparent 38%),
    radial-gradient(circle at 78% 12%, rgb(var(--ui-primary) / 0.22), transparent 36%);
  border-radius: 1.4rem;
  opacity: 0;
  filter: blur(10px);
  animation: video-glow-in 900ms ease 520ms both;
}

.home-video-shell {
  position: relative;
  isolation: isolate;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;
}

.home-video-shell::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  content: '';
  background:
    radial-gradient(circle at 50% 46%, rgb(var(--ui-primary) / 0.16), transparent 38%),
    linear-gradient(
      135deg,
      rgb(var(--ui-primary) / 0.1) 0%,
      transparent 28%,
      transparent 72%,
      rgb(var(--ui-primary) / 0.1) 100%
    ),
    linear-gradient(180deg, rgb(255 255 255 / 0.06), transparent 34%, rgb(255 255 255 / 0.04));
  opacity: 0;
  animation: video-glow-in 900ms ease 520ms both;
}

.home-video-shell::after {
  position: absolute;
  top: -35%;
  bottom: -35%;
  left: -45%;
  z-index: 2;
  width: 32%;
  pointer-events: none;
  content: '';
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.3), transparent);
  opacity: 0;
  transform: rotate(18deg) translateX(-80%);
  animation: video-shine 1200ms ease 900ms both;
}

.home-video-shell:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: rgb(var(--ui-primary) / 0.45);
  box-shadow:
    0 22px 60px rgb(15 23 42 / 0.18),
    0 0 0 1px rgb(var(--ui-primary) / 0.14);
}

.home-video-media {
  transform-origin: center;
}

.problem-card::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  content: '';
  background: currentColor;
  color: rgb(var(--ui-primary));
  opacity: 0.7;
}

.problem-card::after {
  position: absolute;
  right: -24px;
  bottom: -24px;
  width: 72px;
  height: 72px;
  content: '';
  border: 1px solid currentColor;
  border-radius: 9999px;
  color: rgb(var(--ui-primary));
  opacity: 0.14;
}

.value-card span {
  box-shadow: inset 0 0 0 1px rgb(var(--ui-primary) / 0.22);
}

.value-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  content: '';
  background: linear-gradient(90deg, rgb(var(--ui-primary)), transparent);
}

.solution-card {
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.04);
}

@keyframes hero-copy-in {
  from {
    opacity: 0;
    transform: translate3d(-52px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes hero-copy-item-in {
  from {
    opacity: 0;
    transform: translate3d(-28px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes video-shell-in {
  0% {
    opacity: 0;
    transform: translate3d(0, 28px, 0);
    filter: blur(8px);
  }

  70% {
    opacity: 1;
    transform: translate3d(0, -3px, 0);
    filter: blur(0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
}

@keyframes video-glow-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes video-shine {
  0% {
    opacity: 0;
    transform: rotate(18deg) translateX(-80%);
  }

  22% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: rotate(18deg) translateX(420%);
  }
}

@media (prefers-reduced-motion: reduce) {
  :deep(.hero-copy-reveal),
  :deep(.hero-copy-reveal [data-slot='title']),
  :deep(.hero-copy-reveal [data-slot='description']),
  :deep(.hero-copy-reveal [data-slot='footer']),
  .reveal-section,
  .reveal-section.is-reveal-ready:not(.is-visible),
  .reveal-section.is-visible,
  .home-card,
  .reveal-item,
  .home-card:hover,
  .home-video-frame,
  .home-video-frame::before,
  .home-video-shell,
  .home-video-shell::before,
  .home-video-shell::after,
  .home-video-shell:hover,
  .home-video-media {
    opacity: 1;
    transform: none;
    filter: none;
    animation: none;
    transition: none;
  }
}
</style>
