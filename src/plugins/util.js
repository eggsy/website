export default (context, inject) => {
  inject("presenceAdded", () => false);

  if (process.client) {
    const presenceAdded = () =>
      document.querySelector("#__nuxt").classList.contains("presence");

    inject("presenceAdded", presenceAdded);
  }
};
