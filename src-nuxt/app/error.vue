<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const status = computed(() => props.error?.statusCode ?? 500)
const isNotFound = computed(() => status.value === 404)

useSeoMeta({
  title: isNotFound.value ? t('project.notFound.title') : `${status.value}`,
  robots: 'noindex, nofollow',
})

function handleClear() {
  clearError({ redirect: localePath('index') as string })
}
</script>

<template>
  <NuxtLayout>
    <section class="flex min-h-[70vh] items-center justify-center">
      <BaseContainer size="md" class="text-center">
        <p class="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          {{ status }}
        </p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {{ isNotFound ? t('project.notFound.title') : t('contact.form.error') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-slate-600">
          {{ isNotFound ? t('project.notFound.description') : '' }}
        </p>
        <div class="mt-8">
          <BaseButton size="lg" @click="handleClear">
            {{ t('nav.home') }}
          </BaseButton>
        </div>
      </BaseContainer>
    </section>
  </NuxtLayout>
</template>
