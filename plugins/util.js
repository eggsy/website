export default (context, inject) => {
  inject("isMobile", false);
  inject("presenceAdded", false);

  if (process.client) {
    // Favourite posts initalize
    context.store.commit("posts/initialize", localStorage);

    // Presence and mobile detection
    setInterval(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      )
        inject("isMobile", true);

      if (
        context.route.path === "/projects/premid/custom-status" &&
        document.querySelector("#__nuxt").classList.contains("presence")
      )
        inject("presenceAdded", true);
      else inject("presenceAdded", false);
    }, 150);
  }
};
