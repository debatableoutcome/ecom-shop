import { createStore } from "vuex";

export default createStore({
  state: {
    cartCount: 0,
  },
  mutations: {
    incrementCart(state) {
      state.cartCount += 1;
    },
  },
  getters: {
    getCartCount: (state) => {
      return state.cartCount;
    },
  },
});
