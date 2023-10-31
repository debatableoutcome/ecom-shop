<template>
  <div class="screen">
    <div class="gallery">
      <div v-if="showErrorMessage" class="error-message">
        {{ error }}
      </div>

      <ProductTile
        v-for="product in products"
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

export default {
  components: {
    ProductTile,
  },
  computed: {
    ...mapState(["products"]),
    showErrorMessage() {
      return this.error;
    },
    showNoProductsMessage() {
      return !this.products.length;
    },
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
  mounted() {
    this.fetchProducts().catch((error) => {
      console.error("There was an error fetching the products:", error);
      this.error =
        "Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.";
    });
  },
};
</script>

<style scoped>
.screen {
  margin-left: 320px;
  margin-top: 80px;
  width: 85%;
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
  background-color: rgb(255, 255, 255);
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
