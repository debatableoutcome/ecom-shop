<template>
  <div class="screen">
    <div class="gallery">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <ProductTile
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductTile from "@/components/ProductTile.vue";
import apiService from "@/API/apiService.js";

export default {
  components: {
    ProductTile,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      error: null,
      // Используем локальные переменные для фильтров
      localPriceFilter: { minPrice: null, maxPrice: null },
      localCategoryFilter: null,
    };
  },
  mounted() {
    apiService
      .getProducts()
      .then((response) => {
        this.products = response.data.data;
        this.filteredProducts = [...this.products];
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
        this.error =
          "Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.";
      });
  },
  props: {
    priceFilter: Object,
    categoryFilter: String,
  },
  watch: {
    priceFilter: {
      handler(newVal) {
        this.localPriceFilter = newVal;
        this.applyFilters();
      },
      deep: true,
    },
    categoryFilter: {
      handler(newVal) {
        this.localCategoryFilter = newVal;
        this.applyFilters();
      },
    },
  },
  methods: {
    applyFilters() {
      this.filteredProducts = this.products.filter((product) => {
        const categoryMatch =
          !this.localCategoryFilter ||
          product.category === this.localCategoryFilter;
        const priceMatch =
          (!this.localPriceFilter.minPrice ||
            product.price >= parseFloat(this.localPriceFilter.minPrice)) &&
          (!this.localPriceFilter.maxPrice ||
            product.price <= parseFloat(this.localPriceFilter.maxPrice));
        return categoryMatch && priceMatch;
      });
    },
    resetFilters() {
      this.localCategoryFilter = null;
      this.localPriceFilter = { minPrice: null, maxPrice: null };
      this.filteredProducts = [...this.products];
    },
  },
};
</script>

<style scoped>
.screen {
  background-color: #ff6600;
  width: 100%;
  height: 100%;
}
.filters {
  background: #660099;
  padding: 20px;
}
.gallery {
  background: #660099;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.error-message {
  color: red;
  padding: 10px;
  border: 1px solid red;
  margin-bottom: 20px;
}
</style>
