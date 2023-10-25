<template>
  <main>
    <Header />
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
import Header from "./components/Header.vue";
import FilterPanel from "./components/FilterPanel.vue";
import ProductScreen from "./components/ProductScreen.vue";

export default {
  data() {
    return {
      priceFilter: { minPrice: null, maxPrice: null },
      categoryFilter: null,
    };
  },
  components: {
    Header,
    FilterPanel,
    ProductScreen,
  },
  methods: {
    updatePriceFilter(newFilter) {
      this.priceFilter = newFilter;
      console.log("Обновлен глобальный priceFilter:", this.priceFilter); // Добавьте логирование
    },
    updateCategoryFilter(newCategory) {
      this.categoryFilter = newCategory;
      console.log("Обновлен глобальный categoryFilter:", this.categoryFilter); // Добавьте логирование
    },
    handleFiltersReset() {
      this.priceFilter = { minPrice: null, maxPrice: null };
      this.categoryFilter = null;
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
