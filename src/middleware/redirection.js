import moment from "moment";

/*
  Redirect using middleware instead of pages
*/

export default async function(ctx) {
  const dailySongPaths = ["/redirect/dailysong", "/api/dailysong"];

  if (dailySongPaths.includes(ctx.route.fullPath.toLowerCase())) {
    const ref = ctx.app.$fire.firestore
      .collection("dailySongs")
      .doc(moment().format("DD.MM.YYYY"));

    const data = (await ref.get()).data();
    let songUrl = data?.url || "dQw4w9WgXcQ";

    if (songUrl.includes("youtube.com/watch"))
      songUrl = new URLSearchParams(new URL(data.url).search).get("v");
    else if (songUrl.includes("youtu.be/"))
      songUrl = songUrl.split("/")[songUrl.split("/").length - 1];

    return ctx.redirect(`https://youtube.com/watch?v=${songUrl}`);
  } else if (ctx.route.fullPath.toLowerCase() === "/discord")
    return ctx.redirect("https://discord.gg/tHx9ZKG");
}
