<template>
  <div class="bg-default flex min-h-screen items-center justify-center px-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>
