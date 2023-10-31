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
        state.priceFilter.minPrice = parseFloat(payload.minPrice);
      }
      if (payload.maxPrice !== undefined) {
        state.priceFilter.maxPrice = parseFloat(payload.maxPrice);
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
    async fetchProducts({ commit, state }) {
      const params = {
        minPrice: state.priceFilter.minPrice,
        maxPrice: state.priceFilter.maxPrice,
        tag: state.categoryFilter,
      };
      try {
        const response = await apiService.getProducts(params);
        commit("setProducts", response.data.data);
      } catch (error) {
        console.error("There was an error fetching the products:", error);
      }
    },
    async applyFilters({ dispatch, commit, state }) {
      let minPrice = isNaN(state.priceFilter.minPrice)
        ? null
        : state.priceFilter.minPrice;
      let maxPrice = isNaN(state.priceFilter.maxPrice)
        ? null
        : state.priceFilter.maxPrice;

      commit("updatePriceFilter", { minPrice, maxPrice });
      commit("updateCategoryFilter", state.categoryFilter);
      await dispatch("fetchProducts");
    },
    async applyCategoryFilter({ commit, dispatch }, payload) {
      commit("updateCategoryFilter", payload);
      await dispatch("fetchProducts");
    },
    async resetFilters({ commit, dispatch }) {
      commit("updatePriceFilter", { minPrice: null, maxPrice: null });
      commit("updateCategoryFilter", "");
      await dispatch("fetchProducts");
    },
  },
  getters: {
    getCartCount: (state) => {
      return state.cartCount;
    },
  },
});
