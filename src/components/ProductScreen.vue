<template>
  <div class="screen">
    <div class="gallery">
      <div v-if="showErrorMessage" class="error-message">
        {{ error }}
      </div>

      <ProductTile
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />

      <div v-if="showNoProductsMessage" class="no-products-message">
        Товаров по заданным параметрам не найдено
      </div>
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
    showErrorMessage() {
      return this.error;
    },
    showNoProductsMessage() {
      return !this.filteredProducts.length;
    },
  },
  methods: {
    ...mapActions(["applyPriceFilter", "applyCategoryFilter", "fetchProducts"]),
    applyFilters() {
      this.applyPriceFilter(this.priceFilter);
      this.applyCategoryFilter(this.categoryFilter);
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
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.no-products-message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 400px;
  background-color: rgb(233, 196, 247);
  font-size: 20px;
  color: rgb(55, 26, 119);
}

.error-message {
  color: red;
  padding: 10px;
  border: 1px solid red;
  margin-bottom: 20px;
}
</style>
