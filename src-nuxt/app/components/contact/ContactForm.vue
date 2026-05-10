<template>
  <UPageCard as="form" variant="subtle" class="p-6 sm:p-8" novalidate @submit.prevent="onSubmit">
    <h2 class="text-highlighted text-xl font-semibold">{{ t('contact.form.title') }}</h2>

    <div class="mt-6 grid gap-5 sm:grid-cols-2">
      <BaseInput
        v-model="form.name"
        :label="t('contact.form.name')"
        :placeholder="t('contact.form.namePlaceholder')"
        autocomplete="name"
        required
      />
      <BaseInput
        v-model="form.email"
        type="email"
        :label="t('contact.form.email')"
        :placeholder="t('contact.form.emailPlaceholder')"
        autocomplete="email"
        required
      />
    </div>

    <div class="mt-5">
      <BaseInput
        v-model="form.company"
        :label="t('contact.form.company')"
        :placeholder="t('contact.form.companyPlaceholder')"
        autocomplete="organization"
      />
    </div>

    <div class="mt-5 grid gap-5 sm:grid-cols-2">
      <BaseSelect
        v-model="form.need"
        :label="t('contact.form.need')"
        :placeholder="t('forms.select')"
        :options="needOptions"
      />
      <BaseSelect
        v-model="form.stage"
        :label="t('contact.form.stage')"
        :placeholder="t('forms.select')"
        :options="stageOptions"
      />
    </div>

    <div class="mt-5">
      <BaseSelect
        v-model="form.budget"
        :label="t('contact.form.budget')"
        :placeholder="t('forms.select')"
        :options="budgetOptions"
      />
    </div>

    <div class="mt-5">
      <BaseTextarea
        v-model="form.message"
        :label="t('contact.form.message')"
        :placeholder="t('contact.form.messagePlaceholder')"
        required
      />
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <BaseButton type="submit" size="lg" :disabled="status === 'sending'">
        {{ status === 'sending' ? t('contact.form.sending') : t('contact.form.submit') }}
      </BaseButton>
      <UAlert
        v-if="status === 'success'"
        color="success"
        variant="subtle"
        :description="t('contact.form.success')"
        class="py-2 sm:max-w-sm"
      />
      <UAlert
        v-if="status === 'error'"
        color="error"
        variant="subtle"
        :description="t('contact.form.error')"
        class="py-2 sm:max-w-sm"
      />
    </div>
  </UPageCard>
</template>

<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'

const { t, locale } = useI18n()

/** Reactive state for the contact form. */
type ContactFormState = {
  name: string
  email: string
  company: string
  need: string
  stage: string
  budget: string
  message: string
}

/** Select option used by contact form fields. */
type ContactFormOption = {
  value: string
  label: string
}

/** Submission state for the contact form. */
type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error'

const form: ContactFormState = reactive({
  name: '',
  email: '',
  company: '',
  need: '',
  stage: '',
  budget: '',
  message: '',
})

const status: Ref<ContactFormStatus> = ref('idle')

const needOptions: ComputedRef<ContactFormOption[]> = computed((): ContactFormOption[] =>
  ['leads', 'site', 'seo', 'automation', 'app', 'tool', 'other'].map(
    (value: string): ContactFormOption => ({
      value,
      label: t(`contact.form.needOptions.${value}`),
    }),
  ),
)

const stageOptions: ComputedRef<ContactFormOption[]> = computed((): ContactFormOption[] =>
  ['idea', 'defined', 'existing', 'urgent'].map(
    (value: string): ContactFormOption => ({
      value,
      label: t(`contact.form.stageOptions.${value}`),
    }),
  ),
)

const budgetOptions: ComputedRef<ContactFormOption[]> = computed((): ContactFormOption[] =>
  ['unsure', 'small', 'medium', 'large', 'xl'].map(
    (value: string): ContactFormOption => ({
      value,
      label: t(`contact.form.budgetOptions.${value}`),
    }),
  ),
)

/**
 * Sends the contact form payload to the local API endpoint.
 * @returns {Promise<void>} Nothing.
 */
async function onSubmit(): Promise<void> {
  if (status.value === 'sending') return
  status.value = 'sending'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, locale: locale.value },
    })
    status.value = 'success'
    Object.assign(form, {
      name: '',
      email: '',
      company: '',
      need: '',
      stage: '',
      budget: '',
      message: '',
    })
  } catch {
    status.value = 'error'
  }
}
</script>
