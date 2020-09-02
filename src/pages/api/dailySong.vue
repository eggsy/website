<template>
  <div></div>
</template>

<script>
import moment from "moment";

export default {
  async asyncData({ redirect, app }) {
    const ref = app.$fireStore
      .collection("dailySongs")
      .doc(moment().format("DD.MM.YYYY"));

    const data = (await ref.get()).data();
    const url = data?.url || "dQw4w9WgXcQ";

    return redirect(`https://youtube.com/watch?v=${url}`);
  },
};
</script>