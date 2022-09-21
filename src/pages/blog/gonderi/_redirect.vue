<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  asyncData({ redirect, params }) {
    redirect(301, `/blog/${params.redirect}`)
  },
})
</script>
