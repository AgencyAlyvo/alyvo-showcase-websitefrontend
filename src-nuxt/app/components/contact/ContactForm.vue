<script setup lang="ts">
const { t, locale } = useI18n()

const form = reactive({
  name: '',
  email: '',
  company: '',
  need: '',
  stage: '',
  budget: '',
  message: '',
})

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const needOptions = computed(() =>
  ['leads', 'site', 'seo', 'automation', 'app', 'tool', 'other'].map((value) => ({
    value,
    label: t(`contact.form.needOptions.${value}`),
  })),
)

const stageOptions = computed(() =>
  ['idea', 'defined', 'existing', 'urgent'].map((value) => ({
    value,
    label: t(`contact.form.stageOptions.${value}`),
  })),
)

const budgetOptions = computed(() =>
  ['unsure', 'small', 'medium', 'large', 'xl'].map((value) => ({
    value,
    label: t(`contact.form.budgetOptions.${value}`),
  })),
)

async function onSubmit() {
  if (status.value === 'sending') return
  status.value = 'sending'

  try {
    await $fetch('/api/contact' as never, {
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

<template>
  <form class="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8" novalidate @submit.prevent="onSubmit">
    <h2 class="text-xl font-semibold text-slate-900">{{ t('contact.form.title') }}</h2>

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
      <p v-if="status === 'success'" class="rounded-xl bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
        {{ t('contact.form.success') }}
      </p>
      <p v-if="status === 'error'" class="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-700">
        {{ t('contact.form.error') }}
      </p>
    </div>
  </form>
</template>
