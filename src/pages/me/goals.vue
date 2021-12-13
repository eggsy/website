<script lang="ts">
import Vue from "vue"
import { getPageBlocks, NotionRenderer } from "vue-notion"

export default Vue.extend({
  components: {
    NotionRenderer,
  },
  data() {
    return {
      blockMap: null,
    }
  },
  head() {
    const title = "Goals"
    const description =
      "Goals that I want to achieve in the future such as habits, hobbies, knowledge and more."

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
      }),
    }
  },
  fetchOnServer: false,
  async fetch() {
    /*
    TODO Replace here with this

    const blocks = await getPageBlocks("Goals-a1f6bdceb42040ae87c4b5dfbf49ec6e")
    this.blockMap = blocks
    */

    this.blockMap = "123"
  },
  computed: {
    /**
     * Returns last edited time.
     */
    getLastEditedTime(): string {
      if (this.blockMap === "123") return "false"
      else {
        const lastMapName = Object.keys(this.blockMap || {})?.[0]
        const lastMap: any = this.blockMap?.[lastMapName]
        const lastEditedDate = lastMap?.value?.last_edited_time

        return this.$moment(lastEditedDate).format("DD/MM/YYYY HH:mm")
      }
    },
  },
})
</script>

<template>
  <div class="mt-2">
    <LoadersContent v-if="blockMap === null" />

    <header
      v-else-if="true"
      class="space-y-2 my-12 text-gray-500 dark:text-neutral-700"
    >
      <h1 class="text-gray-900 text-4xl dark:text-neutral-300">Goals</h1>
      <p>🔨 Work in progress...</p>
    </header>

    <!-- TODO Wait for https://github.com/janniks/vue-notion/pull/63 to be merged and update this page -->

    <div v-else class="text-gray-500 dark:text-neutral-700">
      <header class="space-y-2 my-12">
        <h1 class="text-gray-900 text-4xl dark:text-neutral-300">Goals</h1>
        <p>Things that I want to achieve.</p>
        <small class="text-xs" title="Last edited on">
          {{ getLastEditedTime }}
        </small>
      </header>

      <div class="prose prose-md">
        <NotionRenderer
          class="notion"
          :unofficial="true"
          :blockMap="blockMap"
          todo
        />
      </div>
    </div>
  </div>
</template>
