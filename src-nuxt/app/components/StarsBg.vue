<template>
  <div class="pointer-events-none absolute inset-x-5 inset-y-0 z-[-1] overflow-hidden sm:inset-x-7 lg:inset-x-9">
    <svg
      class="pointer-events-none absolute inset-0"
      viewBox="0 0 1017 181"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <mask id="path-1-inside-1_846_160841" fill="white">
          <path d="M0 0H1017V181H0V0Z" />
        </mask>
        <path d="M0 0H1017V181H0V0Z" fill="url(#paint0_radial_846_160841)" fill-opacity="0.22" />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_846_160841"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(508.999 19.5) rotate(90.177) scale(161.501 509.002)"
        >
          <stop stop-color="var(--ui-primary)" />
          <stop offset="1" stop-color="var(--ui-primary)" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>

    <div class="stars absolute inset-x-0 top-0 size-full">
      <div
        v-for="(layer, index) in starLayers"
        :key="index"
        class="star-layer"
        :style="{
          '--star-duration': `${layer.duration}s`,
          '--star-opacity': layer.opacity,
          '--star-color': color,
        }"
      >
        <div
          v-for="(star, starIndex) in layer.stars"
          :key="starIndex"
          class="absolute rounded-full"
          :style="{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'var(--star-color)',
            opacity: 'var(--star-opacity)',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * Return the default star size range.
 * @returns {{ min: number, max: number }} Default star size range.
 */
function defaultStarSize(): { min: number; max: number } {
  return {
    min: 1,
    max: 2,
  }
}
</script>

<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'

/** Coordinates for one animated star. */
interface Star {
  x: number
  y: number
  size: number
}

/** Public properties for the animated star field. */
interface StarsProps {
  starCount?: number
  color?: string
  speed?: 'slow' | 'normal' | 'fast'
  size?: number | { min: number; max: number }
}

/** Properties resolved after Vue defaults are applied. */
type ResolvedStarsProps = {
  starCount: number
  color: string
  speed: 'slow' | 'normal' | 'fast'
  size: number | { min: number; max: number }
}

/** Animation settings for one star layer. */
interface SpeedLayer {
  duration: number
  opacity: number
  ratio: number
}

/** Render-ready layer of generated stars. */
type StarLayer = SpeedLayer & {
  stars: Star[]
}

/** Stars grouped by animation speed. */
type StarsState = {
  slow: Star[]
  normal: Star[]
  fast: Star[]
}

const props: Readonly<ResolvedStarsProps> = withDefaults(
  defineProps<{
    starCount?: StarsProps['starCount']
    color?: StarsProps['color']
    speed?: StarsProps['speed']
    size?: StarsProps['size']
  }>(),
  {
    starCount: 300,
    color: 'var(--ui-primary)',
    speed: 'normal',
    size: defaultStarSize,
  },
)

/**
 * Generate the moving star coordinates used by the CTA background.
 * @param {number} count - Number of stars to generate.
 * @returns {Star[]} Generated stars.
 */
const generateStars: (count: number) => Star[] = (count: number): Star[] =>
  Array.from({ length: count }, () => ({
    x: Math.floor(Math.random() * 2000),
    y: Math.floor(Math.random() * 2000),
    size:
      typeof props.size === 'number' ? props.size : Math.random() * (props.size.max - props.size.min) + props.size.min,
  }))

const speedMap: Record<'slow' | 'normal' | 'fast', SpeedLayer> = {
  slow: { duration: 200, opacity: 0.5, ratio: 0.3 },
  normal: { duration: 150, opacity: 0.75, ratio: 0.3 },
  fast: { duration: 100, opacity: 1, ratio: 0.4 },
}

const stars: Ref<StarsState> = useState<StarsState>(
  'home-stars',
  (): StarsState => ({
    slow: generateStars(Math.floor(props.starCount * speedMap.slow.ratio)),
    normal: generateStars(Math.floor(props.starCount * speedMap.normal.ratio)),
    fast: generateStars(Math.floor(props.starCount * speedMap.fast.ratio)),
  }),
)

const starLayers: ComputedRef<StarLayer[]> = computed((): StarLayer[] => [
  { stars: stars.value.fast, ...speedMap.fast },
  { stars: stars.value.normal, ...speedMap.normal },
  { stars: stars.value.slow, ...speedMap.slow },
])
</script>

<style scoped>
.stars {
  left: 50%;
  transform: translate(-50%);
  mask-image: linear-gradient(
    180deg,
    rgb(217 217 217 / 0%) 0%,
    rgb(217 217 217 / 80%) 25%,
    #d9d9d9 50%,
    rgb(217 217 217 / 80%) 75%,
    rgb(217 217 217 / 0%) 100%
  );
  mask-size: cover;
}

.star-layer {
  animation: risingStarsAnimation linear infinite;
  animation-duration: var(--star-duration);
  will-change: transform;
}

@keyframes risingStarsAnimation {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-2000px);
  }
}
</style>
