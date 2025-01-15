<script lang="ts">
// Source: https://www.reactbits.dev/backgrounds/squares
// converted to Vue

import Vue from "vue"

export default Vue.extend({
  name: "Squares",
  props: {
    direction: {
      type: String as () => "right" | "left" | "up" | "down" | "diagonal",
      default: "right",
    },
    speed: {
      type: Number,
      default: 1,
    },
    borderColor: {
      type: String,
      default: "#999",
    },
    squareSize: {
      type: Number,
      default: 40,
    },
    hoverFillColor: {
      type: String,
      default: "#222",
    },
  },
  data() {
    return {
      gridOffset: { x: 0, y: 0 },
      hoveredSquare: null as { x: number; y: number } | null,
      requestRef: 0 as number | null,
      numSquaresX: 0,
      numSquaresY: 0,
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    if (!this.canvas) return
    this.ctx = this.canvas.getContext("2d")
    if (!this.ctx) return

    this.resizeCanvas()

    window.addEventListener("resize", this.resizeCanvas)
    this.canvas.addEventListener("mousemove", this.handleMouseMove)
    this.canvas.addEventListener("mouseleave", this.handleMouseLeave)

    this.requestRef = requestAnimationFrame(this.updateAnimation)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeCanvas)
    if (this.canvas) {
      this.canvas.removeEventListener("mousemove", this.handleMouseMove)
      this.canvas.removeEventListener("mouseleave", this.handleMouseLeave)
    }
    if (this.requestRef) cancelAnimationFrame(this.requestRef)
  },
  methods: {
    resizeCanvas() {
      if (!this.canvas) return

      this.canvas.width = this.canvas.offsetWidth
      this.canvas.height = this.canvas.offsetHeight
      this.numSquaresX = Math.ceil(this.canvas.width / this.squareSize) + 1
      this.numSquaresY = Math.ceil(this.canvas.height / this.squareSize) + 1
    },
    drawGrid() {
      if (!this.canvas || !this.ctx) return

      const ctx = this.ctx
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      const startX =
        Math.floor(this.gridOffset.x / this.squareSize) * this.squareSize
      const startY =
        Math.floor(this.gridOffset.y / this.squareSize) * this.squareSize

      for (
        let x = startX;
        x < this.canvas.width + this.squareSize;
        x += this.squareSize
      ) {
        for (
          let y = startY;
          y < this.canvas.height + this.squareSize;
          y += this.squareSize
        ) {
          const squareX = x - (this.gridOffset.x % this.squareSize)
          const squareY = y - (this.gridOffset.y % this.squareSize)

          if (
            this.hoveredSquare &&
            Math.floor((x - startX) / this.squareSize) ===
              this.hoveredSquare.x &&
            Math.floor((y - startY) / this.squareSize) === this.hoveredSquare.y
          ) {
            ctx.fillStyle = this.hoverFillColor
            ctx.fillRect(squareX, squareY, this.squareSize, this.squareSize)
          }

          ctx.strokeStyle = this.borderColor
          ctx.strokeRect(squareX, squareY, this.squareSize, this.squareSize)
        }
      }

      const gradient = ctx.createRadialGradient(
        this.canvas.width / 2,
        this.canvas.height / 2,
        0,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.sqrt(this.canvas.width ** 2 + this.canvas.height ** 2) / 2
      )
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "#171717")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    updateAnimation() {
      const effectiveSpeed = Math.max(this.speed, 0.1)
      switch (this.direction) {
        case "right":
          this.gridOffset.x =
            (this.gridOffset.x - effectiveSpeed + this.squareSize) %
            this.squareSize
          break
        case "left":
          this.gridOffset.x =
            (this.gridOffset.x + effectiveSpeed + this.squareSize) %
            this.squareSize
          break
        case "up":
          this.gridOffset.y =
            (this.gridOffset.y + effectiveSpeed + this.squareSize) %
            this.squareSize
          break
        case "down":
          this.gridOffset.y =
            (this.gridOffset.y - effectiveSpeed + this.squareSize) %
            this.squareSize
          break
        case "diagonal":
          this.gridOffset.x =
            (this.gridOffset.x - effectiveSpeed + this.squareSize) %
            this.squareSize
          this.gridOffset.y =
            (this.gridOffset.y - effectiveSpeed + this.squareSize) %
            this.squareSize
          break
      }

      this.drawGrid()
      this.requestRef = requestAnimationFrame(this.updateAnimation)
    },
    handleMouseMove(event: MouseEvent) {
      if (!this.canvas) return

      const rect = this.canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      const startX =
        Math.floor(this.gridOffset.x / this.squareSize) * this.squareSize
      const startY =
        Math.floor(this.gridOffset.y / this.squareSize) * this.squareSize

      const hoveredSquareX = Math.floor(
        (mouseX + this.gridOffset.x - startX) / this.squareSize
      )
      const hoveredSquareY = Math.floor(
        (mouseY + this.gridOffset.y - startY) / this.squareSize
      )

      this.hoveredSquare = { x: hoveredSquareX, y: hoveredSquareY }
    },
    handleMouseLeave() {
      this.hoveredSquare = null
    },
  },
})
</script>

<template>
  <canvas ref="canvas" class="w-full h-full border-none block"></canvas>
</template>
