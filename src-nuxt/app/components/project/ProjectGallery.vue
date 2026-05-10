<template>
  <BaseSection v-if="images.length > 0" tone="muted" container-size="xl">
    <div class="grid gap-6 md:grid-cols-2">
      <figure
        v-for="image in images"
        :key="image.src"
        class="border-default bg-default overflow-hidden rounded-2xl border"
      >
        <img :src="image.src" :alt="image.alt" loading="lazy" class="aspect-[16/10] w-full object-cover" />
      </figure>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { ProjectImage } from '#src-nuxt/shared/types/project'

defineProps<{
  images: ProjectImage[]
}>()
</script>
