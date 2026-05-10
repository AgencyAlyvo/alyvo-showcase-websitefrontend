<template>
  <ClientOnly>
    <div
      class="bg-default/80 pointer-events-none fixed inset-x-0 z-40 h-px backdrop-blur"
      style="top: var(--ui-header-height, 4rem)"
      aria-hidden="true"
    >
      <div
        class="bg-primary h-full origin-left transition-transform duration-100 ease-out"
        :style="{ transform: `scaleX(${progress})` }"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const progress: Ref<number> = ref(0)
let frame: number | undefined

/**
 * Keeps the progress value inside CSS transform-safe bounds.
 * @param {number} value - Raw scroll ratio.
 * @returns {number} A ratio between 0 and 1.
 */
function clampProgress(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * Computes how far the user has scrolled through the current page.
 * @returns {number} The current page scroll progress.
 */
function getScrollProgress(): number {
  const root: HTMLElement = document.documentElement
  const scrollableHeight: number = root.scrollHeight - window.innerHeight

  if (scrollableHeight <= 0) {
    return 1
  }

  return clampProgress(window.scrollY / scrollableHeight)
}

/**
 * Writes the latest scroll progress to Vue state.
 */
function updateProgress(): void {
  progress.value = getScrollProgress()
}

/**
 * Batches scroll and resize events into one animation frame.
 */
function queueProgressUpdate(): void {
  if (frame !== undefined) {
    return
  }

  frame = window.requestAnimationFrame((): void => {
    updateProgress()
    frame = undefined
  })
}

onMounted((): void => {
  updateProgress()
  window.addEventListener('scroll', queueProgressUpdate, { passive: true })
  window.addEventListener('resize', queueProgressUpdate)
})

onBeforeUnmount((): void => {
  window.removeEventListener('scroll', queueProgressUpdate)
  window.removeEventListener('resize', queueProgressUpdate)

  if (frame !== undefined) {
    window.cancelAnimationFrame(frame)
  }
})
</script>
