<template>
  <div class="product-card">
    <img
      :src="`https://picsum.photos/640/480?random=${product.id}`"
      alt="Product Image"
      class="product-card__image"
    />

    <div class="product-card__content">
      <h2 class="product-card__title">{{ product.name }}</h2>
      <p class="product-card__description">{{ shortDescription }}</p>
      <p class="product-card__price">{{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortDescription() {
      return this.product.description.length > 200
        ? this.product.description.substring(0, 197) + "..."
        : this.product.description;
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 250px;
  border: 1px solid #e1e1e1;
  background-color: white;
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: auto;
  display: block;
}

.product-card__content {
  padding: 15px;
}

.product-card__title {
  font-size: 16px;
  margin-bottom: 10px;
}

.product-card__description {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.product-card__price {
  font-size: 18px;
  font-weight: bold;
}
</style>
