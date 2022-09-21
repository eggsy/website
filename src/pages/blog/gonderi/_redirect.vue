<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  asyncData({ redirect, params }) {
    redirect(301, `/blog/${params.redirect}`)
  },

  head() {
    const { redirect } = this.$route.params
    if (!redirect) return {}

    const url = `https://eggsy.xyz/blog/${redirect}`

    return {
      link: [
        {
          rel: "canonical",
          href: url,
        },
      ],
      meta: [
        {
          httpEquiv: "refresh",
          content: `0; url=${url}`,
        },
      ],
    }
  },
})
</script>
