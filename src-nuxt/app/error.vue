<template>
  <NuxtLayout>
    <section class="flex min-h-[70vh] items-center justify-center">
      <BaseContainer size="md" class="text-center">
        <p class="text-muted text-sm font-semibold tracking-wide uppercase">
          {{ status }}
        </p>
        <h1 class="text-highlighted mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {{ isNotFound ? t('project.notFound.title') : t('contact.form.error') }}
        </h1>
        <p class="text-muted mt-4 text-base leading-relaxed">
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

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { NuxtError } from '#app'

/** Props received by Nuxt's error boundary. */
type ErrorPageProps = {
  error: NuxtError
}

const props: ErrorPageProps = defineProps<ErrorPageProps>()

const { t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const status: ComputedRef<number> = computed((): number => props.error.statusCode ?? 500)
const isNotFound: ComputedRef<boolean> = computed((): boolean => status.value === 404)

useSeoMeta({
  title: isNotFound.value ? t('project.notFound.title') : `${status.value}`,
  robots: 'noindex, nofollow',
})

/**
 * Clears the current Nuxt error and sends the user home.
 */
function handleClear(): void {
  clearError({ redirect: localePath('index') as string })
}
</script>
