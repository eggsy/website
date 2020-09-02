export const state = () => {
  return {
    read: [],
    reacted: [],
    favorites: []
  };
};

export const mutations = {
  add(state, id) {
    if (!state.read.includes(id)) state.read.push(id);
  },
  addReacted(state, str) {
    if (!state.reacted.includes(str)) state.reacted.push(str);
  },
  favorite(state, id) {
    state.favorites.includes(id)
      ? (state.favorites = state.favorites.filter(fav => fav != id))
      : state.favorites.push(id);
  },
  initialize(state, storage) {
    const items = storage.getItem("favorite_posts");

    if (!items) return;
    else if (items && items.split(",").length > 0)
      state.favorites = items.split(",");
    else if (items && !items.split(",").length > 0) state.favorites = [];
  }
};
