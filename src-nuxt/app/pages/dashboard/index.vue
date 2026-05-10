<template>
  <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
    <header class="mb-10">
      <h1 class="text-highlighted text-2xl font-semibold">Dashboard</h1>
      <p class="text-default mt-2">
        Bienvenue sur le back-office. Accédez aux outils ci-dessous pour auditer le SEO et suivre l'indexation Google.
      </p>
    </header>

    <nav class="grid gap-6 sm:grid-cols-2" aria-label="Sections du dashboard">
      <NuxtLink
        to="/dashboard/audit"
        class="group bg-elevated border-default hover:border-primary hover:bg-accented flex flex-col rounded-xl border p-6 transition-colors"
      >
        <div class="mb-3 flex items-center gap-2">
          <UIcon name="i-lucide-gauge" class="text-primary size-5" />
          <h2 class="group-hover:text-primary text-highlighted text-lg font-semibold">Audit SEO &amp; Performance</h2>
        </div>
        <p class="text-default mt-2 flex-1 text-sm">
          Liste des pages du site (sitemap) et rapport Lighthouse par page : performance, accessibilité, SEO, bonnes
          pratiques.
        </p>
        <span class="text-primary mt-4 inline-flex items-center text-sm font-medium">
          Ouvrir
          <UIcon name="i-lucide-chevron-right" class="ml-1 size-4" />
        </span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/indexing"
        class="group bg-elevated border-default hover:border-primary hover:bg-accented flex flex-col rounded-xl border p-6 transition-colors"
      >
        <div class="mb-3 flex items-center gap-2">
          <UIcon name="i-lucide-search" class="text-primary size-5" />
          <h2 class="group-hover:text-primary text-highlighted text-lg font-semibold">Indexation Google</h2>
        </div>
        <p class="text-default mt-2 flex-1 text-sm">
          Liste des pages du site et statut d'indexation dans Google Search Console. Actualiser les données et
          inspecter les URLs.
        </p>
        <span class="text-primary mt-4 inline-flex items-center text-sm font-medium">
          Ouvrir
          <UIcon name="i-lucide-chevron-right" class="ml-1 size-4" />
        </span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

useHead({
  title: 'Dashboard',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>
