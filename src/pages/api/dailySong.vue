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
	let songUrl = data?.url || "dQw4w9WgXcQ";
	
	if (songUrl.includes("youtube.com/watch"))
        songUrl = new URLSearchParams(new URL(data.url).search).get("v");
    else if (songUrl.includes("youtu.be/"))
		songUrl = songUrl.split("/")[songUrl.split("/").length - 1];

    return redirect(`https://youtube.com/watch?v=${songUrl}`);
  },
};
</script>