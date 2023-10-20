<template>
  <div class="screen">
    <div class="gallery">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <ProductTile
        v-for="product in products"
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
  data() {
    return {
      products: [],
      error: null,
    };
  },
  mounted() {
    apiService
      .getProducts()
      .then((response) => {
        this.products = response.data.data;
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
        this.error =
          "Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.";
      });
  },
  components: {
    ProductTile,
  },
};
</script>

<style scoped>
.screen {
  background-color: #ff6600;
  width: 100%;
  height: 100%;
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
