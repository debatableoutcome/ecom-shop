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
      console.log("updatePriceFilter payload:", payload);
      if (payload.minPrice !== undefined) {
        state.priceFilter.minPrice = parseFloat(payload.minPrice);
      }
      if (payload.maxPrice !== undefined) {
        state.priceFilter.maxPrice = parseFloat(payload.maxPrice);
      }
    },
    updateCategoryFilter(state, payload) {
      state.categoryFilter = payload;
      console.log("updateCategoryFilter payload:", payload);
    },
    incrementCart(state) {
      state.cartCount += 1;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      apiService
        .getProducts()
        .then((response) => {
          commit("setProducts", response.data.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the products:", error);
        });
    },
    applyFilters() {
      let minPrice = isNaN(this.priceFilter.minPrice)
        ? null
        : this.priceFilter.minPrice;
      let maxPrice = isNaN(this.priceFilter.maxPrice)
        ? null
        : this.priceFilter.maxPrice;

      this.applyPriceFilter({ minPrice, maxPrice });
      this.applyCategoryFilter(this.categoryFilter);
    },

    applyCategoryFilter({ commit }, payload) {
      commit("updateCategoryFilter", payload);
    },
    resetFilters({ commit }) {
      commit("updatePriceFilter", { minPrice: null, maxPrice: null });
      commit("updateCategoryFilter", "");
    },
  },
  getters: {
    getCartCount: (state) => {
      return state.cartCount;
    },
  },
});
