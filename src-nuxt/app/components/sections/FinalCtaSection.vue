<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lead?: string
    cta?: string
  }>(),
  {},
)

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <BaseSection tone="dark" container-size="md">
    <div class="text-center">
      <BaseBadge v-if="eyebrow" tone="dark">{{ eyebrow }}</BaseBadge>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {{ title }}
      </h2>
      <p v-if="lead" class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
        {{ lead }}
      </p>
      <div class="mt-8 flex justify-center">
        <NuxtLink :to="localePath('contact')">
          <BaseButton variant="dark" size="lg">
            {{ cta ?? t('buttons.talkAboutProject') }}
          </BaseButton>
        </NuxtLink>
      </div>
    </div>
  </BaseSection>
</template>
