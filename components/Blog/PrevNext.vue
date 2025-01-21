<script setup lang="ts">
import { SmartLink } from "#components"

interface Props {
  path: string
}

const props = defineProps<Props>()

const { data: surroundPosts, status } = await useLazyAsyncData(
  `${props.path}-surround`,
  () => {
    return queryCollectionItemSurroundings("posts", props.path).order(
      "createdAt",
      "DESC",
    )
  },
)

const prev = computed(() => surroundPosts.value?.[0] || null)
const next = computed(() => surroundPosts.value?.[1] || null)
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="status !== 'pending'"
      class="grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2"
    >
      <Component
        :is="prev ? SmartLink : 'div'"
        :href="prev && prev.path"
        class="rounded-lg card-base flex items-center space-x-2"
        :class="
          !prev
            ? 'cursor-not-allowed'
            : 'dark:hover:text-white hover:bg-opacity-40'
        "
      >
        <Icon name="heroicons:chevron-left" class="h-4 w-4 flex-shrink-0" />

        <span v-if="prev" class="truncate">{{ prev.title }}</span>
        <span v-else class="truncate">Daha Yeni Gönderi Yok</span>
      </Component>

      <Component
        :is="next ? SmartLink : 'div'"
        :href="next && next.path"
        :class="[
          'rounded-lg card-base flex items-center space-x-2 justify-end',
          !next
            ? 'cursor-not-allowed'
            : 'dark:hover:text-white hover:bg-opacity-40',
        ]"
      >
        <span v-if="next" class="truncate">{{ next.title }}</span>
        <span v-else class="truncate">Daha Eski Gönderi Yok</span>

        <Icon name="heroicons:chevron-right" class="h-4 w-4 flex-shrink-0" />
      </Component>
    </div>
  </Transition>
</template>
