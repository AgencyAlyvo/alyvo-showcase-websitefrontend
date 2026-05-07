<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
    <LayoutAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
