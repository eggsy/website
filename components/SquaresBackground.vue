<script setup lang="ts">
// Source: https://www.reactbits.dev/backgrounds/squares
// converted to Vue

const props = withDefaults(
  defineProps<{
    speed?: number
    borderColor?: string
    squareSize?: number
  }>(),
  {
    speed: 0.5,
    borderColor: "#999",
    squareSize: 40,
  },
)

const gridOffset = ref({ x: 0, y: 0 })
const requestRef = ref<number | null>(0)
const numSquaresX = ref(0)
const numSquaresY = ref(0)
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

onMounted(() => {
  canvas.value = document.querySelector("canvas") as HTMLCanvasElement
  if (!canvas.value) return

  ctx.value = canvas.value.getContext("2d")!
  if (!ctx.value) return

  resizeCanvas()

  window.addEventListener("resize", resizeCanvas)
  requestRef.value = requestAnimationFrame(updateAnimation)
})

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas)
  if (requestRef.value) cancelAnimationFrame(requestRef.value)
})

const resizeCanvas = () => {
  if (!canvas.value) return

  canvas.value.width = canvas.value.offsetWidth
  canvas.value.height = canvas.value.offsetHeight
  numSquaresX.value = Math.ceil(canvas.value.width / props.squareSize) + 1
  numSquaresY.value = Math.ceil(canvas.value.height / props.squareSize) + 1
}

const drawGrid = () => {
  if (!canvas.value || !ctx.value) return

  const context = ctx.value
  context.clearRect(0, 0, canvas.value.width, canvas.value.height)

  const startX =
    Math.floor(gridOffset.value.x / props.squareSize) * props.squareSize
  const startY =
    Math.floor(gridOffset.value.y / props.squareSize) * props.squareSize

  for (
    let x = startX;
    x < canvas.value.width + props.squareSize;
    x += props.squareSize
  ) {
    for (
      let y = startY;
      y < canvas.value.height + props.squareSize;
      y += props.squareSize
    ) {
      const squareX = x - (gridOffset.value.x % props.squareSize)
      const squareY = y - (gridOffset.value.y % props.squareSize)

      context.strokeStyle = props.borderColor
      context.strokeRect(squareX, squareY, props.squareSize, props.squareSize)
    }
  }

  const gradient = context.createRadialGradient(
    canvas.value.width / 2,
    canvas.value.height / 2,
    0,
    canvas.value.width / 2,
    canvas.value.height / 2,
    Math.sqrt(canvas.value.width ** 2 + canvas.value.height ** 2) / 2,
  )

  gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
  gradient.addColorStop(1, "#171717")

  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.value.width, canvas.value.height)
}

const updateAnimation = () => {
  const effectiveSpeed = Math.max(props.speed, 0.1)

  gridOffset.value.x =
    (gridOffset.value.x - effectiveSpeed + props.squareSize) % props.squareSize
  gridOffset.value.y =
    (gridOffset.value.y - effectiveSpeed + props.squareSize) % props.squareSize

  drawGrid()
  requestRef.value = requestAnimationFrame(updateAnimation)
}
</script>

<template>
  <canvas ref="canvas" class="w-full h-full border-none block" />
</template>
