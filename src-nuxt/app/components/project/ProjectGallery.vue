<script setup lang="ts">
import type { ProjectImage } from '#src-nuxt/shared/types/project'

defineProps<{
  images: ProjectImage[]
}>()
</script>

<template>
  <BaseSection v-if="images.length > 0" tone="muted" container-size="xl">
    <div class="grid gap-6 md:grid-cols-2">
      <figure
        v-for="image in images"
        :key="image.src"
        class="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200"
      >
        <img :src="image.src" :alt="image.alt" loading="lazy" class="aspect-[16/10] w-full object-cover" />
      </figure>
    </div>
  </BaseSection>
</template>
