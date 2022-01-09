<template>
  <div class="space-y-12 px-4 text-gray-500 dark:text-neutral-600">
    <header class="space-y-2 my-12">
      <SkeletonLoader class="h-10 w-1/6" />
      <SkeletonLoader class="h-5 w-4/12" />
      <SkeletonLoader class="h-4 w-1/6" />
    </header>

    <div class="space-y-9">
      <div v-for="item in 6" :key="item" class="space-y-4">
        <SkeletonLoader class="h-6 w-1/6" />

        <div class="space-y-2">
          <div
            v-for="inline in 3"
            :key="`inline-${inline}`"
            class="flex space-x-2 items-center"
          >
            <SkeletonLoader class="h-5 w-5" />
            <SkeletonLoader
              class="h-5"
              :class="inline % 2 === 0 ? 'w-3/12' : 'w-1/5'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
