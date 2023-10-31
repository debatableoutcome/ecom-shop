import { createStore } from "vuex";
import apiService from "@/API/apiService.js";

export default createStore({
  state: {
    products: [],
    cartCount: 0,
    priceFilter: {
      minPrice: null,
      maxPrice: null,
    },
    categoryFilter: "",
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    updatePriceFilter(state, payload) {
      if (payload.minPrice !== undefined) {
        state.priceFilter.minPrice = payload.minPrice;
      }
      if (payload.maxPrice !== undefined) {
        state.priceFilter.maxPrice = payload.maxPrice;
      }
    },
    updateCategoryFilter(state, payload) {
      state.categoryFilter = payload;
    },
    incrementCart(state) {
      state.cartCount += 1;
    },
  },
  actions: {
    resetFilters({ commit, dispatch }) {
      commit("updatePriceFilter", { minPrice: null, maxPrice: null });
      commit("updateCategoryFilter", "");
      dispatch("fetchProducts");
    },
    async fetchProducts({ commit, state }) {
      const minPrice =
        state.priceFilter.minPrice !== null
          ? Number(state.priceFilter.minPrice).toFixed(2)
          : null;
      const maxPrice =
        state.priceFilter.maxPrice !== null
          ? Number(state.priceFilter.maxPrice).toFixed(2)
          : null;
      const params = {
        minPrice,
        maxPrice,
        tag: state.categoryFilter,
      };
      console.log("API parameters:", params);
      try {
        const response = await apiService.getProducts(params);
        commit("setProducts", response.data.data);
      } catch (error) {
        console.error("There was an error fetching the products:", error);
      }
    },
  },
  getters: {
    getCartCount: (state) => {
      return state.cartCount;
    },
  },
});
