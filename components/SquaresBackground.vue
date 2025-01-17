<script setup lang="ts">
// Source: https://www.reactbits.dev/backgrounds/squares
// converted to Vue

const attrs = useAttrs()

const props = withDefaults(
  defineProps<{
    direction?: "right" | "left" | "up" | "down" | "diagonal"
    speed?: number
    borderColor?: string
    squareSize?: number
    hoverFillColor?: string
  }>(),
  {
    direction: "diagonal",
    speed: 0.5,
    borderColor: "#999",
    squareSize: 40,
    hoverFillColor: "#222",
  },
)

const gridOffset = ref({ x: 0, y: 0 })
const hoveredSquare = ref<{ x: number; y: number } | null>(null)
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
  canvas.value.addEventListener("mousemove", handleMouseMove)
  canvas.value.addEventListener("mouseleave", handleMouseLeave)

  requestRef.value = requestAnimationFrame(updateAnimation)
})

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas)
  if (canvas.value) {
    canvas.value.removeEventListener("mousemove", handleMouseMove)
    canvas.value.removeEventListener("mouseleave", handleMouseLeave)
  }
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

      if (
        hoveredSquare.value &&
        Math.floor((x - startX) / props.squareSize) === hoveredSquare.value.x &&
        Math.floor((y - startY) / props.squareSize) === hoveredSquare.value.y
      ) {
        context.fillStyle = props.hoverFillColor
        context.fillRect(squareX, squareY, props.squareSize, props.squareSize)
      }

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
  switch (props.direction) {
    case "right":
      gridOffset.value.x =
        (gridOffset.value.x - effectiveSpeed + props.squareSize) %
        props.squareSize
      break
    case "left":
      gridOffset.value.x =
        (gridOffset.value.x + effectiveSpeed + props.squareSize) %
        props.squareSize
      break
    case "up":
      gridOffset.value.y =
        (gridOffset.value.y + effectiveSpeed + props.squareSize) %
        props.squareSize
      break
    case "down":
      gridOffset.value.y =
        (gridOffset.value.y - effectiveSpeed + props.squareSize) %
        props.squareSize
      break
    case "diagonal":
      gridOffset.value.x =
        (gridOffset.value.x - effectiveSpeed + props.squareSize) %
        props.squareSize
      gridOffset.value.y =
        (gridOffset.value.y - effectiveSpeed + props.squareSize) %
        props.squareSize
      break
  }

  drawGrid()
  requestRef.value = requestAnimationFrame(updateAnimation)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  const startX =
    Math.floor(gridOffset.value.x / props.squareSize) * props.squareSize
  const startY =
    Math.floor(gridOffset.value.y / props.squareSize) * props.squareSize

  const hoveredSquareX = Math.floor(
    (mouseX + gridOffset.value.x - startX) / props.squareSize,
  )
  const hoveredSquareY = Math.floor(
    (mouseY + gridOffset.value.y - startY) / props.squareSize,
  )

  hoveredSquare.value = { x: hoveredSquareX, y: hoveredSquareY }
}

const handleMouseLeave = () => {
  hoveredSquare.value = null
}
</script>

<template>
  <canvas
    v-bind="{ ...attrs }"
    ref="canvas"
    class="w-full h-full border-none block"
  />
</template>
