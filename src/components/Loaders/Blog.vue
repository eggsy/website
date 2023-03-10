<script>
export default {
  methods: {
    getRandomNumber() {
      return Math.floor(Math.random() * 5) + 1
    },
  },
}
</script>

<template>
  <div class="mt-12 space-y-12">
    <section v-for="i in 3" :key="i" class="space-y-4">
      <SkeletonLoader class="w-2/7 md:w-1/12 h-10" />

      <div class="flex flex-col space-y-3">
        <SkeletonLoader
          v-for="j in getRandomNumber()"
          :key="j"
          class="w-full h-14"
        />
      </div>
    </section>
  </div>
</template>
