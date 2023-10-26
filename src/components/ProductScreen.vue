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
import { mapState, mapActions } from "vuex";
import ProductTile from "@/components/ProductTile.vue";
import apiService from "@/API/apiService.js";

export default {
  components: {
    ProductTile,
  },
  data() {
    return {
      products: [],

      error: null,
    };
  },
  computed: {
    ...mapState(["priceFilter", "categoryFilter"]),
    filteredProducts() {
      return this.products.filter((product) => {
        const priceMatch =
          (!this.priceFilter.minPrice ||
            product.price >= this.priceFilter.minPrice) &&
          (!this.priceFilter.maxPrice ||
            product.price <= this.priceFilter.maxPrice);
        const tagMatch =
          !this.categoryFilter ||
          (product.tags && product.tags.includes(this.categoryFilter));
        return priceMatch && tagMatch;
      });
    },
  },
  methods: {
    ...mapActions(["applyPriceFilter", "applyCategoryFilter", "fetchProducts"]),
    applyFilters() {
      // Ваша логика фильтрации
      this.applyPriceFilter(this.localPriceFilter);
      this.applyCategoryFilter(this.localCategoryFilter);
    },
    fetchInitialProducts() {
      this.fetchProducts();
    },
  },
  mounted() {
    apiService
      .getProducts()
      .then((response) => {
        this.products = response.data.data;
        this.applyFilters();
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
        this.error =
          "Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.";
      });
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
  background: rgb(55, 26, 119);
  width: 100%;
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
