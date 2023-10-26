<template>
  <main>
    <Header :cartCount="cartCount" />
    <div class="lower-container">
      <FilterPanel
        :priceFilter="priceFilter"
        :categoryFilter="categoryFilter"
        @update:priceFilter="updatePriceFilter"
        @update:categoryFilter="updateCategoryFilter"
        @filtersReset="handleFiltersReset"
      />

      <ProductScreen
        :priceFilter="priceFilter"
        :categoryFilter="categoryFilter"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/Header.vue";
import FilterPanel from "./components/FilterPanel.vue";
import ProductScreen from "./components/ProductScreen.vue";

export default {
  data() {
    return {
      cartCount: 0,
    };
  },
  computed: {
    ...mapState(["priceFilter", "categoryFilter"]),
  },
  components: {
    Header,
    FilterPanel,
    ProductScreen,
  },
  methods: {
    updatePriceFilter(newFilter) {
      this.$store.commit("setPriceFilter", newFilter);
      console.log("Обновлен глобальный priceFilter:", newFilter);
    },
    updateCategoryFilter(newCategory) {
      this.$store.commit("setCategoryFilter", newCategory);
      console.log("Обновлен глобальный categoryFilter:", newCategory);
    },
    handleFiltersReset() {
      console.log("Handling filters reset...");
      this.$store.commit("setPriceFilter", { minPrice: null, maxPrice: null });
      this.$store.commit("setCategoryFilter", null);
      console.log(
        "Global filters reset to:",
        this.$store.state.priceFilter,
        this.$store.state.categoryFilter
      );
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: green;
}
.lower-container {
  background: rgb(55, 26, 119);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: self-start;
  justify-content: space-between;
  gap: 20px;
}
</style>
