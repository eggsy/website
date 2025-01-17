<script setup lang="ts">
const route = useRoute()

const routeIsBlog = computed(() => {
  return route.name?.includes("blog")
})

const getTargetLink = computed(() => {
  const path = route.path

  if (path !== "/projects/premid" && path.startsWith("/projects/premid"))
    return "/projects/premid"
  else if (routeIsBlog.value && route.params?.slug) return "/blog"
  else return "/"
})
</script>

<template>
  <nav class="w-full">
    <div class="responsive-screen relative">
      <div class="flex items-center gap-6 justify-between">
        <SmartLink
          :href="getTargetLink"
          class="flex-shrink-0 h-10 w-10 flex items-center space-x-4"
        >
          <SmartImage
            src="/assets/icons/icon.svg"
            class="rounded-md bg-gray-100 ring-black transition-transform ring-2 ring-opacity-5 sm:transform hover:-rotate-6 flex-shrink-0 h-10 w-10"
          />

          <Transition name="fade" mode="out-in">
            <span
              v-if="routeIsBlog"
              class="text-black/90 text-sm uppercase font-medium dark:text-white/90"
            >
              Blog
            </span>
          </Transition>
        </SmartLink>

        <div class="flex space-x-2 items-center">
          <ColorSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>
