<script lang="ts">
import Vue from "vue"

// Types
interface Post {
  title: string
  slug: string
}

export default Vue.extend({
  computed: {
    getPosts(): Post[] {
      return this.$store.state?.palette?.posts || []
    },
  },
  async mounted() {
    if (this.getPosts.length > 0) return

    const allPosts = await this.$content("blog")
      .sortBy("createdAt", "desc")
      .only(["title", "slug"])
      .limit(10)
      .fetch<Post[]>()

    this.$store.commit("palette/setPosts", allPosts)
  },
})
</script>

<template>
  <div class="space-y-2">
    <Title size="xs">Latest posts</Title>

    <CommandPaletteControls v-if="getPosts.length === 0">
      <CommandPaletteControlsItem v-for="i in 10" :key="i" loading />
    </CommandPaletteControls>

    <CommandPaletteControls v-else>
      <SmartLink
        v-for="(post, idx) in getPosts"
        :key="`post-${idx}`"
        :href="`/blog/gonderi/${post.slug}`"
        @click.native="$emit('close')"
      >
        <CommandPaletteControlsItem
          :title="post.title"
          icon="Link"
          :active="
            $route.name === 'blog-gonderi-slug' &&
            $route.params.slug === post.slug
          "
        />
      </SmartLink>
    </CommandPaletteControls>
  </div>
</template>
