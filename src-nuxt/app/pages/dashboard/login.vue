<template>
  <UCard class="w-full max-w-md" :ui="{ body: 'p-6 sm:p-8' }">
    <div class="mb-8 flex justify-center">
      <span
        class="bg-primary text-inverted flex size-12 items-center justify-center rounded-xl text-xl font-bold"
        aria-hidden="true"
      >
        A
      </span>
    </div>
    <h1 class="text-highlighted text-center text-xl font-semibold sm:text-2xl">Connexion au dashboard</h1>

    <form class="mt-8 flex flex-col gap-6" novalidate @submit.prevent="onSubmit">
      <BaseInput
        id="dashboard-password"
        v-model="password"
        label="Mot de passe"
        type="password"
        placeholder="Mot de passe"
        autocomplete="current-password"
        required
      />
      <UAlert v-if="errorMessage" color="error" variant="subtle" :description="errorMessage" />
      <BaseButton type="submit" size="lg" block :disabled="isSubmitting">
        {{ isSubmitting ? '…' : 'Se connecter' }}
      </BaseButton>
    </form>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

definePageMeta({
  layout: 'dashboard-login',
})

useHead({
  title: 'Connexion — Dashboard',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const password: Ref<string> = ref('')
const errorMessage: Ref<string | null> = ref(null)
const isSubmitting: Ref<boolean> = ref(false)

async function onSubmit(): Promise<void> {
  if (!password.value.trim()) {
    errorMessage.value = 'Le mot de passe est requis.'
    return
  }
  errorMessage.value = null
  isSubmitting.value = true
  try {
    await $fetch<{ ok: true }>('/api/auth/login', {
      method: 'POST',
      body: { password: password.value },
    })
    await navigateTo('/dashboard')
  } catch {
    errorMessage.value = 'Mot de passe invalide.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
