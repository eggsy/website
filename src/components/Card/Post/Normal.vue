<script lang="ts">
import Vue, { PropType } from "vue"

// Import type
import type { PostMeta } from "./Index.vue"

export default Vue.extend({
  props: {
    meta: {
      type: Object as PropType<PostMeta>,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      hovered: false,
    }
  },
})
</script>

<template>
  <div
    v-if="meta"
    class="overflow-hidden"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <SmartLink
      :title="meta.title"
      :href="{
        name: 'blog-slug',
        params: { slug: meta.slug },
      }"
      class="rounded-lg cursor-pointer space-y-2 focus-ring"
    >
      <div class="relative">
        <SmartImage
          :src="meta.image"
          class="rounded h-40 w-full filter dark:brightness-75"
        />

        <transition name="fade" mode="out-in">
          <div
            v-show="hovered"
            class="flex bg-black/50 inset-0 absolute items-center justify-center"
          >
            <IconLink class="h-6 text-white w-6" />
          </div>
        </transition>
      </div>

      <div class="flex flex-col space-y-1">
        <h2
          class="font-medium text-lg leading-tight text-gray-700 truncate dark:text-gray-200 hover:underline"
        >
          {{ meta.title }}
        </h2>

        <p class="text-neutral-500 line-clamp-2">
          {{ meta.description }}
        </p>
      </div>
    </SmartLink>
  </div>
</template>
