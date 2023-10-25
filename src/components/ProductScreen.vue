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
    };
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
  props: {
    priceFilter: Object,
    categoryFilter: String, // Мы все еще оставляем это, если вам нужны и категории, и теги
  },
  watch: {
    priceFilter: {
      handler() {
        this.applyFilters();
      },
      deep: true,
    },
    categoryFilter: {
      handler() {
        this.applyFilters();
      },
    },
  },
  methods: {
    applyFilters() {
      const selectedTag = this.categoryFilter; // Используем categoryFilter как выбранный тег
      this.filteredProducts = this.products.filter((product) => {
        const tagMatch =
          !selectedTag || (product.tags && product.tags.includes(selectedTag));
        const priceMatch =
          (!this.priceFilter.minPrice ||
            product.price >= parseFloat(this.priceFilter.minPrice)) &&
          (!this.priceFilter.maxPrice ||
            product.price <= parseFloat(this.priceFilter.maxPrice));

        return tagMatch && priceMatch;
      });
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
