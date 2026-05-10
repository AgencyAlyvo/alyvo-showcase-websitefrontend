<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="open" class="bg-default fixed inset-0 z-50 flex flex-col" role="dialog" aria-modal="true">
        <div class="border-default flex items-center justify-between border-b px-6 py-4">
          <NuxtLinkLocale to="index" class="text-highlighted font-semibold tracking-tight" @click="emit('close')">
            Studio
          </NuxtLinkLocale>
          <UButton
            :aria-label="t('nav.closeMenu')"
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            @click="emit('close')"
          />
        </div>
        <nav class="flex-1 overflow-y-auto px-6 py-8">
          <ul class="flex flex-col gap-2">
            <li v-for="link in links" :key="link.to as string">
              <NuxtLink
                :to="link.to"
                class="text-highlighted hover:bg-muted block rounded-xl px-4 py-4 text-2xl font-semibold tracking-tight"
                @click="emit('close')"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="border-default border-t p-6">
          <UButton
            :to="localePath('contact')"
            :label="t('buttons.talkAboutProject')"
            trailing-icon="i-lucide-arrow-right"
            block
            class="rounded-full"
            @click="emit('close')"
          />
          <div class="mt-4 flex justify-center">
            <LayoutLanguageSwitcher />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

/** Props for the optional mobile menu overlay. */
type MobileMenuProps = {
  open: boolean
}

/** Emits supported by the mobile menu. */
type MobileMenuEmits = {
  (e: 'close'): void
}

/** Link displayed inside the mobile menu. */
type MobileMenuLink = {
  to: string
  label: string
}

const props: MobileMenuProps = defineProps<MobileMenuProps>()
const emit: MobileMenuEmits = defineEmits<MobileMenuEmits>()

const { t } = useI18n()
const localePath: ReturnType<typeof useLocalePath> = useLocalePath()

const links: ComputedRef<MobileMenuLink[]> = computed((): MobileMenuLink[] => [
  { to: localePath('index'), label: t('nav.home') },
  { to: localePath('projects'), label: t('nav.projects') },
  { to: localePath('contact'), label: t('nav.contact') },
])

watch(
  () => props.open,
  (value: boolean): void => {
    if (import.meta.client) {
      document.body.style.overflow = value ? 'hidden' : ''
    }
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.18s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
