import { createStore } from "vuex";

export default createStore({
  state: {
    cartCount: 0,
    priceFilter: {
      minPrice: null,
      maxPrice: null,
    },
    categoryFilter: null,
  },
  mutations: {
    setPriceFilter(state, payload) {
      console.log("setPriceFilter вызвана с payload:", payload);
      state.priceFilter = payload;
    },
    setCategoryFilter(state, payload) {
      state.categoryFilter = payload;
    },
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
