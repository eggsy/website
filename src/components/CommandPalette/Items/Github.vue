<script lang="ts">
import Vue from "vue"

// Types
import type { GithubActivity } from "@/types/Response/GithubActivity"

interface Repository {
  value: string
  type: string
  repo: string
}

export default Vue.extend({
  computed: {
    getRepositories(): Repository[] {
      return this.$store.state?.palette?.repositories || []
    },
  },
  async mounted() {
    if (this.getRepositories.length > 0) return

    const data: GithubActivity[] = (
      await this.$axios.get(
        "https://api.github.com/users/eggsy/events?per_page=50"
      )
    ).data

    const filteredResult = data.filter(
      ({ type }) =>
        type === "WatchEvent" ||
        type === "CreateEvent" ||
        type === "DeleteEvent" ||
        type === "PushEvent" ||
        type === "ReleaseEvent"
    )

    const filterActivity = (activity: GithubActivity) => {
      const repo = activity.repo.name

      // Star
      if (activity.type === "WatchEvent")
        return {
          value: `Starred <strong>${repo}</strong>`,
          type: "star",
          repo,
        }
      // Create
      else if (activity.type === "CreateEvent")
        return {
          value: `Created <strong>${repo}</strong>`,
          type: "create",
          repo,
        }
      // Delete
      else if (activity.type === "DeleteEvent") {
        const { ref, ref_type: refType } = activity.payload
        const text = refType === "branch" ? "Deleted branch" : "Deleted"

        return {
          value: `${text} <strong>${ref}</strong> of <strong>${repo}</strong>`,
          type: "delete",
          repo,
        }
      }
      // Fork
      else if (activity.type === "ForkEvent") {
        const { forkee } = activity.payload
        const name = forkee?.full_name || repo.split("/")[1]

        return {
          value: `Forked <strong>${name}</strong> from <strong>${repo}</strong>`,
          type: "fork",
          repo,
        }
      }
      // Push
      else if (activity.type === "PushEvent") {
        const { distinct_size: distinctSize } = activity.payload

        return {
          value: `Pushed <strong>${distinctSize}</strong> commits to <strong>${repo}</strong>`,
          type: "push",
          repo,
        }
      }
      // None
      else return ""
    }

    const filteredActivity = filteredResult.map(filterActivity)
    this.$store.commit("palette/setRepositories", filteredActivity.slice(0, 10))
  },
  methods: {
    getIcon(type: string) {
      if (type === "star") return "Fork"
      else if (type === "create") return "Check"
      else if (type === "push") return "Branch"
      else if (type === "fork") return "Fork"
      else if (type === "delete") return "X"
    },
  },
})
</script>

<template>
  <div class="space-y-2 relative">
    <Title size="xs">Latest GitHub activity</Title>

    <CommandPaletteControls v-if="getRepositories.length === 0">
      <CommandPaletteControlsItem v-for="i in 10" :key="i" loading />
    </CommandPaletteControls>

    <CommandPaletteControls v-else>
      <SmartLink
        v-for="(repository, idx) in getRepositories"
        :key="`activity-${idx}`"
        :href="`https://github.com/${repository.repo}`"
        blank
      >
        <CommandPaletteControlsItem
          :title="repository.value"
          :icon="getIcon(repository.type)"
          @click.native="$emit('close')"
        />
      </SmartLink>
    </CommandPaletteControls>
  </div>
</template>
