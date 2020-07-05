export default (context, inject) => {
  inject("isMobile", () => false);
  inject("presenceAdded", () => false);

  if (process.client) {
    // Favourite posts initalize
    context.store.commit("posts/initialize", localStorage);

    const isMobile = () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const presenceAdded = () =>
      context.route.path === "/projects/premid/custom-status" &&
      document.querySelector("#__nuxt").classList.contains("presence");

    inject("isMobile", isMobile);
    inject("presenceAdded", presenceAdded);
  }
};
