<template>
  <div class="bg-default text-highlighted flex min-h-screen">
    <!-- Mobile top bar -->
    <header
      class="bg-elevated border-default fixed top-0 right-0 left-0 z-40 flex h-[64px] items-center justify-between border-b px-4 md:hidden"
    >
      <NuxtLink to="/dashboard" class="flex items-center gap-2">
        <span
          class="bg-primary text-inverted flex size-7 items-center justify-center rounded-lg text-sm font-bold"
          aria-hidden="true"
        >
          A
        </span>
        <span class="text-highlighted text-sm font-bold tracking-tight">Dashboard</span>
      </NuxtLink>
      <UButton
        :icon="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        color="neutral"
        variant="ghost"
        aria-label="Menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      />
    </header>

    <!-- Desktop sidebar -->
    <aside
      class="bg-elevated border-default fixed top-0 left-0 z-40 hidden h-full w-64 flex-col border-r md:flex"
    >
      <div class="border-default flex h-[64px] items-center border-b px-4">
        <NuxtLink to="/dashboard" class="flex items-center gap-2">
          <span
            class="bg-primary text-inverted flex size-7 items-center justify-center rounded-lg text-sm font-bold"
            aria-hidden="true"
          >
            A
          </span>
          <span class="text-highlighted text-sm font-bold tracking-tight">Dashboard</span>
        </NuxtLink>
      </div>
      <nav class="flex flex-1 flex-col gap-1 px-3 py-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="
            isActive(link.to)
              ? 'bg-primary/10 text-primary'
              : 'text-default hover:bg-accented hover:text-highlighted'
          "
        >
          <UIcon :name="link.icon" class="size-4 shrink-0" />
          {{ link.label }}
        </NuxtLink>

        <div class="border-default mt-auto space-y-1 border-t pt-4">
          <button
            type="button"
            class="text-default hover:bg-accented hover:text-highlighted flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
            @click="onLogout"
          >
            <UIcon name="i-lucide-log-out" class="size-4 shrink-0" />
            Se déconnecter
          </button>
          <NuxtLink
            to="/"
            class="bg-muted hover:bg-accented text-default hover:text-highlighted flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
          >
            <UIcon name="i-lucide-arrow-left" class="size-4 shrink-0" />
            Retour au site
          </NuxtLink>
        </div>
      </nav>
    </aside>

    <main class="min-h-screen flex-1 pt-[64px] pl-0 md:pt-0 md:pl-64">
      <div :key="route.fullPath">
        <slot />
      </div>
    </main>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-show="mobileMenuOpen"
        class="fixed inset-0 z-[9998] bg-black/70 md:hidden"
        aria-hidden="true"
        @click.self="mobileMenuOpen = false"
      >
        <Transition name="slide-up-down">
          <div v-if="mobileMenuOpen" class="absolute right-0 bottom-0 left-0 z-[9999] max-h-[calc(100dvh-64px)]">
            <section class="bg-elevated relative w-full overflow-auto outline-none" @click.stop>
              <div class="flex flex-col gap-1 p-4">
                <NuxtLink
                  v-for="link in navLinks"
                  :key="link.to"
                  :to="link.to"
                  class="text-default hover:bg-accented hover:text-highlighted flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
                  @click="mobileMenuOpen = false"
                >
                  <UIcon :name="link.icon" class="size-4 shrink-0" />
                  {{ link.label }}
                </NuxtLink>
                <button
                  type="button"
                  class="text-default hover:bg-accented hover:text-highlighted flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium"
                  @click="onLogoutThenClose"
                >
                  <UIcon name="i-lucide-log-out" class="size-4 shrink-0" />
                  Se déconnecter
                </button>
                <NuxtLink
                  to="/"
                  class="bg-muted hover:bg-accented text-default hover:text-highlighted flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
                  @click="mobileMenuOpen = false"
                >
                  <UIcon name="i-lucide-arrow-left" class="size-4 shrink-0" />
                  Retour au site
                </NuxtLink>
              </div>
            </section>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type NavLink = {
  to: string
  label: string
  icon: string
}

const route = useRoute()
const mobileMenuOpen = ref<boolean>(false)

const navLinks: NavLink[] = [
  { to: '/dashboard/audit', label: 'Audit SEO', icon: 'i-lucide-gauge' },
  { to: '/dashboard/indexing', label: 'Indexation Google', icon: 'i-lucide-search' },
]

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(`${path}/`)
}

watch(mobileMenuOpen, (open: boolean): void => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

async function onLogout(): Promise<void> {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
  } finally {
    if (import.meta.client) {
      window.location.assign('/dashboard/login')
      return
    }
    await navigateTo('/dashboard/login')
  }
}

async function onLogoutThenClose(): Promise<void> {
  mobileMenuOpen.value = false
  await onLogout()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-down-enter-from,
.slide-up-down-leave-to {
  transform: translateY(100%);
}
</style>
