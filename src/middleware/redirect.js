export default async function (ctx) {
  const dailySongPaths = ["/redirect/dailysong", "/api/dailysong", "/dailysong"]

  if (dailySongPaths.includes(ctx.route.path.toLowerCase()))
    ctx.redirect(`https://youtube.com/watch?v=${await ctx.$getDaily()}`)
  else if (ctx.route.path === "/discord")
    return ctx.redirect("https://discord.gg/tHx9ZKG")
}
